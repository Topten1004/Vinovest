import styled from "styled-components";

const Container = styled.div`
    height: 100vh;
    display: ${(p) => (!p.hidden ? "flex" : "none")};
    align-items: center;
    justify-content: center;
`;

export default Container;
