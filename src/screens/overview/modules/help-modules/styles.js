import styled from "styled-components";
import { BaseModuleContainer } from "../styles";

export const LeftSide = `
    .fagSvg {
        width: 100%;
        max-width: 244.7px;
        object-fit: contain;
        display: block;
        margin-top: 16px;

        @media (max-width: 1023px) {
            margin: 0 auto;
            display: none;
        }
    }

    h3 {
        margin: 0;
        padding: 0;
        margin-top: 14px;
        font-family: RoslindaleDisplayCondensed;
        font-style: normal;
        font-weight: 500;
        font-size: 44px;
        line-height: 60px;
        color: #242e35;

        @media (max-width: 767px) {
            font-size: 32px;
            line-height: 44px;
        }
    }

    p {
        margin: 0;
        padding: 0;
        margin-top: 34px;
        font-family: VinovestMedium;
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 26px;
        color: #242e35;

        @media (max-width: 767px) {
            font-size: 14px;
            line-height: 21px;
            margin-top: 23px;
        }
    }

    a,
    .likeLinkButton {
        font-family: VinovestMono;
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 26px;
        display: flex;
        align-items: center;
        text-decoration: none;
        color: #a86d37;
        width: fit-content;
        background-color: transparent;
        outline: 0;
        border: 0;
        padding: 0;        

        svg {
            display: block;
            margin: 0 0 2px 10px;
        }

        @media (max-width: 768px) {
            font-size: 16px;
            line-height: 26px;
        }

        @media (max-width: 1023px) {
            margin: 28px 0 38px; 
        }
    }
`;

export const CustomModuleContainer = styled(BaseModuleContainer)`
    display: flex;
    justify-content: space-between;
    height: fit-content;

    @media (min-width: 0px) {
        height: fit-content;
        padding: 0 57px 1px 85px;
    }

    @media (max-width: 1023px) {
        padding: 0 0 1px 45px;
    }

    @media (max-width: 900px) {
        flex-direction: column;
        padding: 33px 45px 0;
    }

    @media (max-width: 767px) {
        padding: 33px 22px 0;
    }
`;

export const Left = styled.div`
    width: fit-content;
    max-width: 347px;
    align-self: center;
    ${LeftSide};

    a,
    .likeLinkButton {
        margin-top: 33px;
        transition: 0.3s;

        &:hover {
            cursor: pointer;
            opacity: 0.5;
        }
    }

    .likeLinkButton {
        white-space: nowrap;
    }

    @media (max-width: 900px) {
        align-self: flex-start;
        width: 100%;
        max-width: 100%;

        h3 {
            margin-top: 0;
        }
    }
`;

export const Right = styled.div`
    padding-top: 65px;

    img {
        display: block;
    }

    @media (max-width: 900px) {
        padding-top: 0;

        img {
            width: 100%;
        }
    }
`;
