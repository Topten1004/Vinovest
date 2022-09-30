import React from "react";
import _pick from "lodash/pick";
import Cookies from "js-cookie";
import { getStatus } from "#models/FetchStatus";
import { EmailCaptureCookie, REDIRECT_URI, ReferralInviteCookie } from "#utils/constants";

export const getUserDataStatus = (userEntity, profileEntity, informationEntity) =>
    getStatus(userEntity).isDone() && getStatus(profileEntity).isDone() && getStatus(informationEntity).isDone();

export const getReferralLinkStatus = (pendingInvite, location, transferInProgress) =>
    pendingInvite && ["/"].includes(location.pathname) && !transferInProgress;

export const onAuthRequired = () => {
    /* TODO: replace this magical implementation with the "redirect_uri" query param pattern */
    localStorage.setItem(REDIRECT_URI.KEY, JSON.stringify(_pick(window.location, ["pathname", "search"])));

    /* reads emailCapture cookie to auto-fill register form */
    const emailCaptureCookie = Cookies.get(EmailCaptureCookie.KEY);
    const authDestination = emailCaptureCookie ? "signup" : "login";

    window.location.href = `/${authDestination}`; // forces in-memory state to reset
};

export const setReferralLinkCookie = (query: any) => {
    const referralInviteCode = query.get("grsf");
    if (referralInviteCode) {
        Cookies.set(ReferralInviteCookie.KEY, referralInviteCode, ReferralInviteCookie.CONFIG);
    }
};
