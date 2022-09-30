import styled from "styled-components";
import { FooterTitle } from "../styles";

export const NavWrapper = styled.div`
    padding-right: 40px;
    padding-bottom: 41px;
    margin-top: 40px;

    @media screen and (max-width: 1024px) {
        margin-top: 30px;
        padding-right: 0;
    }

    @media screen and (max-width: 767px) {
        padding-right: 0;
        padding-top: 0;
        padding-bottom: 32px;
        margin-top: 0;
        border-bottom: 1px solid #fae8d1;
    }
`;

export const NavigationColumnsWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    padding-bottom: 53px;
    max-width: 663.5px;
    width: 100%;

    ${FooterTitle} {
        margin-bottom: 15px;
    }

    @media screen and (max-width: 1024px) {
        padding-bottom: 42px;
        max-width: 100%;
    }

    @media screen and (max-width: 767px) {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 1fr;
        gap: 24px 42px;
        grid-template-areas:
            ". ."
            ". .";
    }
`;

export const StyledNavigation = styled.nav`
    display: flex;
    flex-direction: column;

    a {
        text-decoration: none;
        font-style: normal;
        font-weight: normal;
        font-family: VinovestMedium;
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 30px;
        color: inherit;
        text-align: left;

        &:not(:last-child) {
            margin-bottom: 4px;
        }

        @media screen and (max-width: 1300px) {
            font-size: 14px;
            line-height: 27px;
        }

        @media screen and (min-width: 768px) and (max-width: 1024px) {
            width: 150px;
        }

        @media screen and (max-width: 767px) {
            line-height: 33px;
            width: fit-content;
        }
        @media screen and (min-width: 375px) {
            font-size: 16px;
        }
      
        @media screen and (min-width: 320px) {
            font-size: 15px;
        }
    }
`;

export const BasicDataWrapper = styled.div`
    border: 1px solid #fae8d1;
    box-sizing: border-box;
    border-radius: 4px;
    padding: 10px 15px;
    margin-right: 10px;
    width: fit-content;
    font-family: VinovestMedium;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 24px;
    display: flex;
    justify-content: space-around;
    max-width: 259px;
    width: auto;

    &:hover {
        cursor: pointer;
    }

    span {
        &.withBorder {
            border-right: 1px solid #fae8d1;
        }
    }

    @media screen and (max-width: 767px) {
        max-width: 100%;
        margin-right: 0;
    }
`;

export const BottomWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    padding-right: 27px;

    @media screen and (max-width: 1024px) {
        padding-right: 0;
    }
`;
