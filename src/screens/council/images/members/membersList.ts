import i18n from "i18next";
import dustin from "#screens/about-us/images/members/20_Dustin.jpg";
import jane from "#screens/about-us/images/members/22_Jane.jpg";
import jennGran from "#screens/about-us/images/members/23_Jennifer.jpg";
import jonathan from "#screens/about-us/images/members/24_Jonathan.jpg";
import dlynn from "#screens/about-us/images/members/21_DLynn.jpg";
import yuan from "#screens/about-us/images/members/30_Yuan.png";
import {v4 as uuid} from "uuid";

interface Member {
    path: string;
    photo: any;
    title?: string;
    alt?: string;
    id: string;
    name: string;
    position: string;
}


export const membersList: (Member)[] = [
    {
        path: "/dustin-wilson",
        photo: dustin,
        name: i18n.t("advisory-council:advisors.dustin-wilson.name"),
        position: i18n.t("advisory-council:advisors.dustin-wilson.position"),
    },
    {        
        path: "/jane-lopes",
        photo: jane,
        name: i18n.t("advisory-council:advisors.jane-lopes.name"),
        position: i18n.t("advisory-council:advisors.jane-lopes.position"),
    },

    {        
        path: "/jonathan-ross-ms",
        photo: jonathan,
        name: i18n.t("advisory-council:advisors.jonathan-ross-ms.name"),
        position: i18n.t("advisory-council:advisors.jonathan-ross-ms.position"),
    },
    {        
        path: "/dlynn-proctor",
        photo: dlynn,
        name: i18n.t("advisory-council:advisors.dlynn-proctor.name"),
        position: i18n.t("advisory-council:advisors.dlynn-proctor.position"),
    },
    {        
        path: "/jennifer-grancio",
        photo: jennGran,
        name: i18n.t("advisory-council:advisors.jennifer-grancio.name"),
        position: i18n.t("advisory-council:advisors.jennifer-grancio.position"),
    },

].concat(
    /([a-z]{2}-)?(zh|hk|cn)/.test(i18n.language) && {
    path: "/yuan",
    photo: yuan,
    name: i18n.t("about-us:people.yuan.name"),
    position: i18n.t("about-us:people.yuan.position"),
    }
).filter(Boolean).map(member => ({...member, id: uuid()}));

