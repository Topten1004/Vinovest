import React, { useCallback, useMemo, useEffect } from "react";
import Tooltip from "react-tooltip";
import styled from "styled-components";
import { useStripe } from "@stripe/react-stripe-js";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import posthog from "posthog-js";
import { useHistory } from "#shared/hooks/useHistory";
import { MainButtonWithLoader } from "#shared/components/MainButtonWithLoader";
import { useRootStore, useCreateRoutingCallback, useTheme } from "#shared/hooks";
import { Fade, BackButton } from "#shared/ui";
import infoBubble from "#assets/shared/info-bubble.svg";
import { numberWithCommas } from "#utils/shared";
import { DepositPageFrameContainer } from "./styles";
import { DepositEvent } from "#screens/deposit/RootDepositPage";
import { currencySymbol } from "#utils/constants";

interface ReviewTransferProps {
    isForiegnTransaction: boolean;
    userRegion: string;
    portfolioCurrency: string;
}
export const ReviewTransfer = observer(
    ({ isForiegnTransaction, userRegion, portfolioCurrency }: ReviewTransferProps) => {
        const { t } = useTranslation(["deposit"]);
        const { deposit: depositStore, transfer, user } = useRootStore();
        const colors = useTheme("colors");
        const history = useHistory();
        const routeTo = useCreateRoutingCallback();
        const stripe = useStripe();

        useEffect(() => {
            /** Loop back IF there is no recorded deposit amount or selected payment source */
            if (!depositStore.depositAmt || depositStore.selectedPaymentSource.isNotSet()) {
                routeTo("/deposit/add-funds", DepositEvent.AddFundsRetry);
            }
        }, [depositStore.depositAmt, depositStore.selectedPaymentSource, routeTo]);

        const displayDepositAmt = useMemo(
            () => `${numberWithCommas(depositStore.depositAmt)}`,
            [depositStore.depositAmt],
        );
        const displaySource = useMemo(() => {
            if (depositStore.selectedPaymentSource.isNotSet()) {
                return;
            }
            return depositStore.selectedPaymentSource.maskedBankAccountDisplayInfo;
        }, [depositStore.selectedPaymentSource]);
        const frequencyKey = useMemo(() => depositStore.selectedFrequencyKey, [depositStore.selectedFrequencyKey]);
        const getFrequency = function (options: { [x: string]: any }, property: string | number) {
            return options && options[property];
        };
        const displayFrequency = getFrequency(depositStore.depositFrequencyOptions, frequencyKey);

        const displayDate = useMemo(
            () => depositStore.depositStartDate.format("MMM DD, YYYY"),
            [depositStore.depositStartDate],
        );

        const paymentTypeFeeLabel = useMemo(() => {
            const source = depositStore.selectedPaymentSource;
            if (source.isACH()) {
                return t("ach_fee");
            }

            if (source.isCreditCard()) {
                return t("credit");
            }

            return t("fee");
        }, [depositStore.selectedPaymentSource, t]);
        const displayFee = useMemo(
            () =>
                `${numberWithCommas((depositStore.depositAmtPlusFeesInCents - depositStore.depositAmtInCents) / 100)}`,
            [depositStore.depositAmtPlusFeesInCents, depositStore.depositAmtInCents],
        );

        const onCompleteTransfer = useCallback(async () => {
            await depositStore.requestCreateDeposit(stripe, userRegion);
            transfer.fetchPendingTransfers(portfolioCurrency); // update pending transfers

            if (depositStore.depositPost.status.isSuccess()) {
                posthog.capture("deposit_initiated", {
                    entity_type: "lead",
                    records: [
                        {
                            deposit_initiated: true,
                            customer_id: user.profileId,
                        },
                    ],
                });
                routeTo("/deposit/confirmation");
                return;
            }
            posthog.capture("deposit_initiated_failed", {});
            routeTo("/deposit/failed");
        }, [depositStore, stripe, userRegion, transfer, portfolioCurrency, routeTo, user.profileId]);

        return (
            <Fade in>
                <DepositPageFrameContainer>
                    <SummaryItemContainer>
                        <SummaryRow>
                            <Label>{t("amount")}:</Label>
                            <Value>
                                {currencySymbol}
                                {displayDepositAmt}
                            </Value>
                        </SummaryRow>

                        <SummaryRow>
                            <Label>{t("source")}:</Label>
                            <Value>{displaySource}</Value>
                        </SummaryRow>

                        <SummaryRow>
                            <Label>{t("frequency")}:</Label>
                            <RecurringDescriptorContainer>
                                <Value>{displayFrequency}</Value>
                                {depositStore.isSubscription && (
                                    <RecurringDescriptor>{t("transfer_description")}</RecurringDescriptor>
                                )}
                            </RecurringDescriptorContainer>
                        </SummaryRow>

                        <SummaryRow>
                            <Label>{t("date")}:</Label>
                            <Value>{displayDate}</Value>
                        </SummaryRow>

                        <SummaryRow>
                            <Label>{`${paymentTypeFeeLabel}:`}</Label>
                            <Value>
                                {currencySymbol}
                                {displayFee}
                            </Value>

                            {depositStore.selectedPaymentSource.isCreditCard() && (
                                <img
                                    src={infoBubble}
                                    id="label-icon"
                                    alt="info-bubble"
                                    data-tip="info-bubble"
                                    data-background-color={colors.darkBrown}
                                    data-text-color={colors.lightGreenBeige}
                                    data-effect="solid"
                                />
                            )}
                            <Tooltip className="fee-tooltip">{t("review")}</Tooltip>
                        </SummaryRow>
                    </SummaryItemContainer>
                    {isForiegnTransaction && <Description>{t("conversion_rate_disclaimer")}</Description>}

                    <MainButtonWithLoaderWide
                        CTA="Complete Transfer"
                        onClick={onCompleteTransfer}
                        isLoading={depositStore.depositPost.status.isPending()}
                    />
                    <BackButton goBack={history.goBack} />
                </DepositPageFrameContainer>
            </Fade>
        );
    },
);
const Description = styled.div`
    font-size: 0.875rem;
    margin-bottom: 1rem;
`;

