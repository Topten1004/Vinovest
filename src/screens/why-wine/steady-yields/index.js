import React from "react";

import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { TopDescription, TopTitle, Description } from "#shared/ui/Typography/styled";
import { FadeFromBottomWithDelay } from "#shared/ui/Animations";
import useScrollReveal from "#shared/hooks/useScrollReveal";
import SteadyYieldsGraph from "./Graph";

const SteadyYields = () => {
    const ref = React.useRef();
    const { hasRevealed } = useScrollReveal({ ref });
    const runAnimation = hasRevealed ? "runAnimation" : "";
    const { t } = useTranslation("why-wine");

    return (
        <SteadyYieldsContainer>
            <div ref={ref}>
                <TopDescription>{t("why_wine.steady_yields.top_description")}</TopDescription>
                <TopTitle className={runAnimation}>{t("why_wine.steady_yields.title")}</TopTitle>
                <Description className={runAnimation}>{t("why_wine.steady_yields.description")}</Description>
                <GraphOptionsContainer>
                    <div className={`option option--selected ${runAnimation}`}>
                        <span className="option__text">{t("why_wine.steady_yields.graph_text")}</span>
                    </div>
                    <div className={`option ${runAnimation}`}>
                        <span className="option__text">{t("why_wine.steady_yields.global_index")}</span>
                    </div>
                </GraphOptionsContainer>
            </div>
            <SteadyYieldsGraph />
        </SteadyYieldsContainer>
    );
};

export const SteadyYieldsContainer = styled.div`
    width: 100%;
    padding-top: 139px;
    color: #242e35;
    text-align: center;
    
    @media screen and (max-width: 767px) {
        padding-top: 87px;
    }

    ${TopDescription},
    ${TopTitle},
    ${Description} {
        margin-left: auto;
        margin-right: auto;
        padding: 0 20px 0;
    }

    ${TopDescription} {
        margin-bottom: 24px;
    }

    ${TopTitle} {
        &.runAnimation {
            animation: fadeFromBottom 0.5s ease-out;
        }
    }

    ${Description} {
        margin: 40px auto 40px;

        &.runAnimation {
            animation: fadeFromBottom 0.8s ease-out;
        }

        @media screen and (max-width: 479px) {
            display: none;
        }
    }
`;

const GraphOptionsContainer = styled.div`
    margin: 0 auto;
    width: fit-content;
    display: grid;
    grid-auto-columns: 1fr;
    grid-column-gap: 56px;
    grid-row-gap: 16px;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto;
    padding: 0 20px 0;

    @media screen and (max-width: 479px) {
        display: flex;
        width: 100%;
        margin-top: 64px;
        justify-content: space-between;
        justify-items: start;
        flex-wrap: wrap;
        grid-column-gap: 0px;
        grid-template-columns: 1fr auto;
    }

    .option {
        display: flex;
        padding: 24px;
        align-items: center;

        &__text {
            display: block;
            flex-grow: 1;
            margin-right: 37px;
            font-family: Roslindaledisplaycondensed, sans-serif;
            font-size: 30px;
            line-height: 150%;
            font-weight: 500;

            @media screen and (max-width: 767px) {
                margin-right: 0;
                font-size: 18px;
                line-height: 167%;
            }
        }

        

        &:before {
            content: " ";
            display: block;
            width: 24px;
            height: 24px;
            margin-right: 16px;
            border-radius: 50%;
            background-color: #3c400c;

            @media screen and (max-width: 767px) {
                width: 16px;
                height: 16px;
                flex: 0 0 auto;
            }
        }
        &.runAnimation {
            animation: fadeFromBottom 0.6s linear;
        }

        &--selected {
            &.runAnimation {
                animation: ${FadeFromBottomWithDelay} 1s linear;
            }
            max-width: 200px;
            max-height: 96px;
            border-radius: 110px;
            margin-left: auto;
            box-shadow: 0 8px 24px 0 rgb(36 46 53 / 16%);

            &:before {
                background-color: #e6c9c9;
            }
            @media (max-width: 767px) {
                margin-left: 0;
                max-height: 64px;
                align-self: center;
            }
        }

        @keyframes fadeFromBottom {
            0% {
                opacity: 0;
                transform: translateY(50%);
            }

            100% {
                opacity: 1;
                transform: translateY(0%);
            }
        }
    }
`;

export default SteadyYields;
