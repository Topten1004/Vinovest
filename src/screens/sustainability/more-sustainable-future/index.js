import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { TopDescription, TopTitle, Description } from "#shared/ui/Typography/styled";
import Co2IconSvg from "../assets/Co2Icon.svg";
import oneTreeIconSvg from "../assets/oneTreeIcon.svg";
import zeroIconSvg from "../assets/zeroIcon.svg";
import blueArrowPng from "../assets/blue-arrow.png";

const MoreSustainableFuture = () => {
    const { t } = useTranslation("sustainable-future");

    return (
        <Container>
            <div className="burgundy-top">
                <TopDescription>{t("more-sustainable-future.topSmallTitle")}</TopDescription>
                <TopTitle>{t("more-sustainable-future.title")}</TopTitle>
            </div>
            <div className="green-bg">
                <Description>{t("more-sustainable-future.description")}</Description>
                <div className="dark-green-bg">
                    <div className="dark-green-title">{t("more-sustainable-future.pathwayTitle")}</div>
                    <OptionsList>
                        <Option>
                            <img src={Co2IconSvg} alt="Co2 Icon" />
                            <Description>{t("more-sustainable-future.pathwayOption1")}</Description>
                        </Option>
                        <img className="blueArrowPng" src={blueArrowPng} alt="blue arrow" />
                        <Option>
                            <img src={oneTreeIconSvg} alt="Tree Icon" />
                            <Description>{t("more-sustainable-future.pathwayOption2")}</Description>
                        </Option>
                        <img className="blueArrowPng" src={blueArrowPng} alt="blue arrow" />

                        <Option>
                            <img src={zeroIconSvg} alt="Zero Icon" />
                            <Description>{t("more-sustainable-future.pathwayOption3")}</Description>
                        </Option>
                    </OptionsList>
                </div>
            </div>
        </Container>
    );
};

const OptionsList = styled.div`
    margin-top: 40px;
    margin-bottom: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .blueArrowPng {
        width: 49px;
    }

    @media screen and (max-width: 767px) {
        flex-direction: column;

        .blueArrowPng {
            transform: rotate(90deg);
        }
    }
`;

const Option = styled.div`
    width: 30%;
    text-align: center;

    img {
        border: 0;
        max-width: 100%;
        vertical-align: middle;
        display: inline-block;
    }

    ${Description} {
        padding: 0;
    }

    @media screen and (max-width: 767px) {
        width: 100%;
    }
`;

const alignCenter = `
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
`;

const Container = styled.div`
    color: #513011;
    margin-right: auto;
    margin-left: auto;
    padding-top: 60px;

    ${alignCenter};

    @media screen and (max-width: 767px) {
        padding-top: 0;
    }

    ${TopTitle} {
        color: #513011;
        margin-bottom: 20px;

        @media screen and (max-width: 767px) {
            padding-right: 20px;
            padding-left: 20px;
        }
    }

    ${Description} {
        margin: 0 auto 30px;
        width: 100%;
        max-width: 700px;
        line-height: 36px;

        a {
            color: inherit;
        }
    }

    .burgundy-top {
        ${alignCenter};
        position: relative;
        z-index: 2;
        text-align: center;
        margin-bottom: -60px;
    }

    .green-bg {
        width: 100%;
        max-width: 1199px;
        margin-bottom: 120px;
        padding-top: 80px;
        background-color: #e0e5cd;
        color: #513011;

        @media screen and (max-width: 767px) {
            max-width: auto;
            width: auto;
            padding-right: 24px;
            padding-left: 24px;

            ${Description} {
                padding: 0;
                font-size: 18px;
            }
        }
    }

    .dark-green-bg {
        color: #e6c9c9;
        max-width: 980px;
        margin: 50px auto -120px;
        padding: 40px 46px;
        background-color: #3c400c;
    }

    .dark-green-title {
        margin-top: 30px;
        margin-bottom: 30px;
        text-align: center;
        font-size: 45px;
        line-height: 60px;
        font-weight: 500;
        font-family: Roslindaledisplaycondensed, sans-serif;

        @media screen and (max-width: 479px) {
            font-size: 36px;
            line-height: 140%;
        }
    }
`;

export default MoreSustainableFuture;
