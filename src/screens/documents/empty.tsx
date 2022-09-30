import React from "react";
import { useCreateRoutingCallback } from "#shared/hooks";

import { DepositButton } from "#shared/components/Deposit";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import {DepositEvent} from "#screens/deposit/RootDepositPage"

export const Empty = () => {
    const { t } = useTranslation(["documents"]);

    const routeToDeposit = useCreateRoutingCallback("/deposit", {posthogId: DepositEvent.AddFunds, refresh: true});

    return (
        <EmptyContainer>
            <Text>{t("empty_title")}</Text>
            <DepositButtonExtended onClick={routeToDeposit}>{t("empty_button")}</DepositButtonExtended>
        </EmptyContainer>
    );
};

const EmptyContainer = styled.div`
    min-height: 558px;
    padding-top: 169px;

    ${(p) => p.theme.media.greaterThan("768px")`
        padding-top: 201px; 
        min-height:  766px; 
    `};
`;

const Text = styled.div`
    width: 223px;
    text-align: center;
    margin: 0 auto;
    ${(p) => p.theme.media.greaterThan("768px")`
        width: fit-content;
    `};
`;

const DepositButtonExtended = styled(DepositButton)`
    font-family: VinovestMono;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 26px;
    display: block;
    letter-spacing: 0.025em;
    width: 237px;
    height: 60px;
    margin: 26px auto 0 auto;

    ${(p) => p.theme.media.greaterThan("768px")`
        width: 400px;
    `};
`;
