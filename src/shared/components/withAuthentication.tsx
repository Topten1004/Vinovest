import React, { useEffect } from "react";
import { useOktaAuth } from "@okta/okta-react";
import { useLocation } from "react-router";
import { useRootStore } from "#shared/hooks";

const useAuthentication = () => {
    const { oktaAuth, authState } = useOktaAuth();
    const location = useLocation();
    const { auth } = useRootStore();

    async function getAuthenticatedState() {
        const authenticated = await oktaAuth.isAuthenticated();
        const hasToken = await oktaAuth.tokenManager.getTokens();
        if (!authenticated || !hasToken?.accessToken?.accessToken) {
            try {
                auth.resetStateOnLogout();
                oktaAuth.tokenManager.clear();
                await oktaAuth.signOut();
            } catch (e) {}

            window.location.assign(`${window.location.origin}/login`);
        }
    }
    useEffect(() => {
        getAuthenticatedState();
    }, [getAuthenticatedState]);
};
export const withAuthentication =
    (Component) =>
    (...props) => {
        useAuthentication();
        return (
            <>
                <Component {...props} />
            </>
        );
    };
