import questionMark from "./questionMark.svg";
import investor from "./investor.svg";

const items = [
    {
        img: questionMark,
        title: "allSupportTopics.title",
        desc: "allSupportTopics.description",
        link: `${window.location.origin}/help`,
        linkText: "allSupportTopics.linkText",
    },
    {
        img: investor,
        title: "forCurrentInvestors.title",
        desc: "forCurrentInvestors.description",
        link: `${window.location.origin}/contact-support`,
        linkText: "forCurrentInvestors.linkText",
    },
];
export { items };
