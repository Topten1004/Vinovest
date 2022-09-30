import { observable, computed, action, flow, toJS } from "mobx";
import moment from "moment";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import i18n from "i18next";
import { DEPOSIT_TYPE } from "#utils/constants";
import {
    getData,
    emptyFetchEntity,
    completedFetch,
    pendingFetch,
    erroredFetch,
    CrudOperation,
} from "#models/FetchStatus";
import { BankSource } from "#models/BankSource";

import { PaymentSource } from "#models/PaymentSource";
import DepositCalculator from "#utils/depositCalculator";
import FeeCalculator from "#utils/feeCalculator";
import { localizedPath } from "#localization/localizedRouter";
/**
 * Move this to CC model + update references
 * after PaymentSources are deprecated + remove normalizePaymentSource
 */
export const normalizePaymentMethod = (method) => {
    const isCreditCard = !_.isNil(method.card);
    return {
        type: isCreditCard ? DEPOSIT_TYPE.CreditCard : DEPOSIT_TYPE.BankTransfer,
        id: _.get(method, "id"),
        name: isCreditCard ?
            _.get(method, "card.brand", "").toUpperCase() :
            _.get(method, "ach.name", "").toUpperCase(),
        lastFour: isCreditCard ?
            _.get(method, "card.last4") || _.get(method, "card.lastFour") || "" :
            _.get(method, "ach.lastFour"),
        country: isCreditCard ? _.get(method, "card.country") || "" : "",
    };
};

export const normalizePaymentSource = (source) => ({
    type: DEPOSIT_TYPE.BankTransfer,
    id: _.get(source, "id"),
    name: _.get(source, "bank.name"),
    lastFour: _.get(source, "bank.lastFour"),
});
export class DepositStore {
    static build(rootStore, api) {
        return new DepositStore(rootStore, api);
    }

    @observable selectedPaymentSource = new PaymentSource();
    @observable selectedFrequencyKey = "";
    @observable userSelectedFrequency = false;
    @observable depositStartDate = moment().endOf("day");
    @observable depositAmt = 5000;
    @observable referenceKeyFetch = emptyFetchEntity();
    @observable depositPost = emptyFetchEntity();
    @observable savedPaymentMethodsFetch = emptyFetchEntity();
    @observable plaidLinkFetch = emptyFetchEntity();
    @observable ACHAccountCreate = emptyFetchEntity();
    @observable bitpayInvoice = emptyFetchEntity();
    @observable reocurringBitpay = emptyFetchEntity();
    @observable userCurrency = "USD";

    depositFrequencyOptions = {
        once: i18n.t("deposit:deposit_once"),
        week: i18n.t("deposit:deposit_weekly"),
        month: i18n.t("deposit:deposit_monthly"),
    };

    constructor(rootStore, api) {
        this.root = rootStore;
        this.api = api;
    }

    /**
     * returns:
     *
     * @param {DEPOSIT_TYPE} type
     * @param {string} id - accountID
     * @param {string} name - bank name or credit card
     * @param {string} lastFour - last four digits of acct
     */

    @computed get normalizedSavedPaymentMethods() {
        if (_.isEmpty(this.savedPaymentMethodsFetch.data)) {
            return [];
        }

        const { paymentSources = [], paymentMethods = [] } = this.savedPaymentMethodsFetch.data;

        // LEGACY Stripe API - only includes ACH
        const ps = paymentSources.map(normalizePaymentSource);

        // NEW Stripe API - includes Credit Card, and ACH will be moved over at a later point
        const pm = paymentMethods.map(normalizePaymentMethod);

        return [...ps, ...pm];
    }

    @computed get depositAmtInCents() {
        return this.depositAmt * 100;
    }

    @computed get depositAmtPlusBitpayFees() {
        const { depositAmtInCents } = this;

        const withBitpayFees = Math.ceil(depositAmtInCents / 0.99);
        return withBitpayFees;
    }

