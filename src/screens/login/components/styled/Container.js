import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin: auto;
    background: ${(p) => p.theme.colors.white};
    overflow-y: auto;

    ${(p) => p.theme.media.greaterThan("medium")`
    height: 100vh;
    flex-direction: row;
  `}
`;

export default Container;
