import React from "react";
import styled from "styled-components";
import Skeleton from "react-loading-skeleton";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import { getStatus } from "#models/FetchStatus";
import { useMobile, useRootStore } from "#shared/hooks";
import TransactionsHeader from "./TransactionsHeader";
import TransactionsList from "./TransactionsList";
import GetFeeFreeBtn from "./FeeFreeBtn";

const TransactionsSection = observer(() => {
    const { t } = useTranslation(["transactions"]);
    const s = useRootStore();
    const isTablet = useMobile(1024);
    const isMobile = useMobile(767);
    const { type, range } = s.transfer.deposits;
    const depositsEntityStatus = getStatus(s.transfer.depositsEntity);
    const depositsPending =
        (depositsEntityStatus.isPending() || !depositsEntityStatus.isDone()) && (!s.transfer.deposits.fees.length)
    return (
        <TransactionsListContainer>
            <TransactionsTitleWrapper>
                <TransactionsTitle>
                    {depositsPending && !s.user.needsOnboarding ? (
                        <Skeleton
                            style={{
                                height: "39px",
                                width: "187px",
                                display: "inline-block",
                                padding: "10px 0 9px",
                            }}
                        />
                    ) : (
                        t("title")
                    )}
                </TransactionsTitle>
                {isTablet && !isMobile && !s.user.needsOnboarding && <GetFeeFreeBtn maxWidth="308px" empty={depositsPending } />}
            </TransactionsTitleWrapper>
            <TransactionsHeader depositsPending={!s.user.needsOnboarding && depositsPending} />
            <TransactionsList
                title={t("messages.pending")}
                pendingLength={3}
                emptyMessage={t("messages.empty_transaction")}
                transactions={s.transfer.pendingDeposits}
                sourcingWine={s.transfer.sourcingWines}
            />

            <TransactionsList
                pendingLength={10}
                title={t("items.completed")}
                transactions={s.transfer.deposits.fees}
                emptyMessage={
                    (type || range) && depositsEntityStatus.isSuccess() ? t("messages.no_match") : t("messages.empty")
                }
                isPending={depositsEntityStatus.isPending() || !depositsEntityStatus.isDone() && !s.user.needsOnboarding}
                isDone={depositsEntityStatus.isDone() || s.user.needsOnboarding}
            />
        </TransactionsListContainer>
    );
});

const TransactionsListContainer = styled.div`
    width: 100%;
`;

const TransactionsTitleWrapper = styled.div`
    width: 100%;
    padding: 0 25px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media screen and (min-width: 768px) and (max-width: 1024px) {
        margin-bottom: 14px;
        padding: 0 30px;
    }

    @media screen and (max-width: 767px) {
        padding: 0 20px;
    }
`;

const TransactionsTitle = styled.h1`
    font-family: RoslindaleDisplayCondensed;
    font-style: normal;
    font-weight: 500;
    font-size: 45px;
    line-height: 60px;
    color: #242e35;
    margin-bottom: 35px;
    margin-top: 0;

    @media screen and (max-width: 767px) {
        font-size: 32px;
        line-height: 41px;
        margin-bottom: 50px;
        padding: 0;
    }
`;

export default TransactionsSection;