    @computed get depositAmtPlusWeChatFees() {
        const { depositAmtInCents } = this;

        const withWeChatFees = Math.ceil(depositAmtInCents / 0.978 + 200);
        return withWeChatFees;
    }

    @computed get depositAmtPlusAlipayFees() {
        const { depositAmtInCents } = this;

        const withAlipayFees = Math.ceil(depositAmtInCents / 0.988 + 200);
        return withAlipayFees;
    }

    @computed get deposit() {
        return toJS(this.depositPost);
    }

    /** DepositAmt + Fees IN CENTS */
    @computed get depositAmtPlusFeesInCents() {
        const { depositAmtInCents, selectedPaymentSource: source } = this;
        const { data } = source;
        let unroundedTotalInCents = depositAmtInCents;

        if (source.isCreditCard()) {
            unroundedTotalInCents = FeeCalculator.getCreditCardFee(
                unroundedTotalInCents,
                this.userCurrency,
                data.country,
            );
        }
        const roundedTotalInCents = Math.round(unroundedTotalInCents);

        return roundedTotalInCents;
    }
    @computed get selectedDepositFrequency() {
        return this.selectedFrequencyKey || "once";
    }
    @computed get isSubscription() {
        return !!this.selectedFrequencyKey && this.selectedFrequencyKey !== "once";
    }

    @computed get bitpayInvoiceID() {
        return toJS(this.bitpayInvoice);
    }

    @computed get plaidLinkToken() {
        return getData(this.plaidLinkFetch)?.token;
    }

    @action setPlaidLink(plaidLink) {
        this.plaidLink = plaidLink;
    }

    @action setDepositAmt(amt) {
        this.depositAmt = amt;
    }
    // v2
    /**
     * @param {PaymentSource} source
     * - DO NOT set with anything else
     */
    @action setBitpayInvoice(invoiceID) {
        this.bitpayInvoice = invoiceID;
    }

    @action setPaymentSource(source) {
        this.selectedPaymentSource = source;
    }
    @action setDepositFrequencyKey(frequencyKey) {
        this.selectedFrequencyKey = frequencyKey;
    }

    @action setUserSelectedFrequency() {
        this.userSelectedFrequency = true;
    }

    @action setUserCurrency(currency) {
        this.userCurrency = currency;
    }

    @action resetState() {
        this.depositAmt = 5000;

        this.depositPost = emptyFetchEntity();
        this.savedPaymentMethodsFetch = emptyFetchEntity();
        this.referenceKeyFetch = emptyFetchEntity();
        this.ACHAccountCreate = emptyFetchEntity();
    }

    oneTimeMinDepositAmount = (currency) => DepositCalculator.getMinimumDepositAmount(currency);
    recurringMinDepositAmount = (currency) => DepositCalculator.getReoccuringDepositAmount(currency);

    requestAlipayPayment = flow(function* (stripe, region) {
        const { accessToken: jwt } = this.root.auth;
        const userID = this.root.user.oktaUserInfo.sub;
        const response = yield this.api.createStripePaymentIntent(
            jwt,
            this.depositAmtPlusAlipayFees,
            "alipay",
            null,
            "managed",
            region,
            userID,
        );
        if (!response.ok) {
            return i18n.t("deposit:alipay_error");
        }
        const paymentIntent = yield response.json();

        const { error } = yield stripe.confirmAlipayPayment(paymentIntent.secret, {
            return_url: `https://www.vinovest.co${localizedPath("/portfolio")}`,
        });
        return { error };
    });

    requestWeChat = flow(function* (stripe, region) {
        const { accessToken: jwt } = this.root.auth;
        const userID = this.root.user.oktaUserInfo.sub;
        const response = yield this.api.createStripePaymentIntent(
            jwt,
            this.depositAmtPlusWeChatFees,
            "wechat_pay",
            null,
            "managed",
            region,
            userID,
        );
        const data = yield response.json();

        const wechatResult = yield stripe.confirmWechatPayPayment(
            data.secret,
            {
              payment_method_options: {
                wechat_pay: {
                  client: 'web',
                },
              },
            },
            {handleActions: false}
          );
        
        return { link: wechatResult.paymentIntent.next_action.wechat_pay_display_qr_code.data}
    });

