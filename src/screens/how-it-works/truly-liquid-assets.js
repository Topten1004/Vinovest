import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { TopTitle, Description } from "#shared/ui/Typography/styled";

import { FadeFromBottomWithDelay } from "#shared/ui/Animations";
import useScrollReveal from "#shared/hooks/useScrollReveal";
import handChaliceSvg from "./assets/handChalice.svg";

const TrulyLiquidAssets = () => {
    const ref = React.useRef();
    const { hasRevealed } = useScrollReveal({ ref });
    const runAnimation = hasRevealed ? "runAnimation" : "";
    const { t } = useTranslation("how-works");

    return (
        <GupsContainer>
            <Container>
                <TrulyLiquidAssetsContainer ref={ref}>
                    <img className={runAnimation} src={handChaliceSvg} alt="Truly liquid assets" />
                    <TopTitle className={runAnimation}>{t("trulyLiquidAssets.title")}</TopTitle>{" "}
                    <Description className={runAnimation}>{t("trulyLiquidAssets.description")}</Description>
                </TrulyLiquidAssetsContainer>
                <div className="d_decorative_square" />
                <div className="d_decorative_square cc_bottom" />
            </Container>
        </GupsContainer>
    );
};

const GupsContainer = styled.div`
    @media screen and (min-width: 768px) and (max-width: 991px) {
        padding: 50px;
    }
`;

const Container = styled.div`
    position: relative;
    max-width: 856px;
    margin-right: auto;
    margin-left: auto;
    padding: 40px;
    margin-top: 165px;

    .d_decorative_square {
        position: absolute;
        left: auto;
        top: 0;
        right: 0;
        bottom: auto;
        z-index: -1;
        width: 34.22%;
        padding-bottom: 34.57%;
        background-color: #c5d5e4;

        @media screen and (max-width: 767px) {
            width: 78.13%;
            padding-bottom: 78.93%;
        }
    }

    .d_decorative_square.cc_bottom {
        left: 0;
        top: auto;
        right: auto;
        bottom: 0;
        background-color: #e0e5cd;
    }

    @media screen and (max-width: 991px) {
        margin-top: 74px;
    }
`;

const TrulyLiquidAssetsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: #efddc7;
    background-color: #242e35;
    padding: 80px 40px 80px;

    img {
        margin-bottom: 40px;

        &.runAnimation {
            animation: ${FadeFromBottomWithDelay} 0.9s ease-out;
        }
    }

    ${TopTitle} {
        max-width: 605px;
        padding: 0;
        padding-bottom: 20px;
        color: #efddc7;

        &.runAnimation {
            animation: ${FadeFromBottomWithDelay} 1.2s ease-out;
        }
    }

    ${Description} {
        padding: 0;
        max-width: 604px;

        &.runAnimation {
            animation: ${FadeFromBottomWithDelay} 1.5s ease-out;
        }
    }

    @media screen and (max-width: 991px) {
        padding: 60px 15px 60px;

        ${Description} {
            max-width: 510px;
        }
    }
`;

export default TrulyLiquidAssets;
