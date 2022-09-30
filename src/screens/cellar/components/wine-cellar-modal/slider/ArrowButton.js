import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const Arrow = ({ onClick, className, reverse, fetchData, disabled }) => {
    const { t } = useTranslation(["portfolio"]);

    const classes = ["arrow"];
    if (className) {
        classes.push(className);
    }
    return (
        <>
            <ButtonWrapper onClick={onClick} className={classes.join(" ")} reverse={reverse} disabled={disabled}>
                {fetchData ? (
                    <LoadMore>
                        {t("buttons.arrow-first")} <br /> {t("buttons.arrow-second")}
                    </LoadMore>
                ) : (
                    <svg width="28" height="18" viewBox="0 0 28 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M27.269 9.00012L2.29337 9.00012" stroke="#242E35" strokeWidth="2" />
                        <path d="M9.31776 16.8051L1.51288 9.00018L9.31776 1.1953" stroke="#242E35" strokeWidth="2" />
                    </svg>
                )}
            </ButtonWrapper>
        </>
    );
};

const leftArrowStyles = `
    left: -50px;    
    transform: translateX(-100%);

    &:before {
        display: none;
    }

    @media screen and (max-width: 1138px) {
        left: 0px;
        transform: translateX(-25%);
    }

    @media screen and (max-width: 1023px) {
        left: 0px;
        transform: translateX(1%);
    }
`;

const rightArrowStyles = `
    right: -50px;
    transform: translateX(100%);

    &:before {
        display: none;
    }
    svg {
        transform: rotate(180deg);
    }

    @media screen and (max-width: 1138px) {
        right: 0px;
        transform: translateX(25%);
    }

    @media screen and (max-width: 1023px) {
        right: 0px;
        transform: translateX(-1%);
    }
`;

const ButtonWrapper = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 64px;
    height: 64px;
    background-color: #fff;
    border-radius: 50%;
    border: 0;
    outline: 0;
    transform: translateX(-50%);
    position: absolute;
    top: 50vh;
    transform: translateY(-50%);
    transition: 1s;
    filter: drop-shadow(0px 4px 24px rgba(0, 0, 0, 0.15));

    &:hover {
        cursor: pointer;
    }

    &:disabled {
        cursor: default;
        opacity: 0.3;
    }

    ${(p) => (p.reverse ? leftArrowStyles : rightArrowStyles)}
`;

const LoadMore = styled.div`
    font-family: VinovestMono;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    letter-spacing: 0.025em;
    text-transform: uppercase;
    color: #242e35;
`;

export default Arrow;
