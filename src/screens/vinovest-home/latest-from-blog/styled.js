import styled from "styled-components";
import { FadeFromBottomWithDelay } from "#shared/ui/Animations";
import { sliderDots, removeOutline } from "../helpers";

export const Wrapper = styled.div`
    position: relative;
    width: 100%;
    margin-right: auto;
    margin-left: auto;
    padding-top: 224px;
    padding-bottom: 100px;

    @media screen and (max-width: 991px) {
        padding-top: 160px;
    }

    @media screen and (max-width: 767px) {
        padding-top: 100px;
    }
`;

export const TitleWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin: 0 auto;
    color: #242e35;
    position: relative;

    @media screen and (max-width: 767px) {
        padding-right: 10px;
        padding-left: 10px;
    }
`;

export const BottomDescription = styled.div`
    max-width: 600px;
    margin-top: 24px;
    margin-bottom: 40px;
    font-size: 20px;
    line-height: 160%;
    font-family: Favoritstd, sans-serif;

    font-weight: 500;

    &.runAnimation {
        animation: ${FadeFromBottomWithDelay} 0.5s linear;
    }
`;

export const TopTitle = styled.h2`
    margin-bottom: 48px;
    margin-top: 0;
    margin-bottom: 0;
    font-family: Roslindaledisplaycondensed, sans-serif;
    font-size: 64px;
    line-height: 137%;
    font-weight: 500;
    max-width: 684px;
    width: 100%;

    &.runAnimation {
        animation: ${FadeFromBottomWithDelay} 0.7s linear;
    }

    @media screen and (max-width: 767px) {
        font-size: 48px;
    }

    @media screen and (max-width: 410px) {
        max-width: 260px;
    }
`;

export const BlogListContainer = styled.div`
    width: 100%;
    max-width: 1440px;
    margin-right: auto;
    margin-left: auto;

    @media screen and (max-width: 991px) {
        display: none;
    }
`;

export const BlogListWrapper = styled.div`
    display: grid;
    margin-top: 80px;
    align-items: stretch;
    grid-auto-columns: 1fr;
    grid-column-gap: 40px;
    grid-row-gap: 16px;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: auto;
    margin-right: 5.888%;
    margin-left: 5.888%;

    @media only screen and (max-width: 1300px) {
        margin-left: 3%;
        margin-right: 3%;
    }

    @media only screen and (max-width: 1300px) {
        margin-left: 2%;
        margin-right: 2%;
    }

    @media screen and (max-width: 767px) {
    }
`;

export const BlogSliderContainer = styled.div`
    width: 100%;
    display: block;
    margin-top: 74px;
    padding-left: 3%;
    padding-right: 3%;

    .reader {
        display: block;
        margin: 0 auto;
    }

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
