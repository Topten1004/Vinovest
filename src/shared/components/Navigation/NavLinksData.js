import i18n from "i18next";
import config from "#app.config";
import { ROUTE_PATHS } from "../../../screens/route-paths";

export const isMatch = (match) => match;

export const NAVIGATION_LINKS_USER = [
    {
        to: ROUTE_PATHS.managedPortfolio,
        href: true,
        label: i18n.t("common:overview"),
        exact: true,
        isActive: isMatch,
    },
    {
        to: ROUTE_PATHS.cellar,
        label: i18n.t("common:portfolio"),
        exact: true,
        isActive: isMatch,
    },
    ...(config.feature.transactionsFeed.enabled ?
        [
            {
                to: ROUTE_PATHS.transactions,
                label: i18n.t("common:transactions"),
                exact: true,
                isActive: isMatch,
            },
        ] :
        []),
    {
        to: `${ROUTE_PATHS.documentsPage}/account_statements`,
        label: i18n.t("common:documents"),
        exact: true,
        isActive: (_, location) => location.pathname.includes("/documents"),
    },
    {
        to: ROUTE_PATHS.invite,
        label: i18n.t("common:invite"),
        exact: true,
        isActive: (_, location) => location.pathname === ROUTE_PATHS.invite,
    },
    {
        to: "/help",
        label: i18n.t("common:help"),
        exact: true,
        isActive: isMatch,
    },
];

export const NAVIGATION_LINKS_GUEST = [
    {
        to: ROUTE_PATHS.whyWine,
        label: i18n.t("common:why-wine"),
        exact: true,
        isActive: isMatch,
    },
    {
        to: ROUTE_PATHS.howItWorks,
        label: i18n.t("common:how-it-works"),
        exact: true,
        isActive: isMatch,
    },
    {
        to: ROUTE_PATHS.aboutUs,
        label: i18n.t("common:about"),
        exact: true,
        isActive: isMatch,
    },
    {
        to: ROUTE_PATHS.blog,
        label: i18n.t("common:blog"),
        exact: true,
        isActive: isMatch,
    },
    {
        to: ROUTE_PATHS.help,
        label: i18n.t("common:help"),
        exact: true,
        isActive: isMatch,
    },
    {
        to: ROUTE_PATHS.trading,
        label: i18n.t("common:trade"),
        exact: true,
    },
];
