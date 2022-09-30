import moment from "moment";
import i18n, { i18n as Ti18n } from "i18next";
import { initReactI18next } from "react-i18next";
import { format as formatDate, isDate } from "date-fns";

import LanguageDetector from "./plugins/LanguageDetector";
import Logger from "./plugins/Logger";
import { resources, locales, localeMapping, routeMapping, namespaces } from "./constants";

interface Ii18n extends Ti18n {
    locale: string;
    route: string;
}

const i18next = i18n as Ii18n;

export const getCurrentLng = () => i18n.language || window.localStorage.i18nextLng || "";

i18next
    .use(LanguageDetector)
    .use(Logger)
    .use(initReactI18next)
    .init(
        {
            returnObjects: true,
            debug: true,
            fallbackLng: ["en"],
            saveMissing: true,
            parseMissingKeyHandler: (key) => `translation_key_not_found-${key}`,
            resources,
            ns: namespaces.default,
            react: {
                bindI18n: "loaded languageChanged",
                bindI18nStore: "added",
                useSuspense: true,
            },
            interpolation: {
                escapeValue: false, // not needed for react as it escapes by default
                format(value, format, lng) {
                    if (isDate(value)) {
                        const locale = locales[lng];
                        if (format === "short") {
                            return formatDate(value, "PP", { locale });
                        }
                        return formatDate(value, format, { locale });
                    }
                    if (format === "uppercase" && typeof value === "string") return value.toLocaleUpperCase();
                    if (value instanceof Date) return moment(value).format(format);
                    if (format === "capitalize" && typeof value === "string")
                        return value.toLocaleLowerCase().replace(/^[a-z]/, (m) => m.toLocaleUpperCase());
                    if (value && format === "lowercase" && typeof value === "string") return value.toLocaleLowerCase();
                    return value;
                },
            },
        },
        (err) => {
            if (process.env.NODE_ENV === "test" && err) throw new Error(err);
        },
    );

i18next.loadNamespaces(namespaces.async, (err) => {
    if (err) console.error(err);
});

i18next.on("languageChanged", (lng) => {
    moment.locale(lng);
    i18next.locale = localeMapping[lng] || "en";
    i18next.route = routeMapping[i18next.language] ? `/${routeMapping[i18next.language]}` : "";
});

i18next.locale = localeMapping[i18next.language] || "en";

i18next.route = routeMapping[i18next.language] ? `/${routeMapping[i18next.language]}` : "";

export default i18next;
