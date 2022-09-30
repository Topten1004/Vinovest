import styled from "styled-components";

export const LogoRow = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`;

export const LogoContainer = styled.div`
    height: 64px;
    ${(p) => p.theme.media.greaterThan("768px")`
        height: 104px;
    `}

    ${(p) => p.theme.media.greaterThan("1184px")`
        width: ${p.isSplitPane ? "fit-content" : "1184px"};
        display: flex;
        justify-content: flex-start;
    `}
`;
