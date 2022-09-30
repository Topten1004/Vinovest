import React from "react";
import { get } from "lodash";
import { getI18n } from "react-i18next";

const backUpDevice = {
    title: get(document.querySelector("title"), "innerText"),
    description: get(document.querySelector('[name="description"]'), "content"),
};

const backUpSocialDescriptions = ["og:description", "twitter:description"].reduce(
    (acc, tagSelector) => ({ ...acc, [tagSelector]: getMeta(tagSelector) }),
    {},
);
const backUpSocialTitles = ["og:title", "twitter:title"].reduce(
    (acc, tagSelector) => ({ ...acc, [tagSelector]: getMeta(tagSelector) }),
    {},
);

const MetaTagsReplacer = ({ title, description }) => {
    const i18n = getI18n();

    const isChinese = /zh/.test(i18n.language);
    React.useEffect(() => {
        if (!isChinese) {
            const titleNode = document.querySelector("title");
            const descriptionNode = document.querySelector('[name="description"]');

            titleNode.innerHTML = title || backUpDevice.title;
            descriptionNode.content = description || backUpDevice.description;

            Object.values(backUpSocialTitles).forEach(setMetaContent(title));
            Object.values(backUpSocialDescriptions).forEach(setMetaContent(description));

            return () => {
                titleNode.innerHTML = backUpDevice.title;
                descriptionNode.content = backUpDevice.description;

                Object.values(backUpSocialTitles).forEach(resetMetaContent());
                Object.values(backUpSocialDescriptions).forEach(resetMetaContent());
            };
        }
    }, [description, title, isChinese]);

    return null;
};

function getMeta(tagSelector) {
    const node = document.querySelector(`[property="${tagSelector}"]`);
    if (node) {
        return { node, content: get(node, "content"), tagSelector };
    }

    const createNode = document.createElement("meta");
    createNode.setAttribute("property", tagSelector);
    createNode.setAttribute("content", "");

    return { createNode, tagSelector };
}

const setMetaContent = (content) => (metaTag) => {
    if (metaTag.node) {
        metaTag.node.content = content || metaTag.node.content;
    } else {
        document.getElementsByTagName("head")[0].appendChild(metaTag.createNode);
        metaTag.createNode.content = content;
    }
};

const resetMetaContent = () => (metaTag) => {
    if (metaTag.node) {
        metaTag.node.content = metaTag.content;
    } else {
        try {
            document.head.removeChild(metaTag.createNode);
        } catch (err) {}
    }
};

export default MetaTagsReplacer;
