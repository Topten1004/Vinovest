import React from "react";
import ReactDOM from "react-dom";
import { useCallback } from "react";
import { useLocation, useHistory } from "react-router-dom";
import posthog from "posthog-js";
import { PageRedirect } from "#shared/components/PageRedirect/PageRedirect";
import { localizedPath } from "#localization/localizedRouter";
import { useSendAuth } from "#shared/hooks/useSendAuth/useSendAuth";

const hardRefresh = async (refreshPath, cb) => {
    try{
        await cb();
    } catch(e){
        console.error("Error sending auth")
    }

    window.location.pathname = refreshPath;
    window.location.reload()

    
};

const handlePosthogEvents = (events: string | string[]) => {
    if (Array.isArray(events)) {
        return events.map((event) => {
            posthog.capture(event);
        });
    }
    return posthog.capture(events);
};
interface RouteCallbackOptions {
    posthogId?: string | string[];
    refresh?: boolean;
}

const redirect = (path, { refresh, posthogId }: RouteCallbackOptions = {}, location, history, auth) => {
    const localePath = {
        pathname: path && localizedPath(path),
        search: location.search,
    };
    if (posthogId) {
        handlePosthogEvents(posthogId);
    }
    if (refresh) {
        ReactDOM.render(<PageRedirect />, document.getElementById("root"), () => {
            return hardRefresh(path, auth);
        });
    }
    return history.push(localePath);
};
export const useCreateRoutingCallback = (path: string, { refresh, posthogId }: RouteCallbackOptions = {}) => {
    const history = useHistory();
    const location = useLocation();

    const auth = useSendAuth(true);

    return useCallback(
        (deferredPath, deferredOptions: RouteCallbackOptions = {}) => {
            if (refresh || deferredOptions.refresh) {
                ReactDOM.render(<PageRedirect />, document.getElementById("root"), () => {
                    hardRefresh(path, auth);
                });
            }
            if (typeof deferredPath !== "string") {
                return redirect(path, { refresh, posthogId }, location, history, auth);
            }
            return redirect(
                deferredPath || path,
                { refresh: deferredOptions.refresh || refresh, posthogId: deferredOptions.posthogId || posthogId },
                location,
                history,
                auth,
            );
        },
        [path, location.search, history, posthogId],
    );
};
