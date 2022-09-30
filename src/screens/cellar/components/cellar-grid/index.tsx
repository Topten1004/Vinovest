import React from "react";
import styled from "styled-components";
import { get } from "lodash";
import { useTranslation } from "react-i18next";
import { useCreateRoutingCallback } from "#shared/hooks";
import { DepositButton } from "#shared/components/Deposit";
import { currencyFormatter } from "#utils/shared";
import WinesBottlesTotals from "../wines-bottles-totals";
import buyingPowerSvg from "../assets/icons/buyingPower.svg";
import bottleSvg from "../assets/icons/bottle.svg";
import { GridSkeleton, BuyingPowerSkeleton } from "./grid-skeleton";
import { DepositEvent } from "#screens/deposit/RootDepositPage";
import { uppercaseWordsInString } from "#utils/stringUtils";

const PercentageDetails = ({ amount, percents }) => {
    return (
        <PercentageDetailsContainer>
            {amount} <span className="hide">_</span>
            <Percentage negative={percents < 0}>
                {percents >= 0 && "+"}
                {percents}%
            </Percentage>
        </PercentageDetailsContainer>
    );
};

const BuyingPowerGridElem = ({ cash, routeToDeposit }) => {
    const { t } = useTranslation(["portfolio"]);
    return (
        <GridElemContainerBuying>
            <BuyingPowerHeader>
                <h2>{t("cellar-list.power")}</h2>
                <p>{t("cellar-list.disclaimer")}</p>
            </BuyingPowerHeader>

            <BuyingPowerImg src={buyingPowerSvg} alt="buying power" />
            <div>
                <BuyingPowerAmount>{cash}</BuyingPowerAmount>
                <DepositButtonExtended onClick={routeToDeposit}>{t("cellar-list.add-funds")}</DepositButtonExtended>
            </div>
        </GridElemContainerBuying>
    );
};

const CellarGrid = ({ wines, openModal, cash, winesStrapiCollection, preloadWines }) => {
    const { t } = useTranslation(["portfolio"]);
    const getBottleImage = (lwin11: number) => get(winesStrapiCollection, `${lwin11}.bottleImage.url`, "");

    const routeToDeposit = useCreateRoutingCallback("/deposit", {posthogId: DepositEvent.AddFunds, refresh: true});
    return (
        <Container>
            {wines.map(({ lwin18, lwin11, sizeByML, total, isFuture, preload }, i) => {
                const formatedDisplayName = uppercaseWordsInString(
                    get(winesStrapiCollection, `${lwin11}.displayName`, ""),
                );

                return (
                    <GridElemContainer
                        style={preload ? { background: "#eee" } : { cursor: "pointer" }}
                        // eslint-disable-next-line react/no-array-index-key
                        key={`${lwin18} ${i}`}
                        onClick={() => openModal(i)}
                    >
                        {preload ? (
                            <GridSkeleton />
                        ) : (
                            <>
                                <h2>
                                    {formatedDisplayName} {isFuture ? " (Wine Futures)" : lwin11.slice(-4)}
                                </h2>
                                <GridElemImg src={getBottleImage(lwin11) || bottleSvg} alt="wine" />

                                <WineDetailsContainer>
                                    <WineBottleDetailsContainer>
                                        <WinesBottlesTotals lwin18={lwin18} total={total} sizeByML={sizeByML} />
                                    </WineBottleDetailsContainer>

                                    <PercentageDetails
                                        amount={currencyFormatter(+total.positionTotal.amount / 100)}
                                        percents={total.positionTotalPercentage}
                                    />
                                </WineDetailsContainer>
                            </>
                        )}
                    </GridElemContainer>
                );
            })}
            {preloadWines ? (
                <GridElemContainer>
                    <BuyingPowerSkeleton>
                        <DepositButtonExtended onClick={routeToDeposit}>
                            {t("cellar-list.add-funds")}
                        </DepositButtonExtended>
                    </BuyingPowerSkeleton>
                </GridElemContainer>
            ) : (
                <BuyingPowerGridElem cash={cash} routeToDeposit={routeToDeposit} />
            )}
        </Container>
    );
};

const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 34px 39px;
    grid-template-areas: ". . . .";
    margin-top: 36px;

    @media screen and (max-width: 1200px) {
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-areas: ". . .  ";
    }
    @media screen and (max-width: 835px) {
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-areas: ". . .";
        gap: 20px 25px;
        margin-top: 0px;
    }
    @media screen and (max-width: 767px) {
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-areas: ". . . ";
        gap: 13px 13px;
        margin-top: 0px;
    }

    @media screen and (max-width: 575px) {
        grid-template-columns: 1fr 1fr;
        grid-template-areas: ". .";
        gap: 13px 13px;
        margin-top: 0px;
    }

    @media screen and (max-width: 320px) {
        grid-template-columns: 1fr;
        grid-template-areas: ".";
        gap: 13px 13px;
        margin-top: 0px;
    }
