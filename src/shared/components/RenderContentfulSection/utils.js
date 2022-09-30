/* eslint-disable react/no-array-index-key */
import React from "react";
import { get } from "lodash";
import { I18nLink as Link } from "#localization/localizedRouter";

const TextNode = ({ nodeType, value, marks, ...props }) => {
    const src = get(props, "data.uri");
    const linkText = get(props, "content[0].value");
    let textNode = null;

    if (nodeType === "hyperlink") {
        if (src.startsWith("http")) {
            textNode = (
                <a href={src} target="_blank" rel="noopener noreferrer">
                    {linkText}
                </a>
            );
        } else if (src.startsWith("#")) {
            textNode = <a href={src}>{linkText}</a>;
        } else {
            textNode = <Link to={src}>{linkText}</Link>;
        }
    } else {
        textNode = `${value}`;
    }

    let maskNode = textNode;

    const checkMarksType = ((checkMarks) => (checkType) => checkMarks.some(({ type }) => type === checkType)).call(
        null,
        marks || [],
    );

    if (checkMarksType("bold")) {
        maskNode = <strong>{maskNode}</strong>;
    }

    if (checkMarksType("code")) {
        const id = textNode && textNode.split("anchor:").join("").split(" ")[0].trim();

        if (textNode.includes("anchor:")) {
            maskNode = <span id={id} />;
        } else maskNode = "";
    }

    if (checkMarksType("italic")) {
        maskNode = <em>{maskNode}</em>;
    }

    if (maskNode === "\n") {
        maskNode = <br />;
    }

    return <>{maskNode}</>;
};

export const renderTextWithLinks = (data) => (
    <>
        {data.map((d, i) =>
            typeof d.value === "undefined" ? (
                <TextNode {...d} value={get(d, "content[0].value", "")} key={i} />
            ) : (
                <TextNode {...d} key={i} />
            ),
        )}
    </>
);
