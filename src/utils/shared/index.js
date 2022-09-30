/* TODO: deprecate usage of this, and use toLocaleString() instead */
import format from "date-fns/format";
import parse from "date-fns/parseISO";
import i18next from "i18next";
import Cookies from "js-cookie";
import { locales } from "#localization/constants";
import { localizedPath } from "#localization/localizedRouter";
import i18n from "#localization/i18n";

const formatDistanceLocale = { xWeeks: "{{count}}W", xMonths: "{{count}}M", xYears: "{{count}}Y" };
export const shortEnLocale = {
    formatDistance: (token, count) => formatDistanceLocale[token].replace("{{count}}", count),
};

export const openLinkInNewTab = (url) => {
    const newTab = window.open(localizedPath(url), "_blank");

    newTab.focus();
};
export const numberWithCommas = (number, toFix) =>
    number
        .toFixed(toFix)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export const compareWines = (a, b) => {
    // Use toUpperCase() to ignore character casing
    const wineA = a.wine.toUpperCase();
    const wineB = b.wine.toUpperCase();

    let comparison = 0;
    if (wineA > wineB) {
        comparison = 1;
    } else if (wineA < wineB) {
        comparison = -1;
    }
    return comparison;
};

export const emailValidator = (param) => /^(\w+[\w+.-]*)@(\w+([.-\w]*)\.\w{2,})$/.test(param);

export const currencyFormatter = (x, options = { style: "currency", decimal: true }) => {
    const currencyCode = Cookies.get("localCurrency") ? Cookies.get("localCurrency") : "USD";
    const { decimal } = options;
    const currencyFractionDigits = decimal ?
        new Intl.NumberFormat(i18next.locale, {
            style: "currency",
            currency: currencyCode,
        }).resolvedOptions().maximumFractionDigits :
        0;
    return x.toLocaleString(currencyCode, {
        currency: currencyCode,
        style: "currency",
        maximumFractionDigits: currencyFractionDigits,
        minimumFractionDigits: currencyFractionDigits,
    });
};

export const delay = (ms) =>
    new Promise((resolve) => {
        const id = setTimeout(() => {
            clearTimeout(id);
            resolve();
        }, ms);
    });

export const formatValueWithDecimals = (v) => `${(Math.round(v * 10) / 10).toFixed(`${v}`.split(".").length - 1)}%`;

export function getMaxFixed(amount) {
    const splitNumber = `${amount}`.split(".");
    let fixed = 0;

    if (splitNumber[1]) {
        const splitDecimal = splitNumber[1].split("");

        for (; fixed < splitDecimal.length; fixed++) {
            if (+splitDecimal[fixed]) break;
        }
    }

    return amount.toFixed(fixed + 1);
}

export function formatDatePP(dateISO) {
    return format(parse(dateISO), "PP", { locale: locales[i18n.language] });
}

export const showWinesCountByLwin18 = ({ lwin18, bottleCount }) => {
    const winesInCase = lwin18 && +lwin18.slice(11, 13);

    const count = winesInCase ? (+bottleCount / +winesInCase).toFixed(0) : +bottleCount;
    // const type = winesInCase > 1 ? "Case" : "Bottle";
    if (bottleCount < winesInCase) {
        return i18next.t("common:utils.shared.bottle", { count: bottleCount });
    }

    return winesInCase > 1 ?
        i18next.t("common:utils.shared.case", { count }) :
        i18next.t("common:utils.shared.bottle", { count });
};

export const getCaseSizeFromLwin18 = (lwin18) => lwin18.slice(11, 13);

export const getWineYearFromLwin18 = (lwin18) => lwin18.slice(7, 11);

export const getLwin7 = (lwin) => lwin.slice(0, 7);

export const getBottleMLFromLwin18 = (lwin18) => lwin18.slice(-4);

export const validateCreditCardNameLength = (name) => /\w{2,26}/.test(name);

export const checkHasToken = () =>
    !!Object.entries(JSON.parse(window.localStorage.getItem("okta-token-storage") || "{}")).length;

export const isPrintPath = (location) => !!["/print"].filter((e) => location.pathname.includes(e)).length;
