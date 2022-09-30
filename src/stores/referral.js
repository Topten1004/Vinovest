import cookie from "js-cookie";
import { observable, computed, flow, action } from "mobx";
import _ from "lodash";
import { ReferralInviteCookie } from "#utils/constants";
import { delay } from "#utils/shared";
import {
    getData,
    emptyFetchEntity,
    completedFetch,
    pendingFetch,
    erroredFetch,
    CrudOperation,
} from "#models/FetchStatus";

export class ReferralStore {
    static build(rootStore, api) {
        return new ReferralStore(rootStore, api);
    }

    @observable referralInviteStatus = {
        error: "",
        isReferralLinkSuccessful: false,
    };
    @observable referralProfileDetails = {
        referralCount: 0,
        shareUrl: "",
        rewards: [],
        referrer: {},
        isWinner: false,
    };
    @observable referralInviteModalWindowOpen = false;
    @observable sendEmails = emptyFetchEntity();
    
    /**
     * @param {*} rootStore
     * @param {TransportManager} api
     */
    constructor(rootStore, api) {
        this.root = rootStore;
        this.api = api;
    }

    @computed get referrerId() {
        return _.get(this.referralProfileDetails, "referrer.id", "");
    }
    @computed get isReferralWinner() {
        return _.get(this.referralProfileDetails, "isWinner", false);
    }
    @computed get successfulReferralCount() {
        return _.get(this.referralProfileDetails, "referralCount");
    }
    @computed get monthsManagedFreeCount() {
        /** NOTE: includes months free from invites + own referral, if applicable */
        return _.get(this.referralProfileDetails, "rewards", []).length * 3;
    }
    @computed get hasPendingReferralInvite() {
        const { pendingTransfers } = this.root.transfer;
        return (
            _.get(this.referralInviteStatus, "isReferralLinkSuccessful") ||
            (!_.isEmpty(this.referrerId) && !this.isReferralWinner && !pendingTransfers)
        );
    }

    @action toggleReferralInviteModalWindowOpen = () => {
        this.referralInviteModalWindowOpen = !this.referralInviteModalWindowOpen;
    };

    @action resetState() {
        this.referralInviteStatus = {
            error: "",
            isReferralLinkSuccessful: false,
        };
        this.referralProfileDetails = {
            referralCount: 0,
            shareUrl: "",
            rewards: [],
            referrer: {},
            isWinner: false,
        };
        this.referralInviteModalWindowOpen = false;
    }

    @action resetEmails() {
        this.sendEmails = emptyFetchEntity();
    }

    validateReferralInviteIfExists = flow(function* () {
        const referrerId = cookie.get(ReferralInviteCookie.KEY);
        cookie.remove(ReferralInviteCookie.KEY, ReferralInviteCookie.CONFIG);

        /** Only attempt linking if referrerId exists + it is not the user's own id */
        if (!_.isNil(referrerId) && referrerId !== this.referralProfileDetails.id) {
            const userId = this.root.user.oktaUserInfo.sub;
            const { accessToken } = this.root.auth;

            const response = yield this.api.linkReferralInviteCode(accessToken, userId, referrerId);
            if (!response.ok) {
                const data = yield response.json();
                const errorMessage = _.get(data, "message");
                this.referralInviteStatus.error = errorMessage;
                return;
            }

            this.referralInviteStatus.isReferralLinkSuccessful = true;
            this.root.tracking.gtm.trackReferralAction("Successfully Linked Through Invite");
        }
    });
    pollForUserReferralDetails = flow(function* (attempts) {
        const user = this.root.user.oktaUserInfo;
        const userId = user.sub;
        let attemptsRemaining = attempts;
        const { accessToken } = this.root.auth;

        while (attemptsRemaining > 0) {
            const response = yield this.api.getUserReferralProfileStatus(accessToken, userId);

            if (response.ok) {
                const data = yield response.json();
                this.referralProfileDetails = { ...this.referralProfileDetails, ...data };
                this.root.tracking.gtm.trackUserIdentified({ ...user, growsurf_referral_link: data.shareUrl });
                break;
            }

            // handle failure?

            yield delay(8000);
            attemptsRemaining -= 1;
        }

        if (!this.referralProfileDetails.id) {
            // report this somewhere?
        }
    });
    sendInviteEmails = flow(function* (emails) {
        const user = this.root.user.oktaUserInfo;
        const userId = user.sub;
        const { accessToken } = this.root.auth;
        this.sendEmails = {
            data: undefined,
            status: pendingFetch(),
        };
        const response = yield this.api.sendInviteEmails(accessToken, userId, emails);

        if (!response.ok) {
            this.sendEmails = {
                data: undefined,
                status: erroredFetch("Error occurred"),
            };
            return;
        }

        this.sendEmails = {
            data: response.data,
            status: completedFetch(),
        };
    });
}
