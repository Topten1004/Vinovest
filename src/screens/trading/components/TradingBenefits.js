import React from "react";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import { Quality } from "#shared/ui/QualityValueList";
import bottle from "../assets/bottle-info.svg";
import clock from "../assets/clock.svg";
import pricing from "../assets/pricing.svg";
import access from "../assets/access.svg";
import secure from "../assets/secure.svg";
import forYou from "../assets/for-you.svg";

const valueProps = [
    {
        header: i18n.t("trading:benefits.title1"),
        description: i18n.t("trading:benefits.description1"),
        svg: bottle,
    },
    {
        header: i18n.t("trading:benefits.title2"),
        description: i18n.t("trading:benefits.description2"),
        svg: clock,
    },
    {
        header: i18n.t("trading:benefits.title3"),
        description: i18n.t("trading:benefits.description3"),
        svg: pricing,
    },
    {
        header: i18n.t("trading:benefits.title4"),
        description: i18n.t("trading:benefits.description4"),
        svg: access,
    },
    {
        header: i18n.t("trading:benefits.title5"),
        description: i18n.t("trading:benefits.description5"),
        svg: secure,
    },
    {
        header: i18n.t("trading:benefits.title6"),
        description: i18n.t("trading:benefits.description6"),
        svg: forYou,
    },
];

const TradingBenefits = () => {
    return <Quality valueProps={valueProps} trading={1} />;
};

export default TradingBenefits;