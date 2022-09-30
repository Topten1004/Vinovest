import React, { useEffect } from "react";

import { useTheme } from "#shared/hooks";
import { LinearGradient } from "@vx/gradient";

import { Group } from "@vx/group";
import { AxisBottom } from "@vx/axis";
import { AreaClosed, Bar, Line } from "@vx/shape";
import { curveNatural } from "@vx/curve";
import { withParentSize } from "@vx/responsive";
import { extent } from "d3-array";

import { scaleTime } from "@vx/scale";
import { withTooltip } from "@vx/tooltip";

import noop from "lodash/noop";
import useChartData from "#screens/overview/modules/PortfolioChart/useChartData";
import { formatDate } from "#screens/overview/modules/PortfolioChart/utils";
import { timeFormat } from "d3-time-format";

export const formatDateBottom = timeFormat("%b ' %y");
export const formatDateBottomByDay = timeFormat("%b %d");

const defaultMargin = { top: 40, right: 0, bottom: 0, left: 0 };

const GraphicalPriceHistory = ({
    margin = defaultMargin,
    showTooltip,
    hideTooltip,
    tooltipData,
    tooltipTop,
    tooltipLeft,
    stock,
    tooltipOpen,
    onChange,
    parentWidth: w,
    parentHeight: h,
    setSharedTooltipData,
    showTickFormat,
    rangeByMonths,
}) => {
    const colors = useTheme("colors");

    const { yScale, yMax, xScale, xStock, yStock, handleTooltip } = useChartData({
        data: stock,
        width: w,
        height: h,
        margin,
        showTooltip,
    });

    useEffect(() => {
        if (!tooltipOpen) {
            onChange({ yData: null });
            return;
        }

        onChange({
            yData: yStock(tooltipData),
            xData: formatDate(xStock(tooltipData)),
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tooltipOpen, tooltipData]);

    useEffect(() => {
        setSharedTooltipData && setSharedTooltipData(tooltipData);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tooltipData]);

    if (!stock.length) return null;
    if (w < 10) return null;

    const widthMax = w - margin.left - margin.right;
    const heightMax = h - margin.top - margin.bottom;

    const getDate = (data) => new Date(data.date);

    const dateScale = scaleTime({
        range: [0, widthMax],
        domain: extent(stock, getDate),
    });
    useEffect(() => {
        const items = document.querySelectorAll(".vx-axis-tick");
        for (let i = 0; i < items.length; i++) {
            const item = items[i].getElementsByTagName("tspan")[0];
            const x = +item.getAttribute("x");
            if (x >= w - 56) {
                item.setAttribute("x", x - 35);
            }
            if (x <= 0) {
                item.setAttribute("x", x + 35);
            }
        }
    }, []);

    return (
        <svg height={h} width={w} className="class">
            <rect x={0} y={0} height={h} width={w} fill="#ffffff" rx={14} />
            <defs>
                <LinearGradient bottom="0" from="#3C400C" to="#3C400C" id="gradient" />
            </defs>
            <Group>
                <AreaClosed
                    data={stock}
                    x={(d) => xScale(xStock(d))}
                    y={(d) => yScale(yStock(d))}
                    yScale={yScale}
                    strokeWidth={2}
                    stroke="url(#gradient)"
                    fill="url(#gradient)"
                    curve={curveNatural}
                />
                <Bar
                    x={0}
                    y={0}
                    width={w}
                    height={h}
                    fill="transparent"
                    rx={14}
                    data={stock}
                    onTouchStart={handleTooltip}
                    onTouchMove={handleTooltip}
                    onMouseMove={handleTooltip}
                    onMouseLeave={hideTooltip}
                />

                {tooltipData && setSharedTooltipData && (
                    <g>
                        <Line
                            from={{ x: tooltipLeft, y: tooltipTop }}
                            to={{ x: tooltipLeft, y: yMax - 33 }}
                            stroke="#E6C9C9"
                            strokeWidth={2}
                            style={{ pointerEvents: "none" }}
                        />
                        <circle
                            cx={tooltipLeft}
                            cy={tooltipTop + 1}
                            r={4}
                            fill="black"
                            fillOpacity={0.1}
                            stroke="black"
                            strokeOpacity={0.1}
                            strokeWidth={2}
                            style={{ pointerEvents: "none" }}
                        />
                        <circle
                            cx={tooltipLeft}
                            cy={tooltipTop < 13 ? tooltipTop + (13 - tooltipTop) : tooltipTop}
                            r={11}
                            fill="#3C400C"
                            stroke="#E6C9C9"
                            strokeWidth={4}
                            style={{ pointerEvents: "none" }}
                        />
                    </g>
                )}
            </Group>
            {showTickFormat && (
                <AxisBottom
                    top={heightMax - 33}
                    hideAxisLine
                    hideTicks
                    hideZero
                    numTicks={5}
                    scale={dateScale}
                    orientation="bottom"
                    tickFormat={rangeByMonths ? formatDateBottom : formatDateBottomByDay}
                    tickLabelProps={() => ({
                        fill: colors.lightPink,
                        lineHeight: "21px",
                        fontSize: 11,
                        textAnchor: "middle",
                        fontFamily: "VinovestMono",
                        letterSpacing: "0.025em",
                    })}
                />
            )}
        </svg>
    );
};

GraphicalPriceHistory.defaultProps = {
    onChange: noop,
};

export default withTooltip(withParentSize(GraphicalPriceHistory));