const SummaryItemContainer = styled.div`
    font-family: ${(p: { theme: { body: any } }) => p.theme.body};
    margin-bottom: 24px;
    width: 100%;

    #label-icon {
        width: 15px;
        margin-left: 10px;
        cursor: pointer;
    }
    .fee-tooltip {
        box-shadow: -8px 8px 24px rgba(36, 46, 53, 0.16) !important;
        opacity: 1 !important;
        max-width: 260px !important;
        padding: 18px !important;
        border-radius: 10px !important;
        line-height: 18px !important;
    }

    font-size: 14px;
    ${(p: { theme: { media: { greaterThan: (arg0: string) => any } } }) => p.theme.media.greaterThan("768px")`
        font-size: 16px;
  `}
`;

const SummaryRow = styled.div`
    display: flex;
    align-items: center;
    min-height: 80px;
    padding: 25px 15px;
    border-top: 1px solid ${(p: { theme: { colors: { borderGray: any } } }) => p.theme.colors.borderGray};
    :last-child {
        border-bottom: 1px solid ${(p: { theme: { colors: { borderGray: any } } }) => p.theme.colors.borderGray};
    }
`;

const Label = styled.div`
    font-family: ${(p: { theme: { fonts: { label: any } } }) => p.theme.fonts.label};
    text-transform: uppercase;
    color: ${(p: { theme: { colors: { labelGray: any } } }) => p.theme.colors.labelGray};
    width: 40%;
`;

const Value = styled.div`
    font-size: 15px;
    ${(p: { theme: { media: { greaterThan: (arg0: string) => any } } }) => p.theme.media.greaterThan("768px")`
    font-size: 18px;
  `}
`;

const RecurringDescriptorContainer = styled.div`
    max-width: 60%;
`;

const RecurringDescriptor = styled.div`
    margin-top: 15px;
    line-height: 24px;
`;

const MainButtonWithLoaderWide = styled(MainButtonWithLoader)`
    width: 100% !important;
`;
