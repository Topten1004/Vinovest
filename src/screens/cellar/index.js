import React, { useState } from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import { useRootStore } from "#shared/hooks";
import { Fade } from "#shared/ui";
import WineCellarModal from "./components/wine-cellar-modal";
import WineCellar from "./components/wine-cellar";
import Hero from "./components/hero";

const CellarPage = observer(() => {
    const s = useRootStore();
    const [isModal, setIsModal] = useState(null);
    const [isFeaturedModal, setIsFeaturedModal] = useState(false);
    const currencyCode = s.user.userCurrency;
    const openModal = (index) => setIsModal({ index });
    const closeModal = () => {
        setIsModal(null);
        setIsFeaturedModal(false);
    };
    const { winesList } = s.cellar;

    const fetchWinesData = {
        fetchCellarWines: () => winesList.nextPageToken && s.cellar.fetchCellarWines(currencyCode),
        nextPageToken: winesList?.nextPageToken,
    };
    const toggleHeroModal = () => {
        if (s.cellar.featuredWine) {
            const { lwin18 } = s.cellar.featuredWine;
            const heroWineIndex = winesList.wines.findIndex((data) => data.lwin18 === lwin18);

            if (heroWineIndex >= 0) {
                openModal(heroWineIndex);
            } else {
                setIsFeaturedModal(true);
            }
        }
    };

    return (
        <Fade in>
            <>
                <Hero toggleModal={toggleHeroModal} />
                <PageContainer>
                    {winesList && (
                        <WineCellar wines={winesList.wines} openModal={openModal} fetchWinesData={fetchWinesData} />
                    )}
                </PageContainer>
                {(isModal || isFeaturedModal) && (
                    <WineCellarModal
                        wines={isFeaturedModal ? [s.cellar.featuredWine] : winesList.wines}
                        isModal={isModal || isFeaturedModal}
                        closeModal={closeModal}
                        goToSlide={!isFeaturedModal ? isModal.index : 0}
                        fetchWinesData={fetchWinesData}
                    />
                )}
            </>
        </Fade>
    );
});

const PageContainer = styled.div`
    width: 100%;
    max-width: 1440px;
    margin: 0 auto;
    padding: 0;
    padding-bottom: 0;
    color: ${(p) => p.theme.colors.mainAccentBlue};
`;

export default CellarPage;
