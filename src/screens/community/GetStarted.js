import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { TopTitle } from "#shared/ui/Typography/styled";
import MainButton from "#shared/ui/Button/MainButton.styled";
import step1 from "./assets/step1.svg";
import step2 from "./assets/step2.svg";
import step3 from "./assets/step3.svg";
import step4 from "./assets/step4.svg";

const GetStarted = () => {
    const { t } = useTranslation("community");
    const joinVinovest = () => {
        window.location.href = "https://login.circle.so/sign_up?request_host=vinovest.circle.so";
    };
    return (
        <Wrapper>
            <Title>{t("get-started")}</Title>
            <Grid>
                <GridItemInfo className="item1">
                    <Subtitle>{t("step1.subtitle")}</Subtitle>
                    <StepTitle>{t("step1.title")}</StepTitle>
                    <Text>{t("step1.text")}</Text>
                </GridItemInfo>
                <GridItem className="item2">
                    <img src={step1} alt="" />
                </GridItem>
                <GridItem className="item3">
                    <img src={step2} alt="" />
                </GridItem>
                <GridItemInfo className="item4">
                    <Subtitle>{t("step2.subtitle")}</Subtitle>
                    <StepTitle>{t("step2.title")}</StepTitle>
                    <Text className="wider">{t("step2.text")}</Text>
                </GridItemInfo>
                <GridItemInfo className="item5">
                    <Subtitle>{t("step3.subtitle")}</Subtitle>
                    <StepTitle>{t("step3.title")}</StepTitle>
                    <Text>{t("step3.text")}</Text>
                </GridItemInfo>
                <GridItem className="item6">
                    <img className="img-column1" src={step3} alt="" />
                </GridItem>
                <GridItem className="item7">
                    <img className="img-column2" src={step4} alt="" />
                </GridItem>
                <GridItemInfo className="item8">
                    <Subtitle>{t("step4.subtitle")}</Subtitle>
                    <StepTitle>{t("step4.title")}</StepTitle>
                    <Text className="wider">{t("step4.text")}</Text>
                </GridItemInfo>
            </Grid>
            <JoinUsBtn onClick={joinVinovest}>{t("button")}</JoinUsBtn>
        </Wrapper>
    );
};

export default GetStarted;

const Wrapper = styled.div`
    padding-top: 70px;
    padding-bottom: 87px;
    @media screen and (max-width: 991px) {
        padding-left: 24px;
        padding-right: 24px;
        padding-top: 36px;
    }
`;

const Title = styled(TopTitle)`
    font-size: 45px;
    line-height: 60px;
    margin: 0 auto 96px;
    @media screen and (max-width: 991px) {
        margin-bottom: 42px;
    }
    @media screen and (max-width: 767px) {
        font-size: 32px;
        line-height: 41px;
    }
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    max-width: 980px;
    margin: 0 auto 126px;
    column-gap: 80px;
    row-gap: 30px;
    @media screen and (max-width: 991px) {
        grid-template-columns: 1fr;
        column-gap: 0;
        max-width: 326px;
        margin-bottom: 75px;
        .item1 {
            order: 0;
        }
        .item2 {
            order: 1;
        }
        .item3 {
            order: 3;
        }
        .item4 {
            order: 2;
        }
        .item5 {
            order: 4;
        }
        .item6 {
            order: 5;
        }
        .item7 {
            order: 7;
        }
        .item8 {
            order: 6;
        }
    }
`;

const GridItem = styled.div``;

const GridItemInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`;

const Subtitle = styled.p`
    font-family: VinovestMono;
    font-size: 14px;
    line-height: 18px;
    color: #242e35;
    text-transform: uppercase;
    margin-top: 10px;
    margin-bottom: 10px;
`;

const StepTitle = styled.h4`
    font-family: RoslindaleDisplayCondensed;
    font-size: 36px;
    line-height: 54px;
    margin: 0;
    color: #242e35;
    @media screen and (max-width: 767px) {
        font-size: 24px;
        line-height: 32px;
    }
`;

const Text = styled.p`
    font-family: VinovestMedium;
    font-weight: 400;
    font-size: 16px;
    line-height: 26px;
    color: #242e35;
    max-width: 306px;
    margin-top: 10px;
    margin-bottom: 10px;
    @media screen and (max-width: 767px) {
        font-size: 14px;
    }
    &.wider {
        max-width: 392px;
        @media screen and (max-width: 991px) {
            max-width: 306px;
        }
    }
`;

const JoinUsBtn = styled(MainButton)`
    width: 180px;
    margin: 0 auto;
    @media screen and (max-width: 576px) {
        width: 100%;
    }
`;
