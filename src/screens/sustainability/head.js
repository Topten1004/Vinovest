import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { HeroTitle, HeroDescription } from "#shared/ui/Typography/styled";
import WithLayersButton from "#shared/ui/WithLayersButton";
import sustainabilityHeroPng from "./assets/sustainabilityHero.png";
import MetaTagsReplacer from "#shared/components/MetaTagsReplacer";

const HowItWorksHead = () => {
    const { t } = useTranslation("sustainable-future");

    return (
        <HowItWorksHeadContainer>
            <MetaTagsReplacer title={t("head-meta.title")} description={t("head-meta.description")} />
            <HeroTitle>{t("head.title")}</HeroTitle>
            <HeroDescription>{t("head.description")}</HeroDescription>
            <img src={sustainabilityHeroPng} alt="How it works hero" />
        </HowItWorksHeadContainer>
    );
};

const HowItWorksHeadContainer = styled.div`
    padding-top: 180px;
    padding-right: 8.888%;
    padding-left: 8.888%;
    background-color: #c5d5e4;
    color: #3c400c;
    text-align: center;

    img {
        margin: 19px auto 0;
        display: block;
        max-width: 1054px;
        width: 100%;
        transform: translateX(-3.5%);

        @media screen and (max-width: 991px) {
            box-sizing: content-box;
            padding-top: 24px;
            padding-bottom: 53px;
            transform: translateX(-1%) scale(1.12);
        }
    }

    ${HeroTitle} {
        font-size: 64px;

        @media screen and (max-width: 767px) {
            font-size: 48px;
        }
    }

    ${HeroDescription} {
        margin: 24px auto 40px;
        max-width: 560px;
        width: fit-content;
        color: #3c400c;
        font-weight: 500;
        font-family: Favoritstd, sans-serif;
    }

    ${WithLayersButton.styled.WithLayers} {
        margin-top: 20px;
        margin-bottom: 25px;

        @media screen and (max-width: 991px) {
            width: 290px;
        }
    }

    @media screen and (max-width: 991px) {
        padding-right: 6.666%;
        padding-left: 6.666%;
        padding-top: 120px;
    }
`;

export default HowItWorksHead;
