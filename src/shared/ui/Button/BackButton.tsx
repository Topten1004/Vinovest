import React from "react";
import styled from "styled-components";

interface BackButtonProps {
    goBack: () => void;
    mobile: number;
    mobileHeight: string;
}
const BackButton: React.FC<BackButtonProps> = ({ goBack, mobile = 1023, mobileHeight }) => (
    <StyledBackButton onClick={goBack} mobile={mobile} mobileHeight={mobileHeight}>
        <svg width="25" height="16" viewBox="0 0 25 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M8 15L1 8M1 8L8 1M1 8H23.5"
                stroke="#242E35"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    </StyledBackButton>
);

const StyledBackButton = styled("button")`
    position: fixed;
    width: 60px;
    height: 60px;
    left: 7.749vw;
    top: 40%;
    border: 2px solid #eeeeee;
    box-sizing: border-box;
    background: transparent;
    outline: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
        cursor: pointer;
    }

    @media screen and (max-width: 1044px) {
        left: 2.749vw;
    }

    @media screen and (max-width: ${({ mobile }) => mobile || 1023}px) {
        position: fixed;
        z-index: 999;
        top: 0;
        height: ${({ mobileHeight }) => (mobileHeight ? `${mobileHeight}px` : "80px")};
        left: 10px;
        background: white;
        border: 0;
    }
`;

export default BackButton;
