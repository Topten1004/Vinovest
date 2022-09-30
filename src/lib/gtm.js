import React from "react";
import cookie from "js-cookie";
import { v4 as uuid } from "uuid";
import posthog from "posthog-js";
import { EmailCaptureCookie } from "#utils/constants";
import { LinkedInAndTwitterEvents } from "./trackingPixels";

export const EventNames = {
    deposit_started: "deposit_started",
    identify_user: "identify_user",
    login_complete: "login_complete",
    quiz_action: "quiz_action",
    quiz_completed: "quiz_completed",
    referral_action: "referral_action",
    registration_complete: "registration_complete",
    banner_action: "banner_action",
    ecommerce_transaction: "ecommerce_transaction",
    appointment_scheduled: "appointment_scheduled",
    liquidation_flow_newsletter_checkbox: "liquidation_flow_newsletter_checkbox",
    liquidation_feedback: "liquidation_feedback",
    liquidation_no_feedback: "liquidation_no_feedback",
    liquidation_newsletter_opt_in: "liquidation_newsletter_opt_in",
    footer_newsletter: "footer_newsletter",
    contact_us_form: "contact_us_form",
    // second fb pixel triggers
    have_1000_question: "have_1000_question",
    pixel_registration_success: "pixel_registration_success",
    pixel_enter_phone: "pixel_enter_phone",
    pixel_click_fund_account: "pixel_click_fund_account",
    pixel_fund_account: "pixel_fund_account",
    pixel_get_started: "pixel_get_started",
    ab_phone_test: "a/b-phone-test",
    select_fund_source: "select_fund_source",
    bank_account_selected: "bank_account_selected",
    credit_card_selected: "credit_card_selected",
    crypto_selected: "crypto_selected",
    mail_a_check_link_selected: "mail_a_check_link_selected",
    bank_wire_selected: "bank_wire_selected",
    deposit_added: "deposit_added",
};

/* ctx => window */
export class GTMClient {
    static build(ctx) {
        const gtm = new GTMClient(ctx);
        gtm.addCalendly(gtm);
        if (!/zh/.test(window.location.pathname)) {
            gtm._appendBlockedChinaScripts();
        }

        return gtm;
    }

    constructor(ctx) {
        this.eventIdentifier = "CUSTOM";
        this.ctx = ctx;
        this.trackPixelGetStarted = this.trackPixelGetStarted.bind(this);
        this.appended = [];
    }

    _dispatchEvent(name, attributes) {
        this.ctx.dataLayer.push({
            event: this.eventIdentifier,
            EVENT_NAME: name,
            ATTRS: attributes,
        });
    }

    _makeBlockedChinaScripts() {
        // Google Optimize
        const googleOptimize = document.createElement("script");
        googleOptimize.src = "https://www.googleoptimize.com/optimize.js?id=GTM-T3NKTS6";
        googleOptimize.defer = true;

        // Twitter Tracking
        const twitterScript = document.createElement("script");
        twitterScript.src = "//platform.twitter.com/oct.js";
        twitterScript.defer = true;

        return [googleOptimize, twitterScript];
    }

    _appendBlockedChinaScripts() {
        const scriptsToAppend = this._makeBlockedChinaScripts();

        scriptsToAppend.map((script) => {
            document.head.appendChild(script);
        });
    }
    /**
     * This makes an arbitrary tracking pixel. It is currently
     *  being used for twitter (with JS disabled) and linkedin.
     */
    _makeTrackingPixel(src) {
        const identifier = uuid();
        const img = document.createElement("img");
        img.height = "1px";
        img.width = "1px";
        img.style = "display:none;";
        img.alt = "";
        img.id = identifier;
        img.src = src;
        return img;
    }

    /**
     * This makes a noscript tag to wrap the pixels for twitter.
     * Can be used to make any arbitrary noscript node.
     */
    _makeNoScript(nodes) {
        try {
            const identifier = uuid();
            const noScript = document.createElement("noscript");
            noScript.id = identifier;
            nodes.map((n) => noScript.append(n));
            return noScript;
        } catch (e) {
            console.error(e);
        }
    }

    /**
     * This will remove a previously appended pixel child node for an event.
     * This is fired on a new event, or after a set timeout.
     */
    _removeAppended() {
        if (this.appended) {
            try {
                this.appended.map((id) => {
                    const elem = document.getElementById(id);
                    elem.remove();
                });
                this.appended = [];
            } catch (e) {
                console.error(e);
            }
        }
    }

