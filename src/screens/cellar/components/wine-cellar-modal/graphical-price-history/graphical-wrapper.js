/* eslint-disable operator-linebreak */
import React, { useState } from "react";
import styled from "styled-components";
import { get } from "lodash";
import { timeFormat } from "d3-time-format";
import { useTranslation } from "react-i18next";
import { currencyFormatter } from "#utils/shared";
import { useMobile } from "#shared/hooks";
import PercentageDetails from "#shared/components/PercentageDetails";
import WithToolTipWrapper from "#shared/components/with-tool-tip";
import GraphicalPriceHistory from "./graphical-price-history";
import infoSvg from "../../assets/icons/info.svg";

const formatDateBottom = timeFormat("%b ' %d");
const getDate = (date) => formatDateBottom(new Date(date));
const percentageStyles = `
    font-family: VinovestMedium;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 26px;
    margin-right: 3px;
`;

const GraphicalWrapper = ({ stock, selectedRange, fetchHistoricalPricing, lwin18 }) => {
    const { t } = useTranslation(["portfolio"]);

    const isMobile = useMobile(1023);
    // const stock = JSON.parse(JSON.stringify(Stock)).slice(0,-11)
    const ranges = ["1w", "1m", "6m", "1y", "all"];
    const [sharedTooltipData, setSharedTooltipData] = useState();

    let amount = stock && !!stock.length ? stock[stock.length - 1].price : 0;

    if (sharedTooltipData) {
        amount = sharedTooltipData.price;
    }

    const date =
        stock && !!stock.length && getDate(sharedTooltipData ? sharedTooltipData.date : stock[stock.length - 1].date);
    const isToday = date === formatDateBottom(new Date());

    const priceDifference = sharedTooltipData
        ? get(sharedTooltipData, "priceDifference", 0)
        : get(stock[stock.length - 1], "priceDifference", 0);

    const percentageAmount = sharedTooltipData
        ? get(sharedTooltipData, "priceDifferencePercents", "0.0")
        : get(stock[stock.length - 1], "priceDifferencePercents", "0.0");

    return (
        <>
            <Header>
                <Head>
                    {isMobile && (
                        <TitleTip>
                            {t("graphical-price-history.title")} {+lwin18.slice(11, 13)}{" "}
                        </TitleTip>
                    )}
                    <Amount className="title-text">{currencyFormatter(amount)}</Amount>

                    <DatePercents today={isToday}>
                        <PercentageDetails
                            amount={currencyFormatter(+priceDifference)}
                            percents={percentageAmount}
                            styles={percentageStyles}
                            positive={+priceDifference >= 0}
                        />{" "}
                    </DatePercents>
                </Head>

                {!isMobile && (
                    <ControlsWrapper>
                        <TitleTip>
                            {t("graphical-price-history.title")} {+lwin18.slice(11, 13)}{" "}
                            <Tip>
                                <WithToolTipWrapper text={t("graphical-price-history.tooltip")}>
                                    <img src={infoSvg} alt="grey-hyphen" />
                                </WithToolTipWrapper>
                            </Tip>
                        </TitleTip>
                        <Options>
                            {ranges.map((range) => (
                                <Option
                                    key={range}
                                    selected={range.toUpperCase() === selectedRange.toUpperCase()}
                                    onClick={() => fetchHistoricalPricing(range)}
                                >
                                    {range}
                                </Option>
                            ))}
                        </Options>
                    </ControlsWrapper>
                )}
            </Header>
            <GraphContainer>
                {stock && !!stock.length && (
                    <GraphicalPriceHistory
                        isMobile={isMobile}
                        stock={stock}
                        margin={{ top: 0, left: 0, right: 0, bottom: 0 }}
                        setSharedTooltipData={!isMobile && setSharedTooltipData}
                        showTickFormat={!isMobile}
                        rangeByMonths={["6m", "1y", "all"].includes(selectedRange)}
                    />
                )}
            </GraphContainer>
            {isMobile && (
                <Options>
                    {ranges.map((range) => (
                        <Option
                            key={range}
                            selected={range.toUpperCase() === selectedRange.toUpperCase()}
                            onClick={() => fetchHistoricalPricing(range)}
                        >
                            {range}
                        </Option>
                    ))}
                </Options>
            )}
        </>
    );
};

const GraphContainer = styled.div`
    height: 233px;
    width: 100%;
    position: absolute;
    bottom: 0;

    @media screen and (max-width: 1023px) {
        height: 193px;
        bottom: 62px;
    }
`;

const Header = styled.div`
    position: absolute;
    z-index: 1;
    width: 100%;
    top: -10px;
    left: 0px;
    padding-top: 45px;
    padding-left: 39px;
    padding-right: 35px;

    button {
        border: 0;
        background: 0;
        outline: 0;
    }

    @media screen and (max-width: 1023px) {
        padding: 28px 21px;
    }
`;

const Tip = styled.div`
    margin: 0 0 0 5px;
    padding-bottom: 2px;
    height: 18px;
`;

const Head = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;

    @media screen and (max-width: 1023px) {
        flex-direction: column;
        align-items: flex-start;
    }
`;

const ControlsWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const TitleTip = styled.div`
    font-family: VinovestMono;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 18px;
    letter-spacing: 0.025em;
    text-transform: uppercase;
    color: #242e35;
    display: flex;
    align-items: center;
    width: 100%;

    @media screen and (max-width: 1023px) {
        line-height: 16px;
    }
`;

const DatePercents = styled.div`
    ${({ today }) => (today ? "color: #767a7f;" : "color: #448B47;")}
    font-weight: 500;
    font-size: 16px;
    line-height: 26px;
    letter-spacing: 0.005em;
    font-family: VinovestMedium;
    display: flex;

    * {
        line-height: 26px !important;
    }

    @media screen and (max-width: 1023px) {
        margin-top: 7px;
        font-size: 14px;
        line-height: 21px;

        * {
            line-height: 21px !important;
        }
    }
`;

const Amount = styled.div`
    font-family: RoslindaleDisplayCondensed;
    font-style: normal;
    font-weight: 500;
    font-size: 45px;
    line-height: 60px;
    color: #242e35;
    margin-right: 23px;

    @media screen and (max-width: 1023px) {
        font-size: 32px;
        line-height: 41px;
        margin-top: 9px;
    }
`;

const Option = styled.div`
    margin-right: 17px;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 26px;
    ${({ selected }) => (selected ? "background: #242E35; color: white;" : "")}
    transition: 0.5s;
    padding: 2px;

    &:hover {
        cursor: pointer;
        background: #242e35;
        color: white;
    }

    @media screen and (max-width: 1023px) {
        min-width: 26px;
        height: 26px;
    }
`;

const Options = styled.div`
    flex-grow: 1;
    font-family: VinovestMono;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    letter-spacing: 0.025em;
    text-transform: uppercase;
    color: #242e35;

    ${Option}:last-child {
        margin-right: 0;
    }

    @media screen and (max-width: 1023px) {
        position: absolute;
        bottom: 0;
        justify-content: space-around;
        height: 62px;
        width: 100%;
        font-size: 11px;
    }
`;

export default GraphicalWrapper;
