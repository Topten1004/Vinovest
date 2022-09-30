/* eslint-disable no-shadow */
/* eslint-disable react/no-array-index-key */
/* eslint-disable indent */
import React from "react";
import { get } from "lodash";
import { renderTextWithLinks } from "./utils";
import { Wrapper, FurtherReadingWrapper } from "./styled";
import { useConfig } from "#shared/hooks";
import { makeProgressive } from "../../../screens/blog/utils";

const renderList = (data, i) => {
    const renderContent = get(data, "content[0].content");

    if (data.content.length === 1) {
        return <li key={i}>{renderTextWithLinks(renderContent)}</li>;
    } else {
        return <li key={i}>{<RenderContentfulSection postSections={data.content} fillingOnly />}</li>;
    }
};

const disassembleSections = (postSections) => {
    let lastCode = false;
    const composeReadMoreSections = [];

    const withReadMoreSections = postSections.map((field) => {
        const isCode = get(field, "content[0].marks", []).some(({ type }) => type === "code");
        const isReadMore = get(field, "content[0].value") === "readMore";

        if (!lastCode) {
            lastCode = isCode && isReadMore;
            lastCode && composeReadMoreSections.push([]);

            return lastCode ? { ...field, readMoreIndex: composeReadMoreSections.length - 1 } : field;
        }

        if (lastCode && isCode) {
            const filterCodeSection = field.content.map((f) => {
                return f.marks ? { ...f, marks: f.marks.filter(({ type }) => type !== "code") } : f;
            });

            composeReadMoreSections[composeReadMoreSections.length - 1].push({ ...field, content: filterCodeSection });

            return { ...field, content: [] };
        } else {
            lastCode = false;
        }

        return field;
    });

    return {
        composeReadMoreSections,
        withReadMoreSections,
    };
};

const RenderContentfulSection = ({ postSections = [], fillingOnly, withMobileGup, withOPtIn }) => {
    const config = useConfig();

    const { withReadMoreSections, composeReadMoreSections } = React.useMemo(() => disassembleSections(postSections), [
        postSections,
    ]);

    const titleCount = React.useRef(0);

    const allContent = (
        <>
            {withReadMoreSections.map((section, i) => {
                const nodeType = get(section, "nodeType", "");
                const content = get(section, "content", []);

                const readMoreIndex = get(section, "readMoreIndex");

                switch (nodeType) {
                    case "paragraph": {
                        const renderedText = renderTextWithLinks(content);

                        // this line will remove empty paragraph caused by empty new line in contentful
                        if (!renderedText.props.children.some(({ props }) => props.value)) return null;

                        if (typeof readMoreIndex === "number") {
                            return (
                                <FurtherReadingWrapper key={i}>
                                    <RenderContentfulSection postSections={composeReadMoreSections[readMoreIndex]} />
                                </FurtherReadingWrapper>
                            );
                        }

                        if (content.length > 0 && !content[0].marks.some(({ type }) => type === "code")) {
                            return <p key={i}>{renderedText}</p>;
                        }

                        return (
                            <React.Fragment key={i}>{renderedText}</React.Fragment> // avoid creating empty div for anchor span
                        );
                    }
                    case "heading-2":
                        // place optin campaign before second <h2/> tag ( github #2030 issue )
                        if (withOPtIn) titleCount.current++;
                        if (titleCount.current === 2) {
                            return (
                                <>
                                    <div id={`om-${config.optInBlogCampaign}-holder`} />
                                    <h2 key={i}>{renderTextWithLinks(content)}</h2>
                                </>
                            );
                        }
                        return <h2 key={i}>{renderTextWithLinks(content)}</h2>;
                    case "heading-3":
                        return <h3 key={i}>{renderTextWithLinks(content)}</h3>;
                    case "heading-4":
                        return <h4 key={i}>{renderTextWithLinks(content)}</h4>;

                    case "embedded-asset-block":
                        return (
                            <img
                                key={i}
                                src={makeProgressive(get(section, "data.target.fields.file.url"))}
                                alt={get(section, "data.target.fields.file.fileName")}
                            />
                        );
                    case "ordered-list":
                        return <ol key={i}>{content.map(renderList)}</ol>;
                    case "unordered-list":
                        return <ul key={i}>{content.map(renderList)}</ul>;
                    default:
                        return null;
                }
            })}
        </>
    );

    return fillingOnly ? <>{allContent}</> : <Wrapper withMobileGup={withMobileGup}>{allContent}</Wrapper>;
};

export default RenderContentfulSection;
