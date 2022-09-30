import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { FadeFromBottomWithDelay } from "#shared/ui/Animations";
import useScrollReveal from "#shared/hooks/useScrollReveal";
import { TopTitle, Description } from "#shared/ui/Typography/styled";
import winePerformsJpg from "./assets/winePerforms.jpeg";
import winePerformsPng from "./assets/winePerforms.png";
import diamondSvg from "./assets/diamond.svg";
import targetSvg from "./assets/target.svg";
import flowerSvg from "./assets/flower.svg";

const WineOutperform = () => {
    const ref = React.useRef();
    const { hasRevealed } = useScrollReveal({ ref });
    const runAnimation = hasRevealed ? "runAnimation" : "";
    const { t } = useTranslation("why-wine");

    return (
        <Container ref={ref}>
            <WineOutperformsTitle>
                {t("why_wine.outpreform.title_1")}
                <span className="h3_highlight"> {t("why_wine.outpreform.title_2")}</span>{" "}
                {t("why_wine.outpreform.title_3")}{" "}
                <span className="h3_highlight">{t("why_wine.outpreform.title_4")}</span>
            </WineOutperformsTitle>
            <WinePerformsContent>
                <img className="winePerformsJpg" src={winePerformsPng} alt="winePerformsJpg" />
                <div className="content">
                    <TopTitle className={runAnimation}> {t("why_wine.outpreform.title")} </TopTitle>
                    <Description className={runAnimation}>{t("why_wine.outpreform.description")}</Description>
                    <FactorsWrapper className={runAnimation}>
                        <div>
                            <img className="factorIcon" src={diamondSvg} alt="factor icon" />
                        </div>
                        <div>{t("why_wine.outpreform.scarcity")}</div>
                        <p> {t("why_wine.outpreform.scarcity_description")} </p>
                        <div>
                            <img className="factorIcon" src={flowerSvg} alt="factor icon" />
                        </div>
                        <div> {t("why_wine.outpreform.aging")} </div>
                        <p> {t("why_wine.outpreform.aging_description")} </p>
                        <div>
                            <img className="factorIcon" src={targetSvg} alt="factor icon" />
                        </div>
                        <div> {t("why_wine.outpreform.brand")} </div>
                        <p> {t("why_wine.outpreform.brand_description")} </p>
                    </FactorsWrapper>
                </div>
            </WinePerformsContent>
        </Container>
    );
};

const Container = styled.div`
    background-color: #3c400c;
`;

const WineOutperformsTitle = styled.h3`
    font-family: Roslindaledisplaycondensed, sans-serif;
    font-size: 34px;
    font-weight: 500;
    margin: 0;
    padding: 36px 42px 20px;
    padding-bottom: 10px;
    color: #e6c9c9;
    text-align: center;

    .h3_highlight {
        color: #e0e5cd;
        text-decoration: underline;
    }

    @media screen and (max-width: 767px) {
        font-size: 24px;
        line-height: 167%;
        padding-top: 0;
        padding-bottom: 0;
    }
`;

const WinePerformsContent = styled.div`
    display: flex;
    margin-top: 76px;
    align-items: center;
    justify-content: center;
    color: #e6c9c9;
    padding-right: 8.88%;

    .winePerformsJpg {
        flex-shrink: 1;
        max-width: 839px;
        margin-right: 3.57%;
    }

    .content {
        padding-bottom: 40px;
        max-width: 600px;
        width: 54%;

        @media screen and (max-width: 767px) {
            padding-bottom: 0;
        }

        
        ${TopTitle} {
            color: #e6c9c9;
            text-align: left;
            padding-left: 42px;


            &.runAnimation {
                animation: ${FadeFromBottomWithDelay} 0.8s linear;
            }

            @media screen and (max-width: 991px) {
                text-align: center;
                padding-left: 0;
            }
            @media screen and (min-width: 991px) {
                padding-left: 0;
            }
        }

        ${Description} {
            &.runAnimation {
                animation: ${FadeFromBottomWithDelay} 1s linear;
            }

            margin-top: 24px;
            margin-bottom: 40px;
            padding-left: 42px;


            @media screen and (min-width: 991px) {
                padding-left: 0;
            }
        }
    }

    @media screen and (max-width: 991px) {
        margin-top: 144px;
        padding-right: 0;
        flex-direction: column-reverse;

        ${TopTitle},
        ${Description} {
            width: 100%;
            text-align: center;
            max-width: 100%;
        }
        .winePerformsJpg,
        .content {
            width: 100%;
            max-width: 100%;
        }
        .winePerformsJpg {
            margin-right: 0;
        }
    }
`;

const FactorsWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: auto auto auto;
    grid-auto-flow: column;
    grid-column-gap: 32px;
    align-items: center;
    justify-content: center;
    max-width: 600px;
    margin: 0 auto;
    width: 100%;
    padding-bottom: 10px;
    font-family: Roslindaledisplaycondensed, sans-serif;
    font-size: 32px;
    line-height: 150%;
    font-weight: 500;
    justify-content: space-between;
    @media screen and (max-width: 767px) {
        padding-left: 24px;
        padding-right: 24px;
        grid-template-columns: 1fr;
        grid-template-rows: auto auto auto auto auto auto auto auto auto; 
    }

    div {
        display: flex;
        justify-content: center;
        margin-top: 10px;
        
        @media (max-width: 767px) { 
        }
    }

    p {
        font-family: FavoritStd;
        font-size: 14px;
        line-height: 24px;
        align-self: start;
        @media (max-width: 767px) {
            font-size: 20px;
            line-height: 32px;
            margin-bottom: 60px;
            margin-left: auto;
            margin-right: auto;
            text-align: center;
            max-width: 310px;
        }
    }

    &.runAnimation {
        animation: ${FadeFromBottomWithDelay} 1s linear;
    }
`;

export default WineOutperform;
