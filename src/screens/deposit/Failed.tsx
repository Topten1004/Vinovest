import React, { useCallback, useMemo } from "react";
import _ from "lodash";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import UnpluggedSVG from "#assets/shared/unplugged.svg";
import { MainButtonWithLoader } from "#shared/components/MainButtonWithLoader";
import { useRootStore, useCreateRoutingCallback } from "#shared/hooks";
import { Fade } from "#shared/ui";
import { DepositPageFrameContainer } from "./styles";
import { DepositEvent } from "#screens/deposit/RootDepositPage";

export const Failed = observer(() => {
    const { t } = useTranslation(["deposit"]);

    const { deposit: depositStore } = useRootStore();
    const routeTo = useCreateRoutingCallback();
    const confirmationCopy = useMemo(
        () => [depositStore.depositPost.status.error, t("failed_line1"), t("failed_line2")],
        [depositStore.depositPost.status.error, t],
    );

    const onConfirmDetails = useCallback(() => {
        routeTo("/deposit/add-funds", DepositEvent.AddFundsRetry);
    }, [routeTo]);

    return (
        <Fade in>
            <DepositPageFrameContainer>
                <StatusIcon src={UnpluggedSVG} />

                <ConfirmationDescription>
                    {_.compact(confirmationCopy).map((line) => (
                        <p key={line.slice(4)}>{line}</p>
                    ))}
                </ConfirmationDescription>

                <ButtonContainer>
                    <MainButtonWithLoader CTA={t("retry")} onClick={onConfirmDetails} />
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
