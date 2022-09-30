import { observable, computed, flow, action, toJS } from "mobx";
import { formatWithOptions } from "date-fns/fp";
import i18n from "i18next";
import { emptyFetchEntity, completedFetch, pendingFetch, erroredFetch, getData, getStatus } from "#models/FetchStatus";
import { locales } from "../localization/constants";

export class DocumentsStore {
    static build(rootStore, api, toastClient) {
        return new DocumentsStore(rootStore, api, toastClient);
    }

    @observable accountStatementsEntity = emptyFetchEntity({});
    @observable accountStatementsMonthsEntity = emptyFetchEntity({});
    @observable accountWineCertificateEntity = emptyFetchEntity({});
    @observable cellarFeesCsvEntity = emptyFetchEntity("");

    constructor(rootStore, api, toastClient) {
        this.root = rootStore;
        this.api = api;
        this.toastClient = toastClient;

        this.fetchCellarFeesCsv = this.fetchCellarFeesCsv.bind(this);
    }
    @computed get wineCertificates() {
        return getData(this.accountWineCertificateEntity);
    }

    @computed get accountStatements() {
        return getData(this.accountStatementsEntity);
    }

    @computed get accountStatementsMonths() {
        return (getData(this.accountStatementsMonthsEntity).years || []).map((year) => ({ label: year, value: year }));
    }

    @computed get cellarFeesCsv() {
        return getData(this.cellarFeesCsvEntity);
    }
    @computed get cellarFeesCsvStatus() {
        return getStatus(this.cellarFeesCsvEntity);
    }

    @action setAccountStatementPending(id, bool) {
        const callback = (data) => (data.id === id ? { ...data, pending: bool } : data);
        this.accountStatementsEntity.data.documents = this.accountStatementsEntity.data.documents.map(callback);
    }

    @action setWineCertificatePending(id, bool) {
        const callback = (data) => (data.id === id ? { ...data, pending: bool } : data);
        this.accountWineCertificateEntity.data.documents =
            this.accountWineCertificateEntity.data.documents.map(callback);
    }

    @action resetState() {
        this.accountStatementsMonthsEntity = emptyFetchEntity({});
        this.accountStatementsEntity = emptyFetchEntity({});
        this.accountWineCertificateEntity = emptyFetchEntity({});
    }

    getDocumentItem = flow(function* (id, title, isDesktop) {
        const { accessToken } = this.root.auth;
        this.root.documents.setAccountStatementPending(id, true);

        const cellarID = this.root.user.oktaUserInfo.sub;
        const { data, ok } = yield this.api.getDocumentItem(accessToken, cellarID, id);

        if (!ok) {
            const errorMsg = i18n.t("documents:error", {
                document: title || t("documents:error_option.account_statement"),
            });
            this.root.documents.setAccountStatementPending(id, false);
            this.toastClient.error(errorMsg, { position: "bottom-center" });
            return;
        }
        this.root.documents.setAccountStatementPending(id, false);

        const a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        a.href = data.link;
        if (isDesktop) {
            a.target = "_blank";
        }
        a.click();
        document.body.removeChild(a);
    });

    getWineCertificateItem = flow(function* (id, title, isDesktop) {
        const { accessToken } = this.root.auth;
        this.root.documents.setWineCertificatePending(id, true);

        const cellarID = this.root.user.oktaUserInfo.sub;
        const { data, ok } = yield this.api.getDocumentItem(accessToken, cellarID, id);

        if (!ok) {
            const errorMsg = i18n.t("documents:error", {
                document: title || t("documents:error_option.account_statement"),
            });
            this.root.documents.setWineCertificatePending(id, false);
            this.toastClient.error(errorMsg, { position: "bottom-center" });
            return;
        }
        this.root.documents.setWineCertificatePending(id, false);

        const a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        a.href = data.link;
        if (isDesktop) {
            a.target = "_blank";
        }
        a.click();
        document.body.removeChild(a);
    });

    localizeDocuments = function (documents) {
        //         date:
        // "2021-02-28T23:59:59Z"
        // id:
        // "TW9udGhseVN0YXRlbWVudH4yMDIxLTAyLTI4VDIzOjU5OjU5Wg=="
        // name:
        // "February 2021"
        // type:
        // "MonthlyStatement"
        documents.map(({ date, id, name, type }) => {
            const statementDate = new Date(date);
            const dateToString = formatWithOptions({ locale: locales[i18n.language] }, "MMMM yyyy");
            return { date, id, name: dateToString(statementDate), type };
        });
    };

    fetchAccountStatements = flow(function* (params, isLazyLoading) {
        if (!isLazyLoading) {
            this.accountStatementsEntity = { data: {}, status: pendingFetch() };
        } else {
            this.accountStatementsEntity.status = pendingFetch();
        }
        const cellarID = this.root.user.oktaUserInfo.sub;
        const { accessToken } = this.root.auth;
        const { ok, data } = yield this.api.getAccountStatements(accessToken, cellarID, params);

        if (!ok) {
            const errorMsg = i18n.t("documents:error", i18n.t("documents:error_option.account_statements"));
            this.accountStatementsEntity = { data: {}, status: erroredFetch(data) };
            this.toastClient.error(errorMsg, { position: "bottom-center" });
            return;
        }
        if (isLazyLoading) {
            this.accountStatementsEntity = {
                data: {
                    ...params,
                    ...data,
                    documents: [...this.accountStatementsEntity.data.documents, ...data.documents],
                },
                status: completedFetch(),
            };
        } else {
            this.accountStatementsEntity = { data: { ...params, ...data }, status: completedFetch() };
        }
    });
    fetchWineCertificates = flow(function* (p, isLazyLoading) {
        const { type, range, nextPageToken } = this.accountWineCertificateEntity.data;
        const params = { type, range, ...p };
        if (!isLazyLoading) {
            this.accountWineCertificateEntity = { data: {}, status: pendingFetch() };
        } else if (nextPageToken && !getStatus(this.accountWineCertificateEntity).isPending()) {
            this.accountWineCertificateEntity.status = pendingFetch();
            params.pageToken = nextPageToken;
        } else return;

        const cellarID = this.root.user.oktaUserInfo.sub;
        const { accessToken } = this.root.auth;
        const { data } = yield this.api.getWineCertificates(accessToken, { pageSize: 10, ...params }, cellarID);

        if (isLazyLoading) {
            this.accountWineCertificateEntity = {
                data: {
                    ...params,
                    ...data,
                    documents: [...this.accountWineCertificateEntity.data.documents, ...data.documents],
                },
                status: completedFetch(),
            };
        } else {
            this.accountWineCertificateEntity = { data: { ...params, ...data }, status: completedFetch() };
        }
    });

    fetchCellarFeesCsv = flow(function* () {
        this.cellarFeesCsvEntity = { data: "", status: pendingFetch() };

        const { accessToken } = this.root.auth;
        const userID = this.root.user.oktaUserInfo.sub;

        const { ok, data } = yield this.api.getCellarFeesCsv(accessToken, userID);

        if ((!ok, !data)) {
            const errorMsg = i18n.t("documents:error", {
                document: "Wine Cellar CSV",
            });
            this.cellarFeesCsvEntity = { data: "", status: erroredFetch(data) };
            this.toastClient.error(errorMsg, { position: "bottom-center" });
            return;
        }

        this.cellarFeesCsvEntity = { data, status: completedFetch() };

        return data;
    });

    fetchAccountStatementMonths = flow(function* () {
        this.accountStatementsMonthsEntity = { data: {}, status: pendingFetch() };

        const cellarID = this.root.user.oktaUserInfo.sub;
        const { accessToken } = this.root.auth;
        const { ok, data } = yield this.api.getAccountStatementsMonths(accessToken, cellarID);

        if (!ok) {
            const errorMsg = i18n.t("documents:error", {
                document: title || t("documents:error_option.available_month"),
            });
            this.accountStatementsMonthsEntity = { data: {}, status: erroredFetch(data) };
            this.toastClient.error(errorMsg, { position: "bottom-center" });
            return;
        }

        this.accountStatementsMonthsEntity = { data, status: completedFetch() };
    });
}