    fetchReferenceKey = flow(function* () {
        this.referenceKeyFetch = {
            data: "",
            status: pendingFetch(CrudOperation.READ_OP),
        };
        const { accessToken } = this.root.auth;
        const response = yield this.api.getReferenceKey(accessToken);

        if (!response.ok) {
            this.referenceKeyFetch = {
                data: "",
                status: erroredFetch(i18n.t("deposit:error_reference_key")),
            };
            return;
        }

        const data = yield response.json();
        this.referenceKeyFetch = {
            data: data.key,
            status: completedFetch(),
        };
    });

    // v2 - fetch saved ACH accounts + Credit Cards
    fetchSavedBankAccountsAndCreditCards = flow(function* (region) {
        const { accessToken: jwt } = this.root.auth;
        this.savedPaymentMethodsFetch = { data: undefined, status: pendingFetch(CrudOperation.READ_OP) };
        const userID = this.root.user.oktaUserInfo.sub;
        const response = yield this.api.getSavedPaymentMethodsAndSources(jwt, userID, region);

        if (!response.ok) {
            this.savedPaymentMethodsFetch = { data: undefined, status: erroredFetch() };
            return;
        }

        const data = yield response.json();
        this.savedPaymentMethodsFetch = { data, status: completedFetch() };
    });

    requestAndConfirmStripeSetupIntent = flow(function* (stripe, paymentMethod, region) {
        const { accessToken: jwt } = this.root.auth;
        const userID = this.root.user.oktaUserInfo.sub;

        const response = yield this.api.getStripeSetupIntentToken(jwt, userID, region);
        if (!response.ok) {
            return { error: { message: i18n.t("deposit:error_intent_token") } };
        }
        const { secret } = yield response.json();
        const { error } = yield stripe.confirmCardSetup(secret, {
            payment_method: paymentMethod.id,
        });
        return { error };
    });
    // v2 - create ACH Payment Source (legacy)

    requestPlaidLink = flow(function* () {
        const { accessToken: jwt } = this.root.auth;

        this.plaidLinkFetch = { status: pendingFetch() };
        const userID = this.root.user.oktaUserInfo.sub;

        const response = yield this.api.getPlaidLink(jwt, userID);
        const body = yield response.json();
        if (!response.ok) {
            this.plaidLinkFetch = { data: undefined, status: erroredFetch() };
            return;
        }
        this.plaidLinkFetch = { status: completedFetch(), data: { ...body } };
    });

    requestCreateV2ACHAccount = flow(function* (token, metadata) {
        const createErrorMsg = i18n.t("error_account_link");

        this.ACHAccountCreate = { status: pendingFetch() };

        const { accessToken: jwt } = this.root.auth;
        const userID = this.root.user.oktaUserInfo.sub;
        const response = yield this.api.createV2ACHAccount(jwt, userID, token, metadata);

        this.ACHAccountCreate = {
            status: response.ok ? completedFetch() : erroredFetch(createErrorMsg),
        };
        if (response.ok) {
            const body = yield response.json();
            this.setPaymentSource(BankSource.build(normalizePaymentSource({ id: body.accountID, bank: body })));
        }

        return response;
    });

    // v2 - (private) create transfer via our API, with option for subscriptions
    _requestCreateV2TransferWithInterval = flow(function* (region) {
        const { accessToken: jwt } = this.root.auth;
        const methodID = _.get(this.selectedPaymentSource, "data.id");
        const userID = this.root.user.oktaUserInfo.sub;
        const payload = {
            portfolioID: userID,
            destination: "managed",
            accountID: methodID,
            amount: this.depositAmtPlusFeesInCents,
            interval: this.selectedDepositFrequency,
            startDate: this.depositStartDate.toISOString(),
        };

        const response = yield this.api.createV2TransferWithInterval(jwt, userID, payload, region);
        return response;
    });

