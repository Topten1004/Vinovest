import i18n from "i18next";
import dustin from "#screens/about-us/images/members/20_Dustin.jpg";
import jane from "#screens/about-us/images/members/22_Jane.jpg";
import jenniferGrancio from "#screens/about-us/images/members/23_Jennifer.jpg";
import jonathan from "#screens/about-us/images/members/24_Jonathan.jpg";
import dlynn from "#screens/about-us/images/members/21_DLynn.jpg";
import yuan from "#screens/about-us/images/members/30_Yuan.png";

interface AvisoryCouncilSliderItem {
    banner: string;
    name: string;
    pos: string;
    path: string;
    id: string;
    img: any;
    desc: any;
}
export const sliderItems: AvisoryCouncilSliderItem[] = [
    {
        banner: i18n.t("about-us:bannerTitle"),
        name: i18n.t("about-us:people.dustin.name"),
        pos: i18n.t("about-us:people.dustin.positionInAdvisor"),
        path: "/dustin-wilson",
        id: "dustin-wilson",
        img: dustin,
        desc: i18n.t("about-us:people.dustin.description"),
    },
    {
        banner: i18n.t("about-us:bannerTitle"),
        name: i18n.t("about-us:people.jane.name"),
        pos: i18n.t("about-us:people.jane.positionInAdvisor"),
        path: "/jane-lopes",
        id: "jane-lopes",
        img: jane,
        desc: i18n.t("about-us:people.jane.description"),
    },
    {
        banner: i18n.t("about-us:bannerTitle"),
        name: i18n.t("about-us:people.jennifer.name"),
        pos: i18n.t("about-us:people.jennifer.positionInAdvisor"),
        path: "/jennifer-grancio",
        id: "jennifer-grancio",
        img: jenniferGrancio,
        desc: i18n.t("about-us:people.jennifer.description"),
    },
    {
        banner: i18n.t("about-us:bannerTitle"),
        name: i18n.t("about-us:people.jonathan.name"),
        pos: i18n.t("about-us:people.jonathan.positionInAdvisor"),
        path: "/jonathan-ross-ms",
        id: "jonathan-ross-ms",
        img: jonathan,
        desc: i18n.t("about-us:people.jonathan.description"),
    },

    {
        banner: i18n.t("about-us:bannerTitle"),
        name: i18n.t("about-us:people.dlynn.name"),
        path: "/dlynn-proctor",
        id: "dlynn-proctor",
        pos: i18n.t("about-us:people.dlynn.positionInAdvisor"),
        img: dlynn,
        desc: i18n.t("about-us:people.dlynn.description"),
    },
]
    .concat(
        /([a-z]{2}-)?(zh|hk|cn)/.test(i18n.language) && {
            banner: i18n.t("about-us:bannerTitle"),
            name: i18n.t("about-us:people.yuan.name"),
            path: "/yuan",
            id: "yuan",
            img: yuan,
            pos: i18n.t("about-us:people.yuan.position"),
            desc: i18n.t("about-us:people.yuan.description"),
        },
    )
    .filter(Boolean);