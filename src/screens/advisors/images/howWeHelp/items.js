import i18n from "i18next";
import bottle from "./winePricing.svg";
import safe from "./smallWineSafe.svg";
import taxFree from "./taxFree.svg";
import moneyPipe from "./moneyPipe.svg";

export const items = [
    {
        img: bottle,
        title: i18n.t("advisors:howWeHelp.bottle.title"),
        desc: i18n.t("advisors:howWeHelp.bottle.desc"),
    },
    {
        img: safe,
        title: i18n.t("advisors:howWeHelp.safe.title"),
        desc: i18n.t("advisors:howWeHelp.safe.desc"),
    },
    {
        img: taxFree,
        title: i18n.t("advisors:howWeHelp.taxFree.title"),
        desc: i18n.t("advisors:howWeHelp.taxFree.desc"),
    },
    {
        img: moneyPipe,
        title: i18n.t("advisors:howWeHelp.moneyPipe.title"),
        desc: i18n.t("advisors:howWeHelp.moneyPipe.desc"),
    },
];
