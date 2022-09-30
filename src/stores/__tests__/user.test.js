import { getData, getStatus } from "#models/FetchStatus";
import { UserStore } from "../user";

describe("User Store", () => {
    const api = {};
    const rootStore = { auth: { accessToken: "vv-jwt" }, tracking: { gtm: { trackUserIdentified: jest.fn() } } };
    const store = UserStore.build(rootStore, api);
    afterEach(() => store.resetState());

    describe("requestUserDetailsFromOkta()", () => {
        it("should properly fetch okta user details, cache it, and dispatch tracking", async () => {
            const oktaUserInfo = {
                sub: "00u4tud65shvXgpzb357",
                name: "Jon  QA",
                locale: "en-US",
                email: "esangpark+invited35@gmail.com",
                preferred_username: "esangpark+invited35@gmail.com",
                given_name: "Jon ",
                family_name: "QA",
                zoneinfo: "America/Los_Angeles",
                updated_at: 1595389092,
                email_verified: true,
            };
            const auth = {};
            auth.getUser = jest.fn(async () => oktaUserInfo);

            expect(getData(store.oktaUserEntity)).toEqual({});
            expect(getStatus(store.oktaUserEntity).isInvalidated).toBe(true);

            await store.requestUserDetailsFromOkta(auth);

            expect(getData(store.oktaUserEntity)).toEqual(oktaUserInfo);
            expect(store.oktaUserInfo).toEqual(oktaUserInfo);
            expect(getStatus(store.oktaUserEntity).isDone()).toBe(true);
        });

        it("should properly handle failed okta user details fetch", async () => {
            const failedResponse = {};
            const auth = {};
            auth.getUser = jest.fn(async () => failedResponse);

            expect(store.oktaUserInfo).toEqual({});
            expect(getStatus(store.oktaUserEntity).isInvalidated).toBe(true);

            await store.requestUserDetailsFromOkta(auth);

            expect(store.oktaUserInfo).toEqual({});
            expect(getStatus(store.oktaUserEntity).isFailed()).toBe(true);
        });
    });

    describe("fetchProfile()", () => {
        it("should properly fetch profile info and cache it", async () => {
            const oktaUserInfo = { sub: "00u4tud65shvXgpzb357" };
            const profile = {
                investingExperience: ["ETFs"],
                goalsWithVinovest: ["Own physical assets as a hedge for a future market downturn"],
                anticipatedCashAccess: "More than 7 years",
                consideredStartingInvestment: null,
                investingStyle: "aggressive",
            };
            store.oktaUserEntity = { data: oktaUserInfo };
            api.getUserProfile = jest.fn(async () => ({ data: profile, ok: true }));

            expect(getData(store.profileEntity)).toEqual({});
            expect(getStatus(store.profileEntity).isInvalidated).toBe(true);

            await store.fetchProfile();

            expect(getData(store.profileEntity)).toEqual(profile);
            expect(getStatus(store.profileEntity).isDone()).toBe(true);
            expect(api.getUserProfile).toHaveBeenCalledWith("00u4tud65shvXgpzb357", "vv-jwt");
        });

        it("should properly handle failed response", async () => {
            const oktaUserInfo = { sub: "00u4tud65shvXgpzb357" };
            store.oktaUserEntity = { data: oktaUserInfo };

            api.getUserProfile = jest.fn(async () => ({
                ok: false,
                data: { code: 404, message: "Something failed horribly" },
            }));

            expect(getData(store.profileEntity)).toEqual({});
            expect(getStatus(store.profileEntity).isInvalidated).toBe(true);

            await store.fetchProfile();

            expect(getData(store.profileEntity)).toEqual({});
            expect(getStatus(store.profileEntity).isDone()).toBe(true);
            expect(getStatus(store.profileEntity).isFailed()).toBe(true);
            expect(getStatus(store.profileEntity).error).toEqual("Something failed horribly");
        });
    });

    describe("needsOnboarding", () => {
        it("should evaluate to false if the profile payload contains investmentStyle", () => {
            store.profileEntity = { data: { investingStyle: "aggressive" }, status: {} };
            expect(store.needsOnboarding).toBe(false);
        });
        it("should evaluate to false if the profile request was not successful", () => {
            store.profileEntity = { data: {}, status: {} };
            expect(store.needsOnboarding).toBe(false);
        });
        it("should evaluate to true if the profile request was not successful and error contains 'Could not find this user profile'", () => {
            store.profileEntity = { data: {}, status: { error: "Could not find this user profile" } };
            expect(store.needsOnboarding).toBe(true);
        });
    });

    describe("isProfileEmpty", () => {
        it("should evaluate to true if the profile entity cache contains the default {}", () => {
            store.profileEntity = { data: {} };
            expect(store.isProfileEmpty).toBe(true);
        });
        it("should evaluate to false if profile entity contains actual values", () => {
            const profile = {
                investingExperience: ["ETFs"],
                investingStyle: "aggressive",
            };
            store.profileEntity = { data: profile };
            expect(store.isProfileEmpty).toBe(false);
        });
    });
});
