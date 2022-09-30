import { useMemo } from "react";
import { scaleLinear, scaleTime } from "@vx/scale";
import { localPoint } from "@vx/event";
import get from "lodash/get";
import { bisector } from "d3-array";

const min = (arr, fn) => Math.min(...arr.map(fn));
const max = (arr, fn) => Math.max(...arr.map(fn));
const extent = (arr, fn) => [min(arr, fn), max(arr, fn)];

// accessors
const xStock = (d) => new Date(d.date);
const yStock = (d) => d.price;
const bisectDate = bisector((d) => new Date(d.date)).left;

const useChartData = ({ data, width, height, margin, showTooltip }) => {
    const xMax = width - margin.left - margin.right;
    const yMax = height - margin.top - margin.bottom;

    const xScale = scaleTime({
        range: [0, xMax],
        domain: extent(data, xStock),
    });
    const yScale = scaleLinear({
        range: [yMax, 0],
        domain: [0, max(data, yStock) + yMax / 3],
        nice: true,
    });

    const handleTooltip = (event) => {
        const { x } = localPoint(event);
        const x0 = xScale.invert(x);
        const index = bisectDate(data, x0, 1);
        const d0 = data[index - 1];
        const d1 = data[index];
        let d = d0;
        if (d1 && d1.date) {
            d = x0 - xStock(d0.date) > xStock(d1.date) - x0 ? d1 : d0;
        }
        showTooltip({
            tooltipData: d,
            tooltipLeft: x,
            tooltipTop: yScale(get(d, "price")),
        });
    };

    return useMemo(
        () => ({
            yMax,
            xMax,
            yScale,
            handleTooltip,
            xScale,
            yStock,
            xStock,
        }),
        [yMax, xMax, width, height],
    );
};

export default useChartData;
