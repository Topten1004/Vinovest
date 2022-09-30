import styled from "styled-components";

const Dot = styled.div`
    width: 13px;
    height: 13px;
    border-radius: 100%;
    background-color: ${(p) => p.color};
    margin-right: 18px;
`;

export default Dot;
