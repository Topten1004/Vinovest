import React from "react";
import styled from "styled-components";
import { useCreateRoutingCallback } from "#shared/hooks";
import { DepositButton } from "#shared/components/Deposit";
import EmptyCellarSvg from "../assets/icons/emptyCellar.svg";
import { useTranslation } from "react-i18next";
import { DepositEvent } from "#screens/deposit/RootDepositPage";


const EmptyCellar = ({ hasMoney }) => {
    const { t } = useTranslation(["portfolio"]);
const routeToDeposit = useCreateRoutingCallback("/deposit", {posthogId: DepositEvent.AddFunds, refresh: true});


    return (
        <EmptyCellarWrapper>
            <img src={EmptyCellarSvg} alt="empty icon" />
            <Description>
                {hasMoney ? t("wine-cellar.empty-cellar.funded") : t("wine-cellar.empty-cellar.empty")}
            </Description>
            <DepositButtonModified onClick={routeToDeposit}>
                {t("wine-cellar.empty-cellar.add-funds")}
            </DepositButtonModified>
        </EmptyCellarWrapper>
    );
};

export const EmptyCellarWrapper = styled.div`
    min-height: 741px;
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
        margin-top: 135px;
    }

    @media screen and (max-width: 767px) {
        min-height: 408px;

        img {
            margin-top: 39px;
        }
    }
`;

const DepositButtonModified = styled(DepositButton)`
    height: 44px;
    width: 135px;
    font-size: 16px;
    line-height: 23px;
    margin-top: 34px;
`;

const Description = styled.div`
    font-family: VinovestMedium;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 36px;
    text-align: center;
    letter-spacing: 0.005em;
    color: #242e35;
    margin-top: 34px;

    @media screen and (max-width: 767px) {
        font-size: 16px;
        line-height: 26px;
    }
`;
export default EmptyCellar;
