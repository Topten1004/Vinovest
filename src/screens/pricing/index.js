import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import Slider from "react-slick";
import { useMobile, useRootStore } from "#shared/hooks";
import useScrollReveal from "#shared/hooks/useScrollReveal";
import { numberWithCommas } from "#utils/shared";
import { TopTitle, PDescription, UpperSubtitle, HeroTitle, SmallSubtitle } from "#shared/ui/Typography/styled";
import WithLayersButton from "#shared/ui/WithLayersButton";
import BookBtn from "../about-us/BookBtn";
import { itemsToRender } from "./images/items";
import MetaTagsReplacer from "#shared/components/MetaTagsReplacer";
import { currencySymbol } from "#utils/constants";

const Pricing = ({ embed }) => {
    const { t } = useTranslation("pricing");
    const isMobile = useMobile(767);
    const ref = React.useRef();
    const { hasRevealed } = useScrollReveal({ ref });
    const runAnimation = hasRevealed ? "runAnimation" : "";

    return (
        <Section ref={ref}>
            {!embed && <MetaTagsReplacer title={t("head-meta.title")} description={t("head-meta.description")} />}

            <UpperSubtitle>{t("head.topSmallTitle")}</UpperSubtitle>
            <HeroTitle as={embed ? "h2" : "h1"}>{t("head.title")}</HeroTitle>

            {isMobile ? (
                <Slider
                    className="slider"
                    accessibility
                    infinite
                    autoplay={false}
                    slidesToShow={isMobile ? 1 : 3}
                    slidesToScroll={1}
                    arrows
                    dots
                    dotsClass="embed_slick_dts"
                >
                    {itemsToRender.map((item, idx) => (
                        <WithAnimation key={item.title} className={runAnimation} delay={idx + 1}>
                            <Slide item={item} idx={idx} />
                        </WithAnimation>
                    ))}
                </Slider>
            ) : (
                <WideScreenWrapper width={embed ? "1143px" : ""}>
                    {itemsToRender.map((item, idx) => (
                        <Slide key={item.title} className={runAnimation} item={item} idx={idx} />
                    ))}
                </WideScreenWrapper>
            )}
            {isMobile && <SmallSubtitle>{t("swipeMobileMessage")}</SmallSubtitle>}
            <BookBtn />
        </Section>
    );
};

