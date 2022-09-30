import { observable, computed, flow, action } from "mobx";
import React from "react";
import { emptyFetchEntity, completedFetch, pendingFetch, erroredFetch, getData } from "#models/FetchStatus";

const pageSize = 10;
const pendingList = () => [...new Array(pageSize)].map((_, i) => ({ lwin18: `lwin18 ${i}`, pending: true }));

export class LiquidationStore {
    static build(rootStore, api, toastClient) {
        return new LiquidationStore(rootStore, api, toastClient);
    }

    @observable liquidateWinesListEntity = emptyFetchEntity([]);
    @observable winesInLiquidationProcessEntity = emptyFetchEntity([]);
    @observable confirmWinesLiquidationStatusEntity = emptyFetchEntity({ completed: false });
    @observable postWinesToLiquidateStatusEntity = emptyFetchEntity({ completed: false });
    @observable putConfirmWinesLiquidationResendEmailEntity = emptyFetchEntity({ completed: false });

    constructor(rootStore, api, toastClient) {
        this.root = rootStore;
        this.api = api;
        this.toastClient = toastClient;
    }

    @computed get liquidateWinesList() {
        return getData(this.liquidateWinesListEntity);
    }

    @computed get winesInLiquidationProcess() {
        return getData(this.winesInLiquidationProcessEntity);
    }

    @computed get confirmWinesLiquidationStatus() {
        return getData(this.confirmWinesLiquidationStatusEntity);
    }

    @computed get postWinesToLiquidateStatus() {
        return getData(this.postWinesToLiquidateStatusEntity);
    }

    @computed get putConfirmWinesLiquidationResendEmail() {
        return getData(this.putConfirmWinesLiquidationResendEmailEntity);
    }

    @action resetState() {
        this.liquidateWinesListEntity = emptyFetchEntity([]);
        this.winesInLiquidationProcessEntity = emptyFetchEntity([]);
        this.confirmWinesLiquidationStatusEntity = emptyFetchEntity({ completed: false });
        this.postWinesToLiquidateStatusEntity = emptyFetchEntity({ completed: false });
        this.putConfirmWinesLiquidationResendEmailEntity = emptyFetchEntity({ completed: false });
    }

    fetchLiquidateWinesList = flow(function* (currencyCode) {
        this.liquidateWinesListEntity = { data: [], status: pendingFetch() };

        const { accessToken } = this.root.auth;
        const userID = this.root.user.oktaUserInfo.sub;
        let nextPageToken = "0";
        let strapiData = {};

        while (nextPageToken) {
            this.liquidateWinesListEntity.data = [...this.liquidateWinesListEntity.data, ...pendingList()];

            const { ok, data } = yield this.api.getPortfolioWines(
                accessToken,
                userID,
                {
                    pageSize,
                    pageToken: nextPageToken,
                },
                currencyCode,
            );

            const handleErrorResponse = () => {
                const ErrorMsg = (
                    <>
                        There was an issue with fetching your wine list. Please refresh your page or check your internet
                        connection. Alternatively, you can contact{" "}
                        <a href="mailto:ir@vinovest.co" style={{ color: "#fff", fonhtWeight: "500" }}>
                            our support team
                        </a>{" "}
                        for any technical help.
                    </>
                );

                this.liquidateWinesListEntity = { data: [], status: erroredFetch(data) };
                this.toastClient.error(ErrorMsg, { position: "bottom-center" });
            };

            if (!ok) {
                handleErrorResponse();
                nextPageToken = null;
                return;
            }

            try {
                const wineDescriptions = yield this.api.getLwin7Descriptions(data.wines.map(({ lwin11 }) => lwin11));

                strapiData = { ...strapiData, ...wineDescriptions };
            } catch (err) {
                handleErrorResponse();
                nextPageToken = null;
                return;
            }

            // eslint-disable-next-line no-loop-func
            const winesWithNames = data.wines.map((wine) => {
                const currentStrapiData = strapiData?.data[wine.lwin11.slice(0, 7)] || {};
                return {
                    ...wine,
                    name: `${currentStrapiData.displayName || ""} ${wine.lwin18.slice(7, 11)}`,
                    bottleCount: wine.total.bottleCount,
                };
            });
            this.liquidateWinesListEntity.data = [
                ...this.liquidateWinesListEntity.data.filter(({ pending }) => !pending),
                ...winesWithNames,
            ];

            nextPageToken = data.nextPageToken;
        }

        this.liquidateWinesListEntity.status = completedFetch();
    });

