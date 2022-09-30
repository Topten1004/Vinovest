import i18n from "i18next";
import clientIcon1Svg from "../assets/clientIcon1.svg";
import clientIcon2Svg from "../assets/clientIcon2.svg";
import clientIcon3Svg from "../assets/clientIcon3.svg";

export const incomeSliderData = [ 
    [
        { id: 0, country: i18n.t("vinovest-home:income-slider.california"), amount: "$8,100.00", icon: clientIcon1Svg },
        { id: 1, country: i18n.t("vinovest-home:income-slider.kentucky"), amount: "$3,499.00", icon: clientIcon2Svg },
        { id: 2, country: i18n.t("vinovest-home:income-slider.southCarolina"), amount: "$1,000.00", icon: clientIcon1Svg },
    ],
    [
        { id: 3, country: i18n.t("vinovest-home:income-slider.texas"), amount: "$85,000.00", icon: clientIcon3Svg },
        { id: 4, country: i18n.t("vinovest-home:income-slider.unitedKingdom"), amount: "$9,896.0", icon: clientIcon3Svg },
        { id: 5, country: i18n.t("vinovest-home:income-slider.wyoming"), amount: "$50,001.00", icon: clientIcon2Svg },
    ],
    [
        { id: 6, country: i18n.t("vinovest-home:income-slider.ohio"), amount: "$20,000.00", icon: clientIcon1Svg },
        { id: 7, country: i18n.t("vinovest-home:income-slider.newJersey"), amount: "$5,995", icon: clientIcon2Svg },
        {
            id: 8,
            country: i18n.t("vinovest-home:income-slider.newJersey"),
            amount: "$20,000",
            icon: clientIcon3Svg,
        },
    ],
];
