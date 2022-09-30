import { observable, computed, action, flow } from "mobx";
import _ from "lodash";
import {
    emptyFetchEntity,
    CrudOperation,
    erroredFetch,
    completedFetch,
    pendingFetch,
    getData,
    getStatus,
} from "#models/FetchStatus";
import { TransactionTypes } from "#utils/constants";
import { getWineYearFromLwin18, getCaseSizeFromLwin18 } from "#utils/shared";

const depositsEntityInit = () => ({ fees: [], pageSize: 10, type: "", range: "" });
export class TransferStore {
    static build(rootStore, api, toastClient) {
        return new TransferStore(rootStore, api, toastClient);
    }

    @observable transferInProgress = false;
    @observable portalURIFetch = emptyFetchEntity();
    @observable depositsEntity = emptyFetchEntity(depositsEntityInit());
    @observable bidsActiveEntity = emptyFetchEntity([]);
    @observable pendingTransferEntity = emptyFetchEntity([]);
    @observable shouldShowAccountSubscriptionEntity = emptyFetchEntity({ response: false, show: false });

    constructor(rootStore, api, toastClient) {
        this.root = rootStore;
        this.api = api;
        this.toastClient = toastClient;
    }
    @computed get deposits() {
        return getData(this.depositsEntity);
    }

    @computed get bidsActive() {
        return getData(this.bidsActiveEntity) || [];
    }
    @computed get pendingTransfers() {
        return getData(this.pendingTransferEntity) || [];
    }
    @computed get hasMadeTransfers() {
        const completedTransaction = this.depositsEntity.data.fees;
        return !_.isEmpty(this.pendingDeposits) || !_.isEmpty(completedTransaction);
    }
    @computed get shouldShowAccountSubscription() {
        return getData(this.shouldShowAccountSubscriptionEntity).show;
    }
    @computed get skeletonAccountSubscription() {
        return getData(this.shouldShowAccountSubscriptionEntity).response;
    }
    @computed get pendingDeposits() {
        return _.map(this.pendingTransferEntity.data, (pd, i) => ({
            type: TransactionTypes.pending_deposit,
            status: pd.status,
            id: `${"pending_deposit"}${i}`,
            money: {
                amount: pd?.money?.amount,
            },
            meta: {
                name: pd.paymentMethod.ach ? "ACH" : pd.paymentMethod.card ? "Credit Card" : "Pending",
            },
        }));
    }
    @computed get sourcingWines() {
        return _.map(this.bidsActiveEntity.data, (pd, i) => ({
            ...pd,
            type: TransactionTypes.sourcing_wine,
            id: `sourcing_wine ${i}`,
            money: {
                amount: null,
            },
            meta: {
                name: pd.description ? `${pd.description} ${getWineYearFromLwin18(pd.lwin18)}` : "Sourcing wine",
                lwin18: pd.lwin18,
                quantity: `${pd.quantity} Case${pd.quantity > 1 ? "s" : ""}`,
                bottles: `${+getCaseSizeFromLwin18(pd.lwin18)}`,
            },
        }));
    }
    @computed get hasTransferAndAwaitingWinePurchase() {
        const { hasWinesInPortfolio } = this.root.cellar;
        return !hasWinesInPortfolio && (this.transferInProgress || this.hasMadeTransfers);
    }

    @action setTransferInProgress(bool) {
        this.transferInProgress = bool;
    }
    @action resetState() {
        this.transferInProgress = false;
        this.portalURIFetch = emptyFetchEntity();
        this.depositsEntity = emptyFetchEntity(depositsEntityInit());
        this.bidsActiveEntity = emptyFetchEntity([]);
        this.pendingTransferEntity = emptyFetchEntity([]);
    }
    @action hideAccountSubscriptionBanner() {
        this.shouldShowAccountSubscriptionEntity.data.show = false;
    }

