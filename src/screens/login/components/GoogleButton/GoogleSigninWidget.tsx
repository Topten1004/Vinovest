import PropTypes from "prop-types";
import React from "react";
import qs from "qs";
import { useTranslation } from "react-i18next";
import posthog from "posthog-js";
import config from "#app.config";
import { ReactComponent as GGIcon } from "#assets/shared/gg-icon.svg";
import { ButtonLabel, ContainerButton } from "./GoogleSigninWidget.styled";
import { AUTH_TYPE, GOOGLE_AUTH_TYPE } from "#utils/constants";
import { useRootStore } from "#shared/hooks";
import { useMobile } from "#shared/hooks";
const oidcRedirectParams = {
    idp: config.googleID,
    client_id: config.clientId,
    redirect_uri: config.redirectUri,
    ...config.ssoOidcRedirectConfig,
};

const oidsRedirectUrl = `${config.issuer}/v1/authorize?${qs.stringify(oidcRedirectParams, { encode: false })}`;

interface GoogleSigninWidgetProps {
    type: string;
    trackPixelGetStarted?: (email: string, signUpWiaGoogle: boolean) => void;
}

const GoogleSigninWidget = ({ type, trackPixelGetStarted }: GoogleSigninWidgetProps) => {
    const { t } = useTranslation("login");
    const store = useRootStore();
    const isSignup = type === AUTH_TYPE.SIGNUP;
    const isMobile = useMobile(767);
    const googleSignRequest = () => {
        /**
         * Temporary Google OAuth flag, to resolve after OAuth completes
         * <ImplicitCallback> should remove this upon redirect
         * Used to determine which auth tracking event to dispatch on <HomePage>
         */
        localStorage.setItem(GOOGLE_AUTH_TYPE.KEY, type);
        localStorage.setItem("signFrom", "google");
        isSignup && posthog.capture("user_clicks_gmail_signup", {});
        isSignup && store.tracking.gtm.trackRegistrationComplete();
        if (trackPixelGetStarted) trackPixelGetStarted(null, true);
        /** https://developer.okta.com/docs/reference/api/oidc/#authorize */
        window.location.href = oidsRedirectUrl;
    };
    const copyCTA = isSignup ? isMobile ? "" : t("google-signin.signup") : t("google-signin.login");
    const buttonLabel = isMobile ? t("google-signin.button-label-mobile") : t("google-signin.button-label");
    return (
        <ContainerButton onClick={googleSignRequest} isSignup={isSignup}>
            <GGIcon style={{ position: "absolute", marginLeft: "20px" }} />
            <ButtonLabel paddingLeft={isSignup && isMobile}>{`${copyCTA} ${buttonLabel}`}</ButtonLabel>
        </ContainerButton>
    );
};

export default GoogleSigninWidget;
