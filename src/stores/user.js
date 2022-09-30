import * as Sentry from "@sentry/react";
import { observable, computed, flow, action, toJS } from "mobx";
import _ from "lodash";
import posthog from "posthog-js";
import Cookies from "js-cookie";
import {
    completedFetch,
    CrudOperation,
    emptyFetchEntity,
    erroredFetch,
    getData,
    pendingFetch,
    getStatus,
} from "#models/FetchStatus";

export class UserStore {
    static build(rootStore, api) {
        return new UserStore(rootStore, api);
    }

    @observable oktaUserEntity = emptyFetchEntity({});
    @observable profileEntity = emptyFetchEntity({});
    @observable userInformationEntity = emptyFetchEntity({});
    @observable wireTransferFetch = emptyFetchEntity();
    @observable userCurrency = Cookies.get("localCurrency") ? Cookies.get("localCurrency") : "USD";
    @observable userOnboardingInformation = {};

    constructor(rootStore, api) {
        this.root = rootStore;
        this.api = api;
    }

    @computed get oktaUserInfo() {
        return getData(this.oktaUserEntity);
    }

    @computed get isProfileEmpty() {
        return _.isEmpty(getData(this.profileEntity));
    }

    @computed get needsOnboarding() {
        const { investingStyle } = getData(this.profileEntity);
        const status = getStatus(this.profileEntity);
        return status.error === "Could not find this user profile" && !investingStyle;
    }

    @computed get profileId() {
        return getData(this.oktaUserEntity).sub;
    }

    @computed get profileLanguage() {
        return getData(this.profileEntity).language;
    }

    @action resetState() {
        this.oktaUserEntity = emptyFetchEntity({});
        this.profileEntity = emptyFetchEntity({});
        this.userInformationEntity = emptyFetchEntity({});
        this.wireTransferFetch = emptyFetchEntity();
    }

    @action setUserCurrency(currencyCode) {
        this.userCurrency = currencyCode;
    }

    @action setUserOnboardingInformation(data) {
        this.userOnboardingInformation = data;
    }

    requestUserDetailsFromOkta = flow(function* (auth) {
        this.oktaUserEntity = { data: {}, status: pendingFetch(CrudOperation.READ_OP) };

        const user = yield auth.getUser();
        const userId = _.get(user, "sub");

        if (!user || !userId) {
            Sentry.captureException(new Error("User Info fetch came up empty or incomplete"), {
                extra: { user },
            });

            this.oktaUserEntity = { data: {}, status: erroredFetch() };
            return;
        }

        this.oktaUserEntity = { data: user, status: completedFetch() };
        posthog.identify(userId);
    });
    fetchProfile = flow(function* () {
        this.profileEntity = { data: {}, status: pendingFetch(CrudOperation.READ_OP) };
        const { accessToken } = this.root.auth;
        const userId = this.oktaUserInfo.sub;
        const { ok, data } = yield this.api.getUserProfile(userId, accessToken);

        if (!ok) {
            this.profileEntity = { data: {}, status: erroredFetch(data.message) };
            return;
        }

        this.profileEntity = { data, status: completedFetch() };
    });
    fetchUserInformation = flow(function* () {
        this.userInformationEntity = { data: {}, status: pendingFetch(CrudOperation.READ_OP) };
        const { accessToken } = this.root.auth;
        const userId = this.oktaUserInfo.sub;
        const { ok, data } = yield this.api.getUserInformation(userId, accessToken);
        if (!ok) {
            this.userInformationEntity = { data: {}, status: erroredFetch(data.message) };
            return;
        }

        this.userInformationEntity = { data, status: completedFetch() };
        return data;
    });

    updateUserLanguage = flow(function* (language) {
        const { data, status } = this.profileEntity;
        this.profileEntity = { data: { ...data, language }, status };
        this.root.history.updateBasename(language);
    });
}
