import PropTypes from "prop-types";
import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useTheme } from "#shared/hooks";
import { Tooltip as StyledTooltip } from "./components/styled";
import moment from "moment";
import get from "lodash/get";
import { useTranslation } from "react-i18next";

const DATE_PATTERN = "MMM YYYY";

const getDate = (date) => moment(new Date(date)).format(DATE_PATTERN);

const mockData = [
    {
        date: getDate("2017-09-03"),
        currentWine: 4000,
        benchmark: 3000,
    },
    {
        date: getDate("2018-09-03"),
        currentWine: 4020,
        benchmark: 1000,
    },
    {
        date: getDate("2019-09-03"),
        currentWine: 4500,
        benchmark: 3800,
    },
    {
        date: getDate("2016-09-03"),
        currentWine: 2000,
        benchmark: 1500,
    },
    {
        date: getDate("2015-09-03"),
        currentWine: 4200,
        benchmark: 1000,
    },
    {
        date: getDate("2014-09-03"),
        currentWine: 3000,
        benchmark: 2000,
    },
];

const CustomTooltip = ({ active, payload }) => {
    const { t } = useTranslation(["chart"]);
    const data = get(payload, ["0", "payload"]);
    const key = get(payload, ["0", "dataKey"]);
    if (active && data) {
        const { date } = data;
        const price = data[key];

        return (
            <StyledTooltip>
                <span className="date">{date}</span>
                <p className="price">
                    Average price:
                    <strong>${price.toLocaleString()}</strong>
                </p>
            </StyledTooltip>
        );
    }

    return null;
};

const AxisTick = (props) => {
    const { x, y, payload } = props;
    const date = moment(payload.value, DATE_PATTERN);
    return (
        <g transform={`translate(${x},${y})`} height={150}>
            <text x="0" y="0" height={120} fill="#828282" textAnchor="middle">
                <tspan x="0" dy="1.2em" fontSize={12}>
                    {date.format("DD MMM")}
                </tspan>
                <tspan x="0" dy="1.2em" fontSize={10}>
                    {date.format("YYYY")}
                </tspan>
            </text>
        </g>
    );
};

const YAxisTick = (props) => {
    const { x, y, payload } = props;
    return (
        <g transform={`translate(${x},${y})`} height={150}>
            <text x="-15" y="0" height={120} fill="#828282" fontWeight={500} fontSize={12} textAnchor="middle">
                {payload.value.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                    maximumSignificantDigits: 1,
                })}
            </text>
        </g>
    );
};
/**
 *
 * @returns {*}
 * @constructor
 */
const Chart = ({ showBenchmark, data = mockData }) => {
    const color = useTheme("colors");
    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart width="100%" height={300} data={data}>
                <CartesianGrid stroke="#BDBDBD" horizontal={false} strokeDasharray="0" />
                <XAxis
                    stroke="#F1F1F1"
                    dataKey="date"
                    tick={AxisTick}
                    tickFormatter={(time) => {
                        return moment(time, DATE_PATTERN).format("DD ".concat(DATE_PATTERN));
                    }}
                />
                <YAxis stroke="#F1F1F1" tick={YAxisTick} />
                <Tooltip content={<CustomTooltip />} />
                <Line
                    type="monotone"
                    dataKey="currentWine"
                    dot={false}
                    stroke={color.green}
                    activeDot={{ stroke: color.black, fill: color.green, strokeWidth: 4, r: 10 }}
                />
                {showBenchmark && (
                    <Line type="monotone" dataKey="benchmark" activeDot={false} dot={false} stroke="#BDBDBD" />
                )}
            </LineChart>
        </ResponsiveContainer>
    );
};

Chart.defaultProps = {
    data: mockData,
    showBenchmark: true,
};

Chart.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    showBenchmark: PropTypes.bool,
};

export default Chart;
