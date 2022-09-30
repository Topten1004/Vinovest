import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import WithLayersButton from "#shared/ui/WithLayersButton";
import heroImg from "./images/heroBalanceVine.jpg";
import MetaTagsReplacer from "#shared/components/MetaTagsReplacer";

const Header = () => {
    const { t } = useTranslation("about-us");
    return (
        <HeaderContainer>
            <MetaTagsReplacer title={t("header.meta-title")} description={t("header.meta-descriptoin")} />

            <HeaderTag>
                <h1>{t("header.header")}</h1>
                <p>{t("header.description")}</p>
                <WithLayersButton colors={["#242e35", "#efddc7"]}>{t("header.get-started")}</WithLayersButton>
                <img alt="heroVineImg" src={heroImg} width="859" height="698" />
            </HeaderTag>
        </HeaderContainer>
    );
};

const HeaderContainer = styled.section`
    background-color: #efddc7;
`;
const HeaderTag = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 1440px;
    align-items: center;
    width: 100%;
    margin: 0 auto;
    padding: 170px 8.888% 15px;

    h1 {
        font-family: RoslindaleDisplayCondensed;
        font-size: 64px;
        font-weight: 500;
        color: #242e35;
        text-align: center;
        margin: 0 auto;
        line-height: 131.25%;
        color: #242e35;
    }
    p {
        font-size: 20px;
        text-align: center;
        line-height: 160%;
        max-width: 596px;
        margin: 30px auto 60px auto;
    }
    img {
        width: 95%;
        object-fit: contain;
        margin: 0 auto;

        @media screen and (min-width: 320px) {
            height: 300px;
        }

        @media screen and (min-width: 768px) {
            height: 700px;
        }

        @media screen and (min-width: 1024px) {
            height: 900px;
        }
    }

    @media screen and (max-width: 767px) {
        h1 {
            font-size: 48px;
        }
    }
    @media screen and (max-width: 480px) {
        h1 {
            font-size: 44px;
        }
    }
`;

export default Header;
