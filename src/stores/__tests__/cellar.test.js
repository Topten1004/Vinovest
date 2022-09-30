import { getData, getStatus } from "#models/FetchStatus";
import { CellarStore } from "../cellar";

describe("Portfolio Store", () => {
    const api = {};
    const toastClient = { error: jest.fn() };
    const rootStore = { auth: { accessToken: "vv-jwt" }, user: { oktaUserInfo: { sub: "vvUserId" } } };
    const store = CellarStore.build(rootStore, api, toastClient);
    afterEach(() => store.resetState());

    describe("default values", () => {
        it("should return default value for hasWinesInPortfolio", () => {
            expect(store.hasWinesInPortfolio).toEqual(false);
        });
        it("should return default value for totalReturn", () => {
            expect(store.totalReturn).toBe(0);
        });
        it("should return default value for totalEquity", () => {
            expect(store.totalEquity).toBe(0);
        });
        it("should return default value for durationReturn", () => {
            expect(store.durationReturn).toBeUndefined();
        });
        it("should return default value for durationValueChange", () => {
            expect(store.durationValueChange).toBeUndefined();
        });
        it("should return default value for valueChangeForToday", () => {
            expect(store.valueChangeForToday).toBe(0);
        });

        it("should return default value for cash", () => {
            expect(store.cash).toEqual("0.00");
        });
        it("should return default value for userPriceHistory", () => {
            expect(store.userPriceHistory).toEqual([]);
        });
    });

    describe("valueChangeForToday", () => {
        const history = [
            {
                price: 1111,
                date: "2020-07-28T00:00:00Z",
            },
            {
                price: 512,
                date: "2020-07-28T22:00:00Z",
            },
            {
                price: 9901,
                date: "2020-07-28T23:00:00Z",
            },
            {
                price: 1963,
                date: "2020-07-29T00:00:00Z",
            },
            {
                price: 893,
                date: "2020-07-29T01:00:00Z",
            },
            {
                price: 2109,
                date: "2020-07-29T02:00:00Z",
            },
            {
                price: 823,
                date: "2020-07-29T03:00:00Z",
            },
        ];

        it("should properly find the equity value at the start of the day and return the difference", () => {
            store.totalsEntity.data = { totalHistory: { pricing: history } };
            const change = store.valueChangeForToday;
            expect(change).toEqual(-1140);
        });
        it("should properly find the equity value delta one hour into day", () => {
            store.totalsEntity.data = { totalHistory: { pricing: history.slice(0, 5) } };
            const change = store.valueChangeForToday;
            expect(change).toEqual(-1070);
        });
        it("should properly find the equity value delta on the last hour of day", () => {
            store.totalsEntity.data = { totalHistory: { pricing: history.slice(0, 3) } };
            const change = store.valueChangeForToday;
            expect(change).toEqual(8790);
        });
    });

    describe("regionDiversityBreakdown", () => {
        const diversity = [
            { region: "CHAMPAGNE", percentage: 10 },
            { region: "AUSTRALIA", percentage: 10 },
            { region: "BABYLON", percentage: 10 },
            { region: "YORK", percentage: 10 },
            { region: "SUSTENY", percentage: 20 },
            { region: "BOLIVIER", percentage: 20 },
            { region: "TOKYO", percentage: 20 },
        ];

        it("should return the sorted, standard breakdown if there are fewer than 6 distinct regions", () => {
            store.totalsEntity.data = { regionAllocation: diversity.slice(0, 5) };

            expect(store.regionDiversityBreakdown).toEqual([
                { region: "CHAMPAGNE", percentage: 10 },
                { region: "AUSTRALIA", percentage: 10 },
                { region: "BABYLON", percentage: 10 },
                { region: "YORK", percentage: 10 },
                { region: "SUSTENY", percentage: 20 },
            ]);
        });

        it("should return sorted breakdown, plus catch all bucket if region count exceeds 6", () => {
            store.totalsEntity.data = { regionAllocation: diversity };

            expect(store.regionDiversityBreakdown).toEqual([
                { region: "CHAMPAGNE", percentage: 10 },
                { region: "AUSTRALIA", percentage: 10 },
                { region: "BABYLON", percentage: 10 },
                { region: "YORK", percentage: 10 },
                { region: "SUSTENY", percentage: 20 },
                { region: "BOLIVIER", percentage: 20 },
                { region: "REST OF WORLD", percentage: 20 },
            ]);
        });
    });
});