    /**
     * This does all of the leg work to actually append the nodes to the body element.
     *  Currently, this makes a linkedin pixel, and noscript wrapped pixels for twitter.
     *  We can pull this out into something else if too many pixels start to get added.
     *  Low-Level manipulation was required to be able to track specific events using pixels
     *  without having to have the code to do it scattered around the entire codebase.
     */
    _appendTrackingPixels(pixels) {
        try {
            const linkedin = this._makeTrackingPixel(pixels.linkedin);
            const twitterPixels = pixels.twitter.map((t) => this._makeTrackingPixel(t));
            const noScript = this._makeNoScript(twitterPixels);
            this._removeAppended();
            window.document.body.append(noScript, linkedin);
            this.appended.push(linkedin.id, noScript.id);
            window.setTimeout(() => this._removeAppended(), 8000);
        } catch (e) {
            console.error(e);
        }
    }

    /* currently only used for Google Analytics e-commerce transactions */
    _dispatchEcommerceTransaction(depositMeta) {
        this.ctx.dataLayer.push({
            event: this.eventIdentifier,
            EVENT_NAME: EventNames.ecommerce_transaction,
            transactionId: depositMeta.id,
            transactionTotal: depositMeta.value,
            transactionProducts: [
                {
                    name: depositMeta.method,
                    sku: depositMeta.frequency,
                    price: depositMeta.value,
                    quantity: 1,
                },
            ],
        });
    }

    _getUserInformation = async function (store) {
        window.passPixelData721 = null;
        const { userInformationEntity } = store.user;
        let userInformation = userInformationEntity.data;

        const fillPassPixelData721 = (userInfo) => {
            window.passPixelData721 = {
                Fn: userInfo.firstName,
                Ln: userInfo.lastName,
                Pn: userInfo.primaryPhone,
                Em: userInfo.email,
            };
        };

        if (!Object.entries(userInformation || {}).length) {
            try {
                userInformation = await store.user.fetchUserInformation();
                fillPassPixelData721(userInformation);
            } catch (err) {
                return null;
            }
        }

        fillPassPixelData721(userInformation);

        return userInformation;
    };

    _trackFbPixel = async function (s, callback) {
        const userInfo = await this._getUserInformation(s);

        if (userInfo && window.passPixelData721) {
            callback();
        }
    };

    trackRegistrationComplete() {
        this._dispatchEvent(EventNames.registration_complete);
    }
    trackLoginComplete() {
        this._dispatchEvent(EventNames.login_complete);
    }
    trackDepositStarted() {
        this._dispatchEvent(EventNames.deposit_started);
    }
    trackDepositAdded(depositMeta) {
        this._dispatchEcommerceTransaction(depositMeta);
    }
    trackDepositAddedNew(body) {
        this._dispatchEvent(EventNames.deposit_added, body);
    }
    trackUserIdentified(userMeta) {
        this._dispatchEvent(EventNames.identify_user, userMeta);
    }
    trackQuizAction(action) {
        this._dispatchEvent(EventNames.quiz_action, { action });
    }
    trackQuizCompleted(body) {
        this._dispatchEvent(EventNames.quiz_completed, body);
        ttq.track("SubmitForm");
    }
    trackReferralAction(action) {
        this._dispatchEvent(EventNames.referral_action, { action });
    }
    trackBannerAction(action) {
        this._dispatchEvent(EventNames.banner_action, { action });
    }
    trackAppointmentScheduled() {
        this._dispatchEvent(EventNames.appointment_scheduled);
    }
    trackLiquidationFlowNewsletter() {
        this._dispatchEvent(EventNames.liquidation_flow_newsletter_checkbox);
    }
    liquidationFeedback(body) {
        this._dispatchEvent(EventNames.liquidation_feedback, body);
    }
    liquidationNoFeedback() {
        this._dispatchEvent(EventNames.liquidation_no_feedback);
    }
    liquidationNewsletterOptIn(body) {
        this._dispatchEvent(EventNames.liquidation_newsletter_opt_in, body);
    }

    addCalendly(gtm) {
        window.addEventListener(
            "message",
            (msg) => {
                const calendlyEventScheduled = "calendly.event_scheduled";
                if (msg.data.event === calendlyEventScheduled) {
                    gtm.trackAppointmentScheduled();
                }
            },
            false,
        );
    }

    // Create Password -- CompleteRegistration    -> pixel_registration_succespixel_registration_successs
    // Enter Phone -- AddToCart                   -> pixel_enter_phone
    // Answer $1,000 Question -- Lead             -> have_1000_question
    // Click Fund Account -- Initiate Checkout    -> pixel_click_fund_account
    // Fund Account -- Purchase                   -> pixel_fund_account

    trackCreatePassword(s) {
        this._appendTrackingPixels(LinkedInAndTwitterEvents.create_password);
        try {
            twttr.conversion.trackPid("o6ds9", { tw_sale_amount: 0, tw_order_quantity: 0 });
        } catch (e) {
            console.error(e);
        }

        this._trackFbPixel(s, () => {
            this._dispatchEvent(EventNames.pixel_registration_success);
        });
        ttq.track("CompleteRegistration");
    }

