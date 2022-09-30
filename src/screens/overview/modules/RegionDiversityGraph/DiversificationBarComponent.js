import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const emptyState = (t) => [
    { percentage: "0", region: t("bordeaux") },
    { percentage: "0", region: t("burgundy") },
    { percentage: "0", region: t("rhone") },
    { percentage: "0", region: t("champagne") },
    { percentage: "0", region: t("italian") },
    { percentage: "0", region: t("american") },
    { percentage: "0", region: t("rest") },
];

const DiversificationBarComponent = ({ data = [] }) => {
    const { t } = useTranslation(["overview"]);
    const list = data.length ? data : emptyState(t);

    return (
        <DiversificationBarWrapper>
            {!data.length && (
                <DiversificationBarDescription>{t("diversification.description-bar")}</DiversificationBarDescription>
            )}
            <DiversificationBarListHideOverflow>
                <DiversificationBarListOverflow>
                    <DiversificationBarList>
                        {list.map(({ percentage, region }) => (
                            <DiversificationBar key={region}>
                                <DiversificationBarPercentage height={percentage}>
                                    <div className="DiversificationBarPercentage">{percentage}%</div>
                                    <div className="DiversificationBarPercentageGraph" />
                                </DiversificationBarPercentage>

                                <div className="DiversificationBarRegion">{region}</div>
                            </DiversificationBar>
                        ))}
                    </DiversificationBarList>
                </DiversificationBarListOverflow>
            </DiversificationBarListHideOverflow>
        </DiversificationBarWrapper>
    );
};

const DiversificationBarWrapper = styled.div`
    height: 235px;
    margin-top: 35px;
    margin-bottom: 20px;
    position: relative;

    ${(p) => p.theme.media.greaterThan("767px")`
        margin-bottom: 0px;
        height: 311px;
    `};
`;

const DiversificationBarDescription = styled.div`
    pointer-events: none;
    font-family: VinovestMedium;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 21px;
    text-align: center;
    letter-spacing: 0.005em;
    color: #767a7f;
    position: absolute;
    z-index: 1;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    max-width: 271px;
    width: 100%;

    ${(p) => p.theme.media.greaterThan("767px")`
        max-width:100%;
        top: 76px;
        font-size: 16px;
        line-height: 26px;
    `}
`;

const DiversificationBarListHideOverflow = styled.div`
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
`;

const DiversificationBarListOverflow = styled.div`
    position: absolute;
    top: 0;
    bottom: -15px;
    left: 0;
    right: -15px;
    overflow: scroll;

    ${(p) => p.theme.media.greaterThan("767px")`
        margin-top: 7px;
    `}
`;

const DiversificationBarList = styled.div`
    min-width: 680px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    padding-right: 15px;
`;

const DiversificationBar = styled.div`
    font-family: VinovestMedium;
    font-style: normal;
    font-weight: 500;
    font-size: 11px;
    line-height: 16px;
    text-align: center;
    letter-spacing: 0.025em;
    text-transform: uppercase;
    width: 80px;
    position: relative;

    ${(p) => p.theme.media.greaterThan("1023px")`
        width: 100px;
        font-size: 14px;
        line-height: 18px;
    `}

    .DiversificationBarRegion {
        color: #242e35;
        position: absolute;
        box-sizing: border-box;
        width: 100%;
        padding-top: 19px;
        height: 35%;

        ${(p) => p.theme.media.greaterThan("767px")`
            height: 30%;
        `}
    }
`;

const DiversificationBarPercentage = styled.div`
    height: 65%;
    color: #000000;
    border-bottom: solid 1px #c5d5e4;
    position: relative;

    ${(p) => p.theme.media.greaterThan("767px")`
        height: 70%;
    `}

    .DiversificationBarPercentage {
        position: absolute;
        z-index: 1;
        bottom: 18px;
        left: 50%;
        transform: translateX(-50%);

        ${(p) => p.theme.media.greaterThan("1023px")`
            bottom: 13px;
        `}
    }

    .DiversificationBarPercentageGraph {
        content: "";
        display: block;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: ${({ height }) => height}%;
        background: #c5d5e4;
    }
`;

export default DiversificationBarComponent;
