import styled from "styled-components";

const Tooltip = styled.div`
    background: ${(p) => p.theme.colors.black};
    padding: 8px 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .date {
        color: #bdbdbd;
        font-size: ${(p) => p.theme.typography.size.xs}px;
    }

    .price {
        color: ${(p) => p.theme.colors.white};
        font-size: ${(p) => p.theme.typography.size.xs}px;
    }
`;

export default Tooltip;
