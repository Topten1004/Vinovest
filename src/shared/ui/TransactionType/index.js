import React from "react";
import Skeleton from "react-loading-skeleton";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { TransactionTypes } from "#utils/constants";
import adjustmentSvg from "./adjustment.svg";
import buySvg from "./buy.svg";
import depositSvg from "./deposit.svg";
import feeSvg from "./fee.svg";
import feeCreditSvg from "./feeCredit.svg";
import sellSvg from "./sell.svg";
import withdrawalSvg from "./withdrawal.svg";
import emptySvg from "./empty.svg";
import sourcingWineSvg from "./sourcingWine.svg";
import foundWineForYouSvg from "./foundWineForYou.svg";

const transactionsSrc = {
    [TransactionTypes.sourcing_wine]: sourcingWineSvg,
    [TransactionTypes.wine_purchase]: buySvg,

    [TransactionTypes.funds_added]: depositSvg,
    [TransactionTypes.pending_deposit]: depositSvg,
    [TransactionTypes.funds_failed]: depositSvg,

    [TransactionTypes.vinovest_monthly_fee]: feeSvg,
    [TransactionTypes.trade_settlement_purchase]: feeSvg,
    [TransactionTypes.transfer_in]: feeSvg,
    [TransactionTypes.early_withdrawl_60_day]: feeSvg,
    [TransactionTypes.vinovest_monthly_fee_waived]: feeSvg,
    [TransactionTypes.wine_shipped]: feeSvg,

    [TransactionTypes.wine_sold]: sellSvg,
    [TransactionTypes.funds_withdrew]: withdrawalSvg,
    feeCredit: feeCreditSvg,
    [TransactionTypes.rebalance_add]: adjustmentSvg,
    foundWineForYou: foundWineForYouSvg,
};

const transactionLabels = (t) => ({
    [TransactionTypes.sourcing_wine]: t("transactions:items.sourcing"),
    [TransactionTypes.wine_purchase]: t("transactions:items.buy"),
    [TransactionTypes.funds_added]: t("transactions:items.deposit"),
    [TransactionTypes.pending_deposit]: t("transactions:items.pending"),
    [TransactionTypes.vinovest_monthly_fee]: t("transactions:items.fee"),
    [TransactionTypes.wine_sold]: t("transactions:transactions-header.sell"),
    [TransactionTypes.funds_withdrew]: t("transactions:items.withdrawn"),
    feeCredit: t("transactions:items.fee-credit"),
    [TransactionTypes.trade_settlement_purchase]: t("transactions:items.fee"),
    [TransactionTypes.transfer_in]: t("transactions:items.fee"),
    [TransactionTypes.early_withdrawl_60_day]: t("transactions:items.fee"),
    [TransactionTypes.vinovest_monthly_fee_waived]: t("transactions:items.fee"),
    [TransactionTypes.wine_shipped]: t("transactions:items.fee"),

    [TransactionTypes.rebalance_add]: t("transactions:items.adjust"),

    [TransactionTypes.funds_failed]: t("transactions:items.deposit"),
});

const getLabel = (type, t) => transactionLabels(t)[type] || type;

const TransactionTypeIcon = ({ type, width }) => (
    <TransactionIcon src={transactionsSrc[type] || emptySvg} alt={type} width={width} />
);

const TransactionType = ({ type, uppercase, skeleton, index }) => {
    const { t } = useTranslation();
    return (
        <WithLabelWrapper>
            <TransactionTypeIcon type={type} />
            <TransactionTypeText uppercase={uppercase}>
                {skeleton ? (
                    <Skeleton
                        style={{
                            height: "20px",
                            width: index % 2 ? "57px" : "80px",
                            display: "block",
                            margin: "0",
                        }}
                    />
                ) : (
                    getLabel(type, t)
                )}
            </TransactionTypeText>
        </WithLabelWrapper>
    );
};

TransactionType.typeLabel = getLabel;
TransactionType.TransactionTypeIcon = TransactionTypeIcon;

const TransactionIcon = styled.img`
    display: inline-block;
    width: ${({ width }) => width || "42px"};
    height: ${({ width }) => width || "42px"};
    flex-shrink: 0;
`;

const WithLabelWrapper = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    img {
        margin-right: 27px;
    }
`;

const TransactionTypeText = styled.span`
    ${({ uppercase }) => (uppercase ? "text-transform: uppercase;" : "")}
    min-width: 42px;
`;
export default TransactionType;
