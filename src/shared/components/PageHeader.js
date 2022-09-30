import styled from "styled-components";

export const PageHeader = styled.div`
    font-family: ${(p) => p.theme.fonts.title};

    margin-bottom: 34px;
    font-size: 32px;
    font-weight: 500;
    ${(p) => p.theme.media.greaterThan("768px")`
        margin-bottom: 42px;
        font-size: 42px;
    `};
`;
