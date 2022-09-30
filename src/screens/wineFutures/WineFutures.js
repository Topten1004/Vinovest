import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import wineFuture from "./images/wineFutures.jpeg";
import { TopTitle, PDescription, TopDescription } from "#shared/ui/Typography/styled";

const WineFuturesSection = () => {
    const { t } = useTranslation("why-wine");
    return (
        <Section>
            <TopDescription>{t("wine_futures.futures.top_description")}</TopDescription>
            <TopTitle>{t("wine_futures.futures.title")}</TopTitle>
            <ImageWrp>
                <img alt="wine barrels wine futures" src={wineFuture} />
            </ImageWrp>
            <PDescription>{t("wine_futures.futures.bottom_description")}</PDescription>
        </Section>
    );
};
const Section = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 1440px;
    padding: 100px 8.888%;
    margin: 0 auto;
    ${TopDescription} {
        margin-bottom: 24px;
    }
    ${TopTitle} {
        line-height: 137%;
        margin-bottom: 50px;
    }
    ${PDescription} {
        max-width: 950px;
        text-align: start;
    }
    @media screen and (max-width: 991px) {
        padding: 100px 6.666% 30px;
    } ;
`;
const ImageWrp = styled.div`
    margin-bottom: 60px;
    img {
        width: 100%;
        object-fit: contain;
    }
`;
export default WineFuturesSection;
