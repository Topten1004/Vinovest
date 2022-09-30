import React from "react";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import { Quality } from "#shared/ui/QualityValueList";
import inflationResSvg from "../assets/inflationRes.svg";
import recessionResSvg from "../assets/recessionRes.svg";
import lowVolatilitySvg from "../assets/lowVolatility.svg";
import ownershipSvg from "../assets/ownership.svg";
import taxAdvantagesSvg from "../assets/taxAdvantages.svg";
import diversifiedSvg from "../assets/diversified.svg";


const valueProps = [
    {
        header: i18n.t("why-wine:why_wine.benefits.header_1"),
        description: i18n.t("why-wine:why_wine.benefits.description_1"),
        svg: inflationResSvg,
    },
    {
        header: i18n.t("why-wine:why_wine.benefits.header_2"),
        description: i18n.t("why-wine:why_wine.benefits.description_2"),
        svg: recessionResSvg,
    },
    {
        header: i18n.t("why-wine:why_wine.benefits.header_3"),
        description: i18n.t("why-wine:why_wine.benefits.description_3"),
        svg: lowVolatilitySvg,
    },
    {
        header: i18n.t("why-wine:why_wine.benefits.header_4"),
        description: i18n.t("why-wine:why_wine.benefits.description_4"),
        svg: ownershipSvg,
    },
    {
        header: i18n.t("why-wine:why_wine.benefits.header_5"),
        description: i18n.t("why-wine:why_wine.benefits.description_5"),
        svg: taxAdvantagesSvg,
    },
    {
        header: i18n.t("why-wine:why_wine.benefits.header_6"),
        description: i18n.t("why-wine:why_wine.benefits.description_6"),
        svg: diversifiedSvg,
    },
];

const QualityWrapper = () => {
    const { t } = useTranslation("why-wine");
    return (
        <Quality
            valueProps={valueProps}
            title={t("why_wine.benefits.title")}
            description={t("why_wine.benefits.description")}
        />
    );
};

export default QualityWrapper;