    fetchPendingTransfers = flow(function* (currencyCode) {
        this.pendingTransferEntity = { data: [], status: pendingFetch(CrudOperation.READ_OP) };

        const userID = this.root.user.oktaUserInfo.sub;
        const { accessToken } = this.root.auth;

        const { ok, data } = yield this.api.getPendingTransfers(accessToken, userID, currencyCode);
        if (!ok) {
            this.pendingTransferEntity.status = erroredFetch(data);
            return;
        }

        this.pendingTransferEntity = { data, status: completedFetch() };
    });

    fetchBidsActive = flow(function* () {
        this.bidsActiveEntity = { data: [], status: pendingFetch(CrudOperation.READ_OP) };
        const { accessToken } = this.root.auth;
        const userID = this.root.user.oktaUserInfo.sub;

        const { ok, data } = yield this.api.getBidsActive(accessToken, userID);

        if (!ok) {
            this.bidsActiveEntity = { data: [], status: erroredFetch(data) };
            return;
        }

        this.bidsActiveEntity = { data, status: completedFetch() };
    });

    fetchDeposits = flow(function* (p, isLazyLoading, currencyCode) {
        const { type, range, nextPageToken } = this.depositsEntity.data;
        const params = { type, range, ...p };
        if (!isLazyLoading) {
            this.depositsEntity = { data: { ...depositsEntityInit(), ...params }, status: pendingFetch() };
        } else if (nextPageToken && !getStatus(this.depositsEntity).isPending()) {
            this.depositsEntity.status = pendingFetch();
            params.pageToken = nextPageToken;
        } else return;

        const { accessToken } = this.root.auth;
        const userID = this.root.user.oktaUserInfo.sub;

        const { ok, data } = yield this.api.getDeposits(accessToken, userID, currencyCode, { pageSize: 10, ...params });

        if ((!ok, !data)) {
            const errorMsg = "There was an issue fetching your deposits. Please try again or chat with us here 👉";
            if (!isLazyLoading) {
                this.depositsEntity.data = depositsEntityInit();
            }
            this.depositsEntity.status = erroredFetch(data);
            this.toastClient.error(errorMsg, { position: "bottom-center" });

            return;
        }

        if (isLazyLoading) {
            this.depositsEntity = {
                data: {
                    ...params,
                    ...data,
                    fees: [...this.depositsEntity.data.fees, ...data.fees],
                },
                status: completedFetch(),
            };
        } else {
            this.depositsEntity = { data: { ...params, ...data }, status: completedFetch() };
        }
    });

    requestGetSelfServicePortalURI = flow(function* () {
        const { accessToken: jwt } = this.root.auth;

        this.portalURIFetch = {
            data: undefined,
            status: pendingFetch(CrudOperation.READ_OP),
        };

        const response = yield this.api.getPaymentSelfServicePortalURI(jwt);

        if (!response.ok) {
            this.portalURIFetch = {
                data: undefined,
                status: erroredFetch("Self service portal link could not be fetched"),
            };
            return;
        }

        const data = yield response.json();
        this.portalURIFetch = {
            data,
            status: completedFetch(),
        };
    });

    fetchShouldShowAccountSubscriptionEntity = flow(function* () {
        this.shouldShowAccountSubscriptionEntity = { data: { response: false, show: false }, status: pendingFetch() };
        const { accessToken } = this.root.auth;
        const userID = this.root.user.oktaUserInfo.sub;

        // TODO: need to pass the portfolioID for the subscription
        const { ok, data } = yield this.api.getShouldShowAccountSubscription(accessToken, userID, userID);

        if (!ok) {
            this.shouldShowAccountSubscriptionEntity = {
                data: { response: false, show: false },
                status: erroredFetch(),
            };
            return;
        }

        this.shouldShowAccountSubscriptionEntity = {
            data: { response: !data.hasSubscription, show: !data.hasSubscription },
            status: completedFetch(),
        };
    });
}
