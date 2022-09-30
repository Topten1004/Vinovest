import styled, { keyframes } from "styled-components";
import { HeroTitle, HeroDescription } from "#shared/ui/Typography/styled";
import WithLayersButton from "#shared/ui/WithLayersButton";
import checkDark from "../../assets/checkDark.svg";

export const bottomAppearAnimation = keyframes`
    0% {
        transform: translateY(50px);
        opacity: 0;
    }

    50% {
        transform: translateY(50px);
        opacity: 0;
    }

    100% {
        opacity: 1;
        transform: translateY(0);
    }
`;

export const leftAppearAnimation = keyframes`
    0% {
        transform: translateX(-200%);
        opacity: 0;
    }

    100% {
        opacity: 1;
        transform: translateX(0);
    }
`;

export const rightAppearAnimation = keyframes`
    0% {
        transform: translateX(200%);
        opacity: 0;
    }

    100% {
        opacity: 1;
        transform: translateX(0);
    }
`;

export const HeroMobileContainer = styled.div`
    position: relative;
    overflow: hidden;
`;
export const List = styled.ul`
    list-style: none;
    padding-left: 0;
    margin-bottom: 28px;
`;

export const TitlesSection = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    color: #242e35;
    background-color: #efddc7;
    padding: 120px 6.666% 40px;

    ${HeroTitle} {
        font-size: 45px;
        @media (max-width: 540px) {
            text-align: left;
        }
        &.runAnimation {
            animation: ${bottomAppearAnimation} 0.8s linear;
        }
    }

    ${HeroDescription} {
        margin-top: 24px;
        margin-bottom: 40px;
        font-size: 16px;
        margin-bottom: 8px;

        &.runAnimation {
            animation: ${bottomAppearAnimation} 1.2s linear;
        }
    }
    ${List} {
        &.runAnimation {
            animation: ${bottomAppearAnimation} 1.2s linear;
        }
    }

    ${WithLayersButton.styled.WithLayers} {
        margin: 0 auto;

        &.runAnimation {
            animation: ${leftAppearAnimation} 0.5s linear;
        }
    }

    .titlesWrapper {
        max-width: 475px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
    }

    @keyframes titlesSectionAnimation {
        0% {
            margin-left: -100%;
            opacity: 0;
        }

        100% {
            opacity: 1;
            margin-left: 0%;
        }
    }
`;

export const WinesImageSection = styled.div`
    background: #efddc7;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    overflow: hidden;

    .imgWrapper {
        position: relative;
        width: 120%;
        margin-left: -20%;

        @media screen and (max-width: 479px) {
            margin-left: -158px;
        }

        .img {
            width: 921px;
            margin: 0 auto;
            display: block;

            @media screen and (max-width: 767px) {
                width: 576px;
            }
        }

        &.runAnimation {
            animation: winesImageSectionAnimation 1s linear;
        }

        @keyframes winesImageSectionAnimation {
            0% {
                opacity: 0;
            }

            100% {
                opacity: 1;
            }
        }
    }
`;
export const Trademarks = styled.div`
    display: flex;
    background-color: #efddc7;

    .gup {
        width: 7%;
        background-color: #efddc7;

        @media screen and (max-width: 767px) {
            display: none;
        }
    }
    .list {
        width: 54%;
        max-width: 826px;
        position: relative;
        display: grid;
        padding: 48px 0;
        flex-direction: column;
        grid-auto-columns: 1fr;
        grid-column-gap: 56px;
        grid-row-gap: 48px;
        grid-template-columns: 1fr;
        grid-template-rows: auto;
        padding: 48px 0;
        box-sizing: none;
        background-color: #242e35;

        &.runAnimation {
            animation: listFromLeftAnimation 0.5s linear;
        }

        @keyframes listFromLeftAnimation {
            0% {
                transform: translateX(-100%);
                opacity: 0;
            }

            100% {
                opacity: 1;
                transform: translateX(0%);
            }
        }

        @media screen and (max-width: 767px) {
            width: 68%;
            padding-top: 24px;
            padding-bottom: 24px;
            align-items: center;
        }

        @media screen and (max-width: 479px) {
            padding-right: 12.26%;
            padding-left: 12.26%;
        }

        img {
            display: block;
            height: 40px;
            width: 180px;
            margin: 0 auto;

            &.runAnimation {
                animation: ${bottomAppearAnimation} 1s linear;
            }

            @keyframes ${bottomAppearAnimation}LeftBlock {
                0% {
                    transform: translate(300%, -50%);
                    opacity: 0;
                }

                50% {
                    transform: translate(300%, -50%);
                    opacity: 0;
                }

                100% {
                    opacity: 1;
                    transform: translate(100%, -50%);
                }
            }
            @media screen and (max-width: 767px) {
                height: 32px;
                margin-top: 24px;
                margin-bottom: 24px;
            }

            @media screen and (max-width: 479px) {
                height: auto;
                max-height: 37px;
                margin-top: 0;
                margin-bottom: 0;
            }
        }
    }

    .text {
        background-color: #fff;
        width: 39%;
        font-size: 32px;
        font-family: Roslindaledisplaycondensed, sans-serif;
        font-weight: 500;
        padding: 90px 40px 74px;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;

        span {
            &.runAnimation {
                animation: ${rightAppearAnimation} 0.5s linear;
            }
        }

        @media screen and (max-width: 767px) {
            width: 37%;
            writing-mode: vertical-lr;
            padding: 30.75px 0 16px;
        }
    }
`;

export const ListItem = styled.li`
    margin-bottom: 20px;
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
        background-image: url(${checkDark});
    }
`;