    fetchWinesInLiquidationProcess = flow(function* () {
        this.winesInLiquidationProcessEntity = { data: {}, status: pendingFetch() };

        const { accessToken } = this.root.auth;
        const userID = this.root.user.oktaUserInfo.sub;

        const { ok, data } = yield this.api.getWinesInLiquidationProcess(accessToken, userID);

        if (!ok) {
            this.winesInLiquidationProcessEntity = { data: {}, status: erroredFetch(data) };

            return;
        }
        this.winesInLiquidationProcessEntity = { data: data.wines, status: completedFetch() };
    });

    liquidateWines = flow(function* (wines, callBack) {
        this.postWinesToLiquidateStatusEntity = { data: { completed: false }, status: pendingFetch() };

        const { accessToken } = this.root.auth;
        const userID = this.root.user.oktaUserInfo.sub;
        const { ok } = yield this.api.postWinesToLiquidate(accessToken, userID, wines);

        if (!ok) {
            this.postWinesToLiquidateStatusEntity = { data: { completed: true }, status: erroredFetch() };
            const ErrorMsg = (
                <>
                    We detected an error in sending you confirmation email. Please click the "Sell Your Wine" button
                    again. Alternatively, you can{" "}
                    <a href="mailto:ir@vinovest.co" style={{ color: "#fff", fonhtWeight: "500" }}>
                        contact our support team
                    </a>{" "}
                    for any technical help.
                </>
            );

            this.toastClient.error(ErrorMsg, { position: "bottom-center" });
            return;
        }
        this.postWinesToLiquidateStatusEntity = { data: { completed: true }, status: completedFetch() };

        callBack();
    });

    resendEmail = flow(function* (wines) {
        this.putConfirmWinesLiquidationResendEmailEntity = { data: { completed: false }, status: pendingFetch() };

        const { accessToken } = this.root.auth;
        const userID = this.root.user.oktaUserInfo.sub;
        const { ok } = yield this.api.putConfirmWinesLiquidationResendEmail(accessToken, userID);

        if (!ok) {
            this.putConfirmWinesLiquidationResendEmailEntity = { data: { completed: true }, status: erroredFetch() };

            const ErrorMsg = (
                <>
                    We detected an error in sending you confirmation email. Please click the "Resend Email" button
                    again. Alternatively, you can{" "}
                    <a href="mailto:ir@vinovest.co" style={{ color: "#fff", fonhtWeight: "500" }}>
                        contact our support team
                    </a>{" "}
                    for any technical help.
                </>
            );

            this.toastClient.error(ErrorMsg, { position: "bottom-center" });
            return;
        }
        this.putConfirmWinesLiquidationResendEmailEntity = { data: { completed: true }, status: completedFetch() };
    });

    confirmWinesLiquidation = flow(function* () {
        this.confirmWinesLiquidationStatusEntity = { data: { completed: false }, status: pendingFetch() };
        const { accessToken } = this.root.auth;
        const userID = this.root.user.oktaUserInfo.sub;

        const ErrorMsg = (
            <>
                This link is no longer active. Please start again to sell your wines. Alternatively, you can{" "}
                <a href="mailto:ir@vinovest.co" style={{ color: "#fff", fonhtWeight: "500" }}>
                    contact our support team
                </a>{" "}
                for any technical help.
            </>
        );

        const ErrorMsgConfirmation = (
            <>
                We detected an error in sending your confirmation. Please refresh your page. Alternatively, you can{" "}
                <a href="mailto:ir@vinovest.co" style={{ color: "#fff", fonhtWeight: "500" }}>
                    contact our support team
                </a>{" "}
                for any technical help.
            </>
        );

        const { data } = yield this.api.getWinesInLiquidationProcess(accessToken, userID);

        if (!data || !data.wines || !data.wines.length) {
            this.confirmWinesLiquidationStatusEntity = { data: { completed: true }, status: erroredFetch() };

            this.toastClient.error(ErrorMsg, { position: "bottom-center" });

            return;
        }

        const { ok } = yield this.api.putConfirmWinesLiquidation(accessToken, userID);

        if (!ok) {
            this.confirmWinesLiquidationStatusEntity = { data: { completed: true }, status: erroredFetch() };

            this.toastClient.error(ErrorMsgConfirmation, { position: "bottom-center" });
            return;
        }

        this.confirmWinesLiquidationStatusEntity = { data: { completed: true }, status: completedFetch() };
    });
}
