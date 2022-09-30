import { createContext } from "react";
import { toast } from "react-toastify";
import { configure } from "mobx";
import { AuthStore } from "./auth";
import { DepositStore } from "./deposit";
import { CellarStore } from "./cellar";
import { QuizStore } from "./quiz";
import { ReferralStore } from "./referral";
import { TransferStore } from "./transfer";
import { UserStore } from "./user";
import { SkeletonStore } from "./skeleton";
import { DocumentsStore } from "./documents";
import { LiquidationStore } from "./liquidation";
import { BlogStore } from "./blog";
import { SupportStore } from "./support";
import { PressStore } from "./press";
import preLoads from "./preLoad";

configure({ enforceActions: "observed" });

export class RootStore {
    tracking = {};

    static build(api, tracking, history) {
        const rootStore = new RootStore(api, tracking, history);

        this.disposers = {};
        const disposers = preLoads(rootStore);

        disposers.then((allDisposers) => {
            const disposersForStore = allDisposers.reduce((acc, curr) => {
                return { ...acc, ...curr };
            }, {});
            rootStore.addDisposers(disposersForStore);
        });

        return rootStore;
    }

    /**
     *Creates an instance of RootStore.
     * @param {*} api
     *
     * @param {object} tracking
     * @property {object} gtm -> Google Tag Manager client
     * @property {object} sentry -> Sentry client
     *
     * @memberof RootStore
     */
    constructor(api, tracking, history) {
        /** tracking clients */
        this.tracking = tracking;

        /** sub-stores */
        this.auth = AuthStore.build(this, api);
        this.deposit = DepositStore.build(this, api);
        this.cellar = CellarStore.build(this, api, toast);
        this.quiz = QuizStore.build(this, api);
        this.referral = ReferralStore.build(this, api);
        this.transfer = TransferStore.build(this, api, toast);
        this.user = UserStore.build(this, api);
        this.skeleton = SkeletonStore.build(this);
        this.documents = DocumentsStore.build(this, api, toast);
        this.liquidation = LiquidationStore.build(this, api, toast);
        this.blog = BlogStore.build(this, api, toast);
        this.support = SupportStore.build(this, api, toast);
        this.press = PressStore.build(this, api, toast);
        this.disposers = {};
    }

    setBrowserHistory(history) {
        this.history = history;
    }

    addDisposers(disposers) {
        this.disposers = disposers;
    }
}

export const RootStoreContext = createContext();
export const RootStoreProvider = RootStoreContext.Provider;
