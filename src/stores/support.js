import { observable, computed, flow, action } from "mobx";
import { compact } from "lodash";
import { emptyFetchEntity, completedFetch, pendingFetch, erroredFetch, getData, getStatus } from "#models/FetchStatus";

export class SupportStore {
    static build(rootStore, api, toastClient) {
        return new SupportStore(rootStore, api, toastClient);
    }

    @observable supportCategoriesEntity = emptyFetchEntity([]);
    @observable searchFAQArticlesListEntity = emptyFetchEntity({});
    
    constructor(rootStore, api, toastClient) {
        this.root = rootStore;
        this.api = api;
        this.toastClient = toastClient;

        this.fetchSupportCategories = this.fetchSupportCategories.bind(this);
        this.fetchSearchFAQArticles = this.fetchSearchFAQArticles.bind(this);
    }

    @computed get supportCategories() {
        return getData(this.supportCategoriesEntity);
    }

    @computed get searchFAQArticlesList() {
        return getData(this.searchFAQArticlesListEntity);
    }

    @computed get isSearchFAQArticlesListPending() {
        return getStatus(this.searchFAQArticlesListEntity).isPending();
    }

    @computed get isSearchFAQArticlesListDone() {
        return getStatus(this.searchFAQArticlesListEntity).isDone();
    }

    @computed get isSupportCategoriesPending() {
        return getStatus(this.supportCategoriesEntity).isPending();
    }

    @computed get isSupportCategoriesDone() {
        return getStatus(this.supportCategoriesEntity).isDone();
    }

    @computed get isSupportCategoriesFirstRenderPending() {
        return getStatus(this.supportCategoriesEntity).isPending() || !getStatus(this.supportCategoriesEntity).isDone();
    }

    fetchSupportCategories = flow(function* () {
        if (getStatus(this.supportCategoriesEntity).isPending()) return;

        this.supportCategoriesEntity.status = pendingFetch();

        const { ok, data } = yield this.api.getSupportCategoriesFromContentful();

        if (!ok || !data) {
            const errorMsg =
                "There was an issue fetching your support categories. Please try again or chat with us here 👉";
            this.supportCategoriesEntity.status = erroredFetch(data);
            this.toastClient.error(errorMsg, { position: "bottom-center" });
            return;
        }

        const dataDictionary = data.reduce((acc, category) => ({ ...acc, [category.slugSupport]: category }), {});
        const {
            "about-vinovest": aboutVinovest,
            investing,
            "returns-and-liquidity": returnsAndLiquidity,
            ownership,
            "fees-minimums-payment-methods": fees,
            "shipping-storage-taxes": shipping,
            ...restOfData
        } = dataDictionary;

        const restOfDataList = Object.values(restOfData);

        const sortedData = compact([
            aboutVinovest,
            investing,
            returnsAndLiquidity,
            ownership,
            fees,
            shipping,
            ...restOfDataList,
        ]);

        const sortedDataWithFields = sortedData.map(({ supportPages, ...props }) => {
            const category = supportPages && {
                ...props,
                supportPages: supportPages.map((p) => ({
                    ...p,
                    fields: {
                        ...p.fields,
                        parentCategorySlug: props.slugSupport,
                        parentCategoryName: props.supportCategoryName,
                    },
                })),
            };

            return category || {};
        });

        this.supportCategoriesEntity = {
            data: sortedDataWithFields,
            status: completedFetch(),
        };
    });

    fetchSearchFAQArticles = flow(function* (query) {
        if (getStatus(this.searchFAQArticlesListEntity).isPending()) return;

        this.searchFAQArticlesListEntity.status = pendingFetch();

        const { ok, data } = yield this.api.searchFAQArticles(query);

        if (!ok || !data) {
            this.searchFAQArticlesListEntity.status = erroredFetch(data);
            this.searchFAQArticlesListEntity.data = [];
            return;
        }

        this.searchFAQArticlesListEntity = { data, status: completedFetch() };
    });
}
