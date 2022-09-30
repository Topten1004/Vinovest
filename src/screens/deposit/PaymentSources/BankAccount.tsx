import React, { useCallback, useEffect, useMemo } from "react";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import { usePlaidLink } from "react-plaid-link";
import { IconBank } from "@vinovest/components/icons";
import { useRootStore, useCreateRoutingCallback } from "#shared/hooks";
import PaymentSourceOption from "./PaymentSourceOption";

interface BankAccountProps {
    plaidToken: string;
    setAlert: () => void;
    disabled?: boolean;
}

interface ACHAccountCreateStatus {
    ok?: boolean;
    error?: boolean;
}
interface BankAccountWithTokenProps extends BankAccountProps {
    ACHAccountCreate: { status: ACHAccountCreateStatus };
    requestCreateV2ACHAccount: Promise<void>;
}

const BankAccountWithToken: React.FC<BankAccountWithTokenProps> = ({ plaidToken, setAlert, disabled }) => {
    const { deposit: depositStore, tracking: trackingStore } = useRootStore();
    const routeTo = useCreateRoutingCallback();
    const { t } = useTranslation(["deposit"]);
    const onSuccess = useCallback(
        async (token, metadata) => {
            /** Create Plaid acct through our API + caches on success */
            await depositStore.requestCreateV2ACHAccount(token, metadata);
            const err = depositStore.ACHAccountCreate.status.error;

            if (err) {
                setAlert({ message: err, level: "error" });
                return;
            }
            routeTo("/deposit/review-transfer");
        },
        [depositStore, routeTo, setAlert],
    );
    const onEvent = async (e) => {
        if (e === "OPEN") {
            trackingStore.gtm.trackBankAccountSelected();
            const plaidOverlay = setInterval(() => {
                const element = document.getElementById("plaid-link-iframe-1");
                if (element) {
                    clearInterval(plaidOverlay);
                }
            }, 100);
        }
    };

    /** Configure Plaid Link */
    const { open, ready } = usePlaidLink({ onSuccess, onEvent, token: plaidToken });

    return (
        <>
            <PaymentSourceOption
                onClick={open}
                disabled={!ready || disabled}
                icon={<IconBank height="32px" width="44px" />}
                label={t("connect_bank")}
            />
        </>
    );
};

const BankAccount: React.FC<BankAccountProps> = ({ plaidToken, setAlert, disabled }) => {
    const { t } = useTranslation(["deposit"]);
    const { deposit: depositStore } = useRootStore();
    const isPlaidLinkPending: boolean = useMemo(() => depositStore.plaidLinkFetch.status.isPending(), [
        depositStore.plaidLinkFetch,
    ]);

    useEffect(() => {
        !depositStore.plaidLinkToken && !isPlaidLinkPending && depositStore.requestPlaidLink();
    }, [depositStore, isPlaidLinkPending]);

    return depositStore.plaidLinkToken && !isPlaidLinkPending ? (
        <BankAccountWithToken plaidToken={plaidToken} setAlert={setAlert} disabled={disabled} />
    ) : (
        <PaymentSourceOption
            onClick={open}
            disabled={disabled}
            icon={<IconBank height="32px" width="44px" />}
            label={t("connect_bank")}
        />
    );
};

export default observer(BankAccount);
