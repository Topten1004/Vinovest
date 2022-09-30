import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import useScrollReveal from "#shared/hooks/useScrollReveal";
import { useMobile } from "#shared/hooks";
import graphDesktop from "../assets/graph.svg";
import graphMobile from "../assets/graphMobile.svg";

const SteadyYieldsGraph = () => {
    const ref = React.useRef();
    const { hasRevealed } = useScrollReveal({ ref });
    const runAnimation = hasRevealed ? "runAnimation" : "";
    const { t } = useTranslation("why-wine");
    const isMobile = useMobile(767);

    return (
        <Container ref={ref} className={runAnimation}>
            <SteadyYieldsGraphContainer>
                <div className="imagesContainer">
                    {isMobile ? (
                        <img className="wineLineBig" src={graphMobile} alt="wine line" />
                    ) : (
                        <img className="wineLineBig" src={graphDesktop} alt="wine line" />
                    )}
                </div>

                <VerticalNumbers>
                    <div>400%</div>
                    <div>300%</div>
                    <div>200%</div>
                    <div>100%</div>
                </VerticalNumbers>
                <HorizontalLineWine className={runAnimation}>
                    <div className={`box ${runAnimation}`}>
                        <div className="box__left">{t("why_wine.steady_yields.label_wine")}</div>
                        <div className="box__right">
                            <div className="percent">304,4%</div>
                            <div className="date">31/10/2021</div>
                        </div>
                    </div>
                    <div className={`line ${runAnimation}`} />
                </HorizontalLineWine>
                <HorizontalLineGei className={runAnimation}>
                    <div className={`box ${runAnimation}`}>
                        <div className="box__left">{t("why_wine.steady_yields.gei")}</div>
                        <div className="box__right">
                            <div className="percent">196,7%</div>
                            <div className="date">31/10/2021</div>
                        </div>
                    </div>
                    <div className={`line ${runAnimation}`} />
                </HorizontalLineGei>
                <Line />
            </SteadyYieldsGraphContainer>{" "}
            <HorizontalNumbers>
                {["2004", "2006", "2008", "2010", "2012", "2014", "2016", "2018", "2020"].map((num) => (
                    <div key={num}>{`JAN ${num}`}</div>
                ))}
            </HorizontalNumbers>
        </Container>
    );
};

const Container = styled.div`
    &.runAnimation {
        animation: bottomFade 2s ease-in-out;
    }

    @keyframes bottomFade {
        0% {
            transform: translateY(20%);
        }

        100% {
            transform: translateY(0%);
        }
    }

    @media screen and (max-width: 991px) {
        margin-top: 168px;
    }
`;
const SteadyYieldsGraphContainer = styled.div`
    position: relative;

    .imagesContainer {
        width: 100%;
    }

    img {
        width: 100%;
        display: block;
    }

    .wineLineBig {
        padding-top: 37px;
    }
`;

const VerticalNumbers = styled.div`
    position: absolute;
    height: 86%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    top: 20px;
    left: 4.09%;
    font-family: VinovestMono, sans-serif;
    color: #3c400c;
    font-size: 18px;
    line-height: 178%;
    div {
        color: #513011;
    }

    @media screen and (max-width: 767px) {
        display: none;
    }
`;

const HorizontalNumbers = styled.div`
    display: flex;
    justify-content: space-around;
    margin-top: -1px;
    width: 100%;
    font-family: VinovestMono, sans-serif;
    color: #242e35;
    font-size: 18px;
    line-height: 160%;
    font-weight: 500;
    color: #e6c9c9;
    background-color: #3c400c;
    position: relative;
    padding: 30px 0 30px 25px;

    @media screen and (max-width: 767px) {
        div {
            display: none;
        }
    }
`;

