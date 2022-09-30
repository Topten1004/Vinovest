import React, { useMemo } from "react";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import { useRootStore } from "#shared/hooks";
import { getStatus } from "#models/FetchStatus";
import { PrintWireTransferWrapper, AlertAdvisors } from "./styled";
import vvLogo2x from "./vv-logo2x.png";
import {I18nLink as Link} from "#localization/localizedRouter";

interface PrintWireTransferProps {
    data: any;
    type: string;
}

const PrintWireTransfer = ({ data, type }: PrintWireTransferProps) => {
    const { t } = useTranslation(["deposit"]);
    const store = useRootStore();
    const { data: referenceKeyFetch } = store.deposit.referenceKeyFetch;
    const isDone = getStatus(store.deposit.referenceKeyFetch).isDone();
    const isInternational = type === "international";
    const pageIsDownloadedSuccessfully = useMemo(() => isDone, [isDone]);

    return (
        <>
            {pageIsDownloadedSuccessfully && (
                <PrintWireTransferWrapper className="show-print">
                    <div className="wrapper">
                        <div className="wrapper-inner">
                            <header>
                                <div className="main-header">
                                    <div className="head-nav flex-container">
                                        <Link to="/">
                                            <img className="w-60" src={vvLogo2x} alt="" />
                                        </Link>
                                    </div>
                                </div>
                            </header>

                            <div className="page-content flex-container justify-content-between">
                                <div className="left-column-wrapper">
                                    <div className={`left-column ${isInternational ? "left-column-yellow" : ""}`}>
                                        <h2>
                                            {isInternational
                                                ? t("international_wire_transfer")
                                                : t("domestic_wire_transfer")}
                                        </h2>
                                        <div className="transfer-text">
                                            <p>{t("intl_description")}</p>
                                            <h4>{t("questions")}</h4>
                                            <a href="mailto:ir@vinovest.co">ir@vinovest.co</a>
                                            <a href="tel:+12134104546">+1 213-410-4546</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="right-column-wrapper">
                                    <div className="right-column">
                                        <h3>{t("receiving_bank_dtls")}</h3>
                                        {data.map(({ title, value }) => (
                                            <React.Fragment key={title}>
                                                <h5>{title}</h5>
                                                <span role="textbox" contentEditable suppressContentEditableWarning>
                                                    {value}
                                                </span>
                                            </React.Fragment>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            {isInternational && (
                                <AlertAdvisors>
                                    {t("alert_advisors.first")}
                                    <a href="mailto: ir@vinovest.co">ir@vinovest.co</a>
                                    {t("alert_advisors.second")}
                                </AlertAdvisors>
                            )}
                        </div>
                    </div>
                </PrintWireTransferWrapper>
            )}
        </>
    );
};

export default observer(PrintWireTransfer);

