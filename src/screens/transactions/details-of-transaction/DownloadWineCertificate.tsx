import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import Skeleton from "react-loading-skeleton";
import { IconDownload } from "../../../assets/shared/download";
import { useRootStore, useMobile } from "#shared/hooks";

interface DownloadWineCertificateProps {
    transactionDocumentID: number;
    wineCertificateList: Array<{ id: number; name: string; pending: boolean }>;
}

export const DownloadWineCertificate = ({
    transactionDocumentID,
    wineCertificateList,
}: DownloadWineCertificateProps) => {
    const { t } = useTranslation(["transactions"]);
    const store = useRootStore();
    const isDesktop = !useMobile(1024);
    const wineCertificate = wineCertificateList?.find(({ id }) => id === transactionDocumentID);

    return (
        <WineLink
            onClick={() => {
                wineCertificate &&
                    store.documents.getWineCertificateItem(wineCertificate.id, wineCertificate.name, isDesktop);
            }}
        >
            {wineCertificate?.pending ? (
                <Skeleton width="150px" height="20px" />
            ) : (
                <>
                    <IconDownload stroke="#4f81b0" /> {t("buttons.wine_certificate")}
                </>
            )}
        </WineLink>
    );
};

const WineLink = styled.button`
    background: none;
    border: none;
    color: #4f81b0;
    cursor: pointer;
    padding: 1rem 0;

    svg {
        margin-right: 0.5rem;
        vertical-align: bottom;
    }
`;
