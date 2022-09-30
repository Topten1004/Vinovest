import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useOktaAuth } from "@okta/okta-react";
import styled from "styled-components";
import posthog from "posthog-js";
import { WireTransfer } from "./components/WireTransfer";
import { DomesticInstructions } from "./WireTransferInstructions/DomesticInstructions";
import { useRootStore } from "#shared/hooks";
import AccountService from "#services/UserService";
import PrintWireTransfer from "./PrintWireTransfer";
import { DepositEvent } from "#screens/deposit/RootDepositPage";

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

export const DomesticWireTransfer = () => {
    const { t } = useTranslation(["deposit"]);
    const store = useRootStore();
    const { oktaAuth } = useOktaAuth();
    const [query, setQuery] = useState(null);
    const printPage = () => {
        window.print();
        posthog.capture(DepositEvent.DownloadWirePdf);
    };
    useEffect(() => {
        const fetchData = async () => {
            await store.user.requestUserDetailsFromOkta(oktaAuth);
            const response = await AccountService.useWireTransferGet(
                store.user.oktaUserEntity.data.sub,
                store.auth.accessToken,
            );
            setQuery(response);
        };

        fetchData();
    }, [oktaAuth, store.auth.accessToken, store.user]);

    return (
        <WirePage>
            <WireTransfer
                type="domestic"
                data={query && DomesticInstructions(t, query)}
                tip={t("domestic_wire_tip")}
                description={t("domestic_wire_description")}
                onClick={printPage}
            />
            <PrintWireTransfer data={DomesticInstructions(t, query)} type="domestic" />
        </WirePage>
    );
};
