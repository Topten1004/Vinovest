import i18n from "i18next";
import config from "../app.config";

const AccountService = {
    async useAccountInformationPut(userID, accessToken, values) {
        const response = await fetch(`${config.apiEndpoint}/v1/user/${userID}/information`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Accept-Language": "en, zh",
            },
            body: JSON.stringify(values),
        });
        if (response.ok) {
            return response.json();
        }
        throw new Error(i18n.t("account:error_generic"));
    },
    async useAccountPortfolioGet(userID, accessToken, currencyCode = "USD") {
        const response = await fetch(`${config.apiEndpoint}/v1/portfolio/${userID}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Accept-Language": "en, zh",
                "X-Currency": `${currencyCode}`,
            },
        });

        if (response.ok) {
            return response.json();
        }
    },
    async useWireTransferGet(userID, accessToken) {
        const response = await fetch(`${config.apiEndpoint}/v1/user/${userID}/wire`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (response.ok) {
            return response.json();
        }
    },
    async useAccountPortfolioPut(userID, accessToken, values) {
        const response = await fetch(`${config.apiEndpoint}/v1/portfolio/${userID}/settings`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Accept-Language": "en, zh",
            },
            body: JSON.stringify(values),
        });
        if (response.ok) {
            return response.json();
        }
        throw new Error(i18n.t("account:error_generic"));
    },
    async useAccountPasswordPut(userID, accessToken, values) {
        const response = await fetch(`${config.apiEndpoint}/v1/user/${userID}/password`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Accept-Language": "en, zh",
            },
            body: JSON.stringify(values),
        });
        if (!response.ok) {
            const data = await response.json();

            const error = data.message;
            return Promise.reject(error);
        }
    },
    async createUserProfile(userID, accessToken, values) {
        const response = await fetch(`${config.apiEndpoint}/v1/user/${userID}/profile`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Accept-Language": "en, zh",
            },
            body: JSON.stringify(values),
        });
        if (!response.ok) {
            const data = await response.json();
            const error = data.message;
            return Promise.reject(error);
        }
    },
};
export default AccountService;
