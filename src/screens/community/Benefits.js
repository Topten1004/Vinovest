import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import check from "./assets/check.svg";

const Benefits = () => {
    const { t } = useTranslation("community");
    return (
        <ContentWrapper>
            <BenefitsWrapper>
                <Column>
                    <Title>{t("benefits.title")}</Title>
                </Column>
                <Column>
                    <ul>
                        <li>{t("benefits.benefit1")}</li>
                        <li>{t("benefits.benefit2")}</li>
                        <li>{t("benefits.benefit3")}</li>
                        <li>{t("benefits.benefit4")}</li>
                    </ul>
                </Column>
                <Column>
                    <ul>
                        <li>{t("benefits.benefit5")}</li>
                        <li>{t("benefits.benefit6")}</li>
                        <li>{t("benefits.benefit7")}</li>
                        <li>{t("benefits.benefit8")}</li>
                    </ul>
                </Column>
            </BenefitsWrapper>
        </ContentWrapper>
    );
};
export default Benefits;

const ContentWrapper = styled.div`
    @media screen and (max-width: 991px) {
        padding-left: 20px;
        padding-right: 20px;
    }
`;

const BenefitsWrapper = styled.div`
    max-width: 1120px;
    background-color: #242e35;
    padding: 46px 60px;
    position: relative;
    margin: 0 auto;
    top: -20px;
    display: flex;
    @media screen and (max-width: 991px) {
        flex-direction: column;
        padding-left: 24px;
        padding-right: 24px;
    }

    ul {
        margin: 0;
        padding: 0;
    }

    li {
        display: flex;
        align-items: center;
        color: #fff8f1;
        font-size: 16px;
        line-height: 32px;
        &:before {
            content: "";
            height: 1em;
            width: 1em;
            display: block;
            margin-right: 20px;
            background-position: center;
            background-repeat: no-repeat;
            background-size: 100%;
            background-image: url(${check});
            @media screen and (max-width: 991px) {
                margin-right: 16px;
            }
        }
        @media screen and (max-width: 767px) {
            font-size: 14px;
            line-height: 24px;
            margin-bottom: 8px;
        }
    }
`;

const Title = styled.h3`
    color: #efddc7;
    font-family: RoslindaleDisplayCondensed;
    font-size: 36px;
    line-height: 54px;
    margin: 0;
    @media screen and (max-width: 991px) {
        margin-bottom: 36px;
        font-size: 32px;
        line-height: 41px;
    }
    @media screen and (max-width: 767px) {
        font-size: 32px;
        line-height: 41px;
  }
`;

const Column = styled.div`
    &:first-child {
        width: 24%;
    }
    &:last-child {
        width: 32%;
    }
    width: 44%;
    @media screen and (max-width: 991px) {
        max-width: 286px;
        margin: 0 auto;
        width: 100%;
        &:first-child,
        &:last-child {
            width: 100%;
        }
    }
`;
