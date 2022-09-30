import React from "react";
import { useTranslation } from "react-i18next";
import { range } from "lodash";
import styled from "styled-components";
import DustinPng from "./assets/Dustin.png";
import { useScrollReveal } from "#shared/hooks";
import { FadeFromBottomWithDelay } from "#shared/ui/Animations";

const InvestmentWorthy = () => {
    const { t } = useTranslation("how-works");
    const items = range(1, 7);
    const ref = React.useRef();
    const { hasRevealed } = useScrollReveal({ ref });
    const runAnimation = hasRevealed ? "runAnimation" : "";
    return (
        <Container ref={ref}>
            <Title className={runAnimation}>{t("investmentWorthy.title")}</Title>
            <Wrapper>
                <TextWrapper className={runAnimation}>
                    <Text>{t("investmentWorthy.paragraph1")}</Text>
                    <Text>{t("investmentWorthy.paragraph2")}</Text>
                    <Text>{t("investmentWorthy.paragraph3")}</Text>
                    <List className={runAnimation}>
                        {items.map((item) => (
                            <Item key={item}>{t(`investmentWorthy.list.item${item}`)}</Item>
                        ))}
                    </List>
                </TextWrapper>
                <ImageWrapper className={runAnimation}>
                    <img src={DustinPng} alt="Dustin Wilson" />
                </ImageWrapper>
            </Wrapper>
        </Container>
    );
};

export default InvestmentWorthy;

const Container = styled.div`
    padding-top: 150px;
    padding-bottom: 20px;
    @media screen and (max-width: 991px) {
        padding-top: 60px;
    }
`

const Title = styled.h2`
    max-width: 670px;
    margin: 0 auto 120px;
    font-family: RoslindaleDisplayCondensed;
    font-size: 64px;
    font-weight: 500;
    line-height: 88px;
    text-align: center;
    font-style: normal;
    color: #242e35;
    @media screen and (max-width: 991px) {
        margin-bottom: 44px;
        font-size: 48px;
        line-height: 64px;
    }
    &.runAnimation {
        animation: ${FadeFromBottomWithDelay} 0.8s linear;
    }
`
const Wrapper = styled.div`
    display: flex;
    max-width: 1232px;
    padding-left: 24px;
    padding-right: 24px;
    margin: 0 auto;
    @media screen and (max-width: 991px) {
        flex-direction: column;
        padding: 0;
    }
`
const TextWrapper = styled.div`
    padding-top: 16px;
    padding-right: 74px;
    width: 60%;
    @media screen and (max-width: 991px) {
        width: 100%;
        padding: 0 24px 40px;
    }
    &.runAnimation {
        animation: ${FadeFromBottomWithDelay} 0.8s linear;
    }
`
const ImageWrapper = styled.div`
    width: 40%;
    img {
        max-width: 100%;
    }
    &.runAnimation {
        animation: ${FadeFromBottomWithDelay} 0.8s linear;
    }
    @media screen and (max-width: 991px) {
        width: 100%;
        background: #efddc7;
        display: flex;
        justify-content: center;
    }
`
const Text = styled.p`
    font-family: Favoritstd, sans-serif;
    font-size: 20px;
    font-weight: 400;
    font-style: normal;
    line-height: 32px;
    color: #242e35;
    @media screen and (max-width: 991px) {
        font-size: 16px;
        line-height: 28px;
    }
`
const List = styled.ul`
    &.runAnimation {
        animation: ${FadeFromBottomWithDelay} 0.8s linear;
    }
`

const Item = styled.li`
    font-family: Favoritstd, sans-serif;
    font-size: 20px;
    font-weight: 400;
    font-style: normal;
    line-height: 32px;
    color: #242e35;
    @media screen and (max-width: 991px) {
        font-size: 16px;
        line-height: 28px;
    }
`