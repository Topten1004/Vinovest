import styled from "styled-components";

export const MainWrapper = styled.div`
    padding-bottom: 60px;   
`;

export const Wrapper = styled.div`
    padding-top: 100px;
    padding-bottom: 100px;
    max-width: 1000px;
    width: 100%;
    margin: 0 auto;
    color: #242e35;

    @media screen and (max-width: 991px) {
        max-width: 90%;
    }

    @media screen and (max-width: 767px) {
        max-width: 95%;
    }
`;

export const Title = styled.h2`
    text-align: center;
    font-family: Roslindaledisplaycondensed, sans-serif;
    font-size: 64px;
    line-height: 137%;
    font-weight: 500;
    color: #242e35;

    @media screen and (min-width: 1440px) {
        margin: 0;
        margin-bottom: 60px;
        font-size: 64px;
    }

    @media screen and (max-width: 991px) {
        font-size: 36px;
        margin-bottom: 100px;
    }
`;
