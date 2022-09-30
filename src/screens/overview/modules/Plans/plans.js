import balancedInvestingSvg from "#assets/risk-tolerance/balancedInvesting.svg";
import conservativeSvg from "#assets/risk-tolerance/conservative.svg";
import aggressiveSvg from "#assets/risk-tolerance/aggressive.svg";

export const planTypes = (t) => [
    {
        id: "conservative",
        svg: conservativeSvg,
        planName: t("plans.conservative_investing"),
        1: t("plans.conservative"),
    },
    {
        id: "moderate",
        svg: balancedInvestingSvg,
        planName: t("plans.balanced_investing"),
        1: t("plans.balanced"),
    },

    {
        id: "aggressive",
        svg: aggressiveSvg,
        planName: t("plans.aggressive_investing"),
        1: t("plans.aggressive"),
    },
];
