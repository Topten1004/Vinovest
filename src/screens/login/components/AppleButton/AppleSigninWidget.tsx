import PropTypes from "prop-types";
import React from "react";
import qs from "qs";
import { useTranslation } from "react-i18next";
import posthog from "posthog-js";
import config from "#app.config";
import { ReactComponent as AppleIcon } from "#assets/shared/apple-icon.svg";
import { ButtonLabel, ContainerButton } from "./AppleSigninWidget.styled";
import { AUTH_TYPE, APPLE_AUTH_TYPE } from "#utils/constants";
import { useRootStore } from "#shared/hooks";
import { useMobile } from "#shared/hooks";

const oidcRedirectParams = {
    idp: config.appleID,
    client_id: config.clientId,
    redirect_uri: config.redirectUri,
    ...config.ssoOidcRedirectConfig,
};

const oidsRedirectUrl = `${config.issuer}/v1/authorize?${qs.stringify(oidcRedirectParams, { encode: false })}`;

interface AppleSigninWidgetProps {
    type: string;
    trackPixelGetStarted?: (email: string, signUpWiaApple: boolean) => void;
}

const AppleSigninWidget = ({ type, trackPixelGetStarted }: AppleSigninWidgetProps) => {
    const { t } = useTranslation("login");
    const store = useRootStore();
    const isSignup = type === AUTH_TYPE.SIGNUP;
    const isMobile = useMobile(767);
    const appleSignRequest = () => {
        /**
         * Temporary Apple OAuth flag, to resolve after OAuth completes
         * <ImplicitCallback> should remove this upon redirect
         * Used to determine which auth tracking event to dispatch on <HomePage>
         */
        localStorage.setItem(APPLE_AUTH_TYPE.KEY, type);
        localStorage.setItem("signFrom", "apple");
        isSignup && posthog.capture("user_clicks_apple_signup", {});
        isSignup && store.tracking.gtm.trackRegistrationComplete();
        if (trackPixelGetStarted) trackPixelGetStarted(null, true);
        /** https://developer.okta.com/docs/reference/api/oidc/#authorize */
        window.location.href = oidsRedirectUrl;
    };
    const copyCTA = isSignup ? isMobile ? "" : t("apple-signin.signup") : t("apple-signin.login");
    const buttonLabel = isMobile ? t("apple-signin.button-label-mobile") : t("apple-signin.button-label");
    return (
        <ContainerButton onClick={appleSignRequest} isSignup={isSignup}>
            <AppleIcon style={{ position: "absolute" }} />
            <ButtonLabel paddingLeft={isSignup && isMobile}>{`${copyCTA} ${buttonLabel}`}</ButtonLabel>
        </ContainerButton>
    );
};

export default AppleSigninWidget;
