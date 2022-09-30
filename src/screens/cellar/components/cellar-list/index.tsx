import React from "react";
import { get } from "lodash";
import { useTranslation } from "react-i18next";
import { currencyFormatter } from "#utils/shared";
import { useMobile, useCreateRoutingCallback } from "#shared/hooks";
import WinesBottlesTotals from "../wines-bottles-totals";

import { DesktopListElem, MobileListElem, CellExtended, Percentage, BottomData } from "./styled";
import { ListItemSkeleton } from "./list-item-skeleton";
import WineDetails from "./wine-details";
import AddFundsElem from "./add-funds-elem";
import bottleSvg from "../assets/icons/bottle.svg";
import { DepositEvent } from "#screens/deposit/RootDepositPage";
import { uppercaseWordsInString } from "#utils/stringUtils";

const PercentageDetails = ({ amount, profit, percents }) => (
    <CellExtended>
        <div>{amount}</div>
        <Percentage negative={profit < 0}>
            {profit < 0 ? `-${currencyFormatter((+profit / 100) * -1)}` : `+${currencyFormatter(+profit / 100)}`} (
            {percents >= 0 ? percents : percents * -1}%)
        </Percentage>
    </CellExtended>
);

const CellarList = ({ wines, openModal, cash, winesStrapiCollection, preloadWines }) => {
    const { t } = useTranslation("portfolio");
    const routeToDeposit = useCreateRoutingCallback("/deposit", {posthogId: DepositEvent.AddFunds, refresh: true});
    const isMobile = useMobile(1023);

    const renderWines = ({ lwin11, lwin18, sizeByML, total, preload, isFuture }, i) => {
        const country = uppercaseWordsInString(get(winesStrapiCollection, `${lwin11}.country`, ""));
        const region = uppercaseWordsInString(get(winesStrapiCollection, `${lwin11}.region`, ""));
        const displayName = uppercaseWordsInString(get(winesStrapiCollection, `${lwin11}.displayName`, ""));
        const bottleImage = get(winesStrapiCollection, `${lwin11}.bottleImage.url`, "");

        const winesInCase = lwin18 && +lwin18.slice(11, 13);

        if (preload) {
            return <ListItemSkeleton key={preload} isMobile={isMobile} />;
        }
        const wineQuantity = winesInCase ? (total.bottleCount / winesInCase).toFixed(0) : total.bottleCount;
        const profit = total.positionTotal.amount - wineQuantity * total.averageCostBasis.amount;
        return (
            // eslint-disable-next-line react/no-array-index-key
            <React.Fragment key={`${lwin18} ${i}`}>
                {isMobile ? (
                    <MobileListElem onClick={() => openModal(i)}>
                        <WineDetails
                            sizeByML={<WinesBottlesTotals lwin18={lwin18} total={total} sizeByML={sizeByML} />}
                            wine={`${displayName} ${isFuture ? t("cellar-list.futures") : lwin11.slice(-4)}`}
                            src={bottleImage || bottleSvg}
                        />
                        <PercentageDetails
                            amount={currencyFormatter(+total.positionTotal.amount / 100)}
                            profit={profit}
                            percents={total.positionTotalPercentage}
                        />
                    </MobileListElem>
                ) : (
                    <DesktopListElem onClick={() => openModal(i)}>
                        <WineDetails
                            sizeByML={`${region ? `${region},` : ""} ${country}`}
                            wine={`${displayName} ${isFuture ? t("cellar-list.futures") : lwin11.slice(-4)}`}
                            src={bottleImage || bottleSvg}
                        />
                        <CellExtended>
                            {wineQuantity}
                            <BottomData>
                                <WinesBottlesTotals lwin18={lwin18} total={total} sizeByML={sizeByML} hideCount />
                            </BottomData>
                        </CellExtended>
                        <CellExtended>
                            {currencyFormatter(+total.averageCostBasis.amount / 100)}
                            <BottomData>{winesInCase > 1 ? t("cellar-list.case") : t("cellar-list.bottle")}</BottomData>
                        </CellExtended>
                        <PercentageDetails
                            amount={currencyFormatter(+total.positionTotal.amount / 100)}
                            profit={profit}
                            percents={total.positionTotalPercentage}
                        />
                    </DesktopListElem>
                )}
            </React.Fragment>
        );
    };

    return (
        <div>
            {wines.map(renderWines)}
            <AddFundsElem isMobile={isMobile} preload={preloadWines} routeToDeposit={routeToDeposit} cash={cash} />
        </div>
    );
};

export default CellarList;