    trackEnterPhone(s, phone) {
        this._appendTrackingPixels(LinkedInAndTwitterEvents.enter_phone);
        try {
            twttr.conversion.trackPid("o6dsa", { tw_sale_amount: 0, tw_order_quantity: 0 });
        } catch (e) {
            console.error(e);
        }

        this._trackFbPixel(s, () => {
            window.passPixelData721.Pn = phone;
            this._dispatchEvent(EventNames.pixel_enter_phone);
        });
    }

    trackHave1000question(s, answer) {
        this._appendTrackingPixels(LinkedInAndTwitterEvents.answer_minimum_capital);
        try {
            twttr.conversion.trackPid("o6dsb", { tw_sale_amount: 0, tw_order_quantity: 0 });
        } catch (e) {
            console.error(e);
        }

        this._trackFbPixel(s, () => {
            window.passPixelData721.answer = answer;
            this._dispatchEvent(EventNames.have_1000_question);
        });
    }

    trackDepositStartedSecondPixel(s) {
        this._appendTrackingPixels(LinkedInAndTwitterEvents.click_fund_account);
        try {
            twttr.conversion.trackPid("o6dsd", { tw_sale_amount: 0, tw_order_quantity: 0 });
        } catch (e) {
            console.error(e);
        }

        this._trackFbPixel(s, () => {
            this._dispatchEvent(EventNames.pixel_click_fund_account);
        });
    }

    trackFundAccountPurchase(s, value, currencyCode) {
        this._appendTrackingPixels(LinkedInAndTwitterEvents.fund_account);
        try {
            twttr.conversion.trackPid("o6dse", { tw_sale_amount: value, tw_order_quantity: 1 });
        } catch (e) {
            console.error(e);
        }

        this._trackFbPixel(s, () => {
            window.passPixelData721.value = value;
            window.passPixelData721.currency = currencyCode;
            this._dispatchEvent(EventNames.pixel_fund_account);
        });
    }

    trackPixelGetStarted(email, signUpWiaGoogle) {
        window.passPixelData721 = {};
        const emailCaptureCookie = cookie.get(EmailCaptureCookie.KEY);

        if (emailCaptureCookie) {
            window.passPixelData721.Em = emailCaptureCookie;
        }
        if (email) {
            this._appendTrackingPixels(LinkedInAndTwitterEvents.enter_email);
            try {
                twttr.conversion.trackPid("o6ds8", { tw_sale_amount: 0, tw_order_quantity: 0 });
            } catch (e) {
                console.error(e);
            }

            window.passPixelData721.Em = email;
        }
        if (signUpWiaGoogle) {
            window.passPixelData721.SignUpWiaGoogle = true;
        }

        this._dispatchEvent(EventNames.pixel_get_started);
    }

    footerNewsletter(body) {
        this._dispatchEvent(EventNames.footer_newsletter, { Segment: "Newsletter", ...body });
    }

    contactUsForm(body) {
        this._dispatchEvent(EventNames.contact_us_form, { Segment: "Contact-Us-Form", ...body });
    }

    trackSelectFundSource() {
        this._dispatchEvent(EventNames.select_fund_source);
    }

    trackBankAccountSelected() {
        this._dispatchEvent(EventNames.bank_account_selected);
    }

    trackCreditCardSelected() {
        this._dispatchEvent(EventNames.credit_card_selected);
    }

    trackCryptoSelected() {
        this._dispatchEvent(EventNames.crypto_selected);
    }

    trackMailACheckLinkSelected() {
        this._dispatchEvent(EventNames.mail_a_check_link_selected);
    }

    trackBankWireSelected() {
        this._dispatchEvent(EventNames.bank_wire_selected);
    }
    trackNewUserInformation(oktaStore, values) {
        this.trackEnterPhone(oktaStore, values.primaryPhone);
        this.trackPixelGetStarted(values.email);
        this.trackCreatePassword(oktaStore);
        this.trackRegistrationComplete();
        posthog.capture("user_referal_source", {
            referal_source: values.referalSource,
        });
    }
    trackUserOverviewStatus(authenticationType, sub, restUserInfo, oktaStore) {
        posthog.identify(sub, { ...restUserInfo });

        if (authenticationType === "SIGNUP") {
            this.trackCreatePassword(oktaStore);
        }
        if (authenticationType === "LOGIN") {
            this.trackLoginComplete();
        }
    }
    trackNewUserInvestingProfile(oktaStore, values, plan) {
        posthog.capture("signup_investment_q", {
            invesment_amount: values.consideredStartingInvestment,
            investment_timeframe: values.anticipatedCashAccess,
            investingStyle: plan,
        });
        posthog.capture("quiz_completed", {});
        this.trackHave1000question(oktaStore, values.consideredStartingInvestment);
        this.trackQuizCompleted(values.consideredStartingInvestment, plan);
    }
}
