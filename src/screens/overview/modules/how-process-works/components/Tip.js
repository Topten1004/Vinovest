import React from "react";
import styled from "styled-components";

import FixedList, { FixedListWrapper } from "./FixedList";

const Tip = ({ list, text, className, notAbsolute, toLeft }) => (
    <TipWrapper className={className} notAbsolute={notAbsolute ? 1 : 0} toLeft={toLeft ? 1 : 0}>
        <FixedList list={list} text={text} />
        <div className="arrowBottomWrapper">
            <div className="arrowBottom" />
        </div>
    </TipWrapper>
);

const toLeftArrowStyles = `
    bottom: auto;
    top: 20px;
    left: 0px;
    transform: translateX(-50%);

    .arrowBottom {
        border-left: 1px solid #e0e5cd;
        border-right: 0;
    }
`;

export const TipWrapper = styled.div`
    position: ${({ notAbsolute }) => (notAbsolute ? "relative" : "absolute")};
    max-width: 206px;
    padding: 15px 20px;
    box-sizing: border-box;
    border: 1px solid #e0e5cd;
    box-sizing: border-box;
    border-radius: 6px;
    background-color: #fff;

    .arrowBottomWrapper {
        width: fit-content;
        position: absolute;
        bottom: -1px;
        left: 50%;
        transform: translate(-50%, 50%);

        .arrowBottom {
            width: 17px;
            height: 17px;
            border-bottom: 1px solid #e0e5cd;
            border-right: 1px solid #e0e5cd;
            transform: rotate(45deg);
            background-color: #fff;
        }

        ${({ toLeft }) => toLeft && toLeftArrowStyles}
    }

    ${FixedListWrapper} {
        font-size: 12px;
        line-height: 19px;
        color: #3c400c;
        z-index: 1;
        position: relative;
    }
`;

export default Tip;
