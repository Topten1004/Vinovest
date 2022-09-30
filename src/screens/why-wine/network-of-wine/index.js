import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import useScrollReveal from "#shared/hooks/useScrollReveal";
import { TopDescription, TopTitle } from "#shared/ui/Typography/styled";
import { FadeFromBottomWithDelay } from "#shared/ui/Animations";
import HandShakeIconSvg from "../assets/HandShakeIcon.svg";
import WorldIconSvg from "../assets/WorldIcon.svg";
import PartyIconSvg from "../assets/PartyIcon.svg";

const NetworkOfWine = () => {
    const ref = React.useRef();
    const { hasRevealed } = useScrollReveal({ ref });
    const runAnimation = hasRevealed ? "runAnimation" : "";
    const { t } = useTranslation("why-wine");

    const mainTitle = (
        <div className={`mainTitle ${runAnimation}`}>
            <TopDescription>{t("why_wine.network.title_1")}</TopDescription>
            <TopTitleToLeft>{t("why_wine.network.description_1")}</TopTitleToLeft>
        </div>
    );

    const yellowBox = (
        <div className={`yellowBox box ${runAnimation}`}>
            <img className="handShakeIconSvg boxImg" src={HandShakeIconSvg} alt="hand shake icon" />
            <Title>{t("why_wine.network.title_2")}</Title>
            <BoxDescription>{t("why_wine.network.description_2")}</BoxDescription>
        </div>
    );

    const blueBox = (
        <div className={`blueBox box ${runAnimation}`}>
            <img className="worldIconSvg boxImg" src={WorldIconSvg} alt="World icon" />
            <Title>{t("why_wine.network.title_3")}</Title>
            <BoxDescription>{t("why_wine.network.description_3")}</BoxDescription>
        </div>
    );

    const redBox = (
        <div className={`redBox box ${runAnimation}`}>
            <img className="partyIconSvg boxImg" src={PartyIconSvg} alt="Party icon" />
            <Title>{t("why_wine.network.title_4")}</Title>
            <BoxDescription>{t("why_wine.network.description_4")}</BoxDescription>
        </div>
    );

    return (
        <Container>
            <div ref={ref}>
                <NetworkOfWineMobile>
                    {mainTitle}
                    {yellowBox}
                    {blueBox}
                    {redBox}
                </NetworkOfWineMobile>
                <NetworkOfWineDesktop>
                    <div className="top">
                        <div className="top__left">
                            {mainTitle}
                            {blueBox}
                        </div>
                        <div className="top__right">{yellowBox}</div>
                    </div>
                    {redBox}
                </NetworkOfWineDesktop>
            </div>
        </Container>
    );
};

const Container = styled.div`
    padding-right: 8.888%;
    padding-left: 8.888%;

    @media screen and (max-width: 991px) {
        padding-right: 6.666%;
        padding-left: 6.666%;
    }
`;

const Title = styled.h3`
    margin: 0;
    margin-top: 20px;
    margin-bottom: 10px;
    font-family: Roslindaledisplaycondensed, sans-serif;
    font-size: 32px;
    line-height: 150%;
    font-weight: 500;
`;

const BoxDescription = styled.div`
    margin-top: 0;
    margin-bottom: 10px;
    font-size: 20px;
    line-height: 160%;
    font-family: Favoritstd, sans-serif;
    font-weight: 500;
`;

const NetworkOfWineMobile = styled.div`
    width: 100%;
    margin: 0 auto;
    padding-top: 130px;
    padding-bottom: 0;
    color: #242e35;
    display: none;

    ${TopDescription} {
        margin-left: auto;
        margin-right: auto;
    }

    .mainTitle {
        text-align: center;
        &.runAnimation {
            animation: ${FadeFromBottomWithDelay} 1.5s ease-out;
        }
    }

    .box {
        max-width: 100%;
        margin-left: 0;
        padding-top: 0;
        padding-bottom: 40px;
        background-color: #e0e5cd;
        &.runAnimation {
            animation: ${FadeFromBottomWithDelay} 1.5s ease-out;
        }

        ${Title}, ${BoxDescription} {
            padding-left: 24px;
            padding-right: 24px;
        }

        ${BoxDescription} {
            font-size: 18px;
        }
    }
    .boxImg {
        position: relative;
        left: 50%;
        top: 0;
        margin-bottom: 40px;
        transform: translateX(-50%);
        width: 105%;
        max-width: 360px;
    }

    .yellowBox {
        margin-top: 163px;
        background-color: #e0e5cd;
        color: #513011;

        .boxImg {
            margin-top: -99px;
        }
    }
    .blueBox {
        margin-top: 216px;
        background-color: #c5d5e4;
        color: #4f1c28;

        .boxImg {
            margin-top: -153px;
        }
    }
    .redBox {
        margin-top: 264px;
        background-color: #e6c9c9;
        color: #3c400c;

        .boxImg {
            margin-top: -200px;
        }
    }

    @media screen and (max-width: 991px) {
        display: block;
    }
`;

const NetworkOfWineDesktop = styled.div`
    max-width: 1184px;
    width: 100%;
    margin: 0 auto;
    padding-top: 312px;
    padding-bottom: 100px;
    color: #242e35;

    display: block;

    @media screen and (max-width: 991px) {
        display: none;
    }

    .top {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;

        &__left {
            display: flex;
            flex-direction: column;
            width: 65%;
        }

        &__right {
            width: 31%;
        }
    }
    .mainTitle {
        margin: auto;
        display: flex;
        justify-content: center;
        flex-direction: column;
        width: 100%;
        max-width: 473px;
        min-height: 535px;

        &.runAnimation {
            animation: ${FadeFromBottomWithDelay} 0.8s ease-out;
        }
    }
    .yellowBox {
        position: relative;
        margin: 0;
        background: #e0e5cd;
        padding: 160px 44px 80px;
        background-color: #e0e5cd;
        color: #513011;

        &.runAnimation {
            animation: ${FadeFromBottomWithDelay} 1.2s ease-out;
        }

        .handShakeIconSvg {
            width: 110%;
            position: absolute;
            top: 0;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }
    .blueBox {
        position: relative;
        padding: 80px 0;
        padding-right: 42px;
        padding-left: 39.69072164948454%;
        background-color: #c5d5e4;
        color: #4f1c28;

        &.runAnimation {
            animation: ${FadeFromBottomWithDelay} 1.6s ease-out;
        }

        .worldIconSvg {
            width: 46.8%;
            position: absolute;
            bottom: 0;
            left: 0;
            transform: translateX(-26%);
        }
    }
    .redBox {
        width: 56.29%;
        padding: 80px 0;
        padding-right: 42px;
        background-color: #e6c9c9;
        margin-top: 128px;
        margin-left: 34.45%;
        color: #3c400c;
        padding-left: 16%;
        position: relative;

        &.runAnimation {
            animation: ${FadeFromBottomWithDelay} 2s ease-out;
        }

        .partyIconSvg {
            width: 46.8%;
            position: absolute;
            top: 10px;
            left: 0;
            transform: translateX(-48%);
        }
    }

    @media screen and (max-width: 991px) {
        margin-top: 160px;
        margin-bottom: 478px;
    }
`;

const TopTitleToLeft = styled(TopTitle)`
    text-align: left;

    @media screen and (max-width: 991px) {
        text-align: center;
    }
`;

export default NetworkOfWine;
