import styled from "styled-components";
import { animated } from "react-spring";
import { FadeAnimation } from "../assets/basicStyles";

export const Wrapper = styled.div`
    background-color: #f3f7fa;
    width: 100%;
    overflow: hidden;
    position: relative;
`;

export const HeroContainer = styled.div`
    width: 100%;
    max-width: 1440px;
    margin: 0 auto;
    padding: 96px 130px 61px 135px;
    display: flex;
    justify-content: space-between;
    background-repeat: no-repeat;
    background-position: top 130px right 130px;
    position: relative;
    background-size: 688px;
    z-index: 1;

    @media screen and (max-width: 767px) {
        padding: 31px 36px 0;
        flex-direction: column;
        align-items: center;
        text-align: center;
        background-position: center bottom 62.85px;
        background-size: 340px;
    }
    @media screen and (min-width: 768px) and (max-width: 1024px) {
        background-position: top 100px right;
        padding: 73px 58px 63px 71px;
        background-size: 504px;
    }
`;
export const HeroLeftSide = styled.div`
    max-width: 480px;
    p {
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 26px;
        letter-spacing: 0.005em;
        color: #384147;
        margin-bottom: 45px;
        font-family: VinovestMedium;
    }
    h1 {
        margin: 0;
        font-family: RoslindaleDisplayCondensed;
        font-style: normal;
        font-weight: 500;
        font-size: 64px;
        line-height: 84px;
        margin-bottom: 19px;
        display: inline-flex;

        &.lowerCase {
            font-size: 45px;
            line-height: 60px;
        }
    }
    @media screen and (max-width: 767px) {
        max-width: 100%;
        width: 100%;
        padding-bottom: 0;
        h1 {
            width: 100%;
            font-size: 32px;
            line-height: 41px;
            text-align: center;
            display: flex;
            justify-content: center;
            margin-bottom: 18px;
        }
    }
    @media screen and (min-width: 768px) and (max-width: 1024px) {
        padding-bottom: 0;
        p {
            font-size: 14px;
            line-height: 21px;
            margin: 0;
        }
        h1 {
            font-size: 36px;
            line-height: 54px;
            margin-bottom: 23px;
        }
    }
`;

export const Capture = styled(animated.div)`
    font-family: VinovestMono;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 18px;
    letter-spacing: 0.025em;
    text-transform: uppercase;
    color: #4f1c28;
    margin-bottom: 15px;
    @media screen and (max-width: 767px) {
        font-size: 11px;
        line-height: 16px;
        text-align: center;
        letter-spacing: 0.025em;
        margin-bottom: 11px;
    }
    @media screen and (min-width: 768px) and (max-width: 1024px) {
        font-size: 11px;
        line-height: 16px;
        margin-bottom: 7px;
    }
`;
export const HeroButtons = styled(animated.div)`
    display: flex;
`;

export const LearnMoreButton = styled.button`
    font-family: VinovestMono;
    border: 1px solid #a8abad;
    background: none;
    color: #242e35;
    width: 151px;
    height: 44px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    font-weight: 500;
    font-size: 14px;
    line-height: 18px;
    font-style: normal;
    transition: 0.5s;
    margin-bottom: 21px;
    padding-top: 2px;
    &:hover {
        cursor: pointer;
        opacity: 0.6;
    }
    &:disabled {
        cursor: default;
        opacity: 0.6;
    }
    @media screen and (min-width: 768px) and (max-width: 1024px) {
        margin-top: 23px;
        margin-bottom: 0px;
        font-size: 11px;
        line-height: 16px;
        width: 151px;
        height: 36px;
    }
`;
export const LearnMoreButtonMobile = styled(LearnMoreButton)`
    font-size: 14px;
    line-height: 18px;
    height: 36px;
    margin-top: 22px;
`;

export const ImageContainer = styled.div`
    display: flex;
    justify-content: center;
    height: fit-content;
    img {
        object-fit: contain;
        height: 455px;
        width: 455px;
        @media screen and (min-width: 768px) and (max-width: 1024px) {
            width: 374px;
            height: 349px;
        }
    }
    @media screen and (max-width: 767px) {
        position: relative;
        top: 0;
        right: 0;
        width: 252.97px;
        flex-shrink: 0;
        height: 252.97px;
        img {
            height: 252.97px;
        }
    }
`;

export const BottleWrapper = styled(ImageContainer)`
    position: relative;
    right: 100px;
    height: fit-content;

    @media screen and (max-width: 767px) {
        position: relative;
        top: 0;
        right: 0;
    }

    @media screen and (min-width: 768px) and (max-width: 1024px) {
        right: -8px;
        top: -22px;
    }
`;

export const AnimationContainer = styled.div`
    height: 151px;
    width: 151px;
    position: absolute;
    bottom: -29px;
    right: -107.5px;

    @media screen and (max-width: 767px) {
        height: 70px;
        width: 70px;
        bottom: -10px;
        right: -55px;
    }
    @media screen and (max-width: 374px) {
        right: -35px;
    }
    @media screen and (min-width: 768px) and (max-width: 1024px) {
        height: 120px;
        width: 120px;
        right: -20px;

        .svgTextScore {
            font-size: 30px;
        }
    }
`;

export const BackgroundAnimation = styled(animated(HeroContainer))`
    position: absolute;
    bottom: 0px;
    right: 0px;
    top: 0;
    left: 0;
    z-index: 0;
    background-color: #f3f7fa;
    ${FadeAnimation};
`;
