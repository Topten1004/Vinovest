import React from "react";
import { observer } from "mobx-react-lite";
import { get } from "lodash";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import { formatDatePP, currencyFormatter, getBottleMLFromLwin18, getCaseSizeFromLwin18 } from "#utils/shared";
import { useRootStore } from "#shared/hooks";
import FormatAmount from "#shared/ui/FormatAmount";
import TransactionType from "#shared/ui/TransactionType";
import { TransactionTypes } from "#utils/constants";
import { DownloadWineCertificate } from "./DownloadWineCertificate";
import { uppercaseWordsInString } from "#utils/stringUtils";

interface DetailsOfTransactionProps {
    detailsId: number;
    wineCertificateList: Array<{ id: number; name: string; pending: boolean }>;
}
const getDescription = (type, t, language) => {
    if (["funds_added", "funds_withdrew"].includes(type)) return t(`currency:${language}`, { locale: "en" });
    if (["vinovest_monthly_fee"].includes(type)) return t("details.management");
    if (type === "sourcing_wine") return t("wine-details.sourcing_wine_statement");
    if (type === TransactionTypes.funds_failed) return t("details.failed");
    return TransactionType.typeLabel(type, t);
};

const DetailsOfTransaction = observer(({ detailsId, wineCertificateList }: DetailsOfTransactionProps) => {
    const { t } = useTranslation(["transactions"]);
    const s = useRootStore();
    let details = null;
    if (detailsId) {
        details =
            (s.transfer.deposits.fees && s.transfer.deposits.fees.find(({ id }) => id === detailsId)) ||
            (s.transfer.pendingDeposits && s.transfer.pendingDeposits.find(({ id }) => id === detailsId)) ||
            (s.transfer.sourcingWines && s.transfer.sourcingWines.find(({ id }) => id === detailsId));
    }
    if (!details) return null;
    const transactionDocumentID = details?.meta?.certificateDocID;
    const description = getDescription(details.type, t, i18n.language);
    const wineVintageYear = get(details.meta, "vintage", "");

    const getFullTransactionDescription = (transactionType: string) => {
        if (transactionType === "wine_purchase" || details?.type === "wine_sold") {
            return uppercaseWordsInString(get(details.meta, "name", description));
        }
        if (transactionType === "sourcing_wine") {
            return description;
        }
        return get(details.meta, "name", description);
    };

    return (
        <DetailsOfTransactionContainer>
            <TransactionType type={details.type} uppercase />
            {!details.meta?.quantity && (
                <Amount>
                    <FormatAmount amount={+details.money.amount} colors={[null, "#242E35"]} />
                </Amount>
            )}
            <Divider />

            <Description className={details.type === TransactionTypes.funds_failed ? "failedTransaction" : ""}>
                {getFullTransactionDescription(details?.type)} {wineVintageYear}
            </Description>

            {details.meta && [TransactionTypes.wine_purchase, TransactionTypes.wine_sold].includes(details.type) && (
                <WineDataList lwin18={details.meta.lwin18} amount={details.money.amount} t={t} />
            )}

            {details.status === "failed" ? (
                <ListItem className="failed">{t("messages.failed")}</ListItem>
            ) : (
                <ListItem>
                    {t("labels.date")}: {details.createdAt ? formatDatePP(details.createdAt) : t("messages.pending")}
                </ListItem>
            )}
            {details.type === "sourcing_wine" && (
                <ListItem>
                    {t("transactions-list.amount")}: {t("messages.pending")}
                </ListItem>
            )}

            {transactionDocumentID && (
                <DownloadWineCertificate
                    transactionDocumentID={transactionDocumentID}
                    wineCertificateList={wineCertificateList}
                />
            )}
        </DetailsOfTransactionContainer>
    );
});

const WineDataList = ({ lwin18, amount, t }) => {
    const quantity = +getCaseSizeFromLwin18(lwin18);
    const sizeByML = +getBottleMLFromLwin18(lwin18) + t("labels.ml");

    return (
        <>
            <ListItem>
                {t("labels.size")}: {sizeByML}
            </ListItem>
            <ListItem>
                {t("labels.quantity")}: {t("labels.case_size")} {quantity} {t("labels.bottles")}
            </ListItem>
            {+amount ? (
                <ListItem>
                    {t("labels.price_per_bottle")}: {currencyFormatter(+Math.abs(amount) / 100 / quantity)}
                </ListItem>
            ) : null}
        </>
    );
};

const DetailsOfTransactionContainer = styled.div`
    width: 100%;
    max-width: 400px;
    padding: 28px 39px 82px;
    margin: 0 auto;
`;

const Amount = styled.div`
    font-family: RoslindaleDisplayCondensed;
    font-style: normal;
    font-weight: 500;
    font-size: 45px;
    line-height: 60px;
    display: flex;
    align-items: center;
    padding: 33px 0 0;
`;

const Divider = styled.div`
    padding: 0 0 28px;
    border-bottom: 1px solid #eeeeee;
`;

const Description = styled.div`
    font-family: VinovestMedium;
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 36px;
    letter-spacing: 0.005em;
    color: #242e35;
    margin: 20px 0 18px;

    &.failedTransaction {
        color: #eb5757;
    }

    &:first-letter {
        text-transform: uppercase;
    }
`;

const ListItem = styled.div`
    font-family: VinovestMedium;
    font-style: normal;
    font-weight: 300;
    font-size: 16px;
    line-height: 26px;
    padding: 4px 0;
    display: flex;
    align-items: center;
    letter-spacing: 0.005em;
    color: #5b646b;

    &.failed {
        color: #ff4d00;
    }
`;

export default DetailsOfTransaction;
