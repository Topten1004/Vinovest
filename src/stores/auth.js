import { observable, computed, action, flow } from "mobx";
import _ from "lodash";

export class AuthStore {
    static build(rootStore, api) {
        return new AuthStore(rootStore, api);
    }

    @observable accessToken = "";

    constructor(rootStore, api) {
        this.root = rootStore;
        this.api = api;
    }

    @computed get isAuthenticated() {
        return !_.isEmpty(this.accessToken);
    }

    @action setAccessToken(token) {
        this.accessToken = token;
    }
    @action resetStateOnLogout() {
        this.accessToken = "";
        this.root.deposit.resetState();
        this.root.cellar.resetState();
        this.root.quiz.resetState();
        this.root.referral.resetState();
        this.root.transfer.resetState();
        this.root.user.resetState();
        this.root.documents.resetState();
        this.root.liquidation.resetState();
    }

    checkAndSetAJwt = flow(function* (auth) {
        const jwt = yield auth.accessToken;

        if (jwt) {
            this.setAccessToken(jwt.accessToken);
        }
    });
    requestAccessTokenFromOAuthCode = flow(function* (authCode) {
        const response = yield this.api.exchangeCodeToToken(authCode);
        return response;
    });
    registerNewUserAccount = flow(function* (payload) {
        const response = yield this.api.createOktaAccount(payload);
        return response;
    });

    impactNewUserSignup = flow(function* (
        impactCurrentDate,
        impactOrderID,
        impactClickID,
        impactCustomerID,
        impactEmailHash,
    ) {
        const { accessToken: jwt } = this.root.auth;

        const response = yield this.api.createImpactSignup(
            impactCurrentDate,
            impactOrderID,
            impactClickID,
            impactCustomerID,
            impactEmailHash,
            jwt,
        );
        return response;
    });
}