    // v2 - (private) create Stripe payment intent + confirm card payment
    _requestOneTimeStripeTransferWithPaymentIntent = flow(function* (stripe, region) {
        const { accessToken: jwt } = this.root.auth;
        const { depositAmtPlusFeesInCents } = this;
        const status = { ok: false };
        const userID = this.root.user.oktaUserInfo.sub;
        const source = this.selectedPaymentSource;

        const paymentIntentResponse = yield this.api.createStripePaymentIntent(
            jwt,
            depositAmtPlusFeesInCents,
            "card",
            source.data.id,
            "managed",
            region,
            userID,
        );
        if (!paymentIntentResponse.ok) {
            status.json = () => Promise.resolve({ message: i18n.t("deposit:error_verify_payment") });
            return status;
        }

        const paymentIntentToken = yield paymentIntentResponse.json();

        const cardPaymentResponse = yield stripe.confirmCardPayment(paymentIntentToken.secret, {
            payment_method: source.data.id,
        });

        if (cardPaymentResponse.error) {
            status.json = () => Promise.resolve(cardPaymentResponse.error);
            return status;
        }

        status.ok = true;
        return status;
    });
    // v2 - orchestrator method for initiating deposits
    requestCreateDeposit = flow(function* (stripe, region) {
        this.depositPost = { ...this.depositPost, status: pendingFetch() };

        const source = this.selectedPaymentSource;

        let response = {};

        if (source.isACH() || this.isSubscription) {
            response = yield this._requestCreateV2TransferWithInterval(region);
        } else {
            response = yield this._requestOneTimeStripeTransferWithPaymentIntent(stripe, region);
        }

        if (!response.ok) {
            const error = yield response.json();
            const contactCTA = error.code === "card_declined" ? i18n.t("deposit:error_card_declined") : "";
            this.depositPost = { ...this.depositPost, status: erroredFetch(`${error.message}${contactCTA}`) };
            return;
        }

        this.depositPost = { ...this.depositPost, status: completedFetch() };
    });

    trackDeposit(currencyCode) {
        const depositMeta = {
            id: uuidv4(),
            currency: currencyCode,
            method: this.selectedPaymentSource.type,
            value: this.depositAmt,
            frequency: this.selectedDepositFrequency,
        };
        this.root.tracking.gtm.trackDepositAdded(depositMeta);
        this.root.tracking.gtm.trackDepositAddedNew({ value: depositMeta.value });
        this.root.tracking.gtm.trackFundAccountPurchase(this.root, depositMeta.value, currencyCode);
    }

    _requestBitpayInvoice = flow(function* () {
        const { profileId } = this.root.user;
        const { accessToken: jwt } = this.root.auth;
        const { api, depositAmtPlusBitpayFees } = this;
        const { getBitpayInvoice } = api;

        const depositAmount = depositAmtPlusBitpayFees;

        const invoiceOptions = {
            userID: profileId,
            depositAmtInCents: depositAmount,
            jwt,
        };

        const bitpayInvoiceResponse = yield getBitpayInvoice(invoiceOptions);

        if (!bitpayInvoiceResponse?.ok) {
            const error = yield bitpayInvoiceResponse.json();
            this.depositPost = {
                ...this.depositPost,
                status: erroredFetch(error),
            };
            return;
        }
        const validBitpayResponse = yield bitpayInvoiceResponse.json();
        return validBitpayResponse;
    });

    createBitpayInvoiceDeposit = flow(function* () {
        this.depositPost = { ...this.depositPost, status: pendingFetch() };
        const response = yield this._requestBitpayInvoice();
        if (response) {
            this.setBitpayInvoice(response.invoiceID);
            this.depositPost = { ...this.depositPost, status: completedFetch() };
        }
    });
}
