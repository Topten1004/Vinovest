import React, { useState, useEffect, FC } from "react";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import { breakPoints } from "#screens/index";
import { getStatus } from "#models/FetchStatus";
import { useRootStore, useMobile } from "#shared/hooks";
import CellarViewToggle from "./CellarViewToggle";
import CellarList from "../cellar-list";
import CellarGrid from "../cellar-grid";
import ListViewTitles from "./list-view-titles";
import Totals from "./totals";
import CellarTitleSkeleton from "./cellar-title-skeleton";
import useIntersect from "../../../../shared/hooks/useIntersect";
import {
    CellarContainer,
    CellarViewsContainer,
    Intersection,
    CellarHeader,
    CellarTitle,
    LoadMore,
    ControlsWrapper,
} from "./styled";
import EmptyCellar from "./empty-cellar";
import { currencyFormatter } from "#utils/shared";
import DownloadCsvButton from "./DownloadCsvButton";

const preloadItems = [
    { preload: "preload-1" },
    { preload: "preload-2" },
    { preload: "preload-3" },
    { preload: "preload-4" },
];

interface IWineCellarProps {
    wines: any[];
    openModal: boolean;
    fetchWinesData: {
        nextPageToken: string;
        fetchCellarWines: () => {};
    };
}
const WineCellar: FC<IWineCellarProps> = ({ wines, openModal, fetchWinesData }) => {
    const { t } = useTranslation(["portfolio"]);
    const s = useRootStore();
    const [cellarViewState, setCellarViewState] = useState("grid");
    const toggleCellarViewState = () => setCellarViewState((view) => (view === "grid" ? "list" : "grid"));
    const { mobileMax: mobileMaxBreakPoint, tablet } = breakPoints;
    const isTablet = useMobile(tablet);
    const isMobile = useMobile();
    const mobileMax = useMobile(mobileMaxBreakPoint);
    const { winesStrapiCollection } = s.cellar;
    const cash = currencyFormatter(+s.cellar.totals.cash?.amount / 100);
    const [setCellarNode, cellarEntry] = useIntersect({});
    const winesEntityPending = getStatus(s.cellar.winesListEntity).isPending();
    const isAuthenticated = s.user.oktaUserInfo.sub;
    const preloadWines = (winesEntityPending || !isAuthenticated) && !wines.length;
    const { totalAccountValue } = s.cellar;

    let showTotals = false;
    let top = isMobile ? "750px" : "1000px";

    if (wines.length <= 4 && !mobileMax) {
        if (cellarViewState === "list") {
            top = "400px";
        } else top = "800px";
    }

    useEffect(() => {
        if (s.cellar?.winesList?.nextPageToken && !winesEntityPending) {
            s.cellar.fetchCellarWines();
        }
    }, [s.cellar, winesEntityPending]);
    if (cellarEntry && cellarEntry.boundingClientRect) {
        showTotals = !!(cellarEntry.intersectionRatio || cellarEntry.boundingClientRect.top < 0);
    }

    return (
        <>
            <CellarContainer>
                <CellarHeader>
                    {preloadWines ? (
                        <CellarTitleSkeleton mobileMax={mobileMax} isTablet={isTablet} />
                    ) : (
                        <CellarTitle>{t("wine-cellar.title")}</CellarTitle>
                    )}
                    <ControlsWrapper>
                        <DownloadCsvButton />
                        <CellarViewToggle selected={cellarViewState} toggle={toggleCellarViewState} />
                    </ControlsWrapper>
                </CellarHeader>
                {showTotals && <Totals preload={!(isAuthenticated && !preloadWines)} />}
                <CellarViewsContainer>
                    {(cellarViewState === "list" || !isTablet) && <ListViewTitles cellarViewState={cellarViewState} />}
                    <Intersection ref={setCellarNode} top={top} />
                    {wines.length || winesEntityPending || preloadWines ? (
                        <div>
                            {cellarViewState === "list" ? (
                                <CellarList
                                    wines={preloadWines ? [...wines, ...preloadItems] : wines}
                                    winesStrapiCollection={winesStrapiCollection}
                                    openModal={openModal}
                                    cash={cash}
                                    preloadWines={preloadWines}
                                />
                            ) : (
                                <CellarGrid
                                    wines={winesEntityPending || preloadWines ? [...wines, ...preloadItems] : wines}
                                    winesStrapiCollection={winesStrapiCollection}
                                    openModal={openModal}
                                    cash={cash}
                                    preloadWines={preloadWines}
                                />
                            )}
                        </div>
                    ) : (
                        <EmptyCellar hasMoney={totalAccountValue} />
                    )}
                </CellarViewsContainer>
                {isTablet && fetchWinesData.nextPageToken && !winesEntityPending && (
                    <LoadMore type="button" onClick={fetchWinesData.fetchCellarWines}>
                        {t("wine-cellar.buttons.load")}
                    </LoadMore>
                )}
            </CellarContainer>
        </>
    );
};

export default observer(WineCellar);
