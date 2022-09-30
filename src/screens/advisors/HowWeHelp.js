import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { HeroDescription, TopTitle, SmallSubtitle } from "#shared/ui/Typography/styled";
import { items } from "./images/howWeHelp/items";

const HowWeHelp = () => {
    const { t } = useTranslation("advisors");

    return (
        <Section>
            <TopTitle>{t("howWeHelp.title")}</TopTitle>
            <ul>
                {items.map((item) => (
                    <li key={item.img}>
                        <div className="imgWrap">
                            <img src={item.img} width="160" height="133" alt="advisor icon" />
                        </div>
                        <SmallSubtitle>{item.title}</SmallSubtitle>
                        <HeroDescription>{item.desc}</HeroDescription>
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
    padding-bottom: 100px;
    padding-left: 6.666%;
    padding-right: 6.666%;
    @media screen and (max-width: 576px) {
        padding-bottom: 60px;
    }
    ${TopTitle} {
        margin-bottom: 75px;
        @media screen and (max-width: 576px) {
            font-size: 36px;
            margin-bottom: 60px;
        }
    }
    ${SmallSubtitle} {
        margin-bottom: 16px;
    }
    ${HeroDescription} {
        font-size: 16px;
        line-height: 175%;
    }

    img {
        width: 160px;
        height: 133px;
        object-fit: contain;
    }
    .imgWrap {
        margin-bottom: 27px;
    }
    li {
        list-style: none;
        display: flex;
        flex-direction: column;
        align-items: center;
        max-width: 450px;
    }
    ul {
        display: grid;
        grid-auto-columns: 1fr;
        grid-column-gap: 125px;
        grid-row-gap: 81px;
        padding: 0;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: auto auto;
        max-width: 1270px;
    }
    @media (max-width: 767px) {
        ul {
            grid-template-columns: 1fr;
        }
    }
`;
export default HowWeHelp;
