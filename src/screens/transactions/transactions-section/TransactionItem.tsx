import React from "react";
import { useTranslation } from "react-i18next";
import { toJS } from "mobx";
import { formatDatePP } from "#utils/shared";
import { useMobile } from "#shared/hooks";
import FormatAmount from "#shared/ui/FormatAmount";
import TransactionType from "#shared/ui/TransactionType";
import { TransactionsContext } from "../transactionsContext";
import { getListDescription } from "../helpers";
import { DepositElemMobile, DepositElemDesktop } from "./DepositElements";
import { GridWrapper, TransactionFailed } from "./styled";

interface TransactionItemProps {
    createdAt?: number;
    type: string;
    meta: {
        quantity: number;
        bottles: number;
    };
    money: { amount: string };
    id: number;
    status: string;
    name: string;
}

export const TransactionItem = ({
    createdAt,
    type,
    meta,
    money: { amount },
    id,
    status,
    name,
}: TransactionItemProps) => {
    const { setDetailsId, detailsId } = React.useContext(TransactionsContext);
    const isMobile = useMobile(767);
    const { t } = useTranslation(["transactions"]);
    const clickHandler = () => setDetailsId((data: number) => (data === id ? null : id));
    const amountData = meta?.quantity ? (
        `${meta.quantity} ${t("wine-details.of")} ${meta.bottles}`
    ) : (
        <FormatAmount amount={amount} colors={[null, "#242E35"]} />
    );
    const descriptionData = getListDescription({ type, name, meta, t });

    const transactionStatus =
        status === "failed" ? (
            <TransactionFailed>{t("transactions-list.failed")} </TransactionFailed>
        ) : (
            t("transactions-list.pending")
        );
    const formatDate = createdAt ? formatDatePP(createdAt) : transactionStatus;
    return (
        <React.Fragment key={id}>
            <GridWrapper onClick={clickHandler} className={detailsId === id ? "selectedGridWrapper" : ""}>
                {isMobile ? (
                    <DepositElemMobile
                        type={type}
                        typeLabel={TransactionType.typeLabel(type, t)}
                        description={descriptionData.description}
                        failed={descriptionData.status === "failed"}
                        amount={amountData}
                        date={formatDate}
                    />
                ) : (
                    <DepositElemDesktop
                        detailsId={detailsId}
                        type={type}
                        description={descriptionData.description}
                        failed={descriptionData.status === "failed"}
                        amount={amountData}
                        date={formatDate}
                    />
                )}
            </GridWrapper>
        </React.Fragment>
    );
};