const Slide = ({ item, idx }) => {
    const { t } = useTranslation("pricing");
    const benefitsTranslation = t(item.benefits);
    const benefits = typeof benefitsTranslation === "object" ? benefitsTranslation : [];
    const store = useRootStore();

    return (
        <div className={`slide_wrap ${"slide_wrap" + `${idx}`}`}>
            {t(item.title) === "Plus" && <div className="pill">Most Popular</div>}
            <div className="imgWrap">
                <img src={item.img} className="img" alt="item" height="240" width="305" />
            </div>
            <TopTitle className={`card_title${idx}`}>{t(item.title)}</TopTitle>
            <div className={`condWrap condWrap${idx}`}>
                <UpperSubtitle className="scheme">
                    {currencySymbol}
                    {numberWithCommas(item.amount)} {t(item.balance)} {t("label_balance")}
                </UpperSubtitle>
                <UpperSubtitle className="scheme">
                    {t(item.annual)} {t("label_annual")}
                </UpperSubtitle>
            </div>
            {!store.auth.isAuthenticated && <WithLayersButton colors={item.colors}>{t("getStarted")}</WithLayersButton>}
            <ul>
                {benefits.map((ben) => (
                    <li key={ben.trim()} className="benList">
                        <PDescription>{ben}</PDescription>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const Section = styled.section`
    padding: 100px 8.888% 100px;
    margin: 0 auto;
    overflow: hidden;
    color: #242e35;

    .slide_wrap {
        padding: 3rem 1rem;
        max-width: 357px;
        width: 100%;
        outline: none !important;
        display: flex !important;
        flex-direction: column;
        align-items: center;
        color: #242e35;
        height: 100%;
        position: relative;

        .pill {
            background: #51ac55;
            border-radius: 18px;
            color: white;
            font-size: 14px;
            padding: 0.6rem 2rem;
            text-transform: uppercase;

            ${({ theme }) => theme.media.greaterThan("1024px")`
                position: absolute;
                top: -1rem;
            `}
        }
    }

    ${HeroTitle} {
        font-size: 64px;
        text-align: center;
        margin-bottom: 0px;

        @media screen and (max-width: 767px) {
            font-size: 48px;
            line-height: 54px;
            margin-bottom: 70px;
        }
    }
    ${UpperSubtitle} {
        font-size: 18px;
        line-height: 178%;
        text-align: center;
        display: block;
        margin: 0 auto 25px;
    }
    .slick-track {
        max-width: 1062px;
    }
    .slick-slide {
        max-width: 357px;
    }
    .slick-track {
        display: flex;
        justify-content: space-between;
    }
    .slick-slide:not(:last-child) {
        margin-right: 36px;
    }
    .slide_wrap0 {
        background-color: #eeefef;
    }
    .slide_wrap1 {
        background-color: #eff7ff;

        img {
            max-width: 156px;
        }
    }
    .slide_wrap2 {
        background-color: #fae8d1;
    }
    .slide_wrap3 {
        background-color: #242e35;
        color: #efddc7;
    }
    .imgWrap {
        height: 175px;
        max-width: 305px;
        margin-bottom: 20px;
        display: flex;
        align-items: center;
    }
    img {
        height: auto;
        width: 100%;
    }
    ul {
        padding: 0;
        margin: 0;
    }
    li {
        list-style: none;
    }
    ${TopTitle} {
        font-size: 45px;
        margin-bottom: 25px;
        color: inherit;
    }

    .scheme {
        font-size: 14px;
        line-height: 225%;
        margin-bottom: 0;
    }
    .condWrap {
        margin-bottom: 40px;
        height: 85px;
        width: 97%;
        padding-top: 20px;
        border-top: 1px solid #242e35;
    }
    .condWrap3 {
        border-top: 1px solid #efddc7;
    }
    ${WithLayersButton.styled.WithLayers} {
        margin-bottom: 40px;
        min-width: 180px;
        width: 86%;
        max-width: 255px;
    }
    ${PDescription} {
        font-size: 16px;
        font-family: "Favoritstd", sans-serif;
    }
    .benList:not(:last-child) {
        margin-bottom: 16px;
    }
    .slider {
        margin-bottom: 80px;
    }
    ${BookBtn.styled.OverWrapper} {
        margin-bottom: 0;
    }
    .slick_dts,
    .embed_slick_dts {
        display: flex !important;
        justify-content: center;
        margin: 10px auto 0;
    }
    .slick_dts button {
        background-color: #eeefef;
        border: none;
        outline: none;
        height: 30px;
        font-family: "Favoritstd", sans-serif;
        font-size: 18px;
    }
    .slick_dts button {
        margin-right: 2px;
    }
    .slick_dts .slick-active button {
        box-sizing: border-box;
        border: 2px solid orange !important;
    }
    .embed_slick_dts button {
        background-color: transparent;
        color: transparent !important;
        width: 16px;
        height: 16px;
        border-radius: 50% !important;
        margin: 0 8px;
        padding: 0;
        cursor: pointer;
        border: 2px solid #242e35;
        overflow: hidden;
    }

    .embed_slick_dts .slick-active button {
        background-color: #242e35;
        color: transparent !important;
    }

    @media screen and (max-width: 991px) {
        padding: 100px 6.666% 220px;
        .slick-track {
            max-width: unset;
        }
        .slick-slide {
            max-width: 100%;
            padding: 0 1px;
        }
        .slick-slide:not(:last-child) {
            margin-right: 0px;
        }
        .slide_wrap {
            max-width: 100%;
            min-height: fit-content;
        }
        .slider {
            margin-bottom: 40px;
        }
        ${SmallSubtitle} {
            font-size: 24px;
            margin-bottom: 80px;
        }
        .overflow_Wrapper {
            padding: 30px 0 0;
        }
    }

    @media screen and (max-width: 991px) {
        .slide_wrap {
            min-height: 953px;
        }
    }
`;

const WideScreenWrapper = styled.div`
    margin: 0 auto;
    max-width: ${({ width }) => width || "968px"};
    display: grid;
    margin-top: 104px;
    grid-auto-columns: 1fr;
    grid-column-gap: 34px;
    grid-row-gap: 16px;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: auto;
    margin-bottom: 60px;

    @media screen and (max-width: 991px) {
        display: block;
    }
`;

const WithAnimation = styled.div`
    &.runAnimation {
        animation: fromBottomPricingAnimation ${({ delay }) => delay * 0.3}s linear;

        @keyframes fromBottomPricingAnimation {
            0% {
                opacity: 0;
                transform: translateY(20%);
            }

            20% {
                opacity: 0;
                transform: translateY(20%);
            }

            100% {
                opacity: 1;
                transform: translateY(0%);
            }
        }
    }
`;

Pricing.styled = {
    Section,
    WideScreenWrapper,
};

export default Pricing;
