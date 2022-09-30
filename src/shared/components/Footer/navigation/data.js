import i18n from "i18next";
import { ROUTE_PATHS, EXTERNAL_SERVICE_PATHS } from "#screens/route-paths";

export const data = (isLoggedIn) => [
    {
        title: i18n.t("footer:company.title"),
        navItems: [
            {
                title: i18n.t("footer:company.home"),
                path: isLoggedIn ? ROUTE_PATHS.vinovestHome : "/",
                isLink: true,
            },
            {
                title: i18n.t("footer:company.about"),
                path: ROUTE_PATHS.aboutUs,
                isLink: true,
            },

            {
                title: i18n.t("footer:company.vinovest-council"),
                path: ROUTE_PATHS.council,
                isLink: true,
            },
            {
                title: i18n.t("footer:company.careers"),
                path: ROUTE_PATHS.careers,
                isLink: true,
            },
            {
                title: i18n.t("footer:company.press"),
                path: ROUTE_PATHS.press,
                isLink: true,
            },
        ],
    },
    {
        title: i18n.t("footer:learn.title"),
        navItems: [
            {
                title: i18n.t("footer:learn.why-wine"),
                path: ROUTE_PATHS.whyWine,
                isLink: true,
            },

            {
                title: i18n.t("footer:learn.how-it-works"),
                path: ROUTE_PATHS.howItWorks,
                isLink: true,
            },
            {
                title: i18n.t("footer:learn.vinovest-100"),
                path: ROUTE_PATHS.vinovest100Index,
                isLink: true,
            },
            {
                title: i18n.t("footer:learn.pricing"),
                path: ROUTE_PATHS.pricing,
                isLink: true,
            },
        ],
    },
    {
        title: i18n.t("footer:services.title"),
        navItems: [
            {
                title: i18n.t("footer:services.guarantee"),
                path: ROUTE_PATHS.satisfaction,
                isLink: true,
            },

            {
                title: i18n.t("footer:services.sustainability"),
                path: ROUTE_PATHS.sustainability,
                isLink: true,
            },
            {
                title: i18n.t("footer:services.wine-futures"),
                path: ROUTE_PATHS.wineFutures,
                isLink: true,
            },
            {
                title: i18n.t("footer:services.for-advisors"),
                path: "https://www.vinovestcapitalmanagement.com",
                isLink: true,
                isAbsolute: true,
            },
            {
                title: i18n.t("footer:services.whiskeyvest"),
                path: "https://www.whiskeyvest.co/",
                isLink: false,
            },
        ],
    },
    {
        title: i18n.t("footer:resources.title"),
        navItems: [
            {
                title: i18n.t("footer:resources.blog"),
                path: ROUTE_PATHS.blog,
                isLink: true,
            },
            {
                title: i18n.t("common:wine"),
                path: EXTERNAL_SERVICE_PATHS.wine,
                isLink: true,
                onRoute: ROUTE_PATHS.vinovest100Index,
            },
            {
                title: i18n.t("footer:resources.help"),
                path: ROUTE_PATHS.help,
                isLink: true,
            },
            {
                title: i18n.t("footer:resources.contact-us"),
                path: ROUTE_PATHS.contactUs,
                isLink: true,
            },
            {
                title: i18n.t("footer:resources.privacy-policy"),
                path: ROUTE_PATHS.privacyPolicy,
                isLink: true,
            },
            {
                title: i18n.t("footer:resources.terms"),
                path: ROUTE_PATHS.terms,
                isLink: true,
            },
            {
                title: i18n.t("footer:resources.accessibility"),
                path: ROUTE_PATHS.accessibility,
                isLink: true,
            },
        ],
    },
];
