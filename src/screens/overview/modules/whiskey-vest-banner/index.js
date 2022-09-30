import React from "react";
import styled from "styled-components";

import { useTranslation } from "react-i18next";
import { BaseModuleContainer } from "../styles";
import HoverWrapper from "./HoverWrapper";
import whiskeySvg from "../assets/whiskey.svg";

const WhiskeyVestBanner = () => {
    const { t } = useTranslation("overview");
    return (
        <CustomModuleContainer isRow>
            <TextWrapper>
                <TopDescription>{t("whiskey-banner.early-access")}</TopDescription>
                <MainTitle>{t("whiskey-banner.whiskey-investing")}</MainTitle>
                <WhiskeyLink href="https://www.whiskeyvest.co/">{t("whiskey-banner.learn-more")}</WhiskeyLink>
            </TextWrapper>
            <HoverWrapper>
                <Img src={whiskeySvg} alt="whiskey" />
            </HoverWrapper>
        </CustomModuleContainer>
    );
};

const CustomModuleContainer = styled(BaseModuleContainer)`
    padding: 0 !important;
    height: auto !important;
    min-height: 387px;
    position: relative;
    background: #3a4002;
    display: flex;
    overflow: hidden;

    @media screen and (max-width: 1000px) {
        flex-direction: column;
    }
`;

const Img = styled.img`
    display: block;
    max-width: 100%;
    user-drag: none;
    user-select: none;
`;

const TextWrapper = styled.div`
    color: #fae8d1;
    padding: 107px 0 40px 93px;
    position: relative;
    z-index: 1;
    pointer-events: none;
    position: absolute;

    @media screen and (max-width: 1000px) {
        padding: 22px;
        width: 100%;
        text-align: center;
        position: relative;
    }

    @media screen and (max-width: 768px) {
        margin-bottom: 30px;
    }
`;

const TopDescription = styled.div`
    font-family: VinovestMono;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 22px;
    text-transform: uppercase;
    margin-top: 7px;
    pointer-events: none;
`;

const MainTitle = styled.div`
    font-family: RoslindaleDisplayCondensed;
    font-style: normal;
    font-weight: 500;
    font-size: 64px;
    line-height: 84px;
    pointer-events: none;

    @media screen and (max-width: 1000px) {
        font-size: 50px;
        line-height: 70px;
    }

    @media screen and (max-width: 768px) {
        font-size: 35px;
        line-height: 65px;
    }
`;

const WhiskeyLink = styled.a`
    font-family: VinovestMono;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 18px;
    letter-spacing: 0.025em;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    text-transform: uppercase;
    color: #fae8d1;
    min-width: 158px;
    min-height: 42px;
    padding: 10px;
    border: 1px solid #fae8d1;
    background: transparent;
    outline: 0;
    transition: 0.3s;
    margin-top: 29px;
    pointer-events: all;
    text-decoration: none;
    width: fit-content;

    &:hover {
        cursor: pointer;
        opacity: 0.8;
    }

    @media screen and (max-width: 1000px) {
        margin: 0 auto;
        margin-top: 10px;
    }
`;

export { WhiskeyVestBanner };
