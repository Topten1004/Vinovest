import React from "react";
import { observer } from "mobx-react-lite";
import { useLocation } from "react-router";
import { useRootStore } from "#shared/hooks";
import { hideForLogin } from "./Navigation/utils";

const reportCampaign = "vgfuonigtc1mkzyuqnj3";

const RemoveOptinmonster = observer(() => {
    const s = useRootStore();
    const location = useLocation();

    const activateOMRemover = React.useMemo(() => hideForLogin(location.pathname) || s.auth.isAuthenticated, [
        location.pathname,
        s.auth.isAuthenticated,
    ]);

    React.useEffect(() => {
        if (activateOMRemover) {
            let count = 10;
            let campaign = null;
            let intervalCb = null;

            const removeCampaign = () => {
                campaign = window._omapp.campaigns && window._omapp.campaigns[reportCampaign];
                campaign && campaign.off();
            };

            if (window._omapp) {
                removeCampaign();
            } else {
                intervalCb = setInterval(() => {
                    if (!(count-- && !window._omapp)) {
                        clearInterval(intervalCb);
                    }

                    if (window._omapp) {
                        removeCampaign();
                    }
                }, 500);
            }

            return () => {
                intervalCb && clearInterval(intervalCb);

                if (campaign && window._omapp && window._omapp.campaigns && !window._omapp.campaigns[reportCampaign]) {
                    window._omapp.campaigns[reportCampaign] = campaign;
                    window._omapp.reset();
                }
            };
        }
    }, [activateOMRemover]);

    return null;
});

export default RemoveOptinmonster;
