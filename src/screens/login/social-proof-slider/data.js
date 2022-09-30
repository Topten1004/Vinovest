import i18n from "i18next";
import insider from "./assets/insider.svg";
import forbes from "./assets/forbes.svg";
import fortune from "./assets/fortune.svg";
import yahoo from "./assets/yahoo.svg";
import wsj from "./assets/wsj.svg";
import trustpilot from "./assets/trustpilot.svg";
import walletHacks from "./assets/wallet-hacks.png";
import moneyWoman from "./assets/money-woman.svg";
import googleplay from "./assets/googleplay.svg";
import appstore from "./assets/appstore.svg";
import young from "./assets/young.png";
import greenStars from "./assets/green-stars.svg";
import yellowStars from "./assets/yellow-stars.svg";
import yellowHalf from "./assets/yellow-stars-half.svg";


export const recomendedIcons = [
    { id: 0, src: insider, alt: "Business insider" },
    { id: 1, src: forbes, alt: "Forbes" },
    { id: 2, src: fortune, alt: "Fortune" },
    { id: 3, src: yahoo, alt: "yahoo" },
    { id: 4, src: wsj, alt: "WSJ" },
];

export const slidesData = [
    {
        id: 1,
        stars: greenStars,
        text: i18n.t("login:slider.slide1-text"),
        author: "Vincent Sinohui",
        image: trustpilot
    },
    {
        id: 2,
        stars: greenStars,
        text: [i18n.t("login:slider.slide2-text-first"), i18n.t("login:slider.slide2-text-second"), i18n.t("login:slider.slide2-text-third")],
        author: "Cindy Plachecki",
        image: trustpilot
    },
    {
        id: 3,
        stars: yellowHalf,
        text: i18n.t("login:slider.slide3-text"),
        author: null,
        image: walletHacks,
        width: 90
    },
    {
        id: 4,
        stars: yellowHalf,
        text: i18n.t("login:slider.slide4-text"),
        author: null,
        image: moneyWoman
    },
    {
        id: 5,
        stars: yellowStars,
        text: i18n.t("login:slider.slide5-text"),
        author: "Kevin Rodriguez",
        image: googleplay,
        width: 83
    },
    {
        id: 6,
        stars: yellowStars,
        text: i18n.t("login:slider.slide6-text"),
        author: "Becky",
        image: appstore
    },
    {
        id: 7,
        stars: yellowHalf,
        text: i18n.t("login:slider.slide7-text"),
        author: null,
        image: young,
        width: 48
    },
    {
        id: 8,
        stars: greenStars,
        text: i18n.t("login:slider.slide8-text"),
        author: "Enrique Martínez Guzmán",
        image: trustpilot
    }
]