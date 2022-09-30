import React from "react";
import { get } from "lodash";
import { useSpring } from "react-spring";
import { useRootStore } from "#shared/hooks";
import { getStatus } from "#models/FetchStatus";
import mask from "../assets/icons/hero.svg";
import { uppercaseWordsInString } from "#utils/stringUtils";

function calcHoverPositions(x, y, ref) {
    if (ref.current) {
        const wrapperRect = ref.current.getBoundingClientRect();
        const { width, height } = wrapperRect;

        const a = x - wrapperRect.x;
        const b = y - wrapperRect.y;
        const halfWidth = width / 2;
        const halfHeight = height / 2;
        const calcA = width / 2 > halfWidth - a * -1 ? a : -(width - a) + halfWidth;
        const calcB = height / 2 > halfHeight - b * -1 ? b : -(height - b) + halfHeight;

        return [calcA, calcB];
    }

    return [x - window.document.innerWidth, y - window.document.innerHeight];
}

const useHero = () => {
    const [{ xy }, set] = useSpring(() => ({ xy: [0, 0], config: { mass: 10, tension: 550, friction: 140 } }));
    const s = useRootStore();
    const learnMoreActive = s.cellar.winesList.wines.length && s.cellar.featuredWine.lwin18;
    const isPending = getStatus(s.cellar.featuredWineEntity).isPending();
    const isDone = getStatus(s.cellar.featuredWineEntity).isDone();
    const { lwin11, percentReturn, returnText, lwin18 } = s.cellar.featuredWine;
    const currencyCode = s.user.userCurrency;
    const { winesStrapiCollection, winesCollection } = s.cellar;

    React.useEffect(() => {
        if (s.auth.isAuthenticated && s.user.oktaUserInfo && s.user.oktaUserInfo.sub) {
            if (!isPending && !isDone) {
                s.cellar.fetchPortfolioFeatured(currencyCode);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [s.auth.isAuthenticated, s.user.oktaUserInfo.sub]);

    const displayName = lwin11 ? uppercaseWordsInString(get(winesStrapiCollection, `${lwin11}.displayName`, "")) : "";
    const critics = lwin11 ? get(winesStrapiCollection, `${lwin11}.critics`, []) : [];
    const bottleImage = get(winesStrapiCollection, `${lwin11}.bottleImage.url`, "");
    const heroMask = get(winesCollection, `${lwin18}.data.producerData.background.url`, mask);
    const producerDescription = get(winesCollection, `${lwin18}.data.producerData.description`);
    const isFuture = get(winesCollection, `${lwin18}.data.isFuture`);

    const cursor = learnMoreActive ? { cursor: "pointer" } : {};

    const checkPending = isPending || !isDone;

    const translate1 = (x, y) => `translate3d(${-x * 0.05}px,${-y * 0.05}px,0)`;
    const translate2 = (x, y) => `translate3d(${x * 0.05}px,${y * 0.05}px,0)`;

    return {
        calcHoverPositions,
        translate1,
        translate2,
        xy,
        set,
        learnMoreActive,
        isPending,
        isDone,
        lwin11,
        percentReturn,
        returnText,
        lwin18,
        winesStrapiCollection,
        winesCollection,
        displayName,
        critics,
        bottleImage,
        heroMask,
        producerDescription,
        cursor,
        checkPending,
        isFuture,
    };
};

export default useHero;
