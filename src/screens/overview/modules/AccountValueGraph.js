import React, { useMemo } from "react";
import Skeleton from "react-loading-skeleton";
import Tooltip from "react-tooltip";
import _ from "lodash";
import { LinearGradient } from "@vx/gradient";
import { AreaClosed, Bar, Line } from "@vx/shape";
import { curveNatural } from "@vx/curve";
import { scaleTime, scaleLinear } from "@vx/scale";
import { GridColumns } from "@vx/grid";
import { AxisBottom } from "@vx/axis";
import { withParentSize } from "@vx/responsive";
import { max, extent } from "d3-array";
import { timeFormat } from "d3-time-format";
import { observer } from "mobx-react-lite";
import styled from "styled-components";
import { formatDuration } from "date-fns";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import { TooltipWithBounds } from "@vx/tooltip";
import nullGraph from "#assets/shared/null-graph.svg";
import infoBubble from "#assets/shared/info-bubble.svg";
import { useRootStore, useTheme, useConfig, useMobile } from "#shared/hooks";
import { currencyFormatter, shortEnLocale } from "#utils/shared";
import useChartData from "./PortfolioChart/useChartData";
import { BaseModuleContainer } from "./styles";
import { locales } from "#localization/constants";
import { formatDate as localizeDate, dateFormats } from "#shared/format/dates";

export const AccountValueGraph = observer(() => {
    const { t } = useTranslation(["overview", "common"]);
    const s = useRootStore();
    const colors = useTheme("colors");
    const config = useConfig();
    const isMobile = useMobile(1023);

    const locale = /en/.test(i18n.language) ? shortEnLocale : locales[i18n.language];
    const ranges = [
        { label: formatDuration({ weeks: 1 }, { locale }), duration: "1w" },
        { label: formatDuration({ months: 1 }, { locale }), duration: "1m" },
        { label: formatDuration({ months: 6 }, { locale }), duration: "6m" },
        { label: formatDuration({ years: 1 }, { locale }), duration: "1y" },
        { label: t("all"), duration: "all" },
    ];
    const { selectedRange = "", pending, bottleCount } = s.cellar.totals;

    const [sharedTooltipData, setSharedTooltipData] = React.useState();
    const stock = s.cellar.userPriceHistory || [];
    const priceDifference = sharedTooltipData
        ? _.get(sharedTooltipData, "priceDifference", 0)
        : _.get(stock[stock.length - 1], "priceDifference", 0);

    const date = sharedTooltipData
        ? sharedTooltipData.tooltipDate
        : localizeDate(new Date(), dateFormats.shortMonthDayandYear);

    if (pending) {
        return (
            <CustomModuleContainer>
                <Skeleton style={{ position: "absolute", minHeight: "100%", minWidth: "100%", top: 0, left: 0 }} />
            </CustomModuleContainer>
        );
    }

    return (
        <CustomModuleContainer>
            {s.cellar.totalsEntity.status.isDone() ? (
                <Header>
                    <div className="title-text">
                        {!sharedTooltipData
                            ? currencyFormatter(s.cellar.totalAccountValue)
                            : currencyFormatter(
                                  +(_.get(s.cellar.totals, "cash.amount", 0) / 100) +
                                      +_.get(sharedTooltipData, "price", 0),
                              )}
                    </div>
                    <div className="varient" id="performance-display-subheader" data-test-id="performance-display-sub">
                        <div style={{ color: +priceDifference >= 0 ? "#448B47" : "#953536" }}>
                            {+priceDifference >= 0 && "+"}
                            {currencyFormatter(+priceDifference)}
                        </div>
                    </div>
                </Header>
            ) : (
                <Skeleton style={{ minHeight: "41px" }} />
            )}

            <Label>
                <div id="label-copy">
                    {t("account-value.title")}
                    <img
                        src={infoBubble}
                        id="label-icon"
                        alt="info-bubble"
                        data-tip="info-bubble"
                        data-background-color={colors.darkBrown}
                        data-text-color={colors.lightGreenBeige}
                        data-effect="solid"
                    />
                </div>

                {!isMobile && (
                    <Options>
                        {ranges.map((range) => (
                            <Option
                                key={range.duration}
                                selected={range.label.toUpperCase() === selectedRange.toUpperCase()}
                                onClick={() => s.cellar.updatePortfolioTotalsRange(range.duration)}
                            >
                                {range.label}
                            </Option>
                        ))}
                    </Options>
                )}
            </Label>

            {_.isEmpty(s.cellar.userPriceHistory) || !config.feature.accountValueGraph.enabled ? (
                <GraphImg src={nullGraph} />
            ) : (
                <GraphContainer>
                    <HydratedValueGraph
                        priceHistory={s.cellar.userPriceHistory}
                        isMobile={isMobile}
                        setSharedTooltipData={setSharedTooltipData}
                        sharedTooltipData={sharedTooltipData}
                        date={date}
                    />
                </GraphContainer>
            )}

            {/* Rendered tooltip when info icon is hovered */}
            <Tooltip className="info-tooltip">{t("account-value.tooltip")}</Tooltip>
            {isMobile && (
                <Options>
                    {ranges.map((range) => (
                        <Option
                            key={range.duration}
                            selected={range.label.toUpperCase() === selectedRange.toUpperCase()}
                            onClick={() => s.cellar.updatePortfolioTotalsRange(range.duration)}
                            blind={
                                !+bottleCount ? "background: transparent !important; color: #A8ABAD !important;" : ""
                            }
                        >
                            {range.label}
                        </Option>
                    ))}
                </Options>
            )}
        </CustomModuleContainer>
    );
});

