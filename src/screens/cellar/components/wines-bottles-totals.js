import React from "react";
import { useTranslation } from "react-i18next";

const WinesBottlesTotals = ({ lwin18, total, sizeByML, hideCount, bottles }) => {
    const { t } = useTranslation(["portfolio"]);
    const winesInCase = lwin18 && +lwin18.slice(11, 13);
    const cases = total && (total.bottleCount / winesInCase).toFixed(0);
    return (
        <>
            {winesInCase > 1 ? (
                <>
                    {!hideCount && cases} {t("wine-bottles-totals.case")}
                    {cases > 1 && "s"} {t("wine-bottles-totals.of")} {winesInCase}{" "}
                    {bottles && t("wine-bottles-totals.bottles")} ({sizeByML.toLowerCase()})
                </>
            ) : (
                <>
                    {!hideCount && total.bottleCount} {t("wine-bottles-totals.bottle")}
                    {total.bottleCount > 1 && "s"} ({sizeByML.toLowerCase()})
                </>
            )}
        </>
    );
};

export default WinesBottlesTotals;
