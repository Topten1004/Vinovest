import styled from "styled-components";
import { FadeFromBottomWithDelay } from "#shared/ui/Animations";
import { sliderDots, removeOutline } from "../helpers";

export const Wrapper = styled.div`
    position: relative;
    width: 100%;
    margin-right: auto;
    margin-left: auto;

    .fillArea {
        position: absolute;
        left: 8.888%;
        right: 8.888%;
        bottom: 0;
        height: calc(100% - 100px);

        &:before {
            content: " ";
            position: absolute;
            background-color: #e0e5cd;
            max-width: 1184px;
            margin: 0 auto;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
        }

        @media screen and (max-width: 767px) {
            left: 6.666%;
            right: 6.666%;
            height: calc(100% - 148px);
        }
    }

    @media screen and (max-width: 991px) {
        margin-top: 160px;
        flex-direction: column;
    }

    @media screen and (max-width: 767px) {
        margin-top: 0px;
    }
`;

export const TitleWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin: 0 auto;
    color: #513011;
    position: relative;

    @media screen and (max-width: 767px) {
        padding-right: 6.666%;
        padding-left: 6.666%;
    }
`;

export const SlickWrapper = styled.div`
    padding-top: 124px;

    &.runAnimation {
        animation: testimonialsBottomFade 0.9s linear;

        @keyframes testimonialsBottomFade {
            0% {
                transform: translateY(20%);
            }

            100% {
                transform: translateY(0%);
            }
        }
    }
    overflow: hidden;

    .container {
        padding-bottom: 115px;
        max-width: 816px;
        margin: 0 auto;
    }
    .slick-dots {
        bottom: -75px !important;
    }

    ${sliderDots("#513011")};
    ${removeOutline};

    .slick-list {
        overflow: visible;
    }

    @media screen and (max-width: 991px) {
        .container {
            max-width: 100%;
        }
    }
`;

export const SlideWrapper = styled.div``;

export const SlideContainer = styled.div`
    background-color: #4f1c28;
    color: #c5d5e4;
    margin-right: 20px;
    margin-left: 20px;
    padding: 48px;
    background-color: #4f1c28;
    color: #c5d5e4;
    display: flex;
    font-family: Roslindaledisplaycondensed, sans-serif;
    line-height: 150%;
    font-size: 34px;
    font-weight: 500;
    align-items: start;
    position: relative;

    .topTitle {
        position: absolute;
        left: auto;
        top: -27px;
        right: 48px;
        bottom: auto;
        padding: 12px 32px;
        background-color: #e6c9c9;
        color: #242e35;
        font-size: 18px;
        font-family: Favoritmonostd, sans-serif;
        line-height: 177.77%;
        text-transform: uppercase;

        a {
            text-decoration: none;
            color: inherit;
            white-space: nowrap;

            &:hover {
                cursor: pointer;
            }
        }

        @media screen and (max-width: 991px) {
            right: 50%;
            transform: translateX(50%);
        }
    }

    &.box0 {
        background-color: #3c400c;
        color: #e6c9c9;
        font-size: 22px;

        .topTitle {
            background-color: #e6c9c9;
        }
    }

    &.box1 {
        background-color: #242e35;
        color: #efddc7;
        font-size: 34px;

        .topTitle {
            background-color: #efddc7;
        }

        @media screen and (max-width: 991px) {
            font-size: 24px;
        }
    }

    &.box2 {
        background-color: #4f1c28;
        color: #c5d5e4;
        font-size: 28px;

        .topTitle {
            background-color: #c5d5e4;
        }
    }

    .img {
        margin-top: 20px;
        object-fit: contain;
        width: 100%;
        max-width: 240px;
        margin-right: 48px;
    }

    .message {
        margin-left: 48px;

        .description {
            margin-top: 20px;
            margin-bottom: 10px;
        }

        .bottomText {
            font-family: Favoritmonostd, sans-serif;
            font-size: 18px;
            line-height: 177.77%;
            text-transform: uppercase;

            @media screen and (max-width: 991px) {
                display: flex;
                flex-direction: column;
                margin: 0 auto;
                align-items: center;
            }
        }
    }

    @media screen and (max-width: 991px) {
        flex-direction: column;
        align-items: center;
        text-align: center;
        margin: 0;

        .img {
            margin-right: 0;
            margin-bottom: 40px;
        }

        .message {
            margin-left: 0;
        }
    }
    @media screen and (max-width: 768px) {
        .img {
            max-width: 180px;
        }
    }
`;

export const TopSmallTitle = styled.div`
    margin-bottom: 24px;
    font-family: Favoritmonostd, sans-serif;
    font-size: 18px;
    line-height: 177.77%;
    text-transform: uppercase;

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
`;
