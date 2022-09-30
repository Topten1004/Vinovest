import React, { useEffect, useState } from "react";
import { Typography } from "@vinovest/components/index";
import styled from "styled-components";
import { numberWithCommas } from "#utils/shared";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useTranslation } from "react-i18next";
import { currencySymbol } from "#utils/constants";

interface InvestmentEstimatorProps {
    targetEstimate: number;
    setPlanLevel: any;
}

export const InvestmentEstimator = ({ targetEstimate, setPlanLevel }: InvestmentEstimatorProps) => {
    const { t } = useTranslation(["account"]);
    const [sliderValue, setSliderValue] = useState(0);

    const compoundingInterestValue = (investment: number, rate: number) => investment * Math.pow(1 + rate / 100, 10);

    const investmentStyle = (percentage: number) => {
        switch (true) {
            case percentage <= 33:
                return "conservative";
            case percentage >= 34 && percentage <= 67:
                return "moderate";
            case percentage >= 68:
                return "aggressive";
            default:
                return "conservative";
        }
    };

    const displayEstimatedReturnValue = compoundingInterestValue(targetEstimate, 5.5 + sliderValue * 0.065);
    useEffect(() => {
        setPlanLevel(investmentStyle(sliderValue));
    }, [setPlanLevel, sliderValue]);

    return (
        <Box>
            <Typography medium paragraph>
                {t("estimator.description")}
            </Typography>
            <span className="amount">
                {currencySymbol}
                {numberWithCommas(displayEstimatedReturnValue, 2)}
            </span>
            <SliderWrapper>
                <Slider
                    min={0}
                    defaultValue={0}
                    marks={{ 0: "5.5%", 50: "8%", 100: "12%" }}
                    onChange={(value) => setSliderValue(value)}
                />
            </SliderWrapper>
            <Grid>
                <Column>
                    <Label> {t("estimator.label_point_1")} </Label>
                    <Description> {t("estimator.description_point_1")} </Description>
                </Column>
                <Column className="center">
                    <Label>{t("estimator.label_point_2")} </Label>
                    <Description>{t("estimator.description_point_2")} </Description>
                </Column>
                <Column className="right">
                    <Label>{t("estimator.label_point_3")} </Label>
                    <Description>{t("estimator.description_point_3")} </Description>
                </Column>
            </Grid>
            <Disclaimer>{t("estimator.discliamer")} </Disclaimer>
        </Box>
    );
};
const Box = styled.div`
    border: 1px solid #EEEEEE;
    box-sizing: border-box;
    box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    padding: 1.5rem;

    ${(p) => p.theme.media.greaterThan("1024px")`
        margin-left: auto;
        max-width: 560px;
        padding: 3rem;
    `};

    .amount {
        color: #3C400C;
        font-family: "RoslindaleDisplayCondensed";
        font-size: 58px;
        word-wrap: break-word;

        ${(p) => p.theme.media.greaterThan("1024px")`
            font-size: 84px;
        `};
    }

    p {
        font-size: 16px;
        margin-top: 0
        text-transform: uppercase;
    }
`;

const Grid = styled.div`
    display: flex;
`;

const Disclaimer = styled.div`
    color: #b5b5b5;
    font-size: 11px;
    margin-top: 2rem;
`;

const Column = styled.div`
    flex: 1;
    font-size: 12px;

    &.center {
        text-align: center;
    }

    &.right {
        text-align: right;
    }
`;

const Label = styled.div`
    text-transform: uppercase;
`;

const Description = styled.div`
    color: #606060;
`;

const SliderWrapper = styled.div`
    margin: 4rem 0 2rem;

    .rc-slider-mark {
        font-size: 16px;
        top: -30px;
        left: 19px;
        width: 92%;
    }

    .rc-slider-track {
        background-color: #3c400c;
    }

    .rc-slider-dot-active {
        border-color: #3c400c;
    }

    .rc-slider-handle {
        border: solid 2px #3c400c;
        border: solid 4px #fff;
        background-color: #3c400c;
        box-shadow: 0px 0px 10px rgb(0 0 0 / 30%);
        height: 22px;
        margin-top: -10px;
        width: 22px;

        &:hover,
        &:active,
        &:focus {
            border: solid 4px #fff;
        }
    }

    .rc-slider-dot {
        display: none;
    }
`;
