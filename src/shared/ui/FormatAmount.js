import React from "react";
import { currencyFormatter } from "#utils/shared";

const FormatAmount = ({ colors = [], amount }) => (
    <span style={{ color: +amount >= 0 ? colors[0] || "#448B47" : colors[1] || "#953536" }}>
        {+amount >= 0 && "+"}
        {amount ? currencyFormatter(+amount / 100) : "-"}
    </span>
);

export default FormatAmount;
