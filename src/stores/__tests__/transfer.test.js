import { getData, getStatus } from "#models/FetchStatus";
import { TransferStore } from "../transfer";

describe("Transfer Store", () => {
    const api = {};
    const rootStore = { auth: { accessToken: "vv-jwt" }, user: { oktaUserInfo: { sub: "vvUserId" } } };
    const store = TransferStore.build(rootStore, api);
    afterEach(() => store.resetState());

    describe("fetchPendingTransfers()", () => {
        it("should fetch pending transfers and cache it with the status in an Entity", async () => {
            const transfers = [
                {
                    status: "pending",
                    amount: 500,
                    paymentMethod: {
                        id: "",
                        ach: {
                            bankName: "STRIPE TEST BANK",
                        },
                        card: null,
                    },
                },
                {
                    status: "pending",
                    amount: 1000,
                    paymentMethod: {
                        id: "",
                        ach: {
                            bankName: "STRIPE TEST BANK",
                        },
                        card: null,
                    },
                },
                {
                    status: "pending",
                    amount: 10000,
                    paymentMethod: {
                        id: "",
                        ach: {
                            bankName: "STRIPE TEST BANK",
                        },
                        card: null,
                    },
                },
            ];
            api.getPendingTransfers = jest.fn(async () => ({ data: transfers, ok: true }));

            expect(getData(store.pendingTransferEntity)).toEqual([]);
            expect(getStatus(store.pendingTransferEntity).isInvalidated).toBe(true);
            await store.fetchPendingTransfers("USD");

            expect(api.getPendingTransfers).toHaveBeenCalledWith("vv-jwt", "vvUserId", "USD");
            expect(getStatus(store.pendingTransferEntity).isDone()).toBe(true);
            expect(getStatus(store.pendingTransferEntity).isFailed()).toBe(false);
            expect(getData(store.pendingTransferEntity)).toEqual(transfers);
        });
        it("should fetch transfers and cache error if it fails", async () => {
            const msg = "something failed during pending transfers fetch";
            api.getPendingTransfers = jest.fn(async () => ({ data: msg, ok: false }));
            await store.fetchPendingTransfers("USD");

            expect(getData(store.pendingTransferEntity)).toEqual([]);
            expect(getStatus(store.pendingTransferEntity).isFailed()).toBe(true);
            expect(getStatus(store.pendingTransferEntity).isDone()).toBe(true);
            expect(getStatus(store.pendingTransferEntity).error).toBe(msg);
        });
    });

    describe("requestGetSelfServicePortalURI()", () => {
        it("should properly set FetchStatus + cache the URI on success", async () => {
            const data = "https://self-service-uri.com";
            api.getPaymentSelfServicePortalURI = jest.fn(async () => ({
                ok: true,
                json: async () => data,
            }));

            await store.requestGetSelfServicePortalURI();
            expect(api.getPaymentSelfServicePortalURI).toHaveBeenCalledWith(rootStore.auth.accessToken);
            expect(store.portalURIFetch.status.isSuccess()).toBe(true);
            expect(store.portalURIFetch.data).toEqual(data);
        });

        it("should properly set FetchStatus + cache the error on failure", async () => {
            const error = "Self service portal link could not be fetched";
            api.getPaymentSelfServicePortalURI = jest.fn(async () => ({
                ok: false,
            }));

            await store.requestGetSelfServicePortalURI();
            expect(store.portalURIFetch.data).toBeUndefined();
            expect(api.getPaymentSelfServicePortalURI).toHaveBeenCalledWith(rootStore.auth.accessToken);
            expect(store.portalURIFetch.status.isSuccess()).toBe(false);
            expect(store.portalURIFetch.status.isFailed()).toBe(true);
            expect(store.portalURIFetch.status.error).toEqual(error);
        });
    });
});
