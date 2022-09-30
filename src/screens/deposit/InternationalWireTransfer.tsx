import React from "react";
import { WireTransfer } from "./components/WireTransfer";
import internationalInstructions from "./WireTransferInstructions/international";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import PrintWireTransfer from "./PrintWireTransfer";
import { DepositEvent } from "#screens/deposit/RootDepositPage";
import posthog from "posthog-js";

const WirePage = styled.div`
    .show-print {
        display: none;
    }

    @media print {
        .hide-print {
            display: none !important;
        }

        .show-print {
            display: block;
        }
    }
`;

export const InternationalWireTransfer = () => {
    const { t } = useTranslation(["deposit"]);
    const printPage = () => {
        window.print();
        posthog.capture(DepositEvent.DownloadWirePdf);
    };

    return (
        <WirePage>
            <WireTransfer
                type="international"
                data={internationalInstructions(t)}
                tip={t("intl_tip")}
                description={t("intl_description")}
                onClick={printPage}
            />
            <PrintWireTransfer data={internationalInstructions(t)} type="international" />
        </WirePage>
    );
};
