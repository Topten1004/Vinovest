import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { HeroTitle, HeroDescription } from "#shared/ui/Typography/styled";
import WithLayersButton from "#shared/ui/WithLayersButton";
import MetaTagsReplacer from "#shared/components/MetaTagsReplacer";
import whineCompositionJpg from "./assets/whineComposition.jpg";

const Head = () => {
    const { t } = useTranslation("why-wine");

    return (
        <HeadContainer>
            <MetaTagsReplacer
                title="Why Invest In Wine | Vinovest"
                description="Find out why wine is a perfect long-term investment that consistently outperforms the stock market. Discover why Vinovest is the easiest way to invest in wine."
            />
            <HeroTitle>{t("why_wine.outpreform.hero_title")}</HeroTitle>
            <HeroDescription>{t("why_wine.outpreform.hero_description")}</HeroDescription>
            <WithLayersButton>{t("why_wine.outpreform.hero_button")}</WithLayersButton>
            <div className="gup" />
        </HeadContainer>
    );
};

const HeadContainer = styled.div`
    padding-top: 180px;
    padding-right: 8.888%;
    padding-left: 8.888%;
    background-color: #242e35;
    color: #efddc7;
    height: 1003px;
    background-image: url(${whineCompositionJpg});
    background-repeat: no-repeat;
    background-position: bottom left 29%;
    background-size: 90%;
    text-align: center;

    .gup {
        display: none;
    }

    ${HeroDescription} {
        margin: 24px auto 40px;
        max-width: 650px;
        width: fit-content;

        @media screen and (max-width: 991px) {
            margin-right: 0;
            margin-left: 0;
        }
    }

    @media screen and (max-width: 991px) {
        height: 716px;
        padding-right: 6.666%;
        padding-left: 6.666%;
        padding-top: 120px;
    }

    @media screen and (max-width: 767px) {
        height: auto;
        background-size: 220%;
        background-position: bottom left 12%;

        .gup {
            display: block;
            height: 92vw;
        }
    }
`;

export default Head;
