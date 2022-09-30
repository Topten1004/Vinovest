import _ from "lodash";
import { computed } from "mobx";
import { getStatus } from "#models/FetchStatus";

export const OverviewModules = {
    AutoInvestBanner: "AutoInvestBanner",
    BookACallBanner: "BookACallBanner",
    PersonalSnapshot: "PersonalSnapshot",
    AccountValueGraph: "AccountValueGraph",
    ReturnsBox: "ReturnsBox",
    RewardsBox: "RewardsBox",
    FAQOptions: "FAQOptions",
    ContactSupport: "ContactSupport",
    QualityValueProps: "QualityValueProps",
    RegionDiversityGraph: "RegionDiversityGraph",
    WhiskeyVestBanner: "WhiskeyVestBanner",
    PortfolioPlan: "PortfolioPlan",
    HowProcessWorks: "HowProcessWorks",
};

export class SkeletonStore {
    static build(rootStore) {
        return new SkeletonStore(rootStore);
    }

    constructor(rootStore) {
        this.root = rootStore;
    }

    @computed get getOverviewModules() {
        const rs = this.root;

        let base = [
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
        ];

        if (
            (getStatus(rs.cellar.totalsEntity).isDone() && getStatus(rs.transfer.depositsEntity).isDone()) ||
            this.root.user.needsOnboarding
        ) {
            if (!rs.cellar.totalAccountValue || this.root.user.needsOnboarding) {
                base = [{ type: OverviewModules.BookACallBanner }, ...base];
            } else {
                base = [{ type: OverviewModules.AutoInvestBanner }, ...base];
            }
            if (!rs.transfer.hasMadeTransfers || this.root.user.needsOnboarding) {
                base = _.filter(base, (m) => m.type !== OverviewModules.HowProcessWorks);

                base = [...base.slice(0, 1), { type: OverviewModules.HowProcessWorks }, ...base.slice(1)];
            }
        }

        return base;
    }
}
