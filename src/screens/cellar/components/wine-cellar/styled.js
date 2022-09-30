import styled from "styled-components";

export const CellarContainer = styled.div`
    width: 100%;
    padding: 53px 100px 151px 100px;
    position: relative;

    @media screen and (max-width: 767px) {
        padding: 0 10px 80px;
    }
    @media screen and (max-width: 1024px) {
        padding: 0 10px 133px;
    }
`;

export const CellarViewsContainer = styled.div`
    width: 100%;
    padding: 46px 0 0;

    @media screen and (max-width: 767px) {
        padding: 0;
    }
`;

export const Intersection = styled.div`
    width: 100%;
    position: absolute;
    top: ${({ top }) => top};
`;

export const CellarHeader = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media screen and (max-width: 767px) {
        flex-direction: column;
        padding: 32px 10px 40px;
    }

    @media screen and (min-width: 768px) and (max-width: 1024px) {
        flex-direction: row;
        padding: 65px 7px 28px 17px;
    }
`;

export const CellarTitle = styled.h2`
    font-family: RoslindaleDisplayCondensed;
    font-style: normal;
    font-weight: 500;
    font-size: 45px;
    line-height: 60px;
    padding: 0;
    margin: 0;

    @media screen and (max-width: 767px) {
        font-size: 24px;
        line-height: 32px;
        margin-bottom: 32px;
    }

    @media screen and (min-width: 768px) and (max-width: 1024px) {
        font-size: 32px;
        line-height: 41px;
        margin-bottom: 0;
    }
`;

export const LoadMore = styled.button`
    font-family: VinovestMono;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #a8abad;
    letter-spacing: 0.025em;
    text-transform: uppercase;
    color: #242e35;
    max-width: 335px;
    margin: 51px auto 0;
    width: 100%;
    height: 50px;
    background: transparent;
    outline: 0;
    transition: 0.5s;

    &:hover {
        opacity: 0.7;
        cursor: pointer;
    }

    &:disabled {
        opacity: 0.7;
        cursor: default;
    }
`;

export const ControlsWrapper = styled.div`
    display: flex;

    @media screen and (max-width: 767px) {
        width: 100%;
        justify-content: space-between;
    }
`;
