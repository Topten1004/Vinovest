import styled from "styled-components";

const MenuItem = styled.li`
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    line-height: 25px;
    &:hover {
        background: #00000005;
        cursor: pointer;
    }
    ${(p) => (p.selected && p.background && `background: ${p.background}`|| "none")};

    svg {
        display: ${(p) => (p.selected ? "block" : "none")};
    }
`;

export default MenuItem;
