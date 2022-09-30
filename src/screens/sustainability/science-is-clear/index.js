import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { TopDescription, TopTitle, Description } from "#shared/ui/Typography/styled";
import earthSvg from "../assets/earth.svg";

const ScienceIsClear = () => {
    const { t } = useTranslation("sustainable-future");

    return (
        <Container>
            <TopDescription>{t("science-is-clear.topSmallTitle")}</TopDescription>
            <TopTitle>{t("science-is-clear.title")}</TopTitle>
            <Description>
                {t("science-is-clear.description")}{" "}
                <a href="https://www.climatecentral.org/gallery/graphics/the-globe-is-already-above-1c" target="_blank">
                    1° {t("science-is-clear.centigrade")}
                </a>
                .
            </Description>
            <EarthWrapper>
                <img className="earthImgMobile" src={earthSvg} alt="earth" />
            </EarthWrapper>
            <ScienceBottom>
                <img className="earthImg" src={earthSvg} alt="earth" />

                <Description>
                    {t("science-is-clear.approach1")}{" "}
                    <a href="https://ec.europa.eu/clima/policies/transport/shipping_en" target="_blank">
                        {t("science-is-clear.approach2")}{" "}
                    </a>
                    {t("science-is-clear.approach3")}{" "}
                </Description>
            </ScienceBottom>
        </Container>
    );
};

const Container = styled.div`
    margin-top: 90px;
    padding-top: 80px;
    color: #242e35;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;

    ${TopTitle} {
        margin-bottom: 30px;
    }

    ${TopDescription} {
        margin-top: 30px;
        margin-bottom: 30px;
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

    @media screen and (max-width: 991px) {
        margin-top: 0;
    }

    @media screen and (max-width: 767px) {
        margin-top: 0;
        padding-top: 38px;
        margin-bottom: 42px;

        ${TopTitle} {
            font-size: 40px;
            line-height: 54px;
        }

        ${TopDescription} {
            margin-top: 24px;
            margin-bottom: 24px;
        }

        ${Description} {
            font-size: 16px;
            line-height: 26px;
        }
    }
`;

const ScienceBottom = styled.div`
    display: flex;
    width: 100%;
    max-width: 850px;
    margin-top: 80px;
    margin-left: 99px;
    padding-top: 40px;
    padding-right: 40px;
    padding-bottom: 40px;
    justify-content: flex-end;
    position: relative;
    background-color: #c5d5e4;

    .earthImg {
        position: absolute;
        left: -204px;
        top: -33px;
        bottom: 1%;
        border: 0;
        max-width: 100%;
        vertical-align: middle;
        display: inline-block;
        width: 465px;
    }
    ${Description} {
        margin: 0;
        max-width: 494px;
        text-align: left;
    }

    @media screen and (max-width: 991px) {
        /* max-width: 574px; */
        margin-top: 0;
        margin-left: 0;
        flex-direction: column;
        padding-right: 0;
        .earthImg {
            display: none;
        }

        ${Description} {
            max-width: 100%;
            width: 100%;
        }
    }
`;

const EarthWrapper = styled.div`
    position: relative;
    padding-right: 46px;
    padding-left: 46px;
    padding-bottom: 6px;
    width: 100%;

    &:before,
    &:after {
        content: " ";
        display: block;
        position: absolute;

        left: 0;
        right: 0;
        top: 0;
        bottom: 50%;
    }
    &:before {
        top: 0;
        bottom: 50%;
    }

    &:after {
        top: 50%;
        bottom: 0;
        background: #c5d5e4;
    }

    .earthImgMobile {
        position: relative;
        z-index: 1;
        width: 100%;
        display: block;
        max-width: 485px;
        margin: 0 auto;
    }

    @media screen and (min-width: 992px) {
        display: none;
    }
`;

export default ScienceIsClear;
