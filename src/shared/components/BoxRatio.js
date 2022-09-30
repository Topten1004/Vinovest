import React from "react";
import styled from "styled-components";

const BoxRatio = ({ children, ratio = [16, 9] }) => (
    <Wrapper>
        <BoxRatioWrapper ratio={ratio}>
            <BoxRatioContent>{children}</BoxRatioContent>
        </BoxRatioWrapper>
    </Wrapper>
);

const Wrapper = styled.div`
    height: fit-content;
    width: 100%;
    overflow: hidden;
`;

const BoxRatioWrapper = styled.div`
    height: 0;
    width: 100%;
    padding-bottom: ${({ ratio }) => `calc(100% /  ${ratio[0]} * ${ratio[1]})`};
    background: #fff;
    position: relative;
`;

const BoxRatioContent = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    img {
        width: 100%;
        object-fit: contain;
    }
`;

export default BoxRatio;