// selectors
const getDate = (data) => new Date(data.date);
const getPrice = (data) => data.price;

// https://github.com/d3/d3-time-format#locale_format
const format = timeFormat("%b'%y");
const formatDate = (date) => format(date);

const HydratedValueGraph = withParentSize(
    ({
        priceHistory,
        parentHeight: h,
        parentWidth: w,
        margin = { top: 0, right: 0, bottom: 0, left: 0 },
        isMobile,
        setSharedTooltipData,
        date,
    }) => {
        const [coords, setCoords] = React.useState(null);
        const colors = useTheme("colors");

        const { handleTooltip, yMax } = useChartData({
            data: priceHistory,
            width: w,
            height: h,
            margin,
            showTooltip: ({ tooltipData, ...rest }) => {
                setSharedTooltipData(tooltipData);
                setCoords(rest);
            },
        });

        // Based on this @vx demo:
        // https://vx-demo.now.sh/areas

        // bounds
        const widthMax = useMemo(() => w - margin.left - margin.right, [w, margin.left, margin.right]);
        const heightMax = useMemo(() => h - margin.top - margin.bottom, [h, margin.top, margin.bottom]);

        // d3 scales
        const dateScale = useMemo(
            () =>
                scaleTime({
                    range: [0, widthMax],
                    domain: extent(priceHistory, getDate),
                }),
            [widthMax, priceHistory],
        );
        const priceScale = useMemo(
            () =>
                scaleLinear({
                    // really specific to the demo case - not sure what exactly is going on here
                    domain: [0, (max(priceHistory, getPrice) || 0) + heightMax / 3],
                    range: [heightMax, 0],
                    nice: true,
                }),
            [heightMax, priceHistory],
        );

        return (
            <>
                <svg height={h} width={w}>
                    <rect x={0} y={0} width={w} height={h} fill="transparent" rx={10} />
                    <LinearGradient id="chart-fill" from={colors.darkGreen} to={colors.darkGreen} />

                    <AreaClosed
                        curve={curveNatural}
                        data={priceHistory}
                        x={(data) => dateScale(getDate(data))}
                        y={(data) => priceScale(getPrice(data))}
                        yScale={priceScale}
                        strokeWidth={1}
                        stroke="url(#chart-fill)"
                        fill="url(#chart-fill)"
                    />

                    {!isMobile && (
                        <GridColumns
                            top={-25}
                            scale={dateScale}
                            height={heightMax}
                            numTicks={4}
                            strokeDasharray="3,3"
                            stroke={colors.lightPink}
                            strokeOpacity={0.3}
                            pointerEvents="none"
                        />
                    )}

                    <AxisBottom
                        top={heightMax - 30}
                        left={17}
                        hideAxisLine
                        hideTicks
                        hideZero
                        numTicks={4}
                        scale={dateScale}
                        orientation="bottom"
                        tickFormat={formatDate}
                        tickLabelProps={() => ({
                            fill: colors.lightPink,
                            fontSize: 10,
                            textAnchor: "middle",
                            fontFamily: "VinovestMono",
                        })}
                    />
                    {coords && (
                        <g>
                            <Line
                                from={{ x: coords.tooltipLeft, y: coords.tooltipTop }}
                                to={{ x: coords.tooltipLeft, y: yMax - 33 }}
                                stroke="#E6C9C9"
                                strokeWidth={2}
                                style={{ pointerEvents: "none" }}
                            />
                            <circle
                                cx={coords.tooltipLeft}
                                cy={coords.tooltipTop + 1}
                                r={4}
                                fill="black"
                                fillOpacity={0.1}
                                stroke="black"
                                strokeOpacity={0.1}
                                strokeWidth={2}
                                style={{ pointerEvents: "none" }}
                            />
                            <circle
                                cx={coords.tooltipLeft}
                                cy={
                                    coords.tooltipTop < 13
                                        ? coords.tooltipTop + (13 - coords.tooltipTop)
                                        : coords.tooltipTop
                                }
                                r={11}
                                fill="#3C400C"
                                stroke="#E6C9C9"
                                strokeWidth={4}
                                style={{ pointerEvents: "none" }}
                            />
                        </g>
                    )}
                    <Bar
                        x={0}
                        y={0}
                        width={w}
                        height={h}
                        fill="transparent"
                        rx={14}
                        data={priceHistory}
                        onTouchStart={handleTooltip}
                        onTouchMove={handleTooltip}
                        onMouseMove={handleTooltip}
                        onMouseLeave={() => {
                            setSharedTooltipData(null);
                            setCoords(null);
                        }}
                    />
                </svg>
                {coords && (
                    <TooltipWithBounds
                        key={Math.random()}
                        top={coords.tooltipTop - 64}
                        left={coords.tooltipLeft}
                        style={{
                            borderRadius: "20px",
                            boxShadow: "0px 4px 40px rgba(0, 0, 0, 0.1)",
                            padding: "8px 20px",
                            color: "#242E35",
                            fontFamily: "VinovestMono",
                            fontSize: "14px",
                        }}
                    >
                        {date}
                    </TooltipWithBounds>
                )}
            </>
        );
    },
);

