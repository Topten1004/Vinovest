import React from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import { CSVLink } from "react-csv";
import { useRootStore } from "#shared/hooks";

const DownloadCsvButton = () => {
    const { t } = useTranslation(["portfolio"]);
    const s = useRootStore();

    const [loadCSV, setLoadCSV] = React.useState(false);
    const ref = React.useRef();

    const { fetchCellarFeesCsv, cellarFeesCsv, cellarFeesCsvStatus } = s.documents;
    const fetchPortfolioFeesCsvHandler = () => {
        if (!cellarFeesCsvStatus?.isPending() && !cellarFeesCsv?.length) {
            fetchCellarFeesCsv();
            setLoadCSV(true);
        }
    };

    React.useEffect(() => {
        if (cellarFeesCsv && ref.current && loadCSV) {
            const delayedAction = setTimeout(() => {
                ref.current && ref.current.link.click();
                setLoadCSV(false);
            });
            return () => clearTimeout(delayedAction);
        }
    }, [cellarFeesCsv, loadCSV]);

    const icon = React.useMemo(
        () => (
            <svg width="19" height="17" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M9.32043 1V12.7124"
                    stroke="#242E35"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M4.92584 8.52942L9.32051 12.7124L13.7152 8.52942"
                    stroke="#242E35"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M1.19043 12.2942V16.0589H18V12.2942"
                    stroke="#242E35"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        ),
        [],
    );

    return (
        <CSVButton onClick={fetchPortfolioFeesCsvHandler} type="button">
            {cellarFeesCsv && (
                <CSVLink data={cellarFeesCsv} filename="export.csv" ref={ref} className="CSVLink">
                    <span className="CSVLinkText">{t("wine-cellar.export")}</span> {icon}
                </CSVLink>
            )}
            {!cellarFeesCsv && (
                <>
                    <span className="CSVLinkText">{t("wine-cellar.export")}</span> {icon}
                </>
            )}
        </CSVButton>
    );
};

export const CSVButton = styled.button`
    background: none;
    color: #242e35;
    border: none;
    text-transform: uppercase;
    outline: none;
    white-space: nowrap;
    transition: 0.3s;
    letter-spacing: 0.025em;
    font-family: VinovestMono;
    font-style: normal;
    font-weight: normal;
    font-size: 11px;
    line-height: 150%;
    min-height: 44px;
    min-width: 100px;
    border-radius: 3px;
    border: 1px solid #caccce;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 0;

    @media (min-width: 378px) {
        margin-right: 40px;
        min-width: 118px;
    }

    .CSVLink {
        text-decoration: none;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #242e35;
    }

    .CSVLinkText {
        padding: 1px 7px 0 0;
        display: inline-block;
    }

    &:hover {
        cursor: pointer;
        opacity: 0.5;
    }
`;

export default observer(DownloadCsvButton);
