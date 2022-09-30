/* eslint-disable prefer-destructuring */
import React, { useCallback, useState } from "react";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";
import { IconCrypto } from "@vinovest/components/icons";
import posthog from "posthog-js";
import OrangeRightArrowSVG from "#assets/shared/orange-right-arrow.svg";
import { useRootStore, useCreateRoutingCallback } from "#shared/hooks";
import { PaymentSourceOptionContainer } from "../styles";
import { ISelectSourceAlert } from "../SelectSource";
import { DepositEvent } from "../RootDepositPage";

interface IPaymentSouceProps {
    setAlert: (alert: ISelectSourceAlert) => void;
    isCreateACHAccountPending: boolean;
    disabled: boolean;
}

function BitPayPaymentSource({ setAlert, isCreateACHAccountPending, disabled }: IPaymentSouceProps): JSX.Element {
    const { t } = useTranslation("deposit");
    const { deposit: depositStore, user, transfer, tracking: trackingStore } = useRootStore();
    const routeTo: (path: string) => void = useCreateRoutingCallback();
    const [pending, setPending] = useState(false);
    const userCurrency = user.userCurrency;

    const openBitpayModal = useCallback(() => {
        let isPaid = false;
        // eslint-disable-next-line prefer-destructuring
        // eslint-disable-next-line dot-notation
        const bitpay = window["bitpay"];
        window.addEventListener(
            "message",
            (event) => {
                const paymentStatus = event.data.status;
                if (paymentStatus === "paid") {
                    isPaid = true;
                    posthog.capture(DepositEvent.CompletedBitpayPayment);
                    transfer.fetchPendingTransfers(userCurrency); // update pending transfers
                }
            },
            false,
        );
        bitpay.onModalWillEnter(() => {
            setPending(false);
            setAlert({ message: "", level: "warn" });
            posthog.capture(DepositEvent.BeginBitpayPayment);
        });

        bitpay.onModalWillLeave(() => {
            if (isPaid === false) {
                setAlert({ message: t("bitpay_error"), level: "error" });
                routeTo("/deposit/select-source");
            } else {
                routeTo("/");
            }
        });

        depositStore.bitpayInvoiceID && bitpay.showInvoice(depositStore.bitpayInvoiceID);
        !depositStore.bitpayInvoiceID && setAlert({ message: t("bitpay_warning"), level: "warn" });
    }, [depositStore.bitpayInvoiceID, routeTo, setAlert, t]);

    const onSelectBitpay = useCallback(async () => {
        setPending(true);
        depositStore.setPaymentSource({ isBitpay: () => true, isACH: () => false });

        await depositStore.createBitpayInvoiceDeposit();
        posthog.capture(DepositEvent.SelectCryptocurrency);
        trackingStore.gtm.trackCryptoSelected();
        depositStore.bitpayInvoiceID && !depositStore.deposit?.status?.error && openBitpayModal();

        depositStore.deposit?.status?.error?.message &&
            setAlert({ message: depositStore.deposit.status.error.message, level: "error" });
    }, [depositStore, openBitpayModal, setAlert]);

    return (
        <>
            {pending ? (
                <Skeleton
                    style={{
                        padding: "28px",
                        height: "100px",
                    }}
                />
            ) : (
                <PaymentSourceOptionContainer
                    onClick={onSelectBitpay}
                    disabled={isCreateACHAccountPending || depositStore.isSubscription || disabled}
                >
                    <div className="icon-wrapper">
                        <IconCrypto height="32px" width="32px" />
                    </div>
                    <span>{t("crypto")}</span>
                    <img className="payment-right-arrow-icon" alt="right-arrow" src={OrangeRightArrowSVG} />
                </PaymentSourceOptionContainer>
            )}
        </>
    );
}

export default observer(BitPayPaymentSource);