`;

const GridElemContainer = styled.div`
    height: 550px;
    background: ${(p) => p.theme.colors.white};
    border: 1px solid ${(p) => p.theme.colors.lighterGray};
    box-sizing: border-box;
    box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    color: ${(p) => p.theme.colors.mainAccentBlue};

    h2 {
        margin: 0;
        margin-top: 30px;
        height: 60px;
        font-family: VinovestMedium;
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        text-align: center;
        letter-spacing: 0.005em;
        padding: 0 33px;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    @media screen and (max-width: 767px) {
        height: 360px;
        display: flex;
        flex-direction: column;
        padding-bottom: 15px;

        h2 {
            height: 39px;
            margin-top: 20.39px;
            font-size: 14px;
            line-height: 21px;
            width: 100%;
            padding: 0 10px;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }

    @media screen and (min-width: 768px) and (max-width: 1023px) {
        height: 482px;
    }
`;

const BuyingPowerHeader = styled.div`
    display: flex;
    flex-direction: column;
`;
const GridElemImg = styled.img`
    display: block;
    margin: 29px auto 0;
    height: 343px;
    width: 100%;
    object-fit: scale-down;

    @media screen and (max-width: 767px) {
        height: 199.11px;
        margin-top: 16.5px;
    }

    @media screen and (min-width: 768px) and (max-width: 1023px) {
        height: 265.59px;
        margin-top: 13px;
    }
`;

const GridElemContainerBuying = styled(GridElemContainer)`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    padding-bottom: 40px;

    p {
        width: 161px;
        height: 56px;
        font-family: Vinovest;
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 21px;
        text-align: center;
        letter-spacing: 0.005em;
        color: #767a7f;
        margin-top: 21px;
    }
    h2 {
        height: 18px;
        color: ${(p) => p.theme.colors.dark30};
    }

    @media screen and (max-width: 767px) {
        justify-content: space-around;
        padding: 55px 0 68px;

        h2 {
            overflow: unset;
            padding: 0;
            height: 18px;
            font-size: 14px;
            line-height: 21px;
        }
    }
`;

const WineDetailsContainer = styled.div`
    margin-top: 28px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    padding: 0 33px 31px 33px;

    @media screen and (max-width: 767px) {
        padding: 0 21px;
        margin: 0;
        align-items: center;
        flex-direction: column;
        justify-content: flex-end;
        flex-grow: 1;
    }
`;

const PercentageDetailsContainer = styled.div`
    font-family: VinovestMedium;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 21px;
    letter-spacing: 0.005em;
    color: ${(p) => p.theme.colors.dark30};
    display: flex;
    justify-content: center;

    .hide {
        opacity: 0;
        color: transparent;
    }

    @media screen and (max-width: 767px) {
        font-size: 11px;
        line-height: 21px;
    }

    @media screen and (min-width: 768px) and (max-width: 1023px) {
        margin-top: 9px;
    }
`;

const Percentage = styled.span`
    font-family: VinovestMedium;
    font-style: normal;
    font-weight: 500;
    letter-spacing: 0.005em;
    color: ${(p) => (p.negative ? p.theme.colors.darkRed : p.theme.colors.lighterGreen)};
`;

const WineBottleDetailsContainer = styled.div`
    display: flex;
    justify-content: center;
    text-align: center;
    line-height: 25px;
    font-size: 14px;

    @media screen and (max-width: 767px) {
        font-size: 11px;
        line-height: 21px;
    }
`;

const BuyingPowerImg = styled.img`
    width: 100px;

    @media screen and (max-width: 767px) {
        width: 60px;
    }
`;

const BuyingPowerAmount = styled.div`
    margin-top: 20px;
    color: ${(p) => p.theme.colors.dark30};

    @media screen and (max-width: 767px) {
        font-size: 16px;
        line-height: 26px;
        margin-top: 21px;
    }
`;

const DepositButtonExtended = styled(DepositButton)`
    width: 169px;
    height: 47px;
    margin: 34px auto 0;

    @media screen and (max-width: 767px) {
        margin-top: 39px;
        width: 116px;
        height: 30px;
        font-size: 11px;
        line-height: 16px;
        padding: 0;
    }
`;

export default CellarGrid;
