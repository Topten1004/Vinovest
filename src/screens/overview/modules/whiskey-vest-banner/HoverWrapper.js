import React from "react";
import styled from "styled-components";
import { useCountUp } from "react-countup";
import arrowUpSvg from "../assets/arrow.svg";

const data = [{ num: 306 }, { num: 237 }, { num: 28 }, { num: 55 }, { num: 94 }];

const Counter = ({ end, sequenceNumber }) => {
    const { countUp } = useCountUp({
        start: 0,
        end,
        delay: 0,
        duration: 3,
    });

    return (
        <CountWrapper className={`counter_${sequenceNumber}`} width={`${end}`.length <= 2 ? "80px" : ""}>
            <div className="tooltip-top">
                <span>{countUp}%</span>{" "}
                <div className="tooltip-arrow-wrapper">
                    <img className="tooltip-arrow" src={arrowUpSvg} alt="countUp" />
                </div>
            </div>
            <div className={`pointer pointer_${sequenceNumber}`} />
        </CountWrapper>
    );
};

const HoverWrapper = ({ children }) => {
    const [current, setCurrent] = React.useState({ num: 2, pause: false });

    React.useEffect(() => {
        const interval = setInterval(
            () =>
                setCurrent((current) => {
                    if (current.pause) {
                        return current;
                    }
                    return current.num < data.length - 1
                        ? { ...current, num: current.num + 1 }
                        : { ...current, num: 0 };
                }),
            5000,
        );
        return () => clearInterval(interval);
    }, []);

    return (
        <HoverContainer>
            {children}
            {data.map(({ num, year }, i) => (
                <div
                    key={num}
                    className={`bottle bottle${i + 1}`}
                    onMouseOver={() => setCurrent({ num: i, pause: true })}
                    onMouseLeave={() => setCurrent((current) => ({ ...current, pause: false }))}
                >
                    {current.num === i && <Counter end={num} sequenceNumber={i + 1} year={year} />}
                </div>
            ))}
        </HoverContainer>
    );
};

const HoverContainer = styled.div`
    max-width: 100%;
    max-width: fit-content;
    max-height: fit-content;
    margin: 0 0 0 auto;
    position: relative;
    align-self: flex-end;
    animation: WhiskeyAnimation 1.5s linear;

    @keyframes WhiskeyAnimation {
        0% {
            opacity: 0;
        }

        100% {
            opacity: 1;
        }
    }

    .bottle {
        position: absolute;

        &:hover {
            cursor: pointer;
        }
    }
    .bottle1 {
        top: 29%;
        left: 31.5%;
        width: 9%;
        height: 34%;
    }
    .bottle2 {
        top: 34%;
        left: 44.5%;
        width: 7%;
        height: 43%;
    }
    .bottle3 {
        top: 46.5%;
        left: 57%;
        width: 6.5%;
        height: 47%;
    }
    .bottle4 {
        top: 25%;
        left: 66.5%;
        width: 8%;
        height: 39%;
    }
    .bottle5 {
        top: 39.5%;
        left: 77.5%;
        width: 6%;
        height: 46%;
    }

    @media screen and (max-width: 1000px) {
        margin: 0;
        margin-right: 5%;
    }
`;

const CountWrapper = styled.div`
    position: absolute;
    z-index: 2;
    display: flex;
    padding: 10.15px 13.05px;
    flex-direction: column;
    align-items: flex-start;
    background-color: #efddc7;
    min-width: ${({ width }) => width || "95px"};
    top: -80px;
    left: 50%;
    transform: translateX(23%);

    &.counter_5 {
        transform: translateX(-50%);
    }

    .tooltip-top {
        position: relative;
        z-index: 1;
        display: flex;
        width: 100%;
        justify-content: flex-end;
        align-items: center;
        font-family: Roslindaledisplaycondensed, sans-serif;
        font-size: 16px;
        line-height: 16px;
        color: #3a4002;
    }
    .tooltip-arrow-wrapper {
        width: 17.79px;
        height: 17.79px;
        border-radius: 50%;
        display: flex;
        margin-left: 11px;
    }
    .tooltip-arrow {
        display: block;
        width: 100%;
    }

    .pointer {
        width: 2px;
        height: 30px;
        background-color: #efddc7;
        position: absolute;
        transform: translate(0%, 73%) rotate(45deg);
        left: -10px;

        &:after {
            content: " ";
            display: block;
            position: absolute;
            bottom: -9px;
            left: 50%;
            border-radius: 50%;
            border: 2px solid #efddc7;
            background-color: transparent;
            width: 7px;
            height: 7px;
            transform: translate(-50%, 5%);
        }

        &.pointer_5 {
            left: 50%;
            bottom: 0;
            transform: translate(-50%, 73%);
        }
    }
`;

export default HoverWrapper;
