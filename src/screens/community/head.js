import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { TopTitle } from "#shared/ui/Typography/styled";
import useScrollReveal from "#shared/hooks/useScrollReveal";
import { FadeFromBottomWithDelay } from "#shared/ui/Animations";
import MainButton from "#shared/ui/Button/MainButton.styled";
import backgroundLeft from "./assets/background-left.svg";
import backgroundRight from "./assets/background-right.svg";
import backgroundMobile from "./assets/background-mobile.svg";

const Head = () => {
    const ref = React.useRef();
    const { hasRevealed } = useScrollReveal({ ref });
    const runAnimation = hasRevealed ? "runAnimation" : "";
    const { t } = useTranslation("community");
    const joinVinovest = () => {
        window.location.href = "https://login.circle.so/sign_up?request_host=vinovest.circle.so";
    };

    return (
        <HowItWorksHeadContainer ref={ref}>
            <TopTitle className={runAnimation}>{t("welcome")}</TopTitle>{" "}
            <p className={runAnimation}>{t("welcome-text")}</p>
            <JoinUsBtn className={runAnimation} onClick={joinVinovest}>
                {t("button")}
            </JoinUsBtn>
        </HowItWorksHeadContainer>
    );
};

export default Head;

const HowItWorksHeadContainer = styled.div`
    padding-top: 90px;
    padding-right: 8.888%;
    padding-left: 8.888%;
    padding-bottom: 118px;
    text-align: center;
    background-color: #fff7ef;
    background-image: url(${backgroundLeft}), url(${backgroundRight});
    background-repeat: no-repeat, no-repeat;
    background-position: left, right;

    @media screen and (max-width: 1024px) {
        padding-bottom: 380px;
        padding-right: 6.666%;
        padding-left: 6.666%;
        background-image: url(${backgroundMobile});
        background-repeat: no-repeat;
        background-position: bottom center;
    }
    @media screen and (max-width: 767px) {
        padding-top: 46px;
    }

    p {
        font-size: 16px;
        text-align: center;
        line-height: 26px;
        max-width: 455px;
        margin: 30px auto 34px auto;
        &.runAnimation {
            animation: ${FadeFromBottomWithDelay} 0.8s linear;
        }
        @media screen and (max-width: 767px) {
            font-size: 14px;
            max-width: 272px;
            margin-bottom: 26px;
        }
    }

    ${TopTitle} {
        max-width: 400px;
        font-size: 45px;
        margin: 0 auto 26px;
        &.runAnimation {
            animation: ${FadeFromBottomWithDelay} 0.8s linear;
        }
        @media screen and (max-width: 767px) {
            font-size: 32px;
            margin-bottom: 16px;
            max-width: 287px;
        }
    }
`;

const JoinUsBtn = styled(MainButton)`
    width: 180px;
    height: 60px;
    margin: 0 auto;
    &.runAnimation {
        animation: ${FadeFromBottomWithDelay} 0.8s linear;
    }
    @media screen and (max-width: 576px) {
        width: 100%;
    }
`;
