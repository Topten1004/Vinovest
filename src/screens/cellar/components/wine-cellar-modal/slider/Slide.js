import React from "react";
import styled from "styled-components";
import Skeleton from "react-loading-skeleton";
import { observer } from "mobx-react-lite";
import { get } from "lodash";

import { useRootStore, useMobile } from "#shared/hooks";
import { getStatus } from "#models/FetchStatus";

import Hero from "../hero";
import GraphicalPriceHistory from "../graphical-price-history";
import Condition from "../condition";
import Description from "../description";
import YourPosition from "../your-position";
import WinemakerNotes from "../winemaker-notes";
import maskSvg from "../../assets/icons/hero.svg";
import bottleSvg from "../../assets/icons/bottle.svg";

const Slide = ({ wine, showContent, wineStrapiData, heroMask, producerDescription, updateHeight }) => {
    const { lwin18 } = wine;

    const { displayName, critics, bottleImage } = wineStrapiData;

    const bottle = get(bottleImage, "url", bottleSvg);

    const store = useRootStore();
    const currencyCode = store.user.userCurrency;
    const isPending = getStatus(store.cellar.winesCollectionEntity).isPending();
    const isSlidePending =
        store.cellar.winesCollectionEntity.data[lwin18] &&
        getStatus(store.cellar.winesCollectionEntity.data[lwin18]).isPending();

    const isMobile = useMobile(1023);

    React.useEffect(() => {
        if (!store.cellar.winesCollection[lwin18] && !isPending && showContent) {
            store.cellar.fetchPortfolioWineToCollection(lwin18, "6m", currencyCode);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lwin18, isPending, showContent, currencyCode]);

    const fetchHistoricalPricing = (range) => {
        store.cellar.fetchPortfolioWineToCollection(lwin18, range, currencyCode);
    };

    const wineData = store.cellar.winesCollection[lwin18] && store.cellar.winesCollection[lwin18].data;

    return (
        <SlideContent padding={wineData}>
            {wineData && showContent ? (
                <>
                    <Hero
                        hero={bottle}
                        mask={heroMask || maskSvg}
                        wineData={wineData}
                        displayName={displayName}
                        critics={critics}
                    />
                    <Condition />

                    {producerDescription && (
                        <>
                            <Divider />
                            <Description text={producerDescription} updateHeight={updateHeight} />
                        </>
                    )}
                    <PriceHistoryContainer>
                        {isSlidePending ? (
                            <SkeletonGraphWrapper>
                                <Skeleton
                                    style={{
                                        position: "absolute",
                                        top: 0,
                                        right: 0,
                                        bottom: 0,
                                        left: 0,
                                    }}
                                />
                            </SkeletonGraphWrapper>
                        ) : (
                            <GraphicalPriceHistory
                                stock={wineData.historical.pricing}
                                selectedRange={wineData.range}
                                fetchHistoricalPricing={fetchHistoricalPricing}
                                lwin18={lwin18}
                            />
                        )}
                    </PriceHistoryContainer>
                    <SectionContainer>
                        <YourPosition wineData={wineData} />
                    </SectionContainer>
                    {critics && (
                        <SectionContainer>
                            <WinemakerNotes critics={critics} />
                        </SectionContainer>
                    )}
                </>
            ) : (
                <Skeleton
                    style={{
                        width: "100%",
                        height: isMobile ? "2836px" : "3221px",
                        display: "block",
                    }}
                />
            )}
        </SlideContent>
    );
};

const stylePaddings = `
    padding-bottom: 64px;
    @media screen and (max-width: 1023px) {
        padding-bottom: 31px;
    }
`;

const SlideContent = styled.div`
    position: relative;
    outline: 0;
    height: 100%;

    ${({ padding }) => (!padding ? "padding: 0" : stylePaddings)}
`;

const SectionContainer = styled.div`
    border: 1px solid #eeeeee;
    box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    margin: 40px 52px 0;

    @media screen and (max-width: 1023px) {
        margin: 18px 10px 0;
    }
`;
const PriceHistoryContainer = styled(SectionContainer)`
    padding-top: 118px;
    overflow: hidden;
    position: relative;
    height: 360px;

    @media screen and (max-width: 1023px) {
        height: 390px;
    }
`;

const Divider = styled.div`
    border-bottom: 1px solid #eeeeee;
    margin: 0 59px;

    @media screen and (max-width: 1023px) {
        margin: 0 17px;
    }
`;

const SkeletonGraphWrapper = styled.div`
    width: 100%;
    height: ${({ isMobile }) => (isMobile ? "2836px" : "3221px")};
    display: block;
`;

export default observer(Slide);
