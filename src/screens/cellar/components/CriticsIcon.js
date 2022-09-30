/* eslint-disable max-len */
import React from "react";
import styled from "styled-components";

const colors = {
    green: "#3C400C",
    red: "#4F1C28",
    blue: "#112D47",
    yellow: "#A86D37",
};

const getColor = (i) => {
    const index = i + 1;
    let result;

    if (index % 4 === 0) {
        result = colors.red;
    } else if (index % 3 === 0) {
        result = colors.blue;
    } else if (index % 2 === 0) {
        result = colors.yellow;
    } else result = colors.green;

    return result;
};

const SvgCircle = ({ long, color }) => (
    <SvgHalfCircle viewBox="0 0 130 130">
        <CircleFill cx="65" cy="65" r="47.5" long={300 - long} colorOfLine={color} offset={long} />
    </SvgHalfCircle>
);

const coefficient = 380 / 34;

const CriticsIcon = ({ index, name = "", score }) => {
    const color = getColor(index);
    const upperCaseName = name.toUpperCase().slice(0, 33);
    const long = coefficient * upperCaseName.length + (20 - (coefficient * upperCaseName.length) / 4.8);
    return (
        <IconWrapper>
            <SvgCircle long={name ? long : 0} color={color} />
            <svg className="svgText" viewBox="0 0 70 70" width="100%">
                <path d="M35,35m-23,0a23,23 0 1,1 46,0a23,23 0 1,1 -46,0" fill="transparent" id="tophalf" />
                <Text style={{ fontSize: "7px" }}>
                    <textPath xlinkHref="#tophalf" startOffset="0%" fill={color}>
                        {upperCaseName}
                    </textPath>
                </Text>
            </svg>
            <Score className="svgTextScore" color={color}>
                {score}
            </Score>
        </IconWrapper>
    );
};

const IconWrapper = styled.div`
    border-radius: 50%;
    position: relative;
    width: 100%;
    height: 100%;

    .svgText {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        transform: rotate(45deg);
    }
`;

const CircleFill = styled.circle`
    stroke-dashoffset: -${({ offset }) => offset || 0}px;
    stroke: #f3f7fa;
    stroke: ${({ colorOfLine }) => colorOfLine};
    stroke-width: 4;
    fill: transparent;
    stroke-dasharray: ${({ long }) => long}px 360px;
`;

const SvgHalfCircle = styled.svg`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    transform: rotate(-150deg);
`;

const Text = styled.text`
    font-family: VinovestMono;
    font-style: normal;
    font-weight: 500;
`;

const Score = styled.div`
    padding: 0;
    font-family: RoslindaleDisplayCondensed;
    font-style: normal;
    font-weight: 500;
    font-size: 36px;
    color: ${({ color }) => color};
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    @media screen and (max-width: 1023px) {
        font-size: 20px;
    }
`;

export default CriticsIcon;
