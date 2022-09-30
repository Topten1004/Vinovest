import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import Slider from "react-slick";
import { observer } from "mobx-react-lite";
import { useMobile, useRootStore } from "#shared/hooks";
import { incomeSliderData } from "./data";
import { removeOutline } from "../helpers";
import closeSvg from "../assets/close.svg";

const IncomeSlider = observer(() => {
    const [showModal, setShowModal] = React.useState(true);
    const [beforeClose, setBeforeClose] = React.useState(false);
    const store = useRootStore();

    const { t } = useTranslation("vinovest-home");

    const isDesktop = !useMobile(767);

    const authenticated = React.useMemo(() => store.auth.isAuthenticated, [store.auth.isAuthenticated]);

    const close = () => setBeforeClose(true);

    React.useEffect(() => {
        if (beforeClose && showModal) {
            const interval = setTimeout(() => {
                setShowModal(false);
            }, 1000);

            return () => clearTimeout(interval);
        }
    }, [beforeClose, showModal]);

    if (!showModal) return null;

    return (
        <Wrapper className={beforeClose ? "beforeClose" : ""} authenticated={authenticated ? 1 : 0}>
            <IncomeSliderContainer>
                <button type="button" className="close" onClick={close}>
                    <img src={closeSvg} alt="close" height="18" width="18" />
                </button>
                {isDesktop && (
                    <Slider
                        className="blog-slider-container"
                        accessibility
                        infinite
                        pauseOnHover
                        autoplay
                        autoplaySpeed={7000}
                        slidesToShow={1}
                        slidesToScroll={1}
                        arrows={false}
                        dots={false}
                        swipe={false}
                    >
                        {incomeSliderData.map((list, id) => (
                            <div key={id}>
                                <IncomeSlide>
                                    {list.map(({ id, country, amount, icon }) => (
                                        <div className="social" key={id}>
                                            <img
                                                className="social-img"
                                                alt={country}
                                                src={icon}
                                                width="55"
                                                height="59"
                                            />
                                            <div className="social-proof">
                                                {t("vinovest-home:income-slider.messageGeneric", { country, amount })}
                                            </div>
                                        </div>
                                    ))}
                                </IncomeSlide>
                            </div>
                        ))}
                    </Slider>
                )}
            </IncomeSliderContainer>
        </Wrapper>
    );
});

const withBottomNav = `
    bottom: 65px; 
    @keyframes fromBottomIncomeListAnimation {
        0% {
            bottom: -200px;
        }
        70% {
            bottom: -200px;
        }
        100% {
            bottom: 65px;
        }
    }
`;

const Wrapper = styled.div`
    position: fixed;
    z-index: 999;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
    ${removeOutline}
    box-shadow: 3px 3px 30px 0 rgb(0 0 0 / 12%);
    animation: fromBottomIncomeListAnimation 6s linear;

    &.beforeClose {
        transition: 1s;
        bottom: -200px;
    }

    @keyframes fromBottomIncomeListAnimation {
        0% {
            bottom: -200px;
        }
        70% {
            bottom: -200px;
        }
        100% {
            bottom: 0px;
        }
    }

    @media screen and (max-width: 1023px) {
        ${({ authenticated }) => authenticated && withBottomNav};
    }

    .close {
        position: absolute;
        top: 15px;
        left: 15px;
        bottom: auto;
        z-index: 100;
        width: 18px;
        outline: 0;
        border: 0;
        background: 0;
        padding: 0;

        img {
            width: 100%;
        }

        &:hover {
            cursor: pointer;
        }

        @media screen and (max-width: 767px) {
            width: 15px;
        }
    }
`;

const IncomeSliderContainer = styled.div`
    padding-right: 35px;
    padding-left: 35px;
    max-width: 1150px;
    margin: 0 auto;

    .social {
        display: flex;
        align-items: center;
        height: 70px;
        width: fit-content;
    }
    .social-mobile {
        display: flex;
        align-items: center;
        height: 110px;
        width: fit-content;
        margin: 0 auto;
    }
    .social-img {
    }
    .social-proof {
        max-width: 220px;
        margin-left: 15px;
        font-size: 14px;
        line-height: 21px;
        letter-spacing: 0.005em;
    }
`;

const IncomeSlide = styled.div`
    display: grid;
    height: 70px;
    align-items: center;
    grid-auto-columns: 1fr;
    grid-column-gap: 16px;
    grid-row-gap: 16px;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: auto;
    background-color: transparent;
`;

export default IncomeSlider;
