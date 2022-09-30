import i18n from "i18next";
import umbrella from "./umbrella.svg";
import face from "./face.svg";
import moneyBag from "./moneyBag.svg";
import doneImg from "./5e97927065f7a9f6014dfcbb_green-checkmark.png";

export const list = [
    {
        img: umbrella,
        title: i18n.t("advisors:vino-offers.umbrella"),
        done: doneImg,
    },
    {
        img: face,
        title: i18n.t("advisors:vino-offers.face"),
        done: doneImg,
    },
    {
        img: moneyBag,
        title: i18n.t("advisors:vino-offers.moneyBag"),
        done: doneImg,
    },
];
