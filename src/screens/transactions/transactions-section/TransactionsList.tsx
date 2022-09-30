import React from "react";
import { useTranslation } from "react-i18next";
import { useMobile } from "#shared/hooks";
import { TransactionItem } from "./TransactionItem";
import { SkeletonDesktop } from "./SkelotonDesktop";
import { PendingDepositsList } from "./PendingDepositList";
import { TransactionsListWrapper, TransactionsTitle, GridWrapper, GridDesktopTitle, Empty } from "./styled";
import { SourcingWineItem } from "./SourcingWineItem";

interface TransactionsListProps {
    title: string;
    transactions: any;
    emptyMessage: string;
    isPending?: boolean;
    pendingLength: number;
    sourcingWine?: any;
    isDone?: boolean;
}

const TransactionsList = ({
    title,
    transactions = [],
    emptyMessage,
    isPending,
    pendingLength,
    sourcingWine,
}: TransactionsListProps) => {
    const isMobile = useMobile(767);
    const { t } = useTranslation(["transactions"]);
    const conditionalValue = (value: string, height?: string, width?: string) =>
        isPending && !transactions?.length ? <SkeletonDesktop height={height} maxWidth={width} /> : value;

    const sourcingWineNumber = sourcingWine?.length;

    const showSourcingEmptyMessage = sourcingWineNumber === 0 || !sourcingWine;

    return (
        <TransactionsListWrapper>
            <TransactionsTitle>{conditionalValue(title, "27px", "111px")}</TransactionsTitle>
            {!isMobile && (
                <GridWrapper className="withTitles">
                    <GridDesktopTitle>
                        <div>{conditionalValue(t("transactions-list.date"))}</div>
                        <div>{conditionalValue(t("transactions-list.type"))}</div>
                        <div>{conditionalValue(t("transactions-list.description"))}</div>
                        <div className="lastGridCell title">{conditionalValue(t("transactions-list.amount"))}</div>
                    </GridDesktopTitle>
                </GridWrapper>
            )}
            {sourcingWineNumber > 0 && <SourcingWineItem id={sourcingWine[0]?.id} itemsSourcing={sourcingWineNumber} />}
            {transactions ? (
                transactions.map((item) => (
                    <TransactionItem
                        createdAt={item.createdAt}
                        type={item.type}
                        meta={item.meta}
                        money={item.money}
                        id={item.id}
                        status={item.status}
                        name={item.name}
                        key={item.id}
                    />
                ))
            ) : (
                <PendingDepositsList isMobile={isMobile} pendingLength={pendingLength} />
            )}
            {transactions?.length === 0 && showSourcingEmptyMessage && !isPending && <Empty>{emptyMessage}</Empty>}
            {isPending && <PendingDepositsList isMobile={isMobile} pendingLength={pendingLength} />}
        </TransactionsListWrapper>
    );
};

export default TransactionsList;
