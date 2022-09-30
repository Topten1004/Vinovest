import React from "react";
import styled from "styled-components";
import { DesktopListElem, MobileListElem, CellExtended, CellarBuying } from "./styled";
import { ListItemSkeleton } from "./list-item-skeleton";
import WineDetails from "./wine-details";

import buyingPowerSvg from "../assets/icons/buyingPower.svg";
import { useTranslation } from "react-i18next";

const AddFundsElem = ({ isMobile, preload, routeToDeposit, cash }) => {
    const { t } = useTranslation(["portfolio"]);
    if (preload) {
        return <ListItemSkeleton isMobile={isMobile} withFund />;
    }

    return (
        <>
            {isMobile ? (
                <MobileListElem>
                    <WineDetails
                        lwin11=""
                        addFunds={t("cellar-list.add-funds")}
                        wine={t("cellar-list.power")}
                        src={buyingPowerSvg}
                        addFundsHandler={routeToDeposit}
                    />
                    <CellExtendedMobile>{cash}</CellExtendedMobile>
                </MobileListElem>
            ) : (
                <DesktopListElem>
                    <WineDetails
                        lwin11=""
                        addFunds={t("cellar-list.add-funds")}
                        wine={t("cellar-list.power")}
                        src={buyingPowerSvg}
                        addFundsHandler={routeToDeposit}
                    />
                    <CellarBuying>-</CellarBuying>
                    <CellarBuying>-</CellarBuying>
                    <CellarBuying>{cash}</CellarBuying>
                </DesktopListElem>
            )}
        </>
    );
};

const CellExtendedMobile = styled(CellExtended)`
    justify-content: center !important;
`;

export default AddFundsElem;
