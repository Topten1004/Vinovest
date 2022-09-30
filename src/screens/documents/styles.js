import styled from "styled-components";
import { NavLink } from "#shared/ui";

export const DocumentsPageBodyWrapper = styled.div`
    margin: 41px 10px 0;

    ${(p) => p.theme.media.greaterThan("768px")`        
        margin: 58px 10px 0;        
    `};
`;

export const DocumentsPageBody = styled.div`
    max-width: 1240px;
    margin: 0 auto;
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.mainAccentBlue};
    padding: 33px 19px 41px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.1);
    border-radius: 10px;

    ${(p) => p.theme.media.greaterThan("768px")`
        padding: 46px 60px 46px;               
    `};
`;

export const DocumentsPageTitle = styled.h1`
    font-family: RoslindaleDisplayCondensed;
    font-style: normal;
    font-weight: 500;
    font-size: 32px;
    line-height: 41px;
    margin: 0;
    padding: 0;

    ${(p) => p.theme.media.greaterThan("768px")`
        font-size: 45px;
        line-height: 45px;
        margin-bottom: 15px;
        align-self: flex-start;
    `};
`;

export const DocumentHead = styled.div`
    width: 100%;
    margin-top: 35px;
    ${(p) => p.theme.media.greaterThan("768px")`
        display: flex;
        flex-direction: row-reverse;
        /*justify-content: space-between; Add this back in when renabling link*/
   `}
`;

export const LinksRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;

    ${(p) => p.theme.media.greaterThan("768px")`
        justify-content: flex-start;
    `}
`;

export const CustomNavLink = styled(NavLink)`
    margin: 0 15.5px;

    ${(p) => p.theme.media.greaterThan("768px")`
        margin: 0;
        margin-right: 62px;
    `}
`;

export const DropDownContainer = styled.div`
    margin-top: 55px;
    width: 100%;
    flex-shrink: 0;
    font-family: VinovestMono;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 18px;
    letter-spacing: 0.025em;

    button {
        border: 1px solid #a8abad;
        width: 100%;
        height: 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 16px;
    }

    ul {
        min-width: 100%;
        box-shadow: unset;
        filter: drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.1));
        border-top: 1px solid #eeeeee;
        padding: 0;
        margin-top: 9px;
        ${(p) => p.theme.media.greaterThan("768px")`
            min-width: 132px;
            width: 132px;
        `}
    }

    li {
        border: 1px solid #eeeeee;
        border-top: 0;
        border-bottom: 1px solid #eeeeee;
        height: 40px;
        padding: 0 16px;
    }

    ${(p) => p.theme.media.greaterThan("768px")`
        margin: 0;
        width: 132px;
    `}
`;

export const DocumentsMain = styled.div`
    margin-top: 27px;
    flex-grow: 1;
    width: 100%;
    ${({ minHeight }) => (minHeight ? `min-height: ${minHeight};` : "")}

    ${(p) => p.theme.media.greaterThan("768px")`
    margin-top:  51px;`}
`;
