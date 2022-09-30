import React from "react";
import styled from "styled-components";

const WithToolTipWrapper = ({ children, text, toRight, className }) => (
    <ToolTipWrapper toRight={toRight} className={className}>
        {children}

        <div className="toolTipCellar">{text}</div>
    </ToolTipWrapper>
);

const ToolTipWrapper = styled.div`
    position: relative;
    width: fit-content;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    height: 100%;

    .toolTipCellar {
        position: absolute;
        right: -95.5px;
        ${({ toRight }) => (toRight ? "right: -17px;" : "")}
        top: -10px;
        transform: translateX(-50%);
        transform: translateY(-100%);
        opacity: 0;
        width: 0;
        height: 0;
        overflow: hidden;
        border-radius: 10px;
        box-shadow: -8px 8px 24px rgba(36, 46, 53, 0.16);
        background: #513011;
        padding: 16px 11px 11px 21px;
        text-align: left;
        white-space: pre-wrap;
        color: #e0e5cd;
        text-transform: none;
        font-family: VinovestMedium;
        font-size: 11px;
        line-height: 14px;

        &:after {
            content: " ";
            position: absolute;
            display: block;
            bottom: 0;
            left: 50%;
            transform: translate(-50%, 50%) rotate(45deg);
            width: 16px;
            height: 16px;
            background: #513011;
            ${({ toRight }) => (toRight ? "left: 89%" : "")}
        }
    }

    &:hover .toolTipCellar {
        opacity: 1;
        width: 201px;
        height: fit-content;
        z-index: 5;
        overflow: visible;
    }
`;

export default WithToolTipWrapper;
