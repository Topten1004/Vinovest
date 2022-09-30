import React, { useCallback } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import Slider from "react-slick";

import { HeroDescription, TopTitle, HeroTitle } from "#shared/ui/Typography/styled";
import WithLayersButton from "#shared/ui/WithLayersButton";
import wineHand from "./images/yourSolution/wineHand.svg";
import wineMachinery from "./images/yourSolution/wineMachinery.svg";
import { sliderDots, removeOutline } from "./helpers";

const YourSolution = () => {
    const onBookACall = () => {
        window.open(
            "https://docs.google.com/forms/d/1om-ntH2ojKsQjemPYyUok2TacEKATkpfKMugt9dS4yg/viewform?edit_requested=true",
            "_blank",
        );
    };
    const { t } = useTranslation("advisors");

    return (
        <Section>
            <Title>{t("yourSolution.title")}</Title>
            <Container>
                <div className="wrp wrapper1">
                    <div className="separator">
                        <div className="imageWrapper">
                            <img src={wineMachinery} height="145" width="152" alt="solutions icon" />
                        </div>
                        <HeroTitle as="h2">{t("yourSolution.titleAutopilot")}</HeroTitle>
                        <Description>{t("yourSolution.descriptionAutopilot")}</Description>
                    </div>
                    <WithLayersButton colors={["rgb(36, 46, 53)", "rgb(239, 221, 199)"]} onClick={onBookACall}>
                        {t("yourSolution.learnMore")}
                    </WithLayersButton>
                </div>
                <div className="wrp wrapper2">
                    <div className="separator">
                        <div className="imageWrapper">
                            <img src={wineHand} width="170" height="153" alt="wine machinery" />
                        </div>
                        <HeroTitle as="h2">{t("yourSolution.titleCustom")}</HeroTitle>
                        <Description>{t("yourSolution.descriptionCustom")}</Description>
                    </div>
                    <WithLayersButton colors={["rgb(36, 46, 53)", "rgb(238,239,239)"]} onClick={onBookACall}>
                        {t("yourSolution.learnMore")}
                    </WithLayersButton>
                </div>
            </Container>
            <BlogSliderContainer>
                <Slider
                    className="blog-slider-container"
                    accessibility
                    infinite
                    autoplay={false}
                    slidesToShow={1}
                    slidesToScroll={1}
                    arrows={false}
                    dots
                >
                    <BlogSlide>
                        <BlogSlideWrapper>
                            <div className="wrp wrapper1">
                                <div className="separator">
                                    <div className="imageWrapper">
                                        <img src={wineMachinery} height="145" width="152" alt="solutions icon" />
                                    </div>
                                    <HeroTitle as="h2">{t("yourSolution.titleAutopilot")}</HeroTitle>
                                    <Description>{t("yourSolution.descriptionAutopilot")}</Description>
                                </div>
                                <WithLayersButton
                                    colors={["rgb(36, 46, 53)", "rgb(239, 221, 199)"]}
                                    onClick={onBookACall}
                                >
                                    {t("yourSolution.learnMore")}
                                </WithLayersButton>
                            </div>
                        </BlogSlideWrapper>
                    </BlogSlide>
                    <BlogSlide>
                        <BlogSlideWrapper>
                            <div className="wrp wrapper2">
                                <div className="separator">
                                    <div className="imageWrapper">
                                        <img src={wineHand} width="170" height="153" alt="wine machinery" />
                                    </div>
                                    <HeroTitle as="h2">{t("yourSolution.titleCustom")}</HeroTitle>
                                    <Description>{t("yourSolution.descriptionCustom")}</Description>
                                </div>
                                <WithLayersButton
                                    colors={["rgb(36, 46, 53)", "rgb(238,239,239)"]}
                                    onClick={onBookACall}
                                >
                                    {t("yourSolution.learnMore")}
                                </WithLayersButton>
                            </div>
                        </BlogSlideWrapper>
                    </BlogSlide>
                </Slider>
            </BlogSliderContainer>
        </Section>
    );
};
const Section = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #242e35;
    padding-bottom: 112px;
    padding-left: 6.666%;
    padding-right: 6.666%;
    ${TopTitle} {
        margin-bottom: 70px;
    }
    ${HeroTitle} {
        margin-bottom: 40px;
    }
    ${HeroDescription} {
        margin-bottom: 80px;
    }
    .separator {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    img {
        margin-bottom: 30px;
    }
    .wrp {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        padding: 60px 60px;
        max-width: 40%;
    }
    .wrapper1 {
        background-color: #efddc7;
    }
    .wrapper2 {
        background-color: rgba(36, 46, 53, 0.08);
    }
    .btn1 {
        background-color: rgb(239, 221, 199);
    }
    @media (max-width: 991px) {
        padding-left: 6.666%;
        padding-right: 6.666%;
        .wrapper1 {
            margin-bottom: 40px;
            height: 860px;
        }
        .wrapper2 {
            height: 860px;
        }
        .wrp {
            max-width: 500px;
            width: 100%;
            padding: 60px 24px;
        }
    }
    @media (max-width: 767px) {
        padding-left: 0;
        padding-right: 0;
        .wrapper1 {
            height: 740px;
        }
        .wrapper2 {
            height: 740px;
        }
    }
`;
const Container = styled.div`
    max-width: 1270px;
    width: 100%;
    display: flex;
    justify-content: space-around;
    @media (max-width: 991px) {
        display: none;
        flex-direction: column;
        align-items: center;
    }
`;

export const BlogSliderContainer = styled.div`
    width: 100%;
    display: block;
    padding-left: 3%;
    padding-right: 3%;

    @media screen and (min-width: 992px) {
        display: none;
    }

    @media screen and (max-width: 479px) {
        padding-right: 7.666%;
        padding-left: 7.666%;
    }

    .slick-dots {
        bottom: -25px !important;
    }
    ${removeOutline}

    ${sliderDots("#242e35")}
`;
export const BlogSlide = styled.div`
    width: 100%;
`;

export const BlogSlideWrapper = styled.div`
    max-width: 370px;
    margin-right: auto;
    margin-bottom: 20px;
    margin-left: auto;
`;

const Description = styled(HeroDescription)`
    @media screen and (max-width: 767px) {
        font-size: 16px;
    }
`
const Title = styled(TopTitle)`
    @media screen and (max-width: 991px) {
        font-size: 36px;
        margin-bottom: 44px !important;
    }
`;


export default YourSolution;
