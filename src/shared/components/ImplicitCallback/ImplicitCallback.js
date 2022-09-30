import React, { useEffect, useState } from "react";
import { LoginCallback, useOktaAuth } from "@okta/okta-react";
import { useCreateRoutingCallback } from "#shared/hooks";
import { Redirect } from "react-router-dom";
import { smartCodeVWO } from "#utils/smartCodeVWO";
import Cookies from 'js-cookie'
import * as Sentry from '@sentry/react'

import { useRootStore } from "#shared/hooks";
import { AUTH_TYPE, GOOGLE_AUTH_TYPE, REDIRECT_URI, APPLE_AUTH_TYPE } from "../../../utils/constants";

const ssoSignFromTypes = {
    google: GOOGLE_AUTH_TYPE,
    apple: APPLE_AUTH_TYPE,
};

const ImplicitCallback = () => {
    const routeToExchange = useCreateRoutingCallback("/portfolio", { refresh: true });
    const store = useRootStore();
    const [state, setState] = useState({ authenticated: false, error: "" });
    const { oktaAuth } = useOktaAuth();

    if (localStorage.getItem("signFrom") === "normal") {
        return <LoginCallback />;
    }

    useEffect(() => {
        smartCodeVWO();
    }, []);

    /** SSO auth begins here - performs token swap + sets response to state */
    useEffect(() => {
        const ssoAuthType = ssoSignFromTypes[localStorage.getItem("signFrom")];
        if (ssoAuthType) {
            const urlParams = new URLSearchParams(window.location.hash.replace("#", "?"));
            const authCode = urlParams.get("code");
            const ssoAuth = localStorage.getItem(ssoAuthType.KEY);

            if (ssoAuth) {
                localStorage.setItem(AUTH_TYPE.KEY, ssoAuth);
                localStorage.removeItem(GOOGLE_AUTH_TYPE.KEY);
            }

            callRequestAuthTokenEndpoint(authCode);
        }

        async function callRequestAuthTokenEndpoint(authCode) {
            let res = null;
            try {
                /**
                 * Response schema:
                 * https://developer.okta.com/docs/reference/api/oidc/#response-properties-2
                 */
                res = await store.auth.requestAccessTokenFromOAuthCode(authCode);

                if (!res || res.error) {
                    throw Error(res.error_description);
                }

                localStorage.setItem("signFrom", "normal");
                try {
                    const userResponse = await fetch(`${process.env.OKTA_ISSUER}/v1/userinfo`, {headers: {Authorization: `Bearer ${res.access_token}`}});
                    const user = await userResponse.json();
                    Cookies.set('okta-sub', user.sub); 
                } catch(e){
                    Sentry.captureException(`Error retrieving user information on login to set userId cookie ${e}`)
                }
                Cookies.set('okta-access-token', res.access_token)
                await oktaAuth.signInWithRedirect({ accessToken: res.access_token });

            } catch (error) {
                setState({ authenticated: false, error: error.toString() });
            }
        }
    }, [oktaAuth, store.auth]);

    if (state.error) {
        throw Error(state.error);
    }

    if (!state.authenticated) {
        return null;
    }

    /* https://reactrouter.com/web/api/Redirect */
    const location = JSON.parse(localStorage.getItem(REDIRECT_URI.KEY) || "{}");
    localStorage.removeItem(REDIRECT_URI.KEY);

    // return routeToExchange("/portfolio");
    return <Redirect to={location} push />;
};;

export default ImplicitCallback;
