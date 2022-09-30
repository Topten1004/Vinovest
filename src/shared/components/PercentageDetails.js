import React from "react";
import styled from "styled-components";

const PercentageDetails = ({ amount, percents, styles, positive }) => (
    <Percentage negative={!positive} styles={styles}>
        {positive ? "+" : ""}
        {amount} ({percents}%)
    </Percentage>
);

const Percentage = styled.div`
    font-family: VinovestMedium;
    font-style: normal;
    font-weight: 500;
    font-size: 11px;
    line-height: 21px;
    letter-spacing: 0.005em;
    color: ${(p) => (p.negative ? p.theme.colors.darkRed : p.theme.colors.lighterGreen)};
    ${({ styles }) => styles}
`;

export default PercentageDetails;
