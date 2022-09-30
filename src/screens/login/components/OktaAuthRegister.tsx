import React from "react";
import _ from "lodash";
import posthog from 'posthog-js'
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { ReactComponent as MailIcon } from "#assets/shared/mail.svg";
import { useRootStore, useCreateRoutingCallback } from "#shared/hooks";
import { AuthContainer, AuthHeaderTitleLabel, AuthAddonLabel, AuthDisclaimer } from "./styled";
import GoogleSigninWidget from "./GoogleButton";
import { ContainerButton, ButtonLabel } from "./GoogleButton/GoogleSigninWidget.styled";
import { AUTH_TYPE, languageCodeEnglish } from "#utils/constants";
import { I18nLink } from "#localization/localizedRouter";
import AppleSigninWidget from "./AppleButton/AppleSigninWidget";
import { useLocation } from "react-router-dom";
import { useMobile } from "#shared/hooks";

const OktaAuthRegister = () => {
    const { t } = useTranslation("login");
    const store = useRootStore();
    const routeTo = useCreateRoutingCallback()
    const location = useLocation();
    const isSignup = location.pathname.endsWith("/signup");
    const isMobile = useMobile(767);

    const handleEmailRegister = () => {
        posthog.capture("user_clicks_email_signup", {});
        routeTo("/new-user/create-account");

    };
    return (
        <AuthContainer>
            <AuthHeaderTitleLabel as="h1" style={{marginBottom: 20}}>{t("okta-register.header-invest")}</AuthHeaderTitleLabel>
            <>
                <Wrapper>
                {languageCodeEnglish && (
                    <ButtonsContainer>
                        <GoogleSigninWidget
                            type={AUTH_TYPE.SIGNUP}
                            trackPixelGetStarted={store.tracking.gtm.trackPixelGetStarted}
                        />
                        <AppleSigninWidget
                            type={AUTH_TYPE.SIGNUP}
                            trackPixelGetStarted={store.tracking.gtm.trackPixelGetStarted}
                        />
                    </ButtonsContainer>
                )}

                <ContainerButton normal onClick={handleEmailRegister} isSignup={isSignup}>
                    <MailIcon style={{ position: "absolute", marginLeft: "20px" }} />
                    <ButtonLabel normal="true"> {t("okta-register.button-email")}</ButtonLabel>
                </ContainerButton>
                </Wrapper>
                <div style={{ marginTop: "30px" }}>
                    {isSignup && isMobile ? null : <AuthAddonLabel isNotDecrator="true"> {t("okta-register.button-account")}</AuthAddonLabel>}
                    <AuthAddonLabel isSignup={isSignup}
                        style={{ marginLeft: "4px", textDecoration: "none", color: "#A86D37" }}
                        onClick={() => routeTo("/login")}
                    >
                        {t("okta-register.button-login")}
                    </AuthAddonLabel>
                </div>
                <AuthDisclaimer>
                    {t("okta-register.disclaimer")}{" "}
                    <I18nLink to="/privacy-policy">{t("okta-register.privacy")}</I18nLink>{" "}
                    {t("okta-register.disclaimer-cont")}{" "}
                    <I18nLink to="/terms-conditions">{t("okta-register.terms")}</I18nLink>.
                </AuthDisclaimer>
            </>
        </AuthContainer>
    );
};

export default OktaAuthRegister;

const ButtonsContainer = styled.div`
    display: flex;
    order: 2;
    @media screen and (min-width: 768px) {
        flex-direction: column;
        order: -1;
    }
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`;