import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import WithLayersButton from "#shared/ui/WithLayersButton";
import twoGlasses from "./assets/Stat_wine_left.svg";
import threeGlasses from "./assets/Stat_wine_right.svg";
import { languageCodeChina } from "../../../utils/constants";

const WineInvestingBanner = () => {
    const { t } = useTranslation("footer");
    const location = useLocation();
    const isHome = location.pathname === "/" || location.pathname === "/zh";
    const onClickGetStarted = () => {
        window.location = "https://airtable.com/shr0yMiUh5ty4zjyP";
    };
    return (
        <Wrapper>
            <Container>
                <h2>{t("banner.wine-as-asset")}</h2>
                <p>{t("banner.high-returns")}</p>
                <WithLayersButton
                    colors={["#242E35", "#FAE8D1"]}
                    onClick={languageCodeChina && isHome ? onClickGetStarted : null}
                >
                    {isHome ? t("common:get-started-home") : t("common:get-started")}
                </WithLayersButton>
                <img className="glass glass1" src={twoGlasses} alt="two glasses" />
                <img className="glass glass2" src={threeGlasses} alt="three glasses" />
            </Container>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    width: 100%;
    color: #242e35;
    padding-left: 24px;
    padding-right: 24px;
    position: relative;

    &::before {
        content: " ";
        display: block;
        position: absolute;
        height: 50%;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: #242e35;
    }

    @media screen and (max-width: 767px) {
        &::before {
            height: 229px;
        }
    }
`;

const Container = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    max-width: 980px;
    margin: 0 auto;
    padding: 80px 0;
    background-color: #efddc7;
    align-items: center;
    z-index: 1;

    h2 {
        font-family: Roslindaledisplaycondensed, sans-serif;
        font-size: 64px;
        line-height: 84px;
        font-weight: 500;
        text-align: center;
        margin: 0;
        color: #242e35;
    }

    p {
        margin: 0;
        padding: 23px 0 47px;
        font-family: VinovestMedium;
        font-style: normal;
        font-weight: 500;
        font-size: 20px;
        line-height: 30px;
        text-align: center;
        max-width: 600px;
    }

    .glass {
        mix-blend-mode: multiply;
        position: absolute;
        left: auto;
        top: auto;
        right: 15.23%;
        bottom: 0;
    }
    .glass1 {
        left: 15.22%;
        right: auto;
    }

    @media screen and (max-width: 767px) {
        padding: 80px 0 0;

        h2 {
            font-size: 44px;
            line-height: 64px;
            padding: 0 10px;
        }

        p {
            padding: 24px 51px 31px;
        }

        .glass1 {
            display: none;
        }

        .glass2 {
            position: static;
            left: auto;
            right: auto;
            margin-top: 55px;
        }
    }
`;

export default WineInvestingBanner;
