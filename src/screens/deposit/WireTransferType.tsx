import React from "react";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import { useHistory } from "#shared/hooks/useHistory";
import OrangeRightArrowSVG from "#assets/shared/orange-right-arrow.svg";
import { Fade, BackButton } from "#shared/ui";
import { ROUTE_PATHS } from "#screens/route-paths";
import domesticSVG from "#assets/shared/domestic.svg";
import globeSVG from "#assets/shared/globe.svg";
import { DepositPageFrameContainer, OptionListContainer, PaymentSourceOptionContainer } from "./styles";

interface WireTransferTypeProps {
    isForiegnTransaction: boolean;
}

export const WireTransferType = observer(({isForiegnTransaction}: WireTransferTypeProps) => {
    const { t } = useTranslation(["deposit"]);
    const history = useHistory();

    return (
        <Fade in>
            <DepositPageFrameContainer>
                <OptionListContainer>
                    {!isForiegnTransaction &&
                        <PaymentSourceOptionContainer
                            onClick={() => history.push(`${ROUTE_PATHS.deposit}/domestic-wire-transfer`)}
                        >
                            <div className="icon-wrapper">
                                <img className="payment-source-icon" alt="source-icon" src={domesticSVG} />
                            </div>
                            <span>{t("us_bank_wire")}</span>
                            <img className="payment-right-arrow-icon" alt="right-arrow" src={OrangeRightArrowSVG} />
                        </PaymentSourceOptionContainer>
                    }
                        <PaymentSourceOptionContainer
                        onClick={() => history.push(`${ROUTE_PATHS.deposit}/international-wire-transfer`)}
                    >
                        <div className="icon-wrapper">
                            <img className="payment-source-icon" alt="source-icon" src={globeSVG} />
                        </div>
                        <span>{t("international_bank_wire")}</span>
                        <img className="payment-right-arrow-icon" alt="right-arrow" src={OrangeRightArrowSVG} />
                    </PaymentSourceOptionContainer>

                </OptionListContainer>

                <BackButton goBack={history.goBack} />
            </DepositPageFrameContainer>
        </Fade>
    );
});
