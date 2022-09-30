import styled from "styled-components";

const InfoColumn = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    &:not(:last-child) {
        margin-bottom: 16px;
    }
`;

export default InfoColumn;
