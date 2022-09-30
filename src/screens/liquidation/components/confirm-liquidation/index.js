import React from "react";
import { observer } from "mobx-react-lite";
import { getStatus } from "#models/FetchStatus";
import { useRootStore } from "#shared/hooks";
import { Fade, MainButton } from "#shared/ui";
import styled from "styled-components";
import { Description } from "../styled";
import { useTranslation } from "react-i18next";
import { I18nLink as Link } from "#localization/localizedRouter";


const ConfirmLiquidation = () => {
    const { t } = useTranslation(["liquidation"]);

    const s = useRootStore();
    const isPutConfirmWinesLiquidationResendEmailPending = getStatus(
        s.liquidation.putConfirmWinesLiquidationResendEmailEntity,
    ).isPending();

    return (
        <Fade in>
            <Wrapper>
                <ResendBtn
                    disabled={isPutConfirmWinesLiquidationResendEmailPending}
                    onClick={() => s.liquidation.resendEmail()}
                >
                    {t("resend_email")}
                </ResendBtn>
                <Tip>
                    {t("please")}{" "}
                    <Link to="/contact-support" target="_blank" rel="noopener noreferrer">
                        {t("contact_support")}
                    </Link>{" "}
                    {t("did_not_get_email")}
                </Tip>
            </Wrapper>
        </Fade>
    );
};

const ResendBtn = styled(MainButton)`
    outline: 0;
    max-width: 393px !important;
    background: #ffffff;
    width: 100% !important;
    border: 1px solid #a8abad;
    height: 70px;
    color: #242e35;
    margin: 0 auto 0 !important;

    @media screen and (max-width: 1024px) {
        height: 60px;
    }
`;

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 57px auto 57px;

    @media screen and (max-width: 1024px) {
        margin: 57px auto 0;
    }
`;

const Tip = styled(Description)`
    margin: 52px 0;

    @media screen and (max-width: 1024px) {
        margin: 32px 0;
    }
`;

export default observer(ConfirmLiquidation);
