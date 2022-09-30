import _ from "lodash";
import { observable, computed, action, flow, toJS } from "mobx";
import moment from "moment";
import { numberWithCommas, getMaxFixed } from "#utils/shared";
import { emptyFetchEntity, getData, pendingFetch, completedFetch, erroredFetch } from "#models/FetchStatus";
import { formatDate, dateFormats } from "#shared/format/dates";

const getDefaultWinesListEntity = () => ({ nextPageToken: null, pageSize: "6", wines: [] });

const mapHistoryPricing = (history = []) => {
    const startPrice = history[0];

    return history.map(({ price, date, ...rest }) => {
        const priceDifference = price - startPrice.price || 0;
        return {
            price,
            date,
            tooltipDate: formatDate(new Date(date), dateFormats.shortMonthDayandYear),
            priceDifference: getMaxFixed(priceDifference) || "0.0",
            priceDifferencePercents: getMaxFixed((100 / startPrice.price) * priceDifference) || "0.0",
            ...rest,
        };
    });
};

export class CellarStore {
    premium = 50000;
    grandCru = 250000;

    static build(rootStore, api, toastClient) {
        return new CellarStore(rootStore, api, toastClient);
    }

    @observable winesListEntity = emptyFetchEntity(getDefaultWinesListEntity());
    @observable totalsEntity = emptyFetchEntity({});
    @observable winesCollectionEntity = emptyFetchEntity({});
    @observable winesStrapiCollectionEntity = emptyFetchEntity({});

    @observable featuredWineEntity = emptyFetchEntity({});

    @observable portfolioInitialLoad = false;

    constructor(rootStore, api, toastClient) {
        this.root = rootStore;
        this.api = api;
        this.toastClient = toastClient;
    }

    @computed get winesList() {
        return getData(this.winesListEntity);
    }

    @computed get baseCurrency() {
        return getData(this.totalsEntity).baseCurrency;
    }

    @computed get currencySet() {
        return getData(this.totalsEntity).currencySet;
    }

    @computed get winesListFetchFinished() {
        return this.winesListEntity.isDone() && !this.winesListEntity.isPending();
    }
    @computed get winesCollection() {
        return getData(this.winesCollectionEntity);
    }

    @computed get winesStrapiCollection() {
        return getData(this.winesStrapiCollectionEntity);
    }
    @computed get totals() {
        return getData(this.totalsEntity);
    }
    @computed get featuredWine() {
        return getData(this.featuredWineEntity);
    }

    @computed get hasWinesInPortfolio() {
        return !!_.get(this.totals, "bottleCount", false);
    }
    @computed get totalReturn() {
        return _.get(this.totals, "returns.netChange.amount", 0) / 100;
    }
    @computed get totalEquity() {
        return _.get(this.totals, "positionTotal.amount", 0) / 100;
    }

    @computed get totalAccountValue() {
        const cashData = _.get(this.totals, "cash.amount", 0) / 100;
        const positionTotal = _.get(this.totals, "positionTotal.amount", 0) / 100;

        return +cashData + +positionTotal;
    }

    @computed get cashValue() {
        const cashData = _.get(this.totals, "cash.amount", 0) / 100;
        return cashData;
    }

    @computed get valueChangeForToday() {
        const history = _.get(this.totals, "totalHistory.pricing");

        if (!history || _.isEmpty(history)) {
            return 0;
        }

        const currentDataPoint = _.last(history);
        const today = moment.utc(currentDataPoint.date);

        const todayFirstHour = today.startOf("day");
        const dayStartDataPoint = _.defaultTo(_.find(history, { date: todayFirstHour.format() }), { price: 0 });

        return currentDataPoint.price - dayStartDataPoint.price;
    }

    @computed get cash() {
        const cashData = _.get(this.totals, "cash.amount", 0) / 100;
        return cashData ? numberWithCommas(cashData, 2) : "0.00";
    }
    @computed get userPriceHistory() {
        return _.get(this.totals, "totalHistory.pricing", []);
    }
    @computed get regionDiversityBreakdown() {
        const MAX_DISPLAY_COUNT = 6;

        /* create truncated slice of maximum of 6 items IF the # of distinct regions exceeds MAX_DISPLAY_COUNT */
        const regionAllocation = _.get(this.totals, "regionAllocation", []);
        if (regionAllocation.length > MAX_DISPLAY_COUNT) {
            const displaySlice = regionAllocation.slice(0, MAX_DISPLAY_COUNT);
            const remainderPercentageSum = regionAllocation
                .slice(MAX_DISPLAY_COUNT)
                .reduce((sum, r) => +sum + +r.percentage, 0);
            displaySlice.push({ region: "REST OF WORLD", percentage: remainderPercentageSum });
            return displaySlice;
        }

        return regionAllocation;
    }

    @action currencyReset() {
        this.winesCollectionEntity = emptyFetchEntity(getDefaultWinesListEntity());
        this.winesListEntity = { status: pendingFetch(), data: getDefaultWinesListEntity() };
        this.totalsEntity = { status: pendingFetch(), data: {} };
        this.setFirstInitialLoad();
        this.winesListEntity = emptyFetchEntity(getDefaultWinesListEntity());
        this.totalsEntity = emptyFetchEntity({});
    }
    @action resetState() {
        this.winesListEntity = emptyFetchEntity(getDefaultWinesListEntity());
        this.totalsEntity = emptyFetchEntity({});
        this.winesCollectionEntity = emptyFetchEntity({});
        this.winesStrapiCollectionEntity = emptyFetchEntity({});
    }

    @action setFirstInitialLoad() {
        this.cellarInitialLoad = true;
        this.root?.disposers?.initialPortfolioLoad && this.root?.disposers?.initialPortfolioLoad();
        this.root?.disposers?.subsequentPortfolioLoad && this.root?.disposers?.subsequentPortfolioLoad();
    }

