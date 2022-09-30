import styled from "styled-components";

export const PaginationWrapper = styled.div`
    margin: 0 auto;
    width: fit-content;
    display: flex;
    align-items: center;
    font-family: VinovestMedium;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 22px;
    color: #242e35;
    text-transform: uppercase;

    .page {
        color: inherit;
        text-decoration: none;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 10px;
        border-radius: 50%;
        transition: color 0.1s;

        &.withDotsRight {
            margin-right: 0;

            &:after {
                content: ". . .";
                display: inline-block;
                margin-left: 10px;
            }
        }
        &.withDotsLeft {
            margin-left: 0;
            &:before {
                content: ". . .";
                display: inline-block;
                margin-right: 10px;
            }
        }

        &:hover {
            cursor: pointer;
        }

        &.currentPage {
            color: #fff;
            background: #242e35;
            position: relative;
            background-color: #242e35;
            width: 28px;
            height: 28px;
            margin: 0;
            pointer-events: none;

            &:hover {
                cursor: default;
            }
        }
    }

    .prevNext {
        margin: 0 35px;
        color: inherit;
        text-decoration: none;
        display: block;

        &:hover {
            cursor: pointer;
        }

        &.disabled {
            color: #d8d8d8;
            pointer-events: none;
            &:hover {
                cursor: default;
            }
        }

        @media screen and (max-width: 768px) {
            margin: 0 10px;
        }
    }
`;
