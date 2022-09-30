/* eslint-disable max-len */
import React from "react";
import { observer } from "mobx-react-lite";
import styled from "styled-components";
import Skeleton from "react-loading-skeleton";
import { useTranslation } from "react-i18next";
import { useRootStore, useMobile } from "#shared/hooks";
import WithToolTipWrapper from "#shared/components/with-tool-tip";
import { currencyFormatter } from "#utils/shared";
import { ListBasis, CellBasis } from "../assets/basicStyles";
import infoSvg from "../assets/icons/infoTotal.svg";

const TotalCell = ({ title, value, className, withRightGup }) => (
    <CellBasisWithMobile className={className} end="true">
        <Title>{title}</Title>
        <Value nowWrap withRightGup={withRightGup}>
            {value}
        </Value>
    </CellBasisWithMobile>
);

const useTotals = () => {
    const s = useRootStore();

    return { ...s.cellar.totals };
};

const SkeletonTextPreload = ({ wide }) => {
    const isMobile = useMobile(767);
    const isTablet = useMobile(1024);
    let widths = ["90px", "135px"];

    if (isMobile) {
        widths = ["45px", "67.5px"];
    } else if (isTablet) {
        widths = ["75px", "90px"];
    }

    return (
        <Skeleton
            style={{
                height: isMobile ? "15px" : "20px",
                width: wide ? widths[0] : widths[1],
                display: "block",
                margin: "0 0 0 auto",
                background: "#303941",
            }}
        />
    );
};

const Totals = ({ preload }) => {
    const { t } = useTranslation(["portfolio"]);
    const isMobile = useMobile(767);
    const isTablet = useMobile(1024);

    const { bottleCount = "0", costBasis, positionTotal } = useTotals();

    const position = (
        <>
            {!isMobile && t("wine-cellar.totals.position")}{" "}
            <NoWrap>
                {isMobile ? t("wine-cellar.totals.position") : t("wine-cellar.totals.total")}{" "}
                <WithToolTipWrapper text={t("wine-cellar.totals.tooltip-position")} toRight={isTablet}>
                    <img src={infoSvg} alt="info" />
                </WithToolTipWrapper>
            </NoWrap>
        </>
    );

    const totalCost = (
        <>
            {!isMobile && t("wine-cellar.totals.total_title")} {t("wine-cellar.totals.cost")}{" "}
            <NoWrap>
                {t("wine-cellar.totals.basis")}{" "}
                <WithToolTipWrapper text={t("wine-cellar.totals.tooltip-total-cost")}>
                    <img src={infoSvg} alt="info" />
                </WithToolTipWrapper>
            </NoWrap>
        </>
    );

    const quantity = (
        <>
            <NoWrap>
                {t("wine-cellar.totals.total_title")}{" "}
                <WithToolTipWrapper text={t("wine-cellar.totals.tooltip-quantity")}>
                    <img src={infoSvg} alt="info" />
                </WithToolTipWrapper>
            </NoWrap>
        </>
    );

    if (preload) {
        return (
            <WrapTotals>
                <TotalsContainer>
                    <CellBasisWithMobile className="titleCellTotals">
                        <MainTitle>
                            <Skeleton
                                style={{
                                    height: "38px",
                                    width: isMobile ? "67.5px" : "135px",
                                    display: "block",
                                    background: "#303941",
                                }}
                            />
                        </MainTitle>
                    </CellBasisWithMobile>
                    {!isMobile && (
                        <TotalCell
                            className="titleCellValue-a"
                            title={<SkeletonTextPreload />}
                            value={<SkeletonTextPreload wide />}
                        />
                    )}
                    <TotalCell
                        className="titleCellValue-b"
                        title={<SkeletonTextPreload />}
                        value={<SkeletonTextPreload wide />}
                    />
                    <TotalCell
                        className="titleCellValue-d"
                        title={<SkeletonTextPreload />}
                        value={<SkeletonTextPreload wide />}
                    />
                </TotalsContainer>
            </WrapTotals>
        );
    }

    return (
        <WrapTotals>
            <TotalsContainer>
                <CellBasisWithMobile className="titleCellTotals">
                    <MainTitle>{t("wine-cellar.totals.cell_total")}</MainTitle>
                </CellBasisWithMobile>
                {!isMobile && (
                    <TotalCell
                        className="titleCellValue-a"
                        title={quantity}
                        value={+bottleCount ? t("common:utils.shared.bottle", { count: bottleCount }) : "---"}
                    />
                )}
                <TotalCell
                    className="titleCellValue-b"
                    title={totalCost}
                    value={`${costBasis && costBasis.amount ? currencyFormatter(costBasis.amount / 100) : "---"}`}
                    withRightGup
                />
                <TotalCell
                    className="titleCellValue-d"
                    title={position}
                    value={`${
                        positionTotal && positionTotal.amount ? currencyFormatter(positionTotal.amount / 100) : "---"
                    }`}
                />
            </TotalsContainer>
        </WrapTotals>
    );
};

