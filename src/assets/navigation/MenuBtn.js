import React from "react";
import styled from "styled-components";

const MenuBtn = ({ colorClassName }) => (
    <MenuBtnSvg
        width="32"
        height="22"
        viewBox="0 0 32 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={colorClassName}
    >
        <line y1="1" x2="32" y2="1" strokeWidth="2" />
        <line y1="11" x2="32" y2="11" strokeWidth="2" />
        <line y1="21" x2="32" y2="21" strokeWidth="2" />
    </MenuBtnSvg>
);

const MenuBtnSvg = styled.svg`
    background-color: transparent !important;

    &.light {
        line {
            stroke: #242e35;
        }
    }

    &.green {
        line {
            stroke: #513011;
        }
    }

    &.blue {
        line {
            stroke: #3c400c;
        }
    }

    &.darkBlue {
        line {
            stroke: #efddc7;
        }
    }
`;

export default MenuBtn;
