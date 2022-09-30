import React from "react";
import styled from "styled-components";
import MarkSvg from "#assets/shared/MarkSvg";
import { useTranslation } from "react-i18next";

const Option = ({ value, text, setSelected, selected, border }) => {
    const { t } = useTranslation(["liquidation"]);
    return (
        <OptionLabel className={selected === value ? "selected" : ""} border={border}>
            {text}
            <Mark>{selected === value && <MarkSvg />}</Mark>
            <input onChange={() => setSelected(value)} type="checkbox" checked={selected === value} />
        </OptionLabel>
    );
};

export const OptionLabel = styled.label`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 620px;
    width: 100%;
    min-height: 50px;
    background: #ffffff;
    border: 1px solid #a8abad;
    border-bottom: 0;
    ${({ border }) => (border ? "border: 1px solid #a8abad;" : "")}
    box-sizing: border-box;
    box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.15);
    align-items: center;
    padding: 0 20px 0 30px;
    color: #242e35;
    font-family: VinovestMedium;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 26px;

    input[type="checkbox"] {
        opacity: 0;
        position: absolute;
    }

    &.selected {
        background: #242e35;
        border: 1px solid #242e35;
        box-sizing: border-box;
        color: #fae8d1;
    }

    &:hover {
        cursor: pointer;
    }

    @media screen and (max-width: 1024px) {
        padding: 14px 15px;
        line-height: 26px;
    }
`;

const Mark = styled.label`
    width: 15px;
    flex-shrink: 0;
`;

export default Option;
