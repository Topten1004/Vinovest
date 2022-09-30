import React from "react";
import { useTranslation } from "react-i18next";
import { useCreateRoutingCallback } from "#shared/hooks";
import { AuthContainer, AuthHeaderTitleLabel, AuthSubtitleLabel, SubmitButton } from "./styled";

const OktaAuthCheck = ({ oktaAuth, setRenderCondition }) => {
    const { t } = useTranslation("login");

    const routeTo = useCreateRoutingCallback();

    return (
        <AuthContainer>
            <AuthHeaderTitleLabel>{t("okta-check.title")}</AuthHeaderTitleLabel>
            <AuthSubtitleLabel>{t("okta-check.message")}</AuthSubtitleLabel>
            <SubmitButton
                onClick={() => {
                    routeTo("/login");
                    setRenderCondition(0);
                }}
            >
                {t("okta-check.button")}{" "}
            </SubmitButton>
        </AuthContainer>
    );
};

export default OktaAuthCheck;
