import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { HeroTitle, HeroDescription } from "#shared/ui/Typography/styled";
import { useMobile } from "#shared/hooks";
import WithLayersButton from "#shared/ui/WithLayersButton";
import { FadeFromBottomWithDelay } from "#shared/ui/Animations";
import MetaTagsReplacer from "#shared/components/MetaTagsReplacer";
import useScrollReveal from "#shared/hooks/useScrollReveal";
import chartDesktopSvg from "./assets/chartDesktop.svg";
import chartMobileSvg from "./assets/chartMobile.svg";

const HowItWorksHead = () => {
    const ref = React.useRef();
    const { hasRevealed } = useScrollReveal({ ref });
    const runAnimation = hasRevealed ? "runAnimation" : "";
    const isMobile = useMobile(767);
    const { t } = useTranslation("vinovest-hundred-index");

    return (
        <HowItWorksHeadContainer ref={ref}>
            <MetaTagsReplacer title={t("hero-meta.title")} description={t("hero-meta.description")} />
            <HeroTitle className={runAnimation}>{t("hero.title")}</HeroTitle>{" "}
            <HeroDescription className={runAnimation}>{t("hero.description")}</HeroDescription>
            <WithLayersButton colors={["#efddc7", "#242e35"]}>{t("hero.getStarted")}</WithLayersButton>
            <div className="imgWrapper">
                <img src={isMobile ? chartMobileSvg : chartDesktopSvg} alt="How it works hero" />
            </div>
        </HowItWorksHeadContainer>
    );
};

const HowItWorksHeadContainer = styled.div`
    padding-top: 180px;
    background-color: #242e35;
    color: #efddc7;
    text-align: center;

    .imgWrapper {
        overflow: hidden;
        width: 100%;
        display: flex;
        justify-content: center;

        img {
            margin: 19px auto 0;
            display: block;
            width: 1421px;
            flex-shrink: 0;

            @media screen and (max-width: 991px) {
                box-sizing: content-box;
                padding-top: 24px;
            }
            @media screen and (min-width: 768px) and (max-width: 991px) {
                margin-top: -15px;
                padding-top: 0;
            }
            @media screen and (max-width: 767px) {
                width: 100%;
            }
        }
    }

    ${HeroTitle} {
        &.runAnimation {
            animation: ${FadeFromBottomWithDelay} 0.8s linear;
        }

        @media screen and (max-width: 991px) {
            padding-right: 6.666%;
            padding-left: 6.666%;
        }
    }

    ${HeroDescription} {
        margin: 24px auto 40px;
        max-width: 800px;
        width: fit-content;
        color: #efddc7;
        font-weight: 500;
        font-family: Favoritstd, sans-serif;
        font-size: 16px;
        line-height: 26px;

        &.runAnimation {
            animation: ${FadeFromBottomWithDelay} 0.8s linear;
        }

        @media screen and (max-width: 991px) {
            padding-right: 6.666%;
            padding-left: 6.666%;
            max-width: 100%;
        }
        @media screen and (min-width: 768px) and (max-width: 991px) {
            margin-bottom: 0;
        }
    }

    ${WithLayersButton.styled.WithLayers} {
        margin-bottom: 25px;

        @media screen and (max-width: 991px) {
            display: none;
        }
    }

    @media screen and (max-width: 991px) {
        padding-right: 0;
        padding-left: 0;
        padding-top: 120px;
    }
`;

export default HowItWorksHead;
