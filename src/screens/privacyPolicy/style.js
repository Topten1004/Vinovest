import styled from "styled-components";
import { PDescription, TopTitle } from "#shared/ui/Typography/styled";

export const DescriptionP = styled(PDescription)`
    @media screen and (max-width: 767px) {
        font-size: 18px;
        max-width: 70%;
        width: 100%;
        color: #242e35;
    }
    @media screen and (max-width: 375px) {
        max-width: 66.6%;
        width: 100%;
    }
    @media screen and (max-width: 480px) {
        max-width: 66.6%;
        width: 100%;
    }
`;
export const PDescriptionBold = styled(DescriptionP)`
    font-weight: 500;
    color: #242e35;
`;
export const LiDescription = styled.li`
    font-size: 20px;
    font-family: Favoritstd, sans-serif;
    margin: 3px 0px;
    text-align: start;
    line-height: 160%;
    color: #242e35;
`;
export const Section = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 100px 6.666% 100px;
    color: #242e35;

    ${TopTitle} {
        margin-bottom: 70px;
        font-size: 48px;
        color: #242e35;
    }
    ${DescriptionP} {
        width: 566px;
        text-align: start;
        color: #242e35;
    }
    br {
        margin-bottom: 16px;
    }
`;
export const UlStyle = styled.ul`
    width: 566px;
    color: #242e35;

    @media screen and (max-width: 767px) {
        font-size: 18px;
        max-width: 70%;
        width: 100%;
    }
    @media screen and (max-width: 375px) {
        width: 100%;
        max-width: 66.6%;
    }
    @media screen and (max-width: 480px) {
        width: 100%;
        max-width: 66.6%;
    }
`;

export const INC = styled.h4`
    font-family: Roslindaledisplaycondensed, sans-serif;
    font-size: 24px;
    line-height: 32px;
    font-weight: 500;
    letter-spacing: 0.035em;
    margin: 10px 0;
    text-align: start;
    width: 100%;
    max-width: 566px;
    color: #242e35;

    @media screen and (max-width: 767px) {
        max-width: 70%;
        width: 100%;
    }
    @media screen and (max-width: 375px) {
        width: 100%;
        max-width: 66.6%;
    }
    @media screen and (max-width: 480px) {
        width: 100%;
        max-width: 66.6%;
    }
`;
export const BlackLink = styled.a`
    color: #242e35;
    text-decoration: none;
    text-transform: none;
    word-wrap: break-word;
`;
