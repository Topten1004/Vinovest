import React from "react";
import { useTranslation } from "react-i18next";

import styled from "styled-components";
import { PDescription, TopTitle } from "#shared/ui/Typography/styled";
import wineSafe from "./images/wineMarket/wineSafe.svg";

const WineMarket = () => {
    const { t } = useTranslation("advisors");

    return (
        <Section>
            <TopTitle>{t("wineMarket.title")}</TopTitle>
            <PDescription>{t("wineMarket.description")}</PDescription>
            <div className="imageWrapper">
                <img src={wineSafe} height="381" width="461" alt="wine in vault" />
            </div>
        </Section>
    );
};
const Section = styled.section`
    color: #242e35;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 124px;
    padding-left: 6.666%;
    padding-right: 6.666%;
    img {
        transform: translateX(-40px);
        max-width: 100%;
    }
    ${TopTitle} {
        max-width: 750px;
        margin-bottom: 40px;
        @media screen and (max-width: 576px) {
            font-size: 36px;
        }
    }
    ${PDescription} {
        max-width: 800px;
        margin-bottom: 40px;
        @media screen and (max-width: 576px) {
            font-size: 16px;
        }
    }
    @media (max-width: 991px) {
        padding-left: 6.666%;
        padding-right: 6.666%;
        padding-bottom: 80px;
        img {
            transform: translateX(0px);
        }
    }
`;

export default WineMarket;
