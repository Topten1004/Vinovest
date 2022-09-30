import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import posthog from "posthog-js";
import { useConfig } from "#shared/hooks";
import { items } from "./images/items";
import { HeroTitle, PDescription, SmallSubtitle } from "#shared/ui/Typography/styled";
import MetaTagsReplacer from "#shared/components/MetaTagsReplacer";
import { languageCodeChina } from "../../utils/constants";

const arrowSwg = (
    <svg width="17" height="12" viewBox="0 0 17 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 6.00006L15 6.00006" stroke="#4F81B0" strokeWidth="1.5" />
        <path d="M10 11.0001L15 6.00006L10 1.00006" stroke="#4F81B0" strokeWidth="1.5" />
    </svg>
);

const Header = () => {
    const config = useConfig();
    const { t } = useTranslation("contact-us");

    const onBookACall = useCallback(() => {
        posthog.capture("calendly", { component: "Header", progress: "launch", location: "contact-us" });
        if (!languageCodeChina) {
            window.Calendly.initPopupWidget({
                url: config.calendly.wineExpertsUrl,
            });
        } else {
            window.location = "https://airtable.com/shr0yMiUh5ty4zjyP";
        }
    }, [config]);

    return (
        <Section>
            <MetaTagsReplacer title={t("title")} />

            <HeroTitle>{t("title")}</HeroTitle>
            <ul>
                {items.map((item) => (
                    <li key={item.title}>
                        <div className="imageWrapper">
                            <img className="image" alt={item.title} src={item.img} height="106" width="153" />
                        </div>
                        <SmallSubtitle>{t(item.title)}</SmallSubtitle>
                        <PDescription>{t(item.desc)}</PDescription>
                        {item.link ? (
                            <div className="actionWrapper">
                                <a target="_blank" rel="noopener noreferrer" className="custom" href={item.link}>
                                    {t(item.linkText)}
                                </a>
                                {arrowSwg}
                            </div>
                        ) : (
                            <div className="actionWrapper">
                                <Button type="button" onClick={onBookACall} className="custom">
                                    {t(item.linkText)}
                                </Button>
                                {arrowSwg}
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </Section>
    );
};
const Section = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 100px 6.666%;
    color: #242e35;

    .image {
        height: 106px;
        object-fit: contain;
    }
    ${HeroTitle} {
        margin-bottom: 125px;
        font-size: 64px;
    }

    ${SmallSubtitle} {
        margin-bottom: 20px;
    }
    ${PDescription} {
        font-family: Favoritstd, sans-serif;
        font-weight: 500;
        margin-bottom: 20px;
        font-size: 16px;
        line-height: 26px;
        letter-spacing: 0.5px;
        text-align: left;
    }
    ul {
        max-width: 1200px;
        display: grid;
        grid-auto-columns: 1fr;
        grid-template-columns: 1fr 1fr;
        grid-column-gap: 100px;
        padding: 0;
        grid-row-gap: 80px;
    }
    .imageWrapper {
        margin-bottom: 20px;
    }
    li {
        list-style: none;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        background: #fafafa;
        padding: 40px 60px 40px 80px;
    }
    .custom {
        font-family: Favoritmonostd, sans-serif;
        margin-right: 5px;
        font-size: 14px;
        color: #4f81b0;
        background-color: transparent;
        outline: none;
        text-decoration: none;
        border: none;
        cursor: pointer;
    }
    @media (max-width: 1200px) {
        ul {
            grid-template-columns: 1fr 1fr;
        }
        li {
            padding: 40px;
        }
    }
    @media (max-width: 767px) {
        ul {
            grid-template-columns: 1fr;
        }
        li {
            padding: 50px;
        }
    }
`;
const Button = styled.button``;

export default Header;
