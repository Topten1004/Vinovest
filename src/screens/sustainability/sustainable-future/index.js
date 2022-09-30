import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

import { TopTitle, Description } from "#shared/ui/Typography/styled";
import sustainableFutureSvg from "../assets/sustainableFuture.svg";

const SustainableFuture = () => {
    const { t } = useTranslation("sustainable-future");

    return (
        <Container>
            <SustainableFutureContainer>
                <div className="sFTopTitleBlock">
                    <TopTitle>{t("future-for-fine-wine.title")}</TopTitle>
                </div>
                <div className="sFBlockBlue">
                    <Description>
                        {t("future-for-fine-wine.description1")}{" "}
                        <a
                            target="_blank"
                            href="https://www.businessinsider.com/sustainability-good-for-humanity-better-for-business-2018-6"
                        >
                            {t("future-for-fine-wine.description2")}
                        </a>{" "}
                        {t("future-for-fine-wine.description3")}
                    </Description>
                    <img
                        src={sustainableFutureSvg}
                        alt="sustainable future drawing. tree growing in palm of hand drawing"
                        className="blue-image-lower-right"
                        draggable="false"
                    />
                </div>
                <div className="sFBottomBlock">
                    <h3>{t("future-for-fine-wine.conclusions")}</h3>
                </div>
            </SustainableFutureContainer>
        </Container>
    );
};

const Container = styled.div`
    overflow: hidden;
`;

const SustainableFutureContainer = styled.div`
    max-width: 920px;
    width: 100%;
    margin: 100px auto 0;
    color: #242e35;

    .sFTopTitleBlock {
        position: relative;
        z-index: 2;
        padding-top: 0;
        padding-bottom: 0;
        margin-bottom: -50px;

        ${TopTitle} {
            padding-left: 40px;
            text-align: left;
            max-width: 550px;

            @media screen and (max-width: 767px) {
                padding-left: 30px;
                padding-right: 30px;
            }

            @media screen and (max-width: 479px) {
                font-size: 40px;
                line-height: 54px;
            }
        }

        @media screen and (max-width: 767px) {
            margin-bottom: -27px;
        }
    }

    .sFBlockBlue {
        position: relative;
        padding-top: 70px;
        padding-right: 180px;
        padding-left: 40px;
        padding-bottom: 70px;
        background-color: #c5d5e4;

        ${Description} {
            padding: 0;
            a {
                color: inherit;
            }

            @media screen and (max-width: 767px) {
                font-size: 16px;
                line-height: 26px;
            }
        }

        img {
            position: absolute;
            left: auto;
            top: -41px;
            right: -174px;
            bottom: 1%;

            @media screen and (max-width: 767px) {
                position: static;
                order: -1;
                max-width: 201px;
                object-fit: contain;
                margin-bottom: 13px;
            }
        }

        @media screen and (max-width: 767px) {
            width: auto;
            padding-right: 24px;
            padding-left: 24px;
            padding-bottom: 39px;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
    }

    .sFBottomBlock {
        padding: 40px 40px 0;
        margin-top: 30px;
        margin-bottom: 30px;
        text-align: center;

        h3 {
            max-width: 680px;
            margin: 0;
            margin-right: auto;
            margin-left: auto;
            letter-spacing: 0.02em;
            font-family: Roslindaledisplaycondensed, sans-serif;
            font-size: 32px;
            line-height: 150%;
            font-weight: 500;

            @media screen and (max-width: 767px) {
                font-size: 24px;
                line-height: 32px;
            }
        }

        @media screen and (max-width: 767px) {
            margin-bottom: 0;
            margin-top: 44px;

            h3 {
                font-size: 24px;
                line-height: 32px;
            }
        }
    }
`;

export default SustainableFuture;
