import React, { useRef, useEffect, useState } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import { sliderItems } from "./images/sliderItems";
import { TopTitle, PDescription } from "#shared/ui/Typography/styled";

import arrow from "./images/arrow.svg";

const AdSlider = (par) => {
    const slickRef = useRef(null);

    const [currentSlide, setCurrentSlide] = useState(sliderItems.findIndex((item) => item.id === par.match.params.id));
    const freezeRef = React.useRef(false);
    const didMountRef = React.useRef(false);

    useEffect(() => {
        const curr = sliderItems.findIndex((item) => item.id === par.match.params.id);
        const itemId = sliderItems.find((item) => item.id === par.match.params.id).id;

        const currItem = sliderItems.findIndex((_, i) => i === currentSlide);

        if (sliderItems[currItem].id !== itemId || !didMountRef.current) {
            if (currentSlide === sliderItems.length - 1 && curr === 0) {
                slickRef.current.slickNext(curr, !didMountRef.current);
            } else if (currentSlide === 0 && curr === sliderItems.length - 1) {
                slickRef.current.slickPrev(curr, !didMountRef.current);
            } else {
                slickRef.current.slickGoTo(curr, !didMountRef.current);
            }

            if (didMountRef.current) freezeRef.current = true;
        }
        didMountRef.current = true;
    }, [par.match.params.id, currentSlide]);

    return (
        <Section>
            <H1Title>{sliderItems[currentSlide || 0].name}</H1Title>
            <Slider
                ref={slickRef}
                className="slider-view-container"
                accessibility
                infinite
                autoplay={false}
                slidesToShow={1}
                slidesToScroll={1}
                arrows
                dots
                prevArrow={<ArrowPrev src={arrow} alt="back-arrow" />}
                nextArrow={<ArrowNext src={arrow} alt="next-arrow" />}
                afterChange={(next) => {
                    setCurrentSlide(next);

                    if (!freezeRef.current) {
                        par.history.push(sliderItems[next].id);
                    } else {
                        freezeRef.current = false;
                    }
                }}
                draggable={false}
            >
                {sliderItems.map((item, idx) => (
                    <SlideWrap id={"uniq_id" + `${idx}`} key={item.img} className="slideWrap">
                        <BlueBg />
                        <SliderItem>
                            <SmallBanner>
                                <span>{item.banner}</span>
                            </SmallBanner>
                            <TopTitle>{item.name}</TopTitle>
                            <span className="position">{item.pos}</span>
                            <div className="imageWrapper">
                                <img src={item.img} height="400" width="400" />
                            </div>
                            <PDescription>{item.desc}</PDescription>
                        </SliderItem>
                    </SlideWrap>
                ))}
            </Slider>
        </Section>
    );
};

const Section = styled.section`
    padding: 100px 0% 100px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    overflow-x: hidden;

    .slick-list {
        min-height: 1010px;
    }
    .slick-dots li.slick-active button:before {
        background-color: #513011;
        color: #513011;
        opacity: 1;
    }
    .imageWrapper {
        max-width: 400px;
        max-height: 400px;
        margin-bottom: 35px;
    }
    img {
        max-width: 100%;
        object-fit: contain;
    }

    .slick-dots li button:before {
        font-size: 18px !important;
        opacity: 1;
        color: transparent;
        border: 2px solid #513011;
        border-radius: 50%;
        width: 12px;
        height: 12px;
        content: "";
    }
    .slick-dots {
        bottom: -75px !important;
    }
    ${TopTitle} {
        color: #efddc7;
        min-height: 130px;
    }
    @media screen and (max-width: 768px) {
        .imageWrapper {
            margin-bottom: 65px;
        }
    }
`;
const SlideWrap = styled.div`
    padding-top: 30px;
    position: relative;
    :focus,
    :active {
        outline: none;
    }

    @media screen and (max-width: 768px) {
        :before {
            content: "";
            display: block;
            position: absolute;
            transition: 300ms linear all;
            height: 100%;
            width: 85%;
            left: 50%;
            transform: translate(-50%, -7%);
            background-color: #e0e5cd;
        }
        padding: 75px 0;
    }
`;

const SliderItem = styled.div`
    margin: 0 auto;
    position: relative;
    display: flex;
    max-width: 750px;
    align-items: center;
    flex-direction: column;
    background-color: #242e35;
    color: #efddc7;
    padding: 60px 50px;
    z-index: 0;
    .position {
        font-family: Favoritstd, sans-serif;
        font-weight: 500;
        color: #efddc7;
        margin-bottom: 20px;
    }
    ${PDescription} {
        max-width: 500px;
        text-align: start;
    }

    @media screen and (max-width: 445px) {
        padding: 50px 50px;
        width: 100%;
    }
`;
const BlueBg = styled.div`
    position: absolute;
    background-color: #c5d5e4;
    width: 1140px;
    height: 70%;
    z-index: -999;
    top: 16.5%;
    left: 50%;
    transform: translateX(-50%);
`;
const SmallBanner = styled.div`
    background-color: #efddc7;
    color: #242e35;
    padding: 12px 32px;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -50%);
    span {
        font-family: Favoritmonostd, sans-serif;
        font-size: 18px;
        line-height: 177.77%;
        white-space: nowrap;
    }
`;
const ArrowNext = styled.img`
    width: 35px !important;
    height: 22px !important;
    right: 24% !important;
    z-index: 5;
    top: 45.5% !important;
    @media screen and (max-width: 1700px) {
        right: 20% !important;
    }
    @media screen and (max-width: 1600px) {
        right: 227px !important;
    }
    @media screen and (max-width: 1300px) {
        right: 50px !important;
    }
    @media screen and (max-width: 991px) {
        filter: invert(100%);
        right: 13% !important;
        top: 635px !important;
    }
    @media screen and (max-width: 768px) {
        filter: invert(100%);
        right: 3% !important;
        top: 635px !important;
    }
    @media screen and (max-width: 500px) {
        top: 58% !important;
    }
    @media screen and (max-width: 450px) {
        top: 55% !important;
    }
    @media screen and (max-width: 400px) {
        top: 50% !important;
    }
`;
const ArrowPrev = styled.img`
    transform: rotateY(180deg) translate(0%, -50%) !important;
    left: 24% !important;
    width: 35px !important;
    height: 22px !important;
    top: 45.5% !important;
    z-index: 5;
    @media screen and (max-width: 1770px) {
        left: 20% !important;
    }
    @media screen and (max-width: 1600px) {
        left: 227px !important;
    }
    @media screen and (max-width: 1300px) {
        left: 50px !important;
    }
    @media screen and (max-width: 991px) {
        filter: invert(100%);
        left: 13% !important;
        top: 635px !important;
    }
    @media screen and (max-width: 768px) {
        filter: invert(100%);
        left: 3% !important;
        top: 635px !important;
    }
    @media screen and (max-width: 500px) {
        top: 58% !important;
    }
    @media screen and (max-width: 450px) {
        top: 55% !important;
    }
    @media screen and (max-width: 400px) {
        top: 50% !important;
    } ;
`;

const H1Title = styled.h1`
    position: absolute;
    left: 0;
    right: 0;
    width: 1px;
    height: 1px;
    opacity: 0;
`;
export default AdSlider;
