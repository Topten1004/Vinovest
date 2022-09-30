import styled, { keyframes } from "styled-components";
import { HeroTitle, HeroDescription, HeroTitleHome } from "#shared/ui/Typography/styled";
import WithLayersButton from "#shared/ui/WithLayersButton";
import checkLight from "../../assets/checkLight.svg";

const bottomAppearAnimation = keyframes`    
    0% {
        transform: translateY(30px);
        opacity: 0;
    }

    50% {
        transform: translateY(30px);
        opacity: 0;
    }

    100% {
        opacity: 1;
        transform: translateY(0);
    }
`;

const titlesSectionAnimation = keyframes`
    0% {
        transform: translateX(-100%);
    }

    100% {
        transform: translateX(0%);
    }
`;

const winesImageSectionAnimation = keyframes`
    0% {
        transform: translateX(100%);
    }

    100% {
        transform: translateX(0%);
    }
`;

const imageWithCountersAnimation = keyframes`
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
`;

const fromRightAppearAnimationLeftBlock = keyframes`
    0% {
        transform: translate(300%, -50%);
        opacity: 0;
    }

    50% {
        transform: translate(300%, -50%);
        opacity: 0;
    }

    70% {        
        opacity: 0;
    }

    100% {
        opacity: 1;
        transform: translate(100%, -50%);
    }
`;

export const HeroDesktopContainer = styled.div`
    position: relative;
    overflow: hidden;
`;

export const List = styled.ul`
    list-style: none;
    padding-left: 0;
    margin-bottom: 36px;
`;

export const TitlesSection = styled.div`
    width: 60%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    color: #efddc7;
    background-color: #242e35;

    &.runAnimation {
        position: relative;
        opacity: 1;
        animation: ${titlesSectionAnimation} 0.5s ease-in-out;
    }

    ${HeroTitle} {
        text-align: left;

        &.runAnimation {
            position: relative;
            animation: ${bottomAppearAnimation} 0.8s linear;
        }
    }

    ${HeroTitleHome} {
        text-align: left;
        margin-top: 120px;
        line-height: 1.16;
        @media screen and (max-width: 1279px) {
            font-size: 58px;
        }
        @media (max-width: 1023px) {
            font-size: 50px;
        }

        &.runAnimation {
            position: relative;
            animation: ${bottomAppearAnimation} 1s linear;
        }
    }

    ${HeroDescription} {
        margin-top: 22px;
        margin-bottom: 12px;
        text-align: left;
        font-size: 16px;
        line-height: 162%;
        max-width: 390px;

        &.runAnimation {
            position: relative;
            animation: ${bottomAppearAnimation} 1.2s linear;
        }
    }

    ${List} {
        &.runAnimation {
            position: relative;
            animation: ${bottomAppearAnimation} 1.2s linear;
        }
    }

    ${WithLayersButton.styled.WithLayers} {
        &.runAnimation {
            position: relative;
            animation: ${bottomAppearAnimation} 1.6s linear;
        }
    }

    .titlesWrapper {
        max-width: 492px;
        margin-right: 20%;
        margin-left: 15.06%;
        height: 670px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        text-align: left;
        @media (max-width: 1220px) {
            margin-right: 10%;
            margin-left: 0;
        }
    }
`;

export const WinesImageSection = styled.div`
    background: #efddc7;
    width: 49%;
    position: absolute;
    top: -30px;
    right: 0;
    display: flex;
    justify-content: flex-start;
    overflow: hidden;
    @media screen and (max-width: 1220px) {
        width: 46%;
    }
    @media screen and (max-width: 1023px) {
        width: 49.2%;
    }

    .imgWrapper {
        width: 1000px;
        height: 600px;
        margin-left: -280px;
        margin-top: 70px;

        .img {
            height: 100%;
        }
    }

    &.runAnimation {
        opacity: 1;
        animation: ${winesImageSectionAnimation} 0.5s ease-in-out;

        .img {
            animation: ${imageWithCountersAnimation} 2s ease-in-out;
        }
    }
`;

export const Trademarks = styled.div`
    width: 86%;
    max-width: 826px;
    position: relative;
    top: 0px;
    justify-content: space-between;
    display: flex;
    margin-right: 0;
    margin-left: auto;
    min-height: 90px;
    padding-right: 5%;
    box-sizing: none;
    flex-wrap: wrap;

    &.runAnimation {
        animation: ${bottomAppearAnimation} 1.2s linear;
    }

    img {
        display: block;
        height: 40px;
        width: 180px;
        margin-bottom: 30px;
    }

    .rightBlock {
        width: 75%;
        position: absolute;
        top: 30%;
        right: 0;
        transform: translate(100%, -50%);
        color: #242e35;
        display: flex;
        align-items: center;
        padding-left: 40px;
        font-family: Roslindaledisplaycondensed, sans-serif;
        font-size: 32px;
        font-weight: 500;

        &.runAnimation {
            animation: ${fromRightAppearAnimationLeftBlock} 1.2s linear;
        }

        img {
            margin: 0;
            object-fit: contain;
            width: 64px;
            margin-right: 17px;
        }
    }
`;

export const ListItem = styled.li`
    margin-bottom: 8px;
    display: flex;
    &:before {
        content: "";
        height: 1em;
        width: 1em;
        display: block;
        margin-right: 20px;
        background-position: center;
        background-repeat: no-repeat;
        background-size: 100%;
        background-image: url(${checkLight});
    }
`;
