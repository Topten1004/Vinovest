/* eslint-disable operator-linebreak */
import React from "react";
import { observer } from "mobx-react-lite";
import { get } from "lodash";
import Slider from "react-slick";
import styled from "styled-components";
import { useRootStore } from "#shared/hooks";
import { getStatus } from "#models/FetchStatus";
import Slide from "./Slide";
import Arrow from "./ArrowButton";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const SliderWrapper = observer(({ wines, goToSlide, fetchWinesData, speed = 500, closeModal }) => {
    const slickRef = React.useRef(null);
    const store = useRootStore();
    const { winesStrapiCollection, winesCollection } = store.cellar;

    const isPending = getStatus(store.cellar.winesCollectionEntity).isPending();

    const [currentSlide, setCurrentSlide] = React.useState(0);
    const [beforeChangeSlide, setBeforeChangeSlide] = React.useState(0);

    const handlePrev = () => {
        slickRef.current.slickPrev();
    };

    const handleNext = () => {
        slickRef.current.slickNext();
    };

    const updateHeight = () => {
        slickRef.current.slickGoTo(currentSlide, true);
    };

    const handleLoadMore = async () => {
        fetchWinesData.fetchCellarWines();
    };

    React.useEffect(() => {
        slickRef.current.slickGoTo(goToSlide, true);
        setCurrentSlide(goToSlide);
    }, [goToSlide]);

    const getVisibleSlidesOrder = (middle) => {
        const isIndex = (index) => wines.length > index && wines[index] && `${index}`;
        return [isIndex(middle - 1) || isIndex(wines.length - 1), isIndex(middle), isIndex(middle + 1) || 0].map(
            (n) => +n,
        );
    };

    const shouldBeVisible = getVisibleSlidesOrder(currentSlide);

    const showContent = (i) => shouldBeVisible.includes(i);

    const emulateAfterChange = (_, next) => setBeforeChangeSlide(next);
    const didMount = React.useRef(null);

    React.useEffect(() => {
        const beforeChangeSlideTimer = setTimeout(() => {
            didMount && setCurrentSlide(beforeChangeSlide);
        }, speed);

        if (!didMount) didMount = true;

        return () => clearTimeout(beforeChangeSlideTimer);
    }, [beforeChangeSlide]);

    return (
        <>
            <OverflowContainer className="portfolioSlider">
                <ContentContainer>
                    <Wrapper>
                        <Slider
                            ref={slickRef}
                            className="slider-view-container"
                            infinite
                            autoplay={false}
                            slidesToShow={1}
                            slidesToScroll={1}
                            arrows={false}
                            beforeChange={emulateAfterChange}
                            speed={speed}
                            adaptiveHeight
                        >
                            {wines.map((wine, i) => (
                                // eslint-disable-next-line react/no-array-index-key
                                <React.Fragment key={i}>
                                    <Slide
                                        wine={wine}
                                        i={i}
                                        showContent={showContent(i)}
                                        wineStrapiData={winesStrapiCollection[wine.lwin11] || {}}
                                        heroMask={get(
                                            winesCollection,
                                            `${wine.lwin18}.data.producerData.background.url`,
                                        )}
                                        producerDescription={get(
                                            winesCollection,
                                            `${wine.lwin18}.data.producerData.description`,
                                        )}
                                        updateHeight={updateHeight}
                                    />
                                </React.Fragment>
                            ))}
                        </Slider>
                    </Wrapper>
                </ContentContainer>
            </OverflowContainer>
            {wines.length > 1 && (
                <>
                    <Arrow onClick={handlePrev} reverse />
                    <Arrow
                        disabled={+currentSlide === wines.length - 1 && isPending}
                        onClick={
                            +currentSlide === wines.length - 1 && fetchWinesData.nextPageToken
                                ? handleLoadMore
                                : handleNext
                        }
                        fetchData={
                            (+currentSlide === wines.length - 1 && fetchWinesData.nextPageToken) ||
                            (+currentSlide === wines.length - 1 && wines.length && isPending)
                        }
                    />
                </>
            )}
        </>
    );
});

const Wrapper = styled.div`
    width: 100%;
    position: relative;
    background: #fff;
    border-radius: 20px;
    -webkit-mask-image: -webkit-radial-gradient(white, black);

    @media screen and (max-width: 1023px) {
        border-radius: 10px;
    }
`;

const OverflowContainer = styled.div`
    height: 100vh;
    overflow: auto;
    width: 100%;
    margin: 0 auto;
    ::-webkit-scrollbar {
        display: none;
    }
    scrollbar-width: none;
`;

const ContentContainer = styled.div`
    padding: 50px 0;
    width: 100%;
    background: transparent;
    position: static;
`;
