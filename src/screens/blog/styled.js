import styled from "styled-components";

export const Gup = `
padding-right: 20px;
padding-left: 20px;
`;

export const ArticlesWrapper = styled.div`
    display: grid;
    grid-auto-columns: 1fr;
    grid-column-gap: 40px;
    grid-row-gap: 43px;
    grid-template-columns: 1fr 1fr 1fr;
    ${({ disable }) => (disable ? "pointer-events: none;" : "")};
    ${Gup};

    @media screen and (max-width: 991px) {
        grid-template-columns: 1fr 1fr;
    }

    @media screen and (max-width: 600px) {
        grid-template-columns: 1fr;
    }
`;