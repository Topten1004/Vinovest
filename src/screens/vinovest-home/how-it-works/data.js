import i18n from "i18next";
import investmentJpg from "../assets/investment.jpg";
import yourPositionJpg from "../assets/yourPosition.jpg";
import minutesJpg from "../assets/minutes.jpg";
import bonusStep from "../assets/bonusStep.jpg";
export const howItWorks = [
    {
        src: investmentJpg,
        title: i18n.t("vinovest-home:scrollOptions.shareGoals.title"),
        description: i18n.t("vinovest-home:scrollOptions.shareGoals.description"),
        background: "#c5d5e4",
        color: "#4f1c28",
    },
    {
        src: yourPositionJpg,
        gup: true,
        title: i18n.t("vinovest-home:scrollOptions.weBuildPortfolio.title"),
        description: i18n.t("vinovest-home:scrollOptions.weBuildPortfolio.description"),
        background: "#efddc7",
        color: "#242e35",
    },
    {
        src: minutesJpg,
        title: i18n.t("vinovest-home:scrollOptions.watchItGrow.title"),
        description: i18n.t("vinovest-home:scrollOptions.watchItGrow.description"),
        background: "#e6c9c9",
        color: "#3c400c",
    },
    {
        src: bonusStep,
        lastGap: true,
        title: i18n.t("vinovest-home:scrollOptions.bonusStep.title"),
        description: i18n.t("vinovest-home:scrollOptions.bonusStep.description"),
        background: "#E0E5CD",
        color: "#3C400C",
    },
];
