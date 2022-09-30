import { useEffect } from "react";
import { useOktaAuth } from "@okta/okta-react";
import {signIn} from './signIn'

export const authenticateToExchange = async (okta: ReturnType<typeof useOktaAuth>["oktaAuth"]) => {
    const isAuthenticated = await okta.isAuthenticated();

    if (isAuthenticated) {
        const tokens = await okta.tokenManager.getTokens();
       await signIn({ redirect: true, tokens: JSON.stringify(tokens), callbackUrl: `${window.location.origin}/portfolio`})

    }
};

export const useSendAuth = (useCallback: boolean = false) => {
    const oktaAuth = useOktaAuth();
    useEffect(() => {
        if (!useCallback) {
            authenticateToExchange(oktaAuth.oktaAuth);
        }
    });
    async function sendAuth() {
        await authenticateToExchange(oktaAuth.oktaAuth);
        return;
    }
    return sendAuth;
};
