import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { TopDescription, TopTitle } from "#shared/ui/Typography/styled";
import useScrollReveal from "#shared/hooks/useScrollReveal";
import { FadeFromBottomWithDelay } from "#shared/ui/Animations";
import WithLayersButton from "#shared/ui/WithLayersButton";
import headBackground from "../assets/headBackground.svg";
import chart from "../assets/chart.svg";
import { useCreateRoutingCallback } from "#shared/hooks";
import { ROUTE_PATHS } from "../../route-paths";

const VinovestExchange = () => {
    const ref = React.useRef();
    const { hasRevealed } = useScrollReveal({ ref });
    const runAnimation = hasRevealed ? "runAnimation" : "";
    const { t } = useTranslation("trading");

    const collectionsRedirect = useCreateRoutingCallback(ROUTE_PATHS.collections, { refresh: true });

    return (
        <HowItWorksHeadContainer ref={ref}>
            <TopDescription style={{ fontSize: "16px" }} className={runAnimation}>
                {t("exchange.subtitle")}
            </TopDescription>
            <TopTitle className={runAnimation}>{t("exchange.title")}</TopTitle>{" "}
            <p className={runAnimation}>{t("exchange.description")}</p>
            <WithLayersButton onClick={() => collectionsRedirect()} colors={["#242E35", "#fff7ef"]}>
                {t("exchange.button")}
            </WithLayersButton>
        </HowItWorksHeadContainer>
    );
};

export default VinovestExchange;

const HowItWorksHeadContainer = styled.div`
    padding-top: 90px;
    padding-right: 8.888%;
    padding-left: 8.888%;
    text-align: center;
    background-color: #fff7ef;
    background-image: url(${headBackground}), url(${chart});
    background-repeat: no-repeat, no-repeat;
    padding-bottom: 514px;
    background-position: bottom, bottom;
    background-size: auto, 100% auto;

    p {
        font-size: 20px;
        text-align: center;
        line-height: 160%;
        max-width: 730px;
        margin: 30px auto 60px auto;
        &.runAnimation {
            animation: ${FadeFromBottomWithDelay} 0.8s linear;
        }
        @media screen and (max-width: 767px) {
            font-size: 14px;
            margin-bottom: 30px;
        }
    }

    ${TopTitle} {
        max-width: 600px;
        margin: 0 auto 52px;
        &.runAnimation {
            animation: ${FadeFromBottomWithDelay} 0.8s linear;
        }
        @media screen and (max-width: 767px) {
            font-size: 32px;
            margin-bottom: 16px;
        }
    }

    ${TopDescription} {
        margin: 24px auto 40px;
        color: #242e35;

        &.runAnimation {
            animation: ${FadeFromBottomWithDelay} 0.8s linear;
        }
        @media screen and (max-width: 767px) {
            margin-bottom: 16px;
        }
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
        padding-top: 46px;
    }
    @media screen and (max-width: 767px) {
        background-size: 160%, 100% auto;
        padding-bottom: 400px;
    }
    @media screen and (max-width: 576px) {
        background-size: 190%, 100% auto;
        padding-bottom: 300px;
    }
`;
