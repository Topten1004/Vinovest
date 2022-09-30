import React from "react";
import { observer } from "mobx-react-lite";
import { useMobile } from "#shared/hooks";
import { animated } from "react-spring";
import useHero from "./useHero";
import {
    Wrapper,
    HeroContainer,
    HeroLeftSide,
    Capture,
    HeroButtons,
    LearnMoreButton,
    LearnMoreButtonMobile,
    ImageContainer,
    AnimationContainer,
    BackgroundAnimation,
    BottleWrapper,
} from "./styled";
import HeroPending from "./hero-pending";
import OpenModalWrapper from "./open-modal-wrapper";
import HeroMonthReturn from "./mont-return";
import WinemakerIconAnimation from "../winemaker-icon-animation";
import bottleSvg from "../assets/icons/bottle.svg";
import { useTranslation } from "react-i18next";

function Hero({ toggleModal }) {
    const animationWrapper = React.useRef(null);
    const { t } = useTranslation(["portfolio"]);

    const isMobile = useMobile(767);
    const isTablet = useMobile(1024);

    const {
        calcHoverPositions,
        translate1,
        translate2,
        xy,
        set,
        learnMoreActive,
        lwin11,
        percentReturn,
        returnText,
        displayName,
        critics,
        bottleImage,
        heroMask,
        producerDescription,
        cursor,
        checkPending,
        isFuture,
    } = useHero();

    return (
        <Wrapper>
            {checkPending && <HeroPending isMobile={isMobile} isTablet={isTablet} />}
            {!checkPending && lwin11 && (
                <div>
                    <BackgroundAnimation
                        style={{
                            backgroundImage: `url(${heroMask})`,
                            transform: xy.interpolate(translate2),
                            ...cursor,
                        }}
                    />
                    <HeroContainer>
                        <HeroLeftSide>
                            <Capture>{t("hero.title")} </Capture>
                            <OpenModalWrapper onClick={toggleModal} disabled={!learnMoreActive}>
                                <h1
                                    style={cursor}
                                    className={!isTablet && displayName && displayName.length > 40 ? "lowerCase" : ""}
                                >
                                    {displayName} {isFuture ? t("hero.futures") : lwin11.slice(-4)}
                                </h1>
                            </OpenModalWrapper>

                            {!isMobile && producerDescription && (
                                <OpenModalWrapper onClick={toggleModal} disabled={!learnMoreActive}>
                                    <animated.p style={cursor}>
                                        {producerDescription.length > 96
                                            ? `${producerDescription.slice(0, 96)}...`
                                            : producerDescription}
                                    </animated.p>
                                </OpenModalWrapper>
                            )}
                            {!isMobile && (
                                <HeroButtons>
                                    <LearnMoreButton onClick={toggleModal} disabled={!learnMoreActive}>
                                        {t("hero.learn")}
                                    </LearnMoreButton>
                                </HeroButtons>
                            )}
                        </HeroLeftSide>
                        <BottleWrapper>
                            <ImageContainer
                                ref={animationWrapper}
                                onMouseMove={({ clientX: x, clientY: y }) =>
                                    set({ xy: calcHoverPositions(x, y, animationWrapper) })
                                }
                            >
                                <OpenModalWrapper onClick={toggleModal} disabled={!learnMoreActive}>
                                    <animated.img
                                        src={bottleImage || bottleSvg}
                                        alt="hero"
                                        style={{ ...cursor, transform: xy.interpolate(translate1) }}
                                    />
                                </OpenModalWrapper>
                                {percentReturn && (
                                    <OpenModalWrapper onClick={toggleModal} disabled={!learnMoreActive}>
                                        <HeroMonthReturn
                                            percentReturn={percentReturn}
                                            returnText={returnText}
                                            cursor={cursor}
                                            style={{ transform: xy.interpolate(translate1) }}
                                        />
                                    </OpenModalWrapper>
                                )}
                                <AnimationContainer>
                                    <WinemakerIconAnimation data={critics} />
                                </AnimationContainer>
                            </ImageContainer>
                        </BottleWrapper>

                        {isMobile && (
                            <LearnMoreButtonMobile onClick={toggleModal} disabled={!learnMoreActive}>
                                {t("hero.learn")}
                            </LearnMoreButtonMobile>
                        )}
                    </HeroContainer>
                </div>
            )}
        </Wrapper>
    );
}

export default observer(Hero);
