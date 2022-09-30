/* eslint-disable prefer-destructuring */
import React, { useState, useMemo } from "react";
import _ from "lodash";
import { useTranslation } from "react-i18next";
import { useStripe } from "@stripe/react-stripe-js";
import posthog from "posthog-js";
import { useHistory } from "react-router-dom";
import Tooltip from "react-tooltip";
import styled from "styled-components";
import { useRootStore, useTheme } from "#shared/hooks";
import infoBubble from "#assets/shared/info-bubble.svg";
import { numberWithCommas } from "#utils/shared";
import { MainButtonWithLoader } from "#shared/components/MainButtonWithLoader";
import { BackButton } from "#shared/ui";
import ErrorIcon from "#assets/shared/ErrorIcon";
import AlertMessage from "#shared/ui/Alert/AlertMessage";
import { currencySymbol } from "#utils/constants";

interface AliPayPaymentSourceProps {
    userRegion: string;
    isForiegnTransaction: boolean;
}

export function AliPayPaymentSource({ isForiegnTransaction, userRegion }: AliPayPaymentSourceProps) {
    const { t } = useTranslation("deposit");
    const stripe = useStripe();
    const { deposit: depositStore, transfer, user } = useRootStore();
    const [pending, setPending] = useState(false);
    const history = useHistory();
    const colors = useTheme("colors");
    const [errorMessage, setErrorMessage] = useState(null);
    const userCurrency = user.userCurrency;

    const onSelectAlipay = async () => {
        setPending(true);
        await depositStore.requestAlipayPayment(stripe, userRegion).then((error: string) => setErrorMessage(error));
        setPending(false);
        posthog.capture("deposit_initiated", {
            entity_type: "lead",
            records: [
                {
                    deposit_initiated: true,
                    customer_id: user.profileId,
                },
            ],
        });
        transfer.fetchPendingTransfers(userCurrency); // update pending transfers
    };

    const displayDepositAmt = useMemo(() => `${numberWithCommas(depositStore.depositAmt)}`, [depositStore.depositAmt]);

    const displayFee = useMemo(
        () => `${numberWithCommas((depositStore.depositAmtPlusWeChatFees - depositStore.depositAmtInCents) / 100)}`,
        [depositStore.depositAmtInCents, depositStore.depositAmtPlusWeChatFees],
    );

    return (
        <>
            <Container>
                <SummaryItemContainer>
                    <SummaryRow>
                        <Label>{t("amount")}:</Label>
                        <Value>
                            {currencySymbol}
                            {displayDepositAmt}
                        </Value>
                    </SummaryRow>
                    <SummaryRow>
                        <Label>{t("label_alipay_fee")}: </Label>
                        <Value>
                            {currencySymbol}
                            {displayFee}
                        </Value>
                        <img
                            src={infoBubble}
                            id="label-icon"
                            alt="info-bubble"
                            data-tip="info-bubble"
                            data-background-color={colors.darkBrown}
                            data-text-color={colors.lightGreenBeige}
                            data-effect="solid"
                        />
                        <Tooltip className="fee-tooltip">{t("alipay_wechat_fee")}</Tooltip>
                    </SummaryRow>
                </SummaryItemContainer>
                <Description>
                    {t("alipay_description")} {isForiegnTransaction && t("conversion_rate_disclaimer")}
                </Description>

                {errorMessage && (
                    <AlertMessage type="error">
                        <ErrorIcon /> {errorMessage}
                    </AlertMessage>
                )}
                <BackButton goBack={history.goBack} />
                <ButtonContainer>
                    <MainButtonWithLoader CTA={t("button_alipay")} onClick={onSelectAlipay} isLoading={pending} />
                </ButtonContainer>
            </Container>
        </>
    );
}

const Description = styled.div`
    font-size: 0.875rem;
    max-width: 500px;
`;

const ButtonContainer = styled.div`
    width: 100%;
    margin: auto;
    max-width: 400px;
`;

const SummaryItemContainer = styled.div`
    font-family: ${(p) => p.theme.body};
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
    ${(p) => p.theme.media.greaterThan("768px")`
        font-size: 16px;
        max-width: 500px;
  `}
`;

const SummaryRow = styled.div`
    display: flex;
    align-items: center;
    min-height: 80px;
    padding: 25px 15px;
    border-top: 1px solid ${(p) => p.theme.colors.borderGray};
    :last-child {
        border-bottom: 1px solid ${(p) => p.theme.colors.borderGray};
    }
`;

const Label = styled.div`
    font-family: ${(p) => p.theme.fonts.label};
    text-transform: uppercase;
    color: ${(p) => p.theme.colors.labelGray};
    width: 40%;
`;

const Value = styled.div`
    font-size: 15px;
    ${(p) => p.theme.media.greaterThan("768px")`
    font-size: 18px;
  `}
`;

const Container = styled.div`
    max-width: 500px;
`;
