import styled from "styled-components";
import { FadeFromBottomWithDelay } from "#shared/ui/Animations";

export const Wrapper = styled.div`
    position: relative;
    display: flex;
    margin-top: 214px;
    align-items: flex-start;
    width: 100%;
    max-width: 1440px;
    margin-right: auto;
    margin-left: auto;

    @media screen and (max-width: 991px) {
        margin-top: 160px;
        flex-direction: column;
    }

    @media screen and (max-width: 767px) {
        margin-top: 100px;
    }
`;

export const TopSmallTitle = styled.div`
    margin-bottom: 16px;
    font-family: Favoritmonostd, sans-serif;
    font-size: 18px;
    line-height: 177.77%;
    text-transform: uppercase;
`;

export const TopTitle = styled.h2`
    margin-bottom: 48px;
    margin-top: 0;
    margin-bottom: 0;
    font-family: Roslindaledisplaycondensed, sans-serif;
    font-size: 64px;
    line-height: 137%;
    font-weight: 500;

    @media screen and (max-width: 414px) {
        font-size: 50px;
    }
`;

export const MobileTitles = styled.div`
    text-align: center;
    display: none;
    flex-direction: column;
    margin: 0 auto;
    align-items: center;
    padding-bottom: 64px;
    color: #4f1c28;

    @media screen and (max-width: 991px) {
        display: flex;
    }

    @media screen and (max-width: 400px) {
        ${TopTitle} {
            display: none;
        }
    }
`;

export const ImgsWrapper = styled.div`
    display: flex;
    width: 63.05%;
    max-width: 904px;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-end;
    flex: 0 0 auto;

    @media screen and (max-width: 991px) {
        overflow: hidden;
        max-width: 100%;
        width: 100%;
        margin-top: 0;
        margin-right: 0;
        padding-right: 0;
        padding-left: 0;
    }
`;

export const ImgContainer = styled.div`
    background-color: ${({ background }) => background};

    @media screen and (max-width: 991px) {
        &.runAnimation {
            animation: ImgContainerAnimation 0.5s linear;

            @keyframes ImgContainerAnimation {
                0% {
                    transform: translateY(100px);
                    opacity: 0;
                }

                100% {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        }
    }
`;

export const MobileDescriptions = styled.div`
    text-align: center;
    display: none;
    flex-direction: column;
    align-items: center;
    padding-right: 6.666%;
    padding-left: 6.666%;
    ${({ color }) => (color ? `color: ${color};` : "")};
    ${({ background }) => (background ? `background-color: ${background};` : "")};
    padding-bottom: 64px;

    @media screen and (max-width: 991px) {
        display: flex;
    }
`;

export const HowImg = styled.img`
    display: block;
    margin: 0;
    max-width: 904px;
    padding: 0;
    ${({ gup }) => (gup ? `margin-top: ${gup};` : "")};
    ${({ gup }) => (gup ? `margin-bottom: ${gup};` : "")};
    ${({ lastGap }) => (lastGap ? "margin-top: 45px" : "")};

    @media screen and (max-width: 991px) {
        position: relative;
        left: -1%;
        display: block;
        width: 125.86%;
        max-width: none;
        margin: auto;
    }
`;

export const StickyWrapper = styled.div`
    position: sticky;
    width: 580px;
    margin-top: 63px;
    margin-left: -164px;
    padding-top: 70px;
    transform: none;
    color: #4f1c28;
    top: ${({ top }) => top || "144px"};

    @media screen and (max-width: 991px) {
        display: none;
    }
`;

export const Dynamic = styled.div`
    color: #4f1c28;
    margin-top: 20px;
    margin-right: 8px;
    padding-right: 33px;
    padding-left: 33px;
    transition: 0.5s;

    &.runAnimation {
        animation: ${FadeFromBottomWithDelay} ${({ delay }) => `${(delay + 1) * 0.5}s` || "1.8s"} linear;
    }

    &.active {
        background-color: #4f1c28;
        color: #c5d5e4;
        padding-top: 10px;
        padding-bottom: 30px;
        margin-bottom: 48px;
        margin-top: 30px;
        margin-right: 8px;
        padding-right: 33px;
        padding-left: 33px;
    }
`;

export const OptionTitle = styled.h2`
    margin-top: 20px;
    margin-bottom: 10px;
    font-family: Roslindaledisplaycondensed, sans-serif;
    font-size: 32px;
    line-height: 150%;
    font-weight: 500;
`;

export const OptionDescription = styled.p`
    font-family: Favoritstd, sans-serif;
    font-size: 16px;
    line-height: 162%;
    font-weight: 500;
    margin-top: 0;
    margin-bottom: 0;
`;