const CustomModuleContainer = styled(BaseModuleContainer)`
    height: 391px;
    position: relative;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    .info-tooltip {
        box-shadow: -8px 8px 24px rgba(36, 46, 53, 0.16) !important;
        opacity: 1 !important;
        max-width: 228px !important;
        padding: 18px !important;
        border-radius: 10px !important;
        line-height: 18px !important;
    }
`;

const Header = styled.div`
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;

    #display-hyphen {
        margin: 0 10px;
        ${(p) => p.theme.media.greaterThan("768px")`
            margin: 0 12px;
        `}
    }

    #performance-display-subheader,
    .date {
        font-size: 0.75rem;

        ${(p) => p.theme.media.greaterThan("768px")`
            font-size: 1rem;
        `}
    }

    .title-text {
        ${(p) => p.theme.media.greaterThan("1024px")`
            font-size: 65px;
        `}
    }

    .varient {
        text-align: right;
    }
`;

const Label = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;

    #label-icon {
        width: 15px;
        margin-left: 10px;
        cursor: pointer;
    }
    #label-copy {
        display: flex;
        flex-shrink: 0;
        font-family: ${(p) => p.theme.fonts.label};
        text-transform: uppercase;
        font-size: 12px;

        ${(p) => p.theme.media.greaterThan("768px")`
            font-size: 14px;
        `}

        ${(p) => p.theme.media.greaterThan("1024px")`
            width: 60%
        `}
    }
`;

const GraphImg = styled.img`
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
    right: 0;
`;

const GraphContainer = styled.div`
    display: flex;
    position: absolute;
    width: 100%;
    bottom: 58px;
    left: 0;
    text-transform: uppercase;
    height: 171px;
    width: 100%;

    ${(p) => p.theme.media.greaterThan("1023px")`
        height: 247px;
        bottom: 0;
    `};
`;

const Options = styled.div`
    flex-grow: 1;
    font-family: VinovestMono;
    font-style: normal;
    font-weight: 500;
    font-size: 11px;
    line-height: 16px;
    display: flex;
    height: 58px;
    align-items: center;
    justify-content: space-around;
    letter-spacing: 0.025em;
    text-transform: uppercase;
    color: #242e35;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;

    ${(p) => p.theme.media.greaterThan("1024px")`
        font-size: 14px;
        height: auto;
        justify-content: space-between;
        position: static;
        width: 40%;

    `}
`;

const Option = styled.div`
    ${({ selected }) => (selected ? "background: #242E35; color: #fff;" : "")}
    align-items: center;
    display: flex;
    height: 26px;
    justify-content: center;
    margin-right: 0.9vw;
    min-width: 26px;
    padding: 2px;
    transition: 0.5s;

    ${(p) => p.theme.media.greaterThan("1024px")`
        margin-right: 0;
    `}

    &:last-child {
        margin-right: 0;
    }

    &:hover {
        cursor: pointer;
        background: #242e35;
        color: #fff;
    }

    ${({ blind }) => blind};
`;
