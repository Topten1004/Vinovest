import { enUS, zhCN } from "date-fns/locale";
import translation from "../translations/index";

const locales = { en_US: enUS, en_HK: enUS, zh_CN: zhCN, zh_Hans_HK: zhCN };
const localeMapping = { en: "en", en_US: "en", en_HK: "en-hk", zh_CN: "zh-CN", zh_Hans_HK: "zh-HANS-HK" };
const routeMapping = { en: "", en_US: "", en_GB: "en-gb", en_HK: "en-hk", zh_CN: "zh", zh_Hans_HK: "zh-hk" };
const currency = { en: "USD", en_US: "USD", en_HK: "HKD", zh_CN: "HKD", zh_Hans_HK: "HKD", GBP: "GBP", CAD: "CAD" };

const acceptedCurrencies = {
    USD: "$ US Dollars (USD)",
    HKD: "HK$ Hong Kong Dollars (HKD)",
    GBP: "£ Great British Pounds (GBP)",
    CAD: "C$ Canadian Dollars (CAD)",
};

const currencyValueLabel = Object.entries(acceptedCurrencies).reduce((acc, [value, label]) => {
    acc.push({ value, label });
    return acc;
}, []);

const routeToLocale = Object.entries(routeMapping).reduce((acc, [locale, route]) => {
    acc[route] = locale;
    return acc;
}, {});

const languages = Object.keys(translation);

const localeStorageKey = "i18nLng";

const defaultNameSpaces = {
    common: null,
    404: null,
    overview: null,
    account: null,
    login: null,
    accessibility: null,
};
const namespaces = {
    default: Object.keys(defaultNameSpaces),
    async: Object.keys(translation.en).filter((namespace) => !defaultNameSpaces[namespace]),
};

const depositTiers = {
    minimum: 1000,
    tier1: 2000,
    tier2: 10000,
    premium: 50000,
    grandcru: 250000,
};

const chDepositTiers = {
    minimum: 6500,
    tier1: 13000,
    tier2: 65000,
    premium: 325000,
    grandcru: 1625000,
};

export {
    translation as resources,
    currencyValueLabel,
    acceptedCurrencies,
    locales,
    localeMapping,
    routeToLocale,
    routeMapping,
    languages,
    localeStorageKey,
    namespaces,
    currency,
    depositTiers,
    chDepositTiers,
};
