import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useCountUp } from "react-countup";
import arrowUpSvg from "../assets/arrowVector.svg";

const data = [
    { num: 67, year: "2015" },
    { num: 156, year: "2010" },
    { num: 143, year: "2009" },
    { num: 89, year: "2010" },
    { num: 533, year: "2000" },
];

const Counter = ({ end, sequenceNumber, year }) => {
    const { t } = useTranslation("vinovest-home");

    const { countUp } = useCountUp({
        start: 0,
        end,
        delay: 0,
        duration: 3,
    });

    return (
        <CountWrapper className={`counter_${sequenceNumber}`}>
            <div className="tooltip-top">
                <span>{countUp}%</span>{" "}
                <div className="tooltip-arrow-wrapper">
                    <img className="tooltip-arrow" src={arrowUpSvg} alt="countUp" />
                </div>
            </div>
            <div className="tooltip-release">{t("hero.toolRelease")} {year}</div>
            <div className={`pointer pointer_${sequenceNumber}`} />
        </CountWrapper>
    );
};

const HoverWrapper = ({ children, runAnimation }) => {
    const [current, setCurrent] = React.useState({ num: 0, pause: false });
    const [delay, setDelay] = React.useState(true);

    React.useEffect(() => {
        if (!delay) {
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
        }
    }, [delay]);

    React.useEffect(() => {
        const interval = setTimeout(() => {
            setDelay(false);
        }, 2000);
        return () => clearTimeout(interval);
    }, []);

    return (
        <HoverContainer>
            {children}
            {!delay &&
                data.map(({ num, year }, i) => (
                    <div
                        key={num}
                        className={`bottle bottle${i + 1} ${runAnimation ? "runAnimation" : ""}`}
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
    width: 100%;
    height: 100%;
    max-width: fit-content;
    max-height: fit-content;
    margin: 0 auto;
    position: relative;

    @media screen and (max-width: 767px) {
        width: 576px;
    }

    .bottle {
        position: absolute;

        &:hover {
            cursor: pointer;
        }

        &.runAnimation {
            animation: countWrapperAnimation 2s linear;
        }

        @keyframes countWrapperAnimation {
            0% {
                opacity: 0;
            }

            66% {
                opacity: 0;
            }

            100% {
                opacity: 1;
            }
        }
    }

    .bottle1 {
        top: 77%;
        left: 29.5%;
        width: 20.5%;
        height: 12%;
    }
    .bottle2 {
        top: 22%;
        left: 43%;
        width: 5.5%;
        height: 40%;
    }
    .bottle3 {
        top: 40.5%;
        left: 55.5%;
        width: 8.5%;
        height: 47%;
    }

    .bottle4 {
        top: 33.5%;
        left: 64.5%;
        width: 6.5%;
        height: 44%;
    }
    .bottle5 {
        top: 55.5%;
        left: 71%;
        width: 20.5%;
        height: 10%;
    }
`;

const CountWrapper = styled.div`
    position: absolute;
    z-index: 2;
    display: flex;
    padding: 8px 16px 10px;
    flex-direction: column;
    align-items: flex-start;
    background-color: #242e35;
    color: #efddc7;
    min-width: 112px;

    &.counter_1 {
        top: -100px;
        transform: translateY(-100%);
    }

    &.counter_2 {
        top: 0;
        right: -60px;
        transform: translateX(100%);
    }

    &.counter_3,
    &.counter_4 {
        top: -164px;
        right: 4px;
        transform: translateX(100%);
    }
    &.counter_4 {
        right: -6px;
    }
    &.counter_5 {
        top: -60px;
        left: -10px;
        transform: translateY(-100%);
    }

    @media screen and (max-width: 992px) {
        &.counter_3 {
            top: -125px;
            right: -24px;
        }

        &.counter_4 {
            top: auto;
            left: 50%;
            bottom: 106px;
            transform: translate(-50%, -100%);
        }

        &.counter_5 {
            left: -102px;
        }
    }

    .tooltip-top {
        position: relative;
        z-index: 1;
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;
        font-family: Roslindaledisplaycondensed, sans-serif;
        font-size: 24px;
        line-height: 167%;
    }

    .tooltip-arrow-wrapper {
        width: 20px;
        height: 20px;
        background-color: #efddc7;
        border-radius: 50%;
        display: flex;
        margin-right: 10px;
    }

    .tooltip-arrow {
        flex-shrink: 0;
        width: 11px;
        height: 8px;
        margin: auto;
    }

    .tooltip-release {
        font-size: 10px;
        line-height: 200%;
        text-transform: uppercase;
        position: relative;
        z-index: 1;
        white-space: nowrap;
    }

    .pointer {
        width: 2px;
        height: 80px;
        background-color: #242e35;
        position: absolute;

        &:after {
            content: " ";
            display: block;
            position: absolute;
            bottom: 0px;
            left: 50%;
            border-radius: 50%;
            border: 2px solid #242e35;
            background-color: #efddc7;
            width: 5px;
            height: 5px;
            transform: translate(-50%, 5%);
        }

        &_1 {
            bottom: 0;
            left: 30px;
            transform: translateY(100%);
        }

        &_2 {
            top: 50%;
            transform: translate(-74%, -50%) rotate(90deg);
            left: -15px;
        }

        &_3,
        &_4 {
            height: 97px;
            transform: translate(0%, 36%) rotate(45deg);
            left: -15px;
        }

        &_5 {
            bottom: -95px;
            transform: translate(-74%, -50%) rotate(-45deg);
            right: -18px;
        }

        @media screen and (max-width: 992px) {
            &_3 {
                height: 82px;
                transform: translate(0%, 51%) rotate(45deg);
            }

            &_4 {
                height: 67px;
                left: 50%;
                transform: translate(0%, 51%) rotate(0);
            }
        }
    }
`;
export default HoverWrapper;