const HorizontalLineWine = styled.div`
    position: absolute;
    top: 25%;   
    left: 70%;
    right: 0;
    background: green;
    align-items: center;
    display: flex;
    flex-direction: column;

    @media (max-width: 767px) {
        top: 0;
        left: 65%;
    }

    .box {
        width: 178px;
        margin-top: -72px;
        position: absolute;
        left: -90px;
        display: flex;
        border-radius: 8px;
        box-shadow: 0 8px 24px 0 rgb(36 46 53 / 16%);

        @media (max-width: 767px) {
            width: 120px;
            left: -60px;
        }

        &__left {
            display: flex;
            padding: 18px 6px;
            justify-content: center;
            align-items: center;
            background-color: #e6c9c9;
            font-family: VinovestMono, sans-serif;
            color: #fff;
            font-size: 16px;
            text-transform: uppercase;
            line-height: 178%;
            writing-mode: vertical-lr;
            border-top-left-radius: 8px;
            border-bottom-left-radius: 8px;
            @media (max-width: 767px) {
                font-size: 14px;
            }
        }

        &__right {
            display: flex;
            padding: 11px 16px;
            flex-direction: column;
            justify-content: center;
            @media (max-width: 767px) {
                padding: 11px 8px;
            }
            
            .percent {
                font-family: Roslindaledisplaycondensed, sans-serif;
                font-size: 32px;
                @media (max-width: 767px) {
                    font-size: 24px;
                }
            }       
           .date {
                font-family: VinovestMono, sans-serif;
                color: #000;
                font-size: 13px;
                line-height: 185%;
                text-transform: uppercase;
                @media (max-width: 767px) {
                    font-size: 10px;
                }
            }
        }

        &:after {
            content: " ";
            display: block;
            position: absolute;
            left: 50%;
            bottom: 0;
            border-top: 11px solid #fff;
            border-right: 11px solid transparent;
            border-left: 11px solid transparent;
            transform: translate(-50%, 100%);
        }

        &.runAnimation {
            animation: boxAppear 2s linear;
        }

        @keyframes boxAppear {
            0% {
                margin-top: -52px;
                opacity: 0;
            }
            74% {
                margin-top: -52px;
                opacity: 0;
            }
            85% {
                margin-top: -52px;
                opacity: 1;
            }
            100% {
                margin-top: -72px;
            }
        }

        @media screen and (max-width: 430px) {
            right: -35px;
        }
    }

    .line {
        top: 37px;
        left: 0;
        right: 0;
        position: absolute;       
        border-top: 1px dashed #513011;

        &:before {
            content: " ";
            display: block;
            position: absolute;
            left: 0;
            top: 0;           
            bottom: auto;
            width: 11px;
            height: 11px;
            border: 2px solid #513011;
            border-radius: 50%;
            background-color: #fff;
            transform: translate(-50%, -50%);
        }

        &.runAnimation {
            animation: lineGrowth 1s ease-in-out;
        }

        @keyframes lineGrowth {
            0% {
                transform: translateX(100%);
            }
            100% {
                transform: translateX(0);
            }
        }
    }
`;

const HorizontalLineGei = styled.div`
    position: absolute;
    top: 50%;   
    left: 60%;
    right: 0;
    background: green;
    align-items: center;
    display: flex;
    flex-direction: column;
    @media (max-width: 767px) {
        top: 29%;
        left: 25%;
    }

    .box {
        width: 178px;
        margin-top: -72px;
        position: absolute;
        left: -90px;
        display: flex;
        border-radius: 8px;
        box-shadow: 0 8px 24px 0 rgb(36 46 53 / 16%);
        @media (max-width: 767px) {
            width: 120px;
            left: -60px;
        }

        &__left {
            display: flex;
            padding: 18px 6px;
            justify-content: center;
            align-items: center;
            background-color: #3c400c;
            font-family: VinovestMono, sans-serif;
            color: #fff;
            font-size: 18px;
            text-transform: uppercase;
            line-height: 178%;
            writing-mode: vertical-lr;
            border-top-left-radius: 8px;
            border-bottom-left-radius: 8px;
            @media (max-width: 767px) {
                font-size: 14px;
            }
        }

        &__right {
            display: flex;
            padding: 11px 16px;
            flex-direction: column;
            justify-content: center;
            @media (max-width: 767px) {
                padding: 11px 8px;
            }
            
            .percent {
                font-family: Roslindaledisplaycondensed, sans-serif;
                font-size: 32px;
                @media (max-width: 767px) {
                    font-size: 24px;
                }
            }       
           .date {
                font-family: VinovestMono, sans-serif;
                color: #000;
                font-size: 13px;
                line-height: 185%;
                text-transform: uppercase;
                @media (max-width: 767px) {
                    font-size: 10px;
                }
            }
        }

        &:after {
            content: " ";
            display: block;
            position: absolute;
            left: 50%;
            bottom: 0;
            border-top: 11px solid #fff;
            border-right: 11px solid transparent;
            border-left: 11px solid transparent;
            transform: translate(-50%, 100%);
        }

        &.runAnimation {
            animation: boxAppear 2s linear;
        }

        @keyframes boxAppear {
            0% {
                margin-top: -52px;
                opacity: 0;
            }
            74% {
                margin-top: -52px;
                opacity: 0;
            }
            85% {
                margin-top: -52px;
                opacity: 1;
            }
            100% {
                margin-top: -72px;
            }
        }

        @media screen and (max-width: 430px) {
            right: -35px;

            
        }
    }

    .line {
        top: 37px;
        left: 0;
        right: 0;
        position: absolute;       
        border-top: 1px dashed #513011;

        &:before {
            content: " ";
            display: block;
            position: absolute;
            left: 0;
            top: 0;           
            bottom: auto;
            width: 11px;
            height: 11px;
            border: 2px solid #513011;
            border-radius: 50%;
            background-color: #fff;
            transform: translate(-50%, -50%);
        }

        &.runAnimation {
            animation: lineGrowth 1s ease-in-out;
        }

        @keyframes lineGrowth {
            0% {
                transform: translateX(100%);
            }
            100% {
                transform: translateX(0);
            }
        }
    }
`;
const Line = styled.div`    
    position: absolute;
    bottom: 7%;
    left: 0;
    right: 0;
    z-index: 8;   
    height: 1px;
    border-top: 1px dashed #e6c9c9;
    @media screen and (max-width: 767px) {
        display: none;
    }
`

export default SteadyYieldsGraph;
