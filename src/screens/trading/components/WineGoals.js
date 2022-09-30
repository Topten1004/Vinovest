import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import WithLayersButton from "#shared/ui/WithLayersButton";
import goals from "../assets/goals.svg";
import goalsMobile from "../assets/goals-mobile.svg";
import bottle from "../assets/bottle.svg";
import { useMobile, useCreateRoutingCallback } from "#shared/hooks";
import { ROUTE_PATHS } from "../../route-paths";

const WineGoals = () => {
    const { t } = useTranslation("trading");

    const isMobile = useMobile(991);
    const collectionsRedirect = useCreateRoutingCallback(ROUTE_PATHS.collections, { refresh: true });

    return (
        <Wrapper>
            <Title>{t("wine-goals.title")}</Title>
            <ContentWrapper>
                <ImageWrap>
                    <img src={isMobile ? goalsMobile : goals} alt="bottles of wine" />
                    {!isMobile && <Bottle src={bottle} alt="bottle" />}
                </ImageWrap>
                <TextWrap>
                    <Paragraph>{t("wine-goals.paragraph1")}</Paragraph>
                    <Paragraph>{t("wine-goals.paragraph2")}</Paragraph>
                    <Paragraph>{t("wine-goals.paragraph3")}</Paragraph>
                </TextWrap>
            </ContentWrapper>
            <ButtonWrap>
                <WithLayersButton onClick={() => collectionsRedirect()} colors={["#242E35", "#ffffff"]}>
                    {t("wine-goals.button")}
                </WithLayersButton>
            </ButtonWrap>
        </Wrapper>
    );
};
export default WineGoals;

const Wrapper = styled.div`
    padding-top: 100px;
    padding-bottom: 30px;
    @media screen and (max-width: 991px) {
        padding-bottom: 10px;
        padding-top: 12px;
    }
`;

const Title = styled.h2`
    font-family: Roslindaledisplaycondensed, sans-serif;
    font-size: 45px;
    line-height: 60px;
    color: #242e35;
    text-align: center;
    margin-bottom: 74px;
    @media screen and (max-width: 991px) {
        font-size: 32px;
        line-height: 41px;
        margin-bottom: 40px;
        max-width: 250px;
        margin-left: auto;
        margin-right: auto;
    }
`;
const ContentWrapper = styled.div`
    display: flex;
    max-width: 1066px;
    margin: 0 auto;
    margin-bottom: 87px;
    @media screen and (max-width: 991px) {
        flex-direction: column;
        padding-left: 16px;
        padding-right: 16px;
        margin-bottom: 40px;
    }
`;
const TextWrap = styled.div`
    padding-left: 37px;
    width: 50%;
    @media screen and (max-width: 991px) {
        width: 100%;
        padding-left: 0;
    }
`;

const Paragraph = styled.p`
    font-family: VinovestMedium;
    font-size: 18px;
    line-height: 28px;
`;
const ImageWrap = styled.div`
    padding-right: 37px;
    position: relative;
    img {
        max-width: 100%;
    }
    @media screen and (max-width: 991px) {
        text-align: center;
        img {
            width: 100%;
        }
    }
`;
const Bottle = styled.img`
    width: 200px;
    position: absolute;
    bottom: 60px;
    left: -60px;
    @media screen and (max-width: 991px) {
        right: 90%;
        width: 180px;
    }
`;

const ButtonWrap = styled.div`
    display: flex;
    justify-content: center;
`;
