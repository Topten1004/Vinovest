import React, { useEffect, useState, useCallback, useMemo } from "react";
import QRCode from "react-qr-code";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";
import posthog from "posthog-js";
import { useStripe } from "@stripe/react-stripe-js";
import Tooltip from "react-tooltip";
import { BackButton } from "#shared/ui";
import { useRootStore, useCreateRoutingCallback, useTheme } from "#shared/hooks";
import { MainButtonWithLoader } from "#shared/components/MainButtonWithLoader";
import { numberWithCommas } from "#utils/shared";
import infoBubble from "#assets/shared/info-bubble.svg";
import { currencySymbol } from "#utils/constants";
import { ROUTE_PATHS } from "#screens/route-paths";

interface WeChatProps {
    isForiegnTransaction: boolean;
    userRegion: string;
}

export const WeChat = ({ isForiegnTransaction, userRegion }: WeChatProps) => {
    const colors = useTheme("colors");
    const { t } = useTranslation("deposit");
    const store = useRootStore();
    const history = useHistory();
    const [weChatLink, setWeChatLink] = useState(null);
    const routeTo = useCreateRoutingCallback();
    const { userCurrency } = store.user;
    const stripe = useStripe();

    useEffect(() => {
        async function fetchData() {
            await store.deposit.requestWeChat(stripe, userRegion).then((data) => {
                setWeChatLink(data.link);
            });
        }
        fetchData();
    }, [store.deposit, userRegion]);

    const onConfirmDetails = useCallback(() => {
        posthog.capture("deposit_initiated", {
            entity_type: "lead",
            records: [
                {
                    deposit_initiated: true,
                    customer_id: store.user.profileId,
                },
            ],
        });
        store.transfer.fetchPendingTransfers(userCurrency);
        routeTo(ROUTE_PATHS.managedPortfolio);
    }, [routeTo, store.transfer, userCurrency, store.user.profileId]);
    const displayDepositAmt = useMemo(
        () => `${numberWithCommas(store.deposit.depositAmt)}`,
        [store.deposit.depositAmt],
    );

    const displayFee = useMemo(
        () => `${numberWithCommas((store.deposit.depositAmtPlusWeChatFees - store.deposit.depositAmtInCents) / 100)}`,
        [store.deposit.depositAmtInCents, store.deposit.depositAmtPlusWeChatFees],
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
                        <Label>{t("label_wechat_fee")}: </Label>
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
                    {t("wechat_qr_description")}
                    {isForiegnTransaction && t("conversion_rate_disclaimer")}
                </Description>
                <QRWrapper>
                    {weChatLink ? <QRCode value={weChatLink} /> : <Skeleton height="256px" width="256px" />}
                </QRWrapper>
                <BackButton goBack={history.goBack} />
                <ButtonContainer>
                    <MainButtonWithLoader CTA="Done" onClick={onConfirmDetails} />
                </ButtonContainer>
            </Container>
        </>
    );
};
const Description = styled.div`
    font-size: 0.875rem;
    margin-bottom: 1rem;
`;

const ButtonContainer = styled.div`
    margin: auto;
    max-width: 400px;
    width: 100%;
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
    width: 100%;
`;

const QRWrapper = styled.div`
    text-align: center;
`;
