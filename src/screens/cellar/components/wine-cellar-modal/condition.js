import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import tickSvg from "../assets/icons/tick.svg";

const Condition = () => {
    const { t } = useTranslation("portfolio");
    return (
        <ConditionContainer>
            <Title>
                {t("condition.title")} <img src={tickSvg} alt="tick" />
            </Title>
            <Title>
                {t("condition.verfication")} <img src={tickSvg} alt="tick" />
            </Title>
            <Title>
                {t("condition.insurance")} <img src={tickSvg} alt="tick" />
            </Title>
            <Value>{t("condition.excellent")}</Value>
            <Value>{t("condition.authentic")}</Value>
            <Value>{t("condition.coverage")}</Value>
        </ConditionContainer>
    );
};

const ConditionContainer = styled.div`
    width: 100%;
    padding: 90px 71px 32px;
    display: grid;
    grid-template-columns: 227.29px 227.29px 227.29px;
    row-gap: 19px;
    grid-template-areas: ". . .";
    justify-content: space-between;

    @media screen and (max-width: 1023px) {
        grid-template-columns: 1fr 1fr 1fr;
        padding: 44px 7px 17.95px 7px;
        row-gap: 0;
    }
`;

const Title = styled.div`
    width: 100%;
    font-family: VinovestMono;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 18px;
    display: flex;
    justify-content: center;
    text-align: center;
    letter-spacing: 0.025em;
    text-transform: uppercase;
    color: #242e35;

    img {
        margin-left: 9px;
        width: 14px;
    }

    @media screen and (max-width: 1023px) {
        font-size: 9.17434px;
        line-height: 17px;

        img {
            margin: 0;
            width: 6.89px;
        }
    }
`;

const Value = styled.div`
    font-family: RoslindaleDisplayCondensed;
    font-style: normal;
    font-weight: 500;
    font-size: 32px;
    line-height: 41px;
    display: flex;
    justify-content: center;
    color: #242e35;

    @media screen and (max-width: 1023px) {
        font-size: 18.3487px;
        line-height: 29px;
    }
`;

export default Condition;
