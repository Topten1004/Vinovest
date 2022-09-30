/* eslint-disable prefer-destructuring */
import React, { useMemo, useCallback, useEffect, useState } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import _ from "lodash";
import { observer } from "mobx-react-lite";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import posthog from "posthog-js";
import { IconCreditCard, IconBankWire, IconWeChat, IconAlipay } from "@vinovest/components/icons";
import { useRootStore, useCreateRoutingCallback } from "#shared/hooks";
import { I18nLink } from "#localization/localizedRouter";
import { useHistory } from "#shared/hooks/useHistory";
import { ROUTE_PATHS } from "#screens/route-paths";
import { BackButton, Fade } from "#shared/ui";
import BitpayPaymentSourceOption from "./PaymentSources/BitpayPaymentSource";
import { DepositPageFrameContainer, AlertMessage, OptionListContainer } from "./styles";
import BankAccountOption from "./PaymentSources/BankAccount";
import PaymentSourceOption from "./PaymentSources/PaymentSourceOption";
import { DepositEvent } from "./RootDepositPage";

export interface ISelectSourceAlert {
    message: string;
    level: "log" | "warn" | "error";
}

interface SelectSourceInterface {
    isForiegnTransaction: boolean;
}
export const SelectSource = observer(({ isForiegnTransaction }: SelectSourceInterface) => {
    const { t } = useTranslation(["deposit"]);
    const { deposit: depositStore } = useRootStore();
    const { tracking: trackingStore } = useRootStore();
    const defaultAlert: ISelectSourceAlert = { message: "", level: "warn" };
    const [alert, setAlert] = useState(defaultAlert);
    const history = useHistory();
    const routeTo = useCreateRoutingCallback();

    useEffect(() => {
        if (depositStore.isSubscription) {
            setAlert((a) => ({
                ...a,
                message: t("alert_message"),
            }));
        }
    }, [depositStore.isSubscription, t]);

    const onSelectCreditCardSource = useCallback(() => {
        routeTo("/deposit/credit-card");
        posthog.capture(DepositEvent.SelectCreditCard);
        trackingStore.gtm.trackCreditCardSelected();
    }, [routeTo]);

    const onSelectWireTransfer = useCallback(() => {
        routeTo("/deposit/wire-transfer-type");
        posthog.capture(DepositEvent.SelectWire);
        trackingStore.gtm.trackBankWireSelected();
    }, [routeTo]);

    const onSelectWeChat = useCallback(() => {
        routeTo("/deposit/wechat");
    }, [routeTo]);

    const onSelectAlipay = useCallback(() => {
        routeTo("/deposit/alipay");
    }, [routeTo]);

    const isCreateACHAccountPending: boolean = useMemo(
        () => depositStore.ACHAccountCreate.status.isPending(),
        [depositStore.ACHAccountCreate.status],
    );

    return (
        <Fade in>
            <DepositPageFrameContainer>
                {alert.message && (
                    <Fade in>
                        <AlertMessage role="alert" level={alert.level}>
                            {alert.message}
                        </AlertMessage>
                    </Fade>
                )}

                <OptionListContainer>
                    <BankAccountOption
                        plaidToken={depositStore.plaidLinkToken}
                        setAlert={setAlert}
                        disabled={isForiegnTransaction}
                    />

                    <PaymentSourceOption
                        onClick={onSelectCreditCardSource}
                        disabled={isCreateACHAccountPending}
                        label={t("credit_card")}
                        icon={<IconCreditCard height="32px" width="26px" />}
                    />

                    <PaymentSourceOption
                        onClick={onSelectWeChat}
                        disabled={depositStore.isSubscription}
                        label={t("wechat")}
                        icon={<IconWeChat height="29px" width="32px" />}
                    />

                    <BitpayPaymentSourceOption
                        isCreateACHAccountPending={isCreateACHAccountPending}
                        setAlert={setAlert}
                        disabled={isForiegnTransaction}
                    />
                    <PaymentSourceOption
                        onClick={onSelectWireTransfer}
                        disabled={depositStore.isSubscription || isCreateACHAccountPending}
                        label={t("bank_wire")}
                        icon={<IconBankWire height="32px" width="44px" />}
                    />
                    <PaymentSourceOption
                        onClick={onSelectAlipay}
                        disabled={isCreateACHAccountPending || depositStore.isSubscription || !isForiegnTransaction}
                        label={t("alipay")}
                        icon={<IconAlipay height="32px" width="32px" />}
                    />
                    {isCreateACHAccountPending && (
                        <LoadingShield>
                            <PulseLoader color="#828282" />
                        </LoadingShield>
                    )}
                </OptionListContainer>
                <SeeInstructions>
                    {`${t("mail_check_deposit")} `}
                    <I18nLink
                        hard
                        to={`${ROUTE_PATHS.deposit}/mail-a-check`}
                        onClick={() => trackingStore.gtm.trackMailACheckLinkSelected()}
                        target="_blank"
                    >
                        {t("instructions")}
                    </I18nLink>
                </SeeInstructions>

                <BackButton goBack={history.goBack} />
            </DepositPageFrameContainer>
        </Fade>
    );
});

const LoadingShield = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: not-allowed;
`;

const SeeInstructions = styled.div`
    font-family: VinovestMedium;
    font-style: normal;
    font-weight: normal;
    margin-top: 27px;
    font-size: 11px;
    line-height: 16px;
    text-align: center;
    letter-spacing: 0.025em;
    text-transform: uppercase;
    color: #242e35;

    a {
        color: #a86d37;
        text-decoration: none;
    }

    ${(p) => p.theme.media.greaterThan("768px")`
        margin-top: 41px;
        font-size: 14px;
        line-height: 18px;
    `};
`;
