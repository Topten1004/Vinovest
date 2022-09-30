export const data = (t) => [
    { type: "title", text: t("should_sell"), key: 0 },
    {
        type: "text",
        text: t("wine_longterm_explain"),
        key: 1,
    },
    {
        type: "text",
        text: t("wine_market_returns"),
        key: 2,
    },
    {
        key: 3,
        isBar: true,
    },
    {
        type: "text",
        text: t("larger_gains"),
        key: 4,
    },
    { type: "title", text: t("ideal_selling"), key: 5, extraMargin: true },
    {
        type: "text",
        text: t("algorithm"),
        key: 6,
    },
    { type: "title", text: t("tax_implications"), key: 7, extraMargin: true },
    {
        type: "text",
        text: t("achieve_the_most"),
        key: 8,
    },
    {
        type: "text",
        text: t("not_advice"),
        key: 9,
    },
    { type: "title", text: t("processing_fee"), key: 10, extraMargin: true },
    {
        type: "text",
        text: t("processing_fee_info"),
        key: 11,
    },
];