    fetchCellarWines = flow(function* (currencyCode) {
        const userCurrencyCode = currencyCode || this.root.user.userCurrency;
        const { accessToken } = this.root.auth;
        const { winesList } = this.root.cellar;

        this.winesListEntity = {
            data: winesList || getDefaultWinesListEntity(),
            status: pendingFetch(),
        };

        const userID = this.root.user.oktaUserInfo.sub;
        const { pageSize, nextPageToken } = winesList;
        const params = { pageSize };

        if (nextPageToken) {
            params.pageToken = nextPageToken;
        }
        const { ok, data } = yield this.api.getPortfolioWines(accessToken, userID, params, userCurrencyCode);

        if (!ok) {
            this.winesListEntity.status = erroredFetch("Portfolio wines could not be fetched");
            return;
        }

        yield this.fetchWinesStrapiCollection(
            data.wines.filter(({ lwin11 }) => !this.winesCollectionEntity.data[lwin11]).map(({ lwin11 }) => lwin11),
        );

        this.winesListEntity = {
            data: { ...data, wines: [...this.winesListEntity.data.wines, ...data.wines] },
            status: completedFetch(),
        };
    });

    fetchPortfolioWineToCollection = flow(function* (lwin18, range = "6m", currencyCode) {
        const userCurrency = currencyCode || this.root.user.userCurrency;
        const { accessToken } = this.root.auth;
        const currentLwin18Data =
            this.winesCollectionEntity.data[lwin18] && this.winesCollectionEntity.data[lwin18].data;

        this.winesCollectionEntity = {
            data: {
                ...this.winesCollectionEntity.data,
                [lwin18]: { data: currentLwin18Data || null, status: pendingFetch() },
            },
            status: pendingFetch(),
        };

        const userID = this.root.user.oktaUserInfo.sub;

        const { ok, data } = yield this.api.getPortfolioWineToCollection(
            accessToken,
            userID,
            lwin18,
            range,
            userCurrency,
        );
        let producerData;

        if (!currentLwin18Data) {
            producerData = yield this.api.fetchVineyardBackground(lwin18);
        } else {
            producerData = currentLwin18Data.producerData;
        }

        if (!ok) {
            this.winesCollectionEntity = {
                data: {
                    ...this.winesCollectionEntity.data,
                    [lwin18]: { data: currentLwin18Data || null, status: erroredFetch() },
                },
                status: erroredFetch(),
            };

            return;
        }

        this.winesCollectionEntity = {
            data: {
                ...this.winesCollectionEntity.data,
                [lwin18]: {
                    data: {
                        ...data,
                        historical: { ...data.historical, pricing: mapHistoryPricing(data.historical.pricing) },
                        producerData,
                    },
                    status: completedFetch(),
                },
            },
            status: completedFetch(),
        };
    });

    fetchWinesStrapiCollection = flow(function* (keys) {
        this.winesStrapiCollectionEntity.status = pendingFetch();

        const { ok, data } = yield this.api.buildWineProfile(keys);

        if (!ok) {
            this.winesStrapiCollectionEntity.status = erroredFetch();
            return;
        }

        this.winesStrapiCollectionEntity = {
            data: { ...this.winesStrapiCollectionEntity.data, ...data },
            status: completedFetch(),
        };
    });

    fetchPortfolioTotals = flow(function* (range = "6m", currencyCode) {
        const userCurrencyCode = currencyCode || this.root.user.userCurrency;
        const { accessToken } = this.root.auth;
        this.totalsEntity = { data: {}, status: pendingFetch() };
        const userID = this.root.user.oktaUserInfo.sub;

        const { ok, data } = yield this.api.getPortfolioTotals(accessToken, userID, range, userCurrencyCode);

        if (!ok || !data) {
            this.totalsEntity = { data: {}, status: erroredFetch("Portfolio total information could not be fetched") };
            return;
        }

        this.totalsEntity = {
            data: {
                ...data,
                selectedRange: range,
                totalHistory: { ...data.totalHistory, pricing: mapHistoryPricing(data.totalHistory.pricing) },
            },
            status: completedFetch(),
        };
    });

    updatePortfolioTotalsRange = flow(function* (range = "6m", currencyCode) {
        const userCurrencyCode = currencyCode || this.root.user.userCurrency;
        const { accessToken } = this.root.auth;
        this.totalsEntity.data.pending = true;
        const userID = this.root.user.oktaUserInfo.sub;

        const { ok, data } = yield this.api.getPortfolioTotals(accessToken, userID, range, userCurrencyCode);

        if (!ok) {
            this.totalsEntity.data.pending = false;
            this.toastClient.error("Chart information could not be updated", { position: "bottom-center" });
            return;
        }
        this.totalsEntity.data.pending = false;
        this.totalsEntity.data = {
            ...data,
            selectedRange: range,
            totalHistory: { ...data.totalHistory, pricing: mapHistoryPricing(data.totalHistory.pricing) },
        };
    });

    fetchPortfolioFeatured = flow(function* (currencyCode) {
        const { accessToken } = this.root.auth;
        this.featuredWineEntity = { data: {}, status: pendingFetch() };
        const userID = this.root.user.oktaUserInfo.sub;

        const { ok, data } = yield this.api.getPortfolioFeatured(accessToken, userID, currencyCode);

        if (!ok) {
            this.featuredWineEntity = {
                data: {},
                status: erroredFetch("Portfolio featured information could not be fetched"),
            };
            return;
        }
        yield this.fetchWinesStrapiCollection([data.lwin11]);
        yield this.fetchPortfolioWineToCollection(data.lwin18);

        this.featuredWineEntity = { data, status: completedFetch() };
    });
}
