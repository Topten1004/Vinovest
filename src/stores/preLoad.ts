import { reaction } from "mobx";
import { breakPoints } from "#screens/index";
import Cookies from "js-cookie";

const initialPortfolioLoad = (rootStore: any, currencyCode: string) => {
    return reaction(
        () =>
            !rootStore.cellar?.cellarInitialLoad &&
            rootStore.user?.profileId &&
            rootStore.auth.isAuthenticated &&
            !rootStore.cellar?.winesList?.wines?.length &&
            !rootStore.cellar?.winesList?.nextPageToken &&
            !rootStore.user.needsOnboarding,
        (ok?: any) => {
            if (ok && !rootStore.user.needsOnboarding) {
                rootStore.cellar.fetchCellarWines(currencyCode);
                rootStore.cellar.fetchPortfolioTotals("6m", currencyCode);
            }
        },
    );
};
const subsequentPortfolioLoad = (rootStore: any, currencyCode: string) => {
    const { tablet } = breakPoints;
    const isTablet = window.innerWidth <= tablet;

    return (
        !isTablet &&
        reaction(
            () =>
                !rootStore.cellar?.cellarInitialLoad &&
                rootStore.user?.profileId &&
                rootStore.auth.isAuthenticated &&
                rootStore.cellar?.winesList?.wines?.length &&
                rootStore.cellar?.winesList?.nextPageToken && !rootStore.user.needsOnboarding,
            async (nextPageToken?: any) => {
                if (nextPageToken && !rootStore.user.needsOnboarding) {
                    rootStore.cellar.fetchCellarWines(currencyCode);
                }
            },
        )
    );
};


function preloadPortfolio(rootStore: any) {
    const currencyCode = Cookies.get("localCurrency") ? Cookies.get("localCurrency") : "USD";

    const initalPortfolio = initialPortfolioLoad(rootStore, currencyCode);
    const subsequentPortfolio = subsequentPortfolioLoad(rootStore, currencyCode);
 
    return {
        initalPortfolio,
        subsequentPortfolio
    };
}

export default function (rootStore: any) {
    return Promise.all([preloadPortfolio(rootStore)]);
}
