import React, { useRef } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import { useTranslation } from "react-i18next";
import { recomendedIcons, slidesData } from "./data";
import Arrow from "./Arrow";

const SocialProofSlider = () => {
    const { t } = useTranslation("login");
    const sliderRef = useRef(null);
         
    const pauseAutoplay = () => {
        sliderRef.current.slickPause();
    };
    return (
        <Wrapper>
            <TopTitle>{t("slider.title")}</TopTitle>
            <Slider
                ref={sliderRef}
                className="slider-container"
                accessibility
                infinite
                autoplay={true}
                speed={2000}
                autoplaySpeed={10000}
                slidesToShow={1}
                slidesToScroll={1}
                nextArrow={<Arrow type="next" pause={pauseAutoplay} />}
                prevArrow={<Arrow type="prev" pause={pauseAutoplay} />}
                onSwipe={() => sliderRef.current.slickPause()}
            >
                {slidesData.map(({ id, text, author, image, stars, width }) => (
                    <SlideWrapper key={id}>
                        <SliderContainer>
                            <img style={{ width: 154 }} src={stars} />
                            {Array.isArray(text) ? <Text>{text[0]}<span style={{color: "#A86D37"}}>{text[1]}</span>{text[2]}</Text> : <Text>{text}</Text>}
                            {author ? (
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <Author>{author}</Author>
                                    <img src={image} style={{ width: width ? width : "auto" }} />
                                </div>
                            ) : (
                                <div style={{ display: "flex", justifyContent: "center" }}>
                                    <img src={image} style={{ width: width ? width : "auto" }} />
                                </div>
                            )}
                        </SliderContainer>
                    </SlideWrapper>
                ))}
            </Slider>
            <RecommendedBy>
                <RecommmendedTitle>{t("slider.recommended")}</RecommmendedTitle>
                <RecommendedIcons>
                    {recomendedIcons.map((item) => (
                        <img key={item.id} src={item.src} alt={item.alt} />
                    ))}
                </RecommendedIcons>
            </RecommendedBy>
        </Wrapper>
    );
};

export default SocialProofSlider;

const Wrapper = styled.div`
    padding-top: 24px;
    display: flex;
    flex-direction: column;
    height: 100%;
    @media screen and (min-width: 768px) {
        padding-top: 58px;
    }
    .slider-container {
        width: 514px;
        margin: 0 auto;
        margin-bottom: 70px;
        @media screen and (max-width: 514px) {
            width: 100%;
            margin-bottom: 35px;
        }
    }
    .prevArrow {
        position: absolute;
        transform: translateY(-50%);
        top: 50%;
        z-index: 10;
        cursor: pointer;
        @media screen and (max-width: 767px) {
            display: none !important;
        }
    }

    .nextArrow {
        position: absolute;
        transform: translateY(-50%);
        top: 50%;
        z-index: 10;
        right: 0;
        cursor: pointer;
        @media screen and (max-width: 767px) {
            display: none !important;
        }
    }
`;

const TopTitle = styled.h2`
    margin-bottom: 48px;
    margin-top: 0;
    margin-bottom: 0;
    font-family: Roslindaledisplaycondensed, sans-serif;
    font-size: 20px;
    line-height: 1.6;
    font-weight: 500;
    color: #242e35;
    text-align: center;
    margin-bottom: 21px;
    @media screen and (min-width: 768px) {
        font-size: 36px;
        line-height: 1.5;
        margin-bottom: 30px;
    }
`;

const RecommendedBy = styled.div`
    background-color: #fff4e8;
    padding: 25px 16px 35px;
    margin-top: auto;
    @media screen and (min-width: 768px) {
        padding: 38px 54px 92px;
    }
`;

const RecommmendedTitle = styled.h2`
    margin-top: 0;
    margin-bottom: 20px;
    font-family: Roslindaledisplaycondensed, sans-serif;
    font-size: 20px;
    line-height: 1.6;
    font-weight: 500;
    color: #242e35;
    text-align: center;
    @media screen and (min-width: 768px) {
        margin-bottom: 40px;
    }
`;

const RecommendedIcons = styled.div`
    display: flex;
    justify-content: space-between;
    img {
        width: 60px;
        height: 20px;
        @media screen and (min-width: 768px) {
            width: auto;
            height: auto;
        }
    }
`;

const SlideWrapper = styled.div``;

const SliderContainer = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 372px;
    height: 310px;
    background-color: #ffffff;
    border-radius: 21px;
    padding: 35px 33px 28px;
    margin: 0 auto;
    @media screen and (max-width: 376px) {
        max-width: 343px;
    }
`;

const Text = styled.p`
    font-size: 14px;
    font-family: VinovestMedium, sans-serif;
    line-height: 21px;
    flex-grow: 1;
`;

const Author = styled.p`
    font-family: Roslindaledisplaycondensed, sans-serif;
    font-size: 16px;
`;

