import React from "react";
import styled from "styled-components";
import { animated } from "react-spring";

const MonthReturn = ({ percentReturn, returnText, cursor, onClick = () => {}, style }) => (
    <HeroMonthReturnWrapper style={{ ...style, ...cursor }} onClick={onClick}>
        <div className="arrow" />
        <div className="heroPercents">
            <div className="heroPercentsNum">
                {+percentReturn >= 0 && "+"}
                {percentReturn}%
            </div>
            <div className="heroPercentsCircle">
                <svg width="14" height="10" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.00006 8L7.00006 2L13.0001 8" stroke="#242E35" strokeWidth="2" />
                </svg>
            </div>
        </div>
        <div className="heroMonthReturn">{returnText}</div>
    </HeroMonthReturnWrapper>
);

const HeroMonthReturnWrapper = styled(animated.div)`
    position: absolute;
    right: -82px;
    top: 52px;
    min-width: 150px;
    padding: 9px 19px 11px 21px;
    background: #242e35;
    color: #efddc7;
    filter: drop-shadow(0px 4px 20px rgba(0, 0, 0, 0.4));

    .arrow {
        background: #242e35;
        height: 100px;
        width: 2px;
        position: absolute;
        left: 0;
        position: absolute;
        right: 0;
        bottom: -100%;
        transform: rotate(-135deg) translate(24px, -24px);
    }
    .heroPercents {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .heroPercentsNum {
        font-family: RoslindaleDisplayCondensed;
        font-style: normal;
        font-weight: 500;
        font-size: 32px;
        line-height: 48px;
        color: #efddc7;
    }
    .heroPercentsCircle {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        background: #efddc7;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 6.37px;
    }
    .heroMonthReturn {
        white-space: nowrap;
        font-family: VinovestMono;
        font-style: normal;
        font-weight: 500;
        font-size: 11px;
        line-height: 16px;
        min-height: 16px;
        letter-spacing: 0.025em;
        text-transform: uppercase;
        color: #efddc7;
    }
    @media screen and (max-width: 767px) {
        right: -51px;
        top: 36px;
        min-width: 115px;
        padding: 11px 7px 8.39px 12px;
        .arrow {
            height: 22.63px;
            width: 2px;
            left: 0;
            right: 0;
            bottom: -15%;
            transform: rotate(-135deg) translate(0px, -10px);
            &:after {
                content: "";
                position: absolute;
                top: -8px;
                left: -3px;
                width: 5px;
                height: 5px;
                background: #fae8d1;
                border: 2px solid #242e35;
                border-radius: 50%;
            }
        }
        .heroPercentsNum {
            font-size: 26px;
            line-height: 35px;
        }
        .heroPercentsCircle {
            width: 24.84px;
            height: 24.84px;
        }
        .heroMonthReturn {
            font-size: 9px;
            line-height: 13px;
            min-height: 13px;
        }
    }
    @media screen and (min-width: 768px) and (max-width: 1024px) {
        right: -3px;
        top: 12px;
        min-width: 115px;
        padding: 11px 7px 8.39px 12px;
        .arrow {
            height: 58px;
            bottom: -76%;
            transform: rotate(-135deg) translate(18px, -4px);
            &:after {
                content: "";
                position: absolute;
                top: -8px;
                left: -3px;
                width: 5px;
                height: 5px;
                background: #fae8d1;
                border: 2px solid #242e35;
                border-radius: 50%;
            }
        }
        .heroPercentsNum {
            font-size: 26px;
            line-height: 38px;
        }
        .heroPercentsCircle {
            width: 24.84px;
            height: 24.84px;
        }
        .heroMonthReturn {
            font-size: 9px;
            line-height: 13px;
            min-height: 13px;
        }
    }
    @media screen and (max-width: 360px) {
        right: -35px;
        .arrow {
            height: 10px;
            bottom: -5%;
            transform: rotate(-135deg) translate(0px, -5px);
        }
    }
`;

export default MonthReturn;
