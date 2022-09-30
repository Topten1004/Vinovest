import React from "react";
import Cookies from "js-cookie";
import moment from "moment";
import sha1 from "js-sha1";
import { v4 as uuid } from "uuid";
import * as Sentry from "@sentry/react";

export const setImpactClickIDCookie = (query: any) => {
    const impactReferalParameter = query.get("irclickid");

    if (impactReferalParameter) {
        Cookies.set("impactClickID", impactReferalParameter);
    }
};

export const postImpactNewUserData = async (store, oktaAuth) => {
    const impactCurrentDate = moment(new Date()).format("YYYY-MM-DDTHH:mm:ssZ");
    const impactClickID = Cookies.get("impactClickID");
    const impactOrderID = `OID-${uuid()}`;

    try {
        await store.user.requestUserDetailsFromOkta(oktaAuth);
        const impactCustomerID = store.user.oktaUserInfo.sub;
        const impactEmailHash = sha1(store.user.oktaUserEntity.data.email);
        await store.auth.impactNewUserSignup(
            impactCurrentDate,
            impactOrderID,
            impactClickID,
            impactCustomerID,
            impactEmailHash,
        );
    } catch (error) {
        Sentry.captureException(new Error(error));
    }
};
