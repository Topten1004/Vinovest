import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import WinemakerIconAnimation from "../winemaker-icon-animation";
import WinesBottlesTotals from "../wines-bottles-totals";
import { FadeAnimation } from "../assets/basicStyles";
import { uppercaseWordsInString } from "#utils/stringUtils";

const Hero = ({ hero, mask, wineData, displayName, critics }) => {
    const { t } = useTranslation(["portfolio"]);
    return (
        <HeroContainer>
            <Title>
                {displayName && uppercaseWordsInString(displayName)}{" "}
                {wineData.isFuture ? t("hero.futures") : wineData.lwin11.slice(-4)}
            </Title>
            <WinesBottlesTotalsWrapper>
                <WinesBottlesTotals
                    lwin18={wineData.lwin18}
                    total={wineData.total}
                    sizeByML={wineData.sizeByML}
                    hideCount
                    bottles
                />
            </WinesBottlesTotalsWrapper>

            <MaskContainer backgroundImage={`url(${mask})`}>
                <ImageContainer>
                    <img src={hero} alt="hero" />
                </ImageContainer>
            </MaskContainer>
            <AnimationContainer>
                <WinemakerIconAnimation data={critics || []} />
            </AnimationContainer>
        </HeroContainer>
    );
};

const HeroContainer = styled.div`
    width: 100%;
    background-color: #f3f7fa;
    padding-bottom: 53px;
    position: relative;

    @media screen and (max-width: 1023px) {
        padding-bottom: 36px;
    }
`;

const MaskContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    position: relative;
    height: 462px;

    @media screen and (max-width: 1023px) {
        height: 263px;
    }

    &:after {
        content: "";
        background-image: ${({ backgroundImage }) => backgroundImage};
        background-repeat: no-repeat;
        background-position-x: 127px;
        background-position-y: bottom;
        background-size: 694.61px;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        position: absolute;
        z-index: 1;
        ${FadeAnimation};

        @media screen and (max-width: 1023px) {
            background-size: 100%;
            background-position: center;
            height: 263px;
        }
    }
`;

const Title = styled.h2`
    margin: 0;
    padding: 0;
    text-align: center;
    padding: 99px 127px 0px;
    font-family: RoslindaleDisplayCondensed;
    font-style: normal;
    font-weight: 500;
    font-size: 45px;
    line-height: 60px;
    min-height: 74px;
    color: #242e35;
    box-sizing: content-box;

    @media screen and (max-width: 1023px) {
        font-size: 32px;
        line-height: 41px;
        min-height: 50px;
        padding: 79px 23px 0;
    }
`;

const WinesBottlesTotalsWrapper = styled.div`
    font-family: VinovestMedium;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 36px;
    text-align: center;
    letter-spacing: 0.005em;
    color: #4f1c28;
    margin-bottom: 45px;

    @media screen and (max-width: 1023px) {
        font-size: 14px;
        line-height: 21px;
        margin: 16px 0;
    }
`;

const ImageContainer = styled.div`
    margin: 0 auto;
    display: flex;
    justify-content: center;
    height: 440.8px;
    padding-bottom: 31.9px;
    z-index: 2;

    img {
        object-fit: scale-down;
    }

    @media screen and (max-width: 1023px) {
        width: 263px;
        height: 263px;
        padding-bottom: 0;
    }
`;

const AnimationContainer = styled.div`
    height: 151px;
    width: 151px;
    position: absolute;
    bottom: 56.31px;
    right: 81.45px;
    z-index: 2;

    @media screen and (max-width: 1023px) {
        height: 100px;
        width: 100px;
        bottom: 30px;
        right: 45px;
    }

    @media screen and (max-width: 700px) {
        height: 70px;
        width: 70px;
        bottom: 36px;
        right: 31px;
    }
`;

export default Hero;
