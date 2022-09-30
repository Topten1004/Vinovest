import React from "react";
import styled from "styled-components";

const FixedWrap = ({ icon, children, className }) => (
    <FixedWrapWrapper className={className}>
        {children}
        <IconWrapper>
            <div className="verticalLine" />
            {icon}
        </IconWrapper>
    </FixedWrapWrapper>
);

export const FixedWrapWrapper = styled.div`
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    max-width: 193px;
    width: 100%;

    position: absolute;

    .verticalLine {
        height: 76px;
        width: 1px;
        background-color: #3c400c;
    }
`;

export const IconWrapper = styled.div`
    margin-top: 14px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: fit-content;
`;

export default FixedWrap;
