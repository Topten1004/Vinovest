import React from "react";
import { useTranslation } from "react-i18next";
import posthog from "posthog-js";
import { observer } from "mobx-react-lite";
import styled from "styled-components";
import { BottleAnimationLoader, BackButton } from "#shared/ui";
import { ROUTE_PATHS } from "#screens/route-paths";
import { useHistory } from "#shared/hooks/useHistory";
import { useRootStore, useCreateRoutingCallback } from "#shared/hooks";
import { getStatus } from "#models/FetchStatus";
import { WireTable } from "./WireTable";
import { WireWrapper, WireDescription, DoneButton } from "../styles";
import pdfSvg from "./assets/pdf.svg";

interface WireTransferProps {
    data: Array<{ title: string | JSX.Element; value: any }>;
    description: string;
    tip: string;
    type: string;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
export const WireTransfer: React.FC<WireTransferProps> = observer(({ data, description, tip, type, onClick }) => {
    const { t } = useTranslation(["deposit"]);
    const store = useRootStore();
    const history = useHistory();
    const { data: referenceKeyFetch } = store.deposit.referenceKeyFetch;
    const referenceKey = type === "international" && referenceKeyFetch;
    const routeTo = useCreateRoutingCallback();
    const isPending = getStatus(store.deposit.referenceKeyFetch).isPending();
    const isDone = getStatus(store.deposit.referenceKeyFetch).isDone();

    const onSubmitWireTransferInstructions = React.useCallback(() => {
        store.transfer.setTransferInProgress(true);
        posthog.capture("viewed_wire_transfer_instructions", {});
        routeTo("/");
    }, [routeTo, store.transfer]);

    return (
        <WireWrapper className="hide-print">
            {(isPending || !isDone) && !isDone ? (
                <BottleAnimationLoader />
            ) : (
                <>
                    <WireDescriptionWrapper>{description}</WireDescriptionWrapper>
                    <WireTable data={data} tip={tip} referenceKey={referenceKey} />
                    <Print onClick={(event: React.MouseEvent<HTMLElement>) => onClick(event)} target="_blank">
                        <img src={pdfSvg} alt="png" /> {t("wire_transfer.download")}
                    </Print>
                    {type === "international" && (
                        <AlertAdvisors>
                            {t("alert_advisors.first")}
                            <a href="mailto: ir@vinovest.co">ir@vinovest.co</a>
                            {t("alert_advisors.second")}
                        </AlertAdvisors>
                    )}
                    <DoneButton onClick={onSubmitWireTransferInstructions}>{t("wire_transfer.button_done")}</DoneButton>
                </>
            )}
            <BackButton goBack={history.goBack} />
        </WireWrapper>
    );
});

const WireDescriptionWrapper = styled(WireDescription)`
    min-height: 98px;
    margin-bottom: 58px;

    ${(p) => p.theme.media.greaterThan("768px")`
        margin-bottom: 71px;
    `}
`;

const Print = styled.a`
    font-family: VinovestMono;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    text-align: center;
    letter-spacing: 0.025em;
    text-transform: uppercase;
    color: #a86d37;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 44px auto 0;
    border: 0;
    outline: 0;
    background: transparent;
    transition: 0.3s;
    text-decoration: none;

    img {
        margin-right: 16px;
        display: block;
        width: 20px;
        height: 23px;
    }

    &:hover {
        opacity: 0.5;
        cursor: pointer;
    }

    ${(p) => p.theme.media.greaterThan("768px")`
        margin-top: 60px;
    `}
`;

const AlertAdvisors = styled.p`
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    margin-top: 40px;
    line-height: 2;
    a {
        text-decoration: none;
        color: #0066cc;
    }
`
