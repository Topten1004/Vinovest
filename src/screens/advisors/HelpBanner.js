import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { TopTitle } from "#shared/ui/Typography/styled";
import WithLayersButton from "#shared/ui/WithLayersButton";
import bottle from "./images/bottle.svg";
import twoBottles from "./images/twoBottles.svg";
import { useMobile } from "#shared/hooks";

const HelpBanner = () => {
    const { t } = useTranslation("advisors");
    const isMobile = useMobile(991);
    const onBookACall = () => {
        window.open(
            "https://docs.google.com/forms/d/1om-ntH2ojKsQjemPYyUok2TacEKATkpfKMugt9dS4yg/viewform?edit_requested=true",
            "_blank",
        );
    };
    return (
        <Container>
            <Wrapper>
                <Title>{t("banner.title")}</Title>
                <Subtitle>{t("banner.subtitle")}</Subtitle>
                <ButtonWrapper>
                    <WithLayersButton colors={["rgb(36, 46, 53)", "rgb(197, 213, 228)"]} onClick={onBookACall}>
                        {t("header.btn")}
                    </WithLayersButton>
                </ButtonWrapper>
                <TwoBottles src={twoBottles} alt="two bottles" />
                {!isMobile && <OneBottle src={bottle} alt="two bottles" />}
            </Wrapper>
        </Container>
    );
};

export default HelpBanner;

const Container = styled.div`
    width: 100%;
    position: relative;
    &:before {
        content: " ";
        display: block;
        position: absolute;
        height: 36%;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: #242e35;
        z-index: 0;
        @media screen and (max-width: 991px) {
            height: 42%;
        }
    }
`;

const Wrapper = styled.p`
    max-width: 980px;
    background: #c5d5e4;
    padding: 50px 92px 80px;
    position: relative;
    margin: 0 auto;
    z-index: 1;

    @media screen and (max-width: 1200px) {
        max-width: 880px;
    }
    @media screen and (max-width: 991px) {
        padding: 60px 72px 270px;
        margin-left: 6%;
        margin-right: 6%;
    }

    @media screen and (max-width: 576px) {
        padding: 60px 16px 270px;
    }
`;
const Title = styled(TopTitle)`
    margin-bottom: 60px;
    @media screen and (max-width: 1280px) {
        font-size: 58px;
    }
    @media screen and (max-width: 1024px) {
        font-size: 54px;
    }
    @media screen and (max-width: 991px) {
        font-size: 36px;
        line-height: 46px;
    }
`;
const Subtitle = styled.p`
    color: #242e35;
    font-size: 20px;
    line-height: 32px;
    text-align: center;
    margin-top: 0;
    margin-bottom: 46px;
    @media screen and (max-width: 991px) {
        margin-bottom: 60px;
    }
    @media screen and (max-width: 991px) {
        max-width: 320px;
        margin-left: auto;
        margin-right: auto;
        font-size: 20px;
        line-height: 32px;
    }
    @media screen and (max-width: 576px) {
        max-width: 224px;
    }
`;
const ButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
`;
const TwoBottles = styled.img`
    position: absolute;
    left: 70px;
    bottom: 0;
    @media screen and (max-width: 991px) {
        left: 50%;
        margin-left: -58px;
    }
`;
const OneBottle = styled.img`
    position: absolute;
    bottom: -28px;
    right: 24px;
`;
