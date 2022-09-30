import i18n from "i18next";
import articleInWine from "../assets/articleInWine.jpg";
import articleInStocks from "../assets/articleInStocks.jpg";
import articleIncomplete from "../assets/articleIncomplete.jpg";
import davidPng from "../assets/David.png";
import anthonyPng from "../assets/Anthony.png";
import haykPng from "../assets/Hayk.png";
import readerSvg from "../assets/reader.svg";
import phoneSvg from "../assets/phone.svg";

export const latestFromBlogData = [
    {
        to: "/investing-in-wine",
        id: 0,
        src: articleInWine,
        authorSrc: anthonyPng,
        title: i18n.t("vinovest-home:latest-from-blog.investingInWine.title"),
        description: i18n.t("vinovest-home:latest-from-blog.investingInWine.description"),
        author: "Anthony Zhang",
        topImg: phoneSvg,
    },
    {
        to: "/stock-investing-wine-investing",
        id: 1,
        src: articleInStocks,
        authorSrc: davidPng,
        title: i18n.t("vinovest-home:latest-from-blog.investingInStocks.title"),
        description: i18n.t("vinovest-home:latest-from-blog.investingInStocks.description"),
        author: "David Butler",
        topImg: null,
    },
    {
        to: "/why-your-investment-portfolio-is-incomplete-without-fine-wine",
        id: 2,
        authorSrc: haykPng,
        src: articleIncomplete,
        title: i18n.t("vinovest-home:latest-from-blog.portfolioIncomplete.title"),
        description: i18n.t("vinovest-home:latest-from-blog.portfolioIncomplete.description"),
        author: "Hayk Grygoryan",
        topImg: readerSvg,
    },
];
