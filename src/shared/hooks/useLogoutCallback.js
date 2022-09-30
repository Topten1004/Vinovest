import { useOktaAuth } from "@okta/okta-react";
import posthog from "posthog-js";
import * as Sentry from "@sentry/react";
import { useHistory } from "#shared/hooks/useHistory";
import { useRootStore } from "./useRootStore";
import { signOut } from "#shared/hooks/useSendAuth/signOut";

export const useLogoutCallback = () => {
    const { oktaAuth } = useOktaAuth();

    const history = useHistory();
    const store = useRootStore();

    return async () => {
        try {
            await store.auth.resetStateOnLogout();
            await oktaAuth.signOut();
            oktaAuth.tokenManager.clear();
            posthog.reset();
            signOut();
            window.location.assign("/login");
        } catch (e) {
            Sentry.captureException(new Error(`User signout failed: ${e}`));
        }
    };
};
