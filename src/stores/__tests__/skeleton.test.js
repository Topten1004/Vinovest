import { SkeletonStore, OverviewModules } from "../skeleton";
import { completedFetch, pendingFetch } from "#models/FetchStatus";

describe("Skeleton Store", () => {
    const root = {
        user: { needsOnboarding: false },
        cellar: {},
        transfer: {
            pendingDeposits: [],
            sourcingWines: [],
        },
    };
    const store = SkeletonStore.build(root);

    afterEach(() => {
        (root.user = { needsOnboarding: false }), (root.cellar = {});
        root.transfer = { pendingDeposits: [], sourcingWines: [], depositsEntity: {}, pendingTransferEntity: {} };
    });

    describe("getOverviewModules", () => {
        it("return the Overview skeleton for user without deposit and pending fetch", () => {
            store.root.cellar.hasWinesInCellar = false;
            store.root.transfer.hasMadeTransfers = false;
            store.root.cellar.totalsEntity = { status: pendingFetch() };
            store.root.transfer.depositsEntity = { status: completedFetch() };
            store.root.transfer.pendingTransferEntity = { status: completedFetch() };

            expect(store.getOverviewModules).toEqual([
                { type: OverviewModules.PersonalSnapshot },
                { type: OverviewModules.AccountValueGraph },
                { type: OverviewModules.RewardsBox },
                { type: OverviewModules.ReturnsBox },
                { type: OverviewModules.RegionDiversityGraph },
                { type: OverviewModules.PortfolioPlan },
                { type: OverviewModules.HowProcessWorks },
                { type: OverviewModules.FAQOptions },
                { type: OverviewModules.ContactSupport },
                { type: OverviewModules.WhiskeyVestBanner },
                { type: OverviewModules.QualityValueProps },
            ]);
        });
        it("return the Overview skeleton for user without deposit and completed fetch", () => {
            store.root.cellar.hasWinesInCellar = false;
            store.root.cellar.totalsEntity = { status: completedFetch() };
            store.root.transfer.depositsEntity = { status: completedFetch() };
            store.root.transfer.pendingTransferEntity = { status: completedFetch() };

            expect(store.getOverviewModules).toEqual([
                { type: OverviewModules.BookACallBanner },
                { type: OverviewModules.HowProcessWorks },
                { type: OverviewModules.PersonalSnapshot },
                { type: OverviewModules.AccountValueGraph },
                { type: OverviewModules.RewardsBox },
                { type: OverviewModules.ReturnsBox },
                { type: OverviewModules.RegionDiversityGraph },
                { type: OverviewModules.PortfolioPlan },
                { type: OverviewModules.FAQOptions },
                { type: OverviewModules.ContactSupport },
                { type: OverviewModules.WhiskeyVestBanner },
                { type: OverviewModules.QualityValueProps },
            ]);
        });

        it("return the Overview skeleton for user who has made a deposit and pending fetch", () => {
            store.root.cellar.hasWinesInCellar = true;
            store.root.transfer.hasMadeTransfers = true;
            store.root.cellar.totalsEntity = { status: pendingFetch() };
            store.root.transfer.depositsEntity = { status: completedFetch() };
            store.root.transfer.pendingTransferEntity = { status: completedFetch() };
            expect(store.getOverviewModules).toEqual([
                { type: OverviewModules.PersonalSnapshot },
                { type: OverviewModules.AccountValueGraph },
                { type: OverviewModules.RewardsBox },
                { type: OverviewModules.ReturnsBox },
                { type: OverviewModules.RegionDiversityGraph },
                { type: OverviewModules.PortfolioPlan },
                { type: OverviewModules.HowProcessWorks },
                { type: OverviewModules.FAQOptions },
                { type: OverviewModules.ContactSupport },
                { type: OverviewModules.WhiskeyVestBanner },
                { type: OverviewModules.QualityValueProps },
            ]);
        });

        it("return the Overview skeleton for user who has made a deposit and completed fetch", () => {
            store.root.cellar.totalAccountValue = "1000";
            store.root.transfer.hasMadeTransfers = true;
            store.root.cellar.totalsEntity = { status: completedFetch() };
            store.root.transfer.depositsEntity = { status: completedFetch() };
            store.root.transfer.pendingTransferEntity = { status: completedFetch() };
            store.root.user.needsOnboarding = false;
            expect(store.getOverviewModules).toEqual([
                { type: OverviewModules.AutoInvestBanner },
                { type: OverviewModules.PersonalSnapshot },
                { type: OverviewModules.AccountValueGraph },
                { type: OverviewModules.RewardsBox },
                { type: OverviewModules.ReturnsBox },
                { type: OverviewModules.RegionDiversityGraph },
                { type: OverviewModules.PortfolioPlan },
                { type: OverviewModules.HowProcessWorks },
                { type: OverviewModules.FAQOptions },
                { type: OverviewModules.ContactSupport },
                { type: OverviewModules.WhiskeyVestBanner },
                { type: OverviewModules.QualityValueProps },
            ]);
        });
    });
});
