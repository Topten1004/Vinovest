import * as Sentry from "@sentry/react";
import algoliasearch from "algoliasearch";
import { createClient } from "contentful";
import { getLwin7, getWineYearFromLwin18 } from "#utils/shared";
import { useConfig } from "#shared/hooks";

export class TransportManager {
    static build(config) {
        return new TransportManager(config);
    }
    constructor(config) {
        this.config = config;

        const clientSettings = {
            space: config.contentfulSpace,
            accessToken: config.contentfulAccessToken,
        };

        const { algoliaSearchIndex } = config;

        if (config.env !== "production") {
            clientSettings.host = "preview.contentful.com";
            clientSettings.accessToken = "6_FkLcOgH0Zo8_q8K00d9bY6KTd7f0XMDxXl-pfvmfM";
        }

        this.contentfulClient = createClient(clientSettings);
        this.algoliaSearchClient = algoliasearch(config.algoliaSearchId, config.algoliaSearchKey);
        this.algoliaSearchSupportIndex = this.algoliaSearchClient.initIndex(algoliaSearchIndex);
    }

    getLwin7Descriptions = async (lwinKey) => {
        let queryParams = "";
        if (Array.isArray(lwinKey)) {
            const lwin7List = Array.from(new Set(lwinKey.map((key) => key.slice(0, 7))));
            queryParams = lwin7List.map((lwin7) => `lwin7=${lwin7}`).join("&");
        } else {
            queryParams = `lwin7=${lwinKey.slice(0, 7)}`;
        }

        let data;
        const response = await fetch(`${this.config.strapiURL}/lwin-7-s?${queryParams}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                token: this.config.strapiAccessToken,
            },
        });
        const wineDescriptions = {};

        try {
            data = await response.json();
            data.forEach((description) => {
                wineDescriptions[`${description.lwin7}`] = description;
            });
        } catch (error) {
            data = undefined;
        }

        return {
            ok: response.ok,
            data: wineDescriptions,
        };
    };

    getWineVintages = async (lwin11Key) => {
        const queryParams = lwin11Key.map((lwin11) => `lwin11=${lwin11}`).join("&");

        let data;
        const response = await fetch(`${this.config.strapiURL}/vintages?${queryParams}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                token: this.config.strapiAccessToken,
            },
        });
        let wineVintages = {};
        try {
            data = await response.json();
            wineVintages = lwin11Key.reduce(
                (previousVal, currentLwin11Id) => ({
                    ...previousVal,
                    [currentLwin11Id]: data.find((vintage) => vintage.lwin11 === currentLwin11Id),
                }),
                {},
            );
        } catch (error) {
            data = undefined;
        }
        return {
            ok: response.ok,
            data: wineVintages,
        };
    };

    buildWineProfile = async (lwin11Keys) => {
        let data;

        const descriptionsPromise = this.getLwin7Descriptions(lwin11Keys);
        const wineVintagesPromise = this.getWineVintages(lwin11Keys);

        try {
            const [wineVintages, descriptions] = await Promise.all([wineVintagesPromise, descriptionsPromise]);
            const allKeys = lwin11Keys.reduce(
                (previousVal, key) => ({
                    ...previousVal,
                    [key]: {
                        ...descriptions?.data[key.slice(0, 7)],
                        ...wineVintages?.data[key],
                        critics: wineVintages?.data[key]?.critics,
                    },
                }),
                {},
            );
            data = { ok: true, data: allKeys };
        } catch (err) {
            data = { ok: false };
        }
        return data;
    };

    getPortfolioTotals = async (jwt, portfolioID, range = "1w", currencyCode) => {
        let data;
        const response = await fetch(`${this.config.apiEndpoint}/v1/portfolio/${portfolioID}?range=${range}`, {
            method: "GET",
            headers: new Headers({
                Authorization: `Bearer ${jwt}`,
                "Accept-Language": "en, zh",
                "X-Currency": `${currencyCode}`,
            }),
        });

        try {
            data = await response.json();
        } catch (error) {
            data = undefined;
        }

        return {
            ok: response.ok,
            data,
        };
    };

    getPortfolioFeatured = async (jwt, portfolioID, currencyCode) => {
        let data;
        const response = await fetch(`${this.config.apiEndpoint}/v1/portfolio/${portfolioID}/featured`, {
            method: "GET",
            headers: new Headers({
                Authorization: `Bearer ${jwt}`,
                "Accept-Language": "en, zh",
                "X-Currency": `${currencyCode}`,
            }),
        });

        try {
            data = await response.json();
        } catch (error) {
            data = undefined;
        }

        return {
            ok: response.ok,
            data,
        };
    };

    getPortfolioWines = async (jwt, portfolioID, params, currencyCode) => {
        let data;
        const urlParams = params ? new URLSearchParams(params) : null;
        const response = await fetch(
            `${this.config.apiEndpoint}/v1/portfolio/${portfolioID}/wines${
                urlParams ? `?${urlParams.toString()}` : ""
            }`,
            {
                method: "GET",
                headers: new Headers({
                    Authorization: `Bearer ${jwt}`,
                    "Accept-Language": "en, zh",
                    "X-Currency": `${currencyCode}`,
                }),
            },
        );

        try {
            data = await response.json();
        } catch (error) {
            data = undefined;
        }

        return {
            ok: response.ok,
            data,
        };
    };

    getWinesInLiquidationProcess = async (jwt, portfolioID) => {
        let data;
        const response = await fetch(`${this.config.apiEndpoint}/v1/portfolio/${portfolioID}/liquidate/wines`, {
            method: "GET",
            headers: new Headers({ Authorization: `Bearer ${jwt}`, "Accept-Language": "en, zh" }),
        });

        try {
            data = await response.json();
        } catch (error) {
            data = undefined;
        }

        return {
            ok: response.ok,
            data,
        };
    };

    postWinesToLiquidate = async (jwt, portfolioID, wines = []) => {
        let data;
        const response = await fetch(`${this.config.apiEndpoint}/v1/portfolio/${portfolioID}/liquidate/wines`, {
            method: "POST",
            headers: new Headers({ Authorization: `Bearer ${jwt}`, "Accept-Language": "en, zh" }),
            body: JSON.stringify({ wines }),
        });

        try {
            data = await response.json();
        } catch (error) {
            data = undefined;
        }

        return {
            ok: response.ok,
            data,
        };
    };

    putConfirmWinesLiquidation = async (jwt, portfolioID) => {
        let data;
        const response = await fetch(`${this.config.apiEndpoint}/v1/portfolio/${portfolioID}/liquidate/wines/confirm`, {
            method: "PUT",
            headers: new Headers({ Authorization: `Bearer ${jwt}`, "Accept-Language": "en, zh" }),
        });

        try {
            data = await response.json();
        } catch (error) {
            data = undefined;
        }

        return {
            ok: response.ok,
            data,
        };
    };

    putConfirmWinesLiquidationResendEmail = async (jwt, portfolioID) => {
        let data;
        const response = await fetch(`${this.config.apiEndpoint}/v1/portfolio/${portfolioID}/liquidate/wines/resend`, {
            method: "PUT",
            headers: new Headers({ Authorization: `Bearer ${jwt}`, "Accept-Language": "en, zh" }),
        });

        try {
            data = await response.json();
        } catch (error) {
            data = undefined;
        }

        return {
            ok: response.ok,
            data,
        };
    };

    getPortfolioWineToCollection = async (jwt, portfolioID, lwin18, range = "6m", currencyCode) => {
        let data;

        const response = await fetch(
            `${this.config.apiEndpoint}/v1/portfolio/${portfolioID}/wines/${lwin18}?range=${range}`,
            {
                method: "GET",
                headers: new Headers({
                    Authorization: `Bearer ${jwt}`,
                    "Accept-Language": "en, zh",
                    "X-Currency": `${currencyCode}`,
                }),
            },
        );

        try {
            data = await response.json();
            data.range = range;
        } catch (error) {
            data = undefined;
        }

        return {
            ok: response.ok,
            data,
        };
    };

    getWineProducers = async (lwin7Key) => {
        let data;

        const response = await fetch(`${this.config.strapiURL}/producers?lwin7s.id=${lwin7Key}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                token: this.config.strapiAccessToken,
            },
        });
        try {
            data = await response.json();
        } catch (error) {
            data = undefined;
        }
        return {
            ok: response.ok,
            data,
        };
    };

    fetchVineyardBackground = async (lwin11Key) => {
        const lwin7 = lwin11Key.slice(0, 7);
        let data;

        try {
            const wineDescriptions = await this.getLwin7Descriptions(lwin11Key);
            const wineProducers = await this.getWineProducers(wineDescriptions?.data[`${lwin7}`]?.id);

            data = wineProducers?.data[0];
        } catch (error) {}

        return data;
    };

    getShouldShowAccountSubscription = async (jwt, userID, portfolioID) => {
        let data;
        const response = await fetch(`${this.config.apiEndpoint}/v1/payment/${userID}/portfolio/${portfolioID}/subscription`, {
            method: "GET",
            headers: new Headers({ Authorization: `Bearer ${jwt}`, "Accept-Language": "en, zh" }),
        });

        try {
            data = await response.json();
        } catch (error) {
            data = undefined;
        }

        return {
            ok: response.ok,
            data,
        };
    };

    /**
     * Bridge endpoint to fetch all saved payment options
     * Combines PaymentSources (legacy) and PaymentMethods (new) API response
     */
    getSavedPaymentMethodsAndSources = (jwt, userID, region) =>
        fetch(`${this.config.apiEndpoint}/v1/payment/${userID}`, {
            method: "GET",
            headers: new Headers({
                Authorization: `Bearer ${jwt}`,
                "Accept-Language": "en, zh",
                "X-Region": `${region}`,
            }),
        });

    getPendingTransfers = async (jwt, userID, currencyCode) => {
        const response = await fetch(`${this.config.apiEndpoint}/v1/transfers/${userID}/pending`, {
            method: "GET",
            headers: new Headers({
                Authorization: `Bearer ${jwt}`,
                "Accept-Language": "en, zh",
                "X-Currency": `${currencyCode}`,
            }),
        });
        return {
            ok: response.ok,
            data: await response.json(),
        };
    };

    getBidsActive = async (jwt, portfolioID) => {
        try {
            const response = await fetch(`${this.config.apiEndpoint}/v1/portfolio/${portfolioID}/bids/active`, {
                method: "GET",
                headers: new Headers({
                    Authorization: `Bearer ${jwt}`,
                    "Accept-Language": "en, zh",
                }),
            });

            const data = await response.json();

            const lwin7Acc = await this.getLwin7Descriptions(data.bids.map(({ lwin18 }) => lwin18));

            return {
                ok: response.ok,
                data: data.bids.map((bid) => ({ ...bid, description: lwin7Acc[bid.lwin18.slice(0, 7)] || "" })),
            };
        } catch (err) {
            return {
                ok: false,
            };
        }
    };

    getDeposits = async (jwt, portfolioID, currencyCode = "USD", requestParams) => {
        const params = Object.entries(requestParams || {}).map(([key, value]) => `${key}=${value}`);

        let data;
        const response = await fetch(
            `${this.config.apiEndpoint}/v2/portfolio/${portfolioID}/fees${params.length ? `?${params.join("&")}` : ""}`,
            {
                method: "GET",
                headers: new Headers({
                    Authorization: `Bearer ${jwt}`,
                    "Accept-Language": "en, zh",
                    "X-Currency": `${currencyCode}`,
                }),
            },
        );

        try {
            data = await response.json();

            const lwin7Acc = await this.getLwin7Descriptions(
                data.fees.filter(({ meta }) => meta && meta.lwin18).map(({ meta }) => meta.lwin18),
            );


            if (Object.entries(lwin7Acc).length) {
                data = {
                    ...data,
                    fees: data.fees.map((feeData) =>
                        feeData.meta && feeData.meta.lwin18
                            ? {
                                  ...feeData,
                                  meta: {
                                      ...feeData.meta,
                                      name: lwin7Acc?.data[getLwin7(feeData.meta.lwin18)]?.displayName,
                                      vintage: getWineYearFromLwin18(feeData.meta.lwin18),
                                  },
                              }
                            : feeData,
                    ),
                };
            }
        } catch (error) {
            data = null;
        }

        return {
            ok: response.ok,
            data,
        };
    };

    getUserProfile = async (userId, jwt) => {
        const response = await fetch(`${this.config.apiEndpoint}/v1/user/${userId}/profile`, {
            method: "GET",
            headers: new Headers({
                Authorization: `Bearer ${jwt}`,
                "Accept-Language": "en, zh",
            }),
        });
        return {
            ok: response.ok,
            data: await response.json(),
        };
    };

    getUserInformation = async (userId, jwt) => {
        const response = await fetch(`${this.config.apiEndpoint}/v1/user/${userId}/information`, {
            method: "GET",
            headers: new Headers({
                Authorization: `Bearer ${jwt}`,
                "Accept-Language": "en, zh",
            }),
        });
        return {
            ok: response.ok,
            data: await response.json(),
        };
    };

    getReferenceKey = (jwt) =>
        fetch(`${this.config.apiEndpoint}/v1/user/key`, {
            method: "GET",
            headers: new Headers({
                Authorization: `Bearer ${jwt}`,
                "Accept-Language": "en, zh",
            }),
        });
    getPlaidLink = async (jwt, userID) => {
        const response = await fetch(`${this.config.apiEndpoint}/v1/payment/${userID}/plaid/link`, {
            method: "GET",
            headers: new Headers({ Authorization: `Bearer ${jwt}` }),
        });
        return response;
    };

    createV2ACHAccount = async (jwt, userID, token, metadata) => {
        const response = await fetch(`${this.config.apiEndpoint}/v1/payment/${userID}/stripe/ach`, {
            method: "POST",
            headers: new Headers({ Authorization: `Bearer ${jwt}`, "Accept-Language": "en, zh" }),
            body: JSON.stringify({
                publicToken: token,
                accountID: metadata.account_id,
            }),
        });
        return response;
    };

    /**
     * Makes request to initiate v2 ACH deposit (option for recurring)
     * @param {string} jwt
     * @param {string} methodId - ID for payment method / source
     * @param {Object} payload - deposit request payload
     * @property {number} amount - deposit amount, in cents
     * @property {string} interval - [once, day, week, month, year]
     * @property {date} startDate - ??
     * @returns {Promise} fetch() response
     */
    createV2TransferWithInterval = async (jwt, userID, payload, region) => {
        const url = `${this.config.apiEndpoint}/v1/payment/${userID}/charge`;
        const response = await fetch(url, {
            method: "POST",
            headers: new Headers({
                Authorization: `Bearer ${jwt}`,
                "Accept-Language": "en, zh",
                "X-Region": `${region}`,
            }),
            body: JSON.stringify(payload),
        });

        return response;
    };
    
    getStripeSetupIntentToken = (jwt, userID, region) => {
        const url = `${this.config.apiEndpoint}/v1/payment/${userID}/intent/card`;
        const options = {
            method: "POST",
            headers: new Headers({
                Authorization: `Bearer ${jwt}`,
                "Accept-Language": "en, zh",
                "X-Region": `${region}`,
            }),
        };
        return fetch(url, options);
    };

    getBitpayInvoice = ({ userID, depositAmtInCents, jwt }) => {
        /// Need to figure out for local dev
        const redirectUrl = "https://vinovest.co"; // `${window.location.origin}`;
        const payload = {
            amount: { amount: depositAmtInCents, currency: "USD" },
            redirect: redirectUrl,
            portfolioID: userID,
            destination: "managed",
        };
        return fetch(`${this.config.apiEndpoint}/v1/payment/${userID}/bitpay/invoice`, {
            method: "POST",
            headers: new Headers({
                Authorization: `Bearer ${jwt}`,
                "Accept-Language": "en, zh",
            }),
            body: JSON.stringify(payload),
        });
    };

    createStripePaymentIntent = async (jwt, depositAmt, paymentMethodType, paymentMethodID, destination, region, userID) => {
        const response = await fetch(`${this.config.apiEndpoint}/v1/payment/${userID}/intent`, {
            method: "POST",
            headers: new Headers({
                Authorization: `Bearer ${jwt}`,
                "Accept-Language": "en, zh",
                "X-Region": `${region}`,
            }),
            body: JSON.stringify({ amount: depositAmt, paymentMethodType, paymentMethodID, destination, portfolioID: userID  }),
        });
        return response;
    };

    updateUserProfile = (userId, accessToken, body) =>
        fetch(`${this.config.apiEndpoint}/v1/user/${userId}/profile`, {
            method: "PUT",
            headers: new Headers({
                Authorization: `Bearer ${accessToken}`,
                "Accept-Language": "en, zh",
            }),
            body: JSON.stringify(body),
        });

    createOktaAccount = async (registerUserPayload) => {
        const { firstName, lastName, email, password, primaryPhone } = registerUserPayload;
        const response = await fetch(`${this.config.apiEndpoint}/v1/user`, {
            method: "POST",
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                password,
                login: email,
                primaryPhone,
            }),
        });

        /** fetch's res.json() will throw, since 204s don't have bodies */
        if (response.status === 204) {
            return { code: response.status };
        }

        const data = await response.json();
        return data;
    };
    createImpactSignup = async (eventDate, orderID, clickID, customerID, emailHash, jwt) => {
        const response = await fetch(`${this.config.apiEndpoint}/v1/user/impact/signup`,
            {
                method: "POST",
                headers: new Headers({
                    Authorization: `Bearer ${jwt}`,
                    "Accept-Language": "en, zh",
                }),
                body: JSON.stringify({
                    eventDate,
                    orderID,
                    clickID,
                    customerID,
                    emailHash,
                }),
            },
        );
        return response;
    };

    exchangeCodeToToken = async (authCode) => {
        const response = await fetch(`${this.config.issuer}/v1/token`, {
            method: "POST",
            headers: new Headers({
                accept: "application/json",
                "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "Accept-Language": "en, zh",
            }),
            body: new URLSearchParams({
                grant_type: "authorization_code",
                client_id: this.config.clientId,
                redirect_uri: this.config.redirectUri,
                code: authCode,
                code_verifier: "M25iVXpKU3puUjFaYWg3T1NDTDQtcW1ROUY5YXlwalNoc0hhakxifmZHag",
            }),
        });

        const data = await response.json();
        return data;
    };

    /**
     *
     * @param {string} jwt: Okta access token
     * @param {string} returnUrl: Return page path after closing portal
     * @returns {Promise} fetch Response
     */
    getPaymentSelfServicePortalURI = async (jwt, returnUrl = window.location.href) => {
        const response = await fetch(`${this.config.apiEndpoint}/v1/portal`, {
            method: "POST",
            headers: new Headers({ Authorization: `Bearer ${jwt}`, "Accept-Language": "en, zh" }),
            body: JSON.stringify({ returnUrl }),
        });
        return response;
    };

    /**
     *
     * @param {string} jwt: Okta access token
     * @param {string} userId: Okta userId
     * @param {string} referrerId: Referral Invite Id
     * @returns {Promise} fetch Response
     */
    linkReferralInviteCode = (jwt, userId, referrerId) =>
        fetch(`${this.config.apiEndpoint}/v1/user/${userId}/referral`, {
            method: "PUT",
            headers: new Headers({
                Authorization: `Bearer ${jwt}`,
                "Accept-Language": "en, zh",
            }),
            body: JSON.stringify({ referrerId }),
        });

    /**
     *
     * @param {string} jwt: Okta access token
     * @param {string} userId: Okta userId
     * @returns {Promise} fetch Response
     */
    getUserReferralProfileStatus = (jwt, userId) =>
        fetch(`${this.config.apiEndpoint}/v1/user/${userId}/referral/status`, {
            method: "GET",
            headers: new Headers({
                Authorization: `Bearer ${jwt}`,
                "Accept-Language": "en, zh",
            }),
        });

    getAccountStatements = async (jwt, portfolioID, requestParams) => {
        const params = Object.entries(requestParams || {}).map(([key, value]) => `${key}=${value}`);

        let data;
        const response = await fetch(
            `${this.config.apiEndpoint}/v2/documents/${portfolioID}/monthly${
                params.length ? `?${params.join("&")}` : ""
            }`,
            {
                method: "GET",
                headers: new Headers({
                    Authorization: `Bearer ${jwt}`,
                    "Accept-Language": "en, zh",
                }),
            },
        );

        try {
            data = await response.json();
        } catch (error) {
            data = undefined;
        }

        return {
            ok: response.ok,
            data,
        };
    };

    getWineCertificates = async (jwt, requestParams, portfolioID) => {
        const params = Object.entries(requestParams || {}).map(([key, value]) => `${key}=${value}`);

        let data;
        const response = await fetch(
            `${this.config.apiEndpoint}/v2/documents/${portfolioID}/certificates${
                params.length ? `?${params.join("&")}` : ""
            }`,
            {
                method: "GET",
                headers: new Headers({
                    Authorization: `Bearer ${jwt}`,
                }),
            },
        );

        try {
            data = await response.json();
        } catch (error) {
            data = undefined;
            Sentry.captureException(new Error("Could not fetch wine certificates"), {
                extra: response.status,
            });
        }

        return {
            data,
        };
    };

    getCellarFeesCsv = async (jwt, userID) => {
        let data;
        const response = await fetch(`${this.config.apiEndpoint}/v1/portfolio/${userID}/wines/csv`, {
            method: "GET",
            headers: new Headers({
                Authorization: `Bearer ${jwt}`,
            }),
        });

        try {
            data = await response.text();
        } catch (error) {
            data = undefined;
            Sentry.captureException(new Error("Could not fetch portfolio csv certificate"), {
                extra: response.status,
            });
        }

        return {
            data,
        };
    };

    getAccountStatementsMonths = async (jwt, portfolioID) => {
        let data;
        const response = await fetch(`${this.config.apiEndpoint}/v2/documents/monthly/${portfolioID}/filters`, {
            method: "GET",
            headers: new Headers({
                Authorization: `Bearer ${jwt}`,
                "Accept-Language": "en, zh",
            }),
        });

        try {
            data = await response.json();
        } catch (error) {
            data = undefined;
        }

        return {
            ok: response.ok,
            data,
        };
    };

    getDocumentItem = async (jwt, portfolioID, id) => {
        let data;
        const response = await fetch(`${this.config.apiEndpoint}/v2/documents/${portfolioID}/${id}`, {
            method: "GET",
            headers: new Headers({
                Authorization: `Bearer ${jwt}`,
                "Accept-Language": "en, zh",
            }),
        });

        try {
            data = await response.json();
        } catch (error) {
            data = undefined;
        }

        return {
            ok: response.ok,
            data,
        };
    };

    getBlogCategoriesFromContentful = async () => {
        let data;

        try {
            data = await this.contentfulClient.getEntries({
                content_type: "blogGroup",
                include: 0, // add include to avoid max size error
            });

            return {
                data: data.items.map(({ fields }) => fields),
                ok: true,
            };
        } catch (err) {
            return { ok: false };
        }
    };

    getBlogsListFromContentful = async ({ skip, limit, category, filterIds }) => {
        let data;

        const params = {
            content_type: "blogPage",
            skip,
            limit,
            select: "fields.blogAuthor,fields.heroImage,fields.slug,fields.postTitle,fields.postDate",
            order: "-fields.postDate",
        };

        if (category) {
            params["metadata.tags.sys.id[in]"] = category;
        }

        if (filterIds) {
            params["sys.id[in]"] = filterIds;
        }

        try {
            data = await this.contentfulClient.getEntries(params);
            const { items, ...restData } = data;

            return {
                data: { items: items.map(({ fields, sys: { id } }) => ({ ...fields, id })), ...restData },
                ok: true,
            };
        } catch (err) {
            return { ok: false };
        }
    };

    getArticleFromContentful = async (slug) => {
        let data;

        try {
            data = await this.contentfulClient.getEntries({
                content_type: "blogPage",
                "fields.slug": slug,
            });

            if (!data.items.length) {
                return { ok: false, error: "PAGE_NOT_FOUND" };
            }

            return {
                data: { ...data.items[0].fields, id: data.items[0].sys.id },
                ok: true,
            };
        } catch (err) {
            return { ok: false, error: err };
        }
    };

    getSupportCategoriesFromContentful = async () => {
        let data;

        try {
            data = await this.contentfulClient.getEntries({
                content_type: "supportCategory",
            });

            return {
                data: data.items.map(({ fields }) => fields),
                ok: true,
            };
        } catch (err) {
            return { ok: false };
        }
    };

    getNewsListFromContentful = async () => {
        let data;

        try {
            data = await this.contentfulClient.getEntries({
                content_type: "press",
                order: "-fields.date",
            });

            return {
                data,
                ok: true,
            };
        } catch (err) {
            return { ok: false };
        }
    };

    searchFAQArticles = async (query) => {
        let data;

        try {
            data = await this.algoliaSearchSupportIndex.search(query);
            return {
                data,
                ok: true,
            };
        } catch (err) {
            return { ok: false };
        }
    };

    sendInviteEmails = async (jwt, userID, emails=[]) => {
        let data;
        const response = await fetch(`${this.config.apiEndpoint}/v1/user/${userID}/champagne`, {
            method: "POST",
            headers: new Headers({ Authorization: `Bearer ${jwt}`, "Accept-Language": "en, zh" }),
            body: JSON.stringify({ emails }),
        });

        try {
            data = await response.json();
        } catch (error) {
            data = undefined;
        }

        return {
            ok: response.ok,
            data,
        };

    }
}
