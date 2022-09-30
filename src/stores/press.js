import { observable, computed, flow } from "mobx";

import { emptyFetchEntity, completedFetch, pendingFetch, erroredFetch, getData, getStatus } from "#models/FetchStatus";

export class PressStore {
    static build(rootStore, api, toastClient) {
        return new PressStore(rootStore, api, toastClient);
    }

    @observable newsListEntity = emptyFetchEntity({});

    constructor(rootStore, api, toastClient) {
        this.root = rootStore;
        this.api = api;
        this.toastClient = toastClient;

        this.fetchNewsList = this.fetchNewsList.bind(this);
    }

    @computed get newsList() {
        return getData(this.newsListEntity).items || [];
    }

    @computed get isNewsListPending() {
        return getStatus(this.newsListEntity).isPending();
    }

    @computed get isNewsListDone() {
        return getStatus(this.newsListEntity).isDone();
    }

    fetchNewsList = flow(function* () {
        this.newsListEntity.status = pendingFetch();

        const { ok, data } = yield this.api.getNewsListFromContentful();

        if (!ok || !data) {
            const errorMsg = "There was an issue fetching your press data. Please try again or chat with us here 👉";
            this.newsListEntity.status = erroredFetch(data);
            this.toastClient.error(errorMsg, { position: "bottom-center" });
            return;
        }

        this.newsListEntity = { data, status: completedFetch() };
    });
}
