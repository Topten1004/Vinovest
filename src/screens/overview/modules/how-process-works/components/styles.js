import styled from "styled-components";

export const Title = styled.h3`
    font-family: RoslindaleDisplayCondensed;
    font-style: normal;
    font-weight: 500;
    font-size: 32px;
    line-height: 44px;
    color: #242e35;
    margin: 0;
    padding: 0;

    @media (min-width: 992px) {
        font-size: 44px;
        line-height: 64px;
    }
`;

export const Description = styled.p`
    font-family: VinovestMedium;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 22px;
    color: #242e35;
    margin: 18px 0 0 0;
    padding: 0;
    max-width: 531px;
    width: 100%;

    @media (min-width: 992px) {
        font-size: 14px;
        line-height: 21px;
    }
`;

export const AddFunds = styled.button`
    position: relative;
    min-width: 144px;
    min-height: 42px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #a86d37;
    border-radius: 3px;
    transition: 0.3s;
    border: 0;
    outline: 0;

    font-family: VinovestMono;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 18px;
    letter-spacing: 0.025em;
    text-transform: uppercase;
    color: #ffffff;

    &:hover {
        cursor: pointer;
        opacity: 0.5;
    }
`;
