import React from "react";
import styled from "styled-components";
import balloonCoin from "#assets/shared/balloon-coin.svg";
import bottlePalm from "#assets/shared/bottle-palm.svg";
import bottleGuage from "#assets/shared/bottle-guage.svg";
import { BaseModuleContainer } from "./styles";
import { useTranslation } from "react-i18next";

export const QualityValueProps = () => {
    const { t } = useTranslation(["overview"]);
    const valueProps = [
        {
            header: t("quality-value.insurance-header"),
            description: t("quality-value.insurance-description"),
            svg: balloonCoin,
        },
        {
            header: t("quality-value.authenticity-header"),
            description: t("quality-value.description"),
            svg: bottlePalm,
        },
        {
            header: t("quality-value.stored-header"),
            description: t("quality-value.stored-description"),
            svg: bottleGuage,
        },
    ];

    return (
        <CustomModuleContainer isRow>
            {valueProps.map((p) => (
                <Prop key={p.header} {...p} />
            ))}
        </CustomModuleContainer>
    );
};

const Prop = ({ header, description, svg }) => (
    <PropContainer>
        <img className="prop-img" src={svg} alt="prop-img" />
        <span className="prop-header">{header}</span>
        <span className="prop-desc">{description}</span>
    </PropContainer>
);

const CustomModuleContainer = styled(BaseModuleContainer)`
    text-align: center;
    border: none;
    box-shadow: none;
    display: flex;
    justify-content: space-between;
    align-items: center;

    flex-direction: column;
    ${(p) => p.theme.media.greaterThan("768px")`
        flex-direction: row;
    `}
`;

const PropContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 280px;
    padding: 12px;

    .prop-img {
        height: 50%;
    }
    .prop-header {
        font-family: ${(p) => p.theme.fonts.title};
        font-weight: 500;
        font-size: 28px;
        margin-top: 18px;
        ${(p) => p.theme.media.greaterThan("1441px")`
            font-size: 32px;
            margin-top: 41px;
    `}
    }
    .prop-desc {
        font-family: ${(p) => p.theme.fonts.body};
        font-size: 14px;
        margin-top: 18px;
        line-height: 24px;
        ${(p) => p.theme.media.greaterThan("1441px")`
            font-size: 16px;
            margin-top: 26px;
    `}
    }
`;
