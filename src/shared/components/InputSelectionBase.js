import styled from "styled-components";

export const InputSelectionBase = styled.div`
    position: relative;
    height: 65px;
    border: 1px solid ${(p) => p.theme.colors[p.isFocused ? "burntOrange" : "borderGray"]};
    transition: border 0.1s ease-in-out;
    display: flex;
    align-items: center;
    box-shadow: ${(p) => p.theme.shadow.v2};

    font-size: 16px;
    ${(p) => p.theme.media.greaterThan("768px")`
        font-size: 18px;
    `}
`;
