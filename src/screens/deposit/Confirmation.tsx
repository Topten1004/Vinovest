import React, { useCallback, useEffect, useMemo } from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import BalloonCoinSVG from "#assets/shared/balloon-coin.svg";
import { MainButtonWithLoader } from "#shared/components/MainButtonWithLoader";
import { useRootStore, useCreateRoutingCallback } from "#shared/hooks";
import { Fade } from "#shared/ui";
import { numberWithCommas } from "#utils/shared";
import { DepositPageFrameContainer } from "./styles";
import { currencySymbol } from "#utils/constants";

interface ConfirmationProps {
    portfolioCurrency: string;
}

export const Confirmation = observer(({ portfolioCurrency }: ConfirmationProps) => {
    const { t } = useTranslation(["deposit", "common"]);

    const { deposit: depositStore, transfer: transferStore } = useRootStore();
    const routeTo = useCreateRoutingCallback();

    useEffect(() => {
        if (depositStore.depositPost.status.isSuccess()) {
            depositStore.trackDeposit(portfolioCurrency);
        }
    }, [depositStore.depositPost.status, depositStore, portfolioCurrency]);

    const confirmationCopy = useMemo(
        () => [
            t("transfer_message_line1", {
                currencySymbol,
                amount: numberWithCommas(depositStore.depositAmtPlusFeesInCents / 100),
            }),
            t("transfer_message_line2", { minDay: 3, maxDay: 5 }),
            t("transfer_message_line3"),
        ],
        [depositStore.depositAmtPlusFeesInCents, t],
    );

    const onConfirmDetails = useCallback(() => {
        if (transferStore.shouldShowAccountSubscription && depositStore.selectedDepositFrequency === "month") {
            transferStore.fetchShouldShowAccountSubscriptionEntity();
        }

        depositStore.setDepositAmt(0);
        depositStore.setDepositFrequencyKey();
        transferStore.setTransferInProgress(true);
        routeTo("/");
    }, [routeTo, depositStore, transferStore]);

    return (
        <Fade in>
            <DepositPageFrameContainer>
                <StatusIcon src={BalloonCoinSVG} />

                <ConfirmationDescription>
                    {confirmationCopy.map((line) => (
                        <p key={line.slice(4)}>{line}</p>
                    ))}
                </ConfirmationDescription>

                <ButtonContainer>
                    <MainButtonWithLoader CTA={t("done")} onClick={onConfirmDetails} />
                </ButtonContainer>
            </DepositPageFrameContainer>
        </Fade>
    );
});

const StatusIcon = styled.img`
    margin-bottom: 20px;
`;

const ConfirmationDescription = styled.div`
    text-align: center;
    font-size: 18px;
    line-height: 20px;
    margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
    width: 100%;
    max-width: 400px;
`;
