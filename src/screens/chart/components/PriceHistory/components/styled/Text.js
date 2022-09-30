import styled from "styled-components";

export const Strong = styled.strong`
    font-weight: 500;
    font-size: ${(p) => p.theme.typography.size.xl}px;
    letter-spacing: 0.005em;
`;

export const Meta = styled.small`
    font-weight: 500;
    font-size: ${(p) => p.theme.typography.size.sm}px;
    letter-spacing: 0.005em;
    color: #bdbdbd;
    margin: 0 4px;
`;

export default { Meta, Strong };