const WrapTotals = styled.div`
    position: sticky;
    top: calc(100vh - 145px);

    @media screen and (max-width: 767px) {
        top: calc(100vh - 175px);
    }

    @media screen and (min-width: 768px) and (max-width: 768px) {
        top: calc(100vh - 237px);
    }

    @media screen and (min-width: 769px) and (max-width: 1024px) {
        top: calc(100vh - 200px);
    }
`;

const TotalsContainer = styled(ListBasis)`
    height: 100px;
    background: ${(p) => p.theme.colors.mainAccentBlue};
    box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    margin-top: 33px;
    align-items: center;
    position: absolute;
    top: 0px;
    left: 0;
    right: 0;

    @media screen and (max-width: 767px) {
        height: 64px;
        padding: 0 22px 0 24px;
        align-items: center;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 0px 0px;
    }

    @media screen and (min-width: 768px) and (max-width: 1024px) {
        height: 110px;
    }
`;

const CellBasisWithMobile = styled(CellBasis)`
    @media screen and (max-width: 767px) {
        margin: 0;
        display: flex;
        flex-direction: column;
        align-items: ${({ end }) => (end ? "flex-end" : "flex-start")};
        justify-content: space-between;
        padding: 0;
    }
`;

const NoWrap = styled.span`
    white-space: nowrap;
`;
const MainTitle = styled.div`
    font-family: RoslindaleDisplayCondensed;
    font-style: normal;
    font-weight: 500;
    font-size: 36px;
    line-height: 54px;
    color: ${(p) => p.theme.colors.mainInnerTaupe};
    text-align: left;
    margin-left: 48px;

    @media screen and (max-width: 767px) {
        margin: 0;
        font-size: 20px;
        line-height: 32px;
    }

    @media screen and (min-width: 768px) and (max-width: 1024px) {
        font-size: 32px;
        line-height: 41px;
    }
`;

const Title = styled.div`
    height: 32px;
    font-family: VinovestMono;
    font-style: normal;
    font-weight: 500;
    font-size: 11px;
    line-height: 16px;
    letter-spacing: 0.025em;
    text-align: right;
    text-transform: uppercase;
    color: ${(p) => p.theme.colors.mainInnerTaupe};
    white-space: nowrap;
    max-width: 100%;

    @media screen and (max-width: 767px) {
        height: fit-content;
        padding: 0;
        margin: 5px 0 0 0;
        font-size: 11px;
        line-height: 16px;
        white-space: nowrap;
    }
`;

const Value = styled.div`
    font-family: VinovestMedium;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 30px;
    text-align: right;
    letter-spacing: 0.005em;
    color: ${(p) => p.theme.colors.mainInnerTaupe};
    ${({ nowWrap }) => (nowWrap ? "white-space: nowrap;" : "")}

    @media screen and (max-width: 767px) {
        font-size: 14px;
        line-height: 21px;
        margin: 4px 0 0 0;
        height: fit-content;

        ${({ withRightGup }) => (withRightGup ? "margin-right: 16px;" : "")}
    }

    @media screen and (min-width: 768px) and (max-width: 1024px) {
        font-size: 20px;
        line-height: 36px;
    }
`;

export default observer(Totals);
