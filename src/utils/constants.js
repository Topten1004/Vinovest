import i18n from "i18next";
import Cookies from "js-cookie";
import { useLocation } from "react-router";
import { getCurrentLng } from "#localization/i18n";

export const AUTH_TYPE = {
    KEY: "authenticationType",
    SIGNUP: "SIGNUP",
    LOGIN: "LOGIN",
};

export const GOOGLE_AUTH_TYPE = {
    KEY: "googleAuthenticationType",
};

export const APPLE_AUTH_TYPE = {
    KEY: "appleAuthenticationType",
};

export const REDIRECT_URI = { KEY: "secureRouterReferrerPath" };

export const DEPOSIT_TYPE = {
    CreditCard: i18n.t("common:utils.constants.credit_card"),
    BankTransfer: i18n.t("common:utils.constants.bank_transfer"),
};

export const RiskToleranceOptions = {
    CONSERVATIVE: i18n.t("common:utils.constants.conservative"),
    MODERATE: i18n.t("common:utils.constants.moderate"),
    AGGRESSIVE: i18n.t("common:utils.constants.aggressive"),
};

const defaultCookieConfig = { domain: ".vinovest.co", path: "/" };
export const EmailCaptureCookie = {
    KEY: "emailcapture",
    CONFIG: { ...defaultCookieConfig },
};

export const ReferralInviteCookie = {
    KEY: "referralinvite",
    CONFIG: { ...defaultCookieConfig },
};

export const FeeTypes = {
    funds_added: i18n.t("common:utils.constants.funds_added"), // money gets added to a portfolio
    funds_withdrew: i18n.t("common:utils.constants.funds_withdrew"), // money gets take from a portfolio

    transfer_in: i18n.t("common:utils.constants.transfer_in"), // fees associated with transfering in money with credit card or ACH or whatever
    transfer_out: i18n.t("common:utils.constants.transfer_out"), // fees with giving back on credit card or ACH or whatever

    trade_settlement_sell: i18n.t("common:utils.constants.trade_settlement_sell"), // commission on trades
    trade_settlement_purchase: i18n.t("common:utils.constants.trade_settlement_purchase"), // commission on trades

    wine_purchase: i18n.t("common:utils.constants.wine_purchase"), //
    wine_sold: i18n.t("common:utils.constants.wine_sold"),

    vinovest_monthly_fee: i18n.t("common:utils.constants.vinovest_monthly_fee"),

    rebalance_add: i18n.t("common:utils.constants.rebalance_add"), // rebalance was due to pricing calculation fixes

    pending_deposit: i18n.t("common:utils.constants.pending_deposit"),
};

export const TransactionTypes = {
    sourcing_wine: "sourcing_wine",
    wine_purchase: "wine_purchase",
    funds_added: "funds_added",
    pending_deposit: "pending_deposit",
    vinovest_monthly_fee: "vinovest_monthly_fee",
    wine_sold: "wine_sold",
    funds_withdrew: "funds_withdrew",
    trade_settlement_purchase: "trade_settlement_purchase",
    transfer_in: "transfer_in",
    early_withdrawl_60_day: "early_withdrawl_60_day",
    rebalance_add: "rebalance_add",
    vinovest_monthly_fee_waived: "vinovest_monthly_fee_waived",
    wine_shipped: "wine_shipped",
    funds_failed: "funds_failed",
};
const userBrowserLanguage = getCurrentLng();

export const languageCodeChina = ["zh_CN", "zh_Hans_HK", "en_HK"].includes(userBrowserLanguage);
export const languageCodeMainlandChina = ["zh_CN"].includes(userBrowserLanguage);
export const languageCodeHK = ["zh_Hans_HK", "en_HK"].includes(userBrowserLanguage);

export const languageCodeEnglish = ["en", "en_US"].includes(userBrowserLanguage);
export const currencySymbol = languageCodeChina ? "¥" : "$";
export const currencyCode = Cookies.get("localCurrency") ? Cookies.get("localCurrency") : "USD";
