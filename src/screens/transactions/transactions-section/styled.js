import styled from "styled-components";

export const TransactionsListWrapper = styled.div`
    width: 100%;
    padding: 36px 0 0;

    .failedTransaction {
        color: #eb5757;
    }
`;

export const TransactionsTitle = styled.div`
    padding: 0 25px 40px;
    font-family: RoslindaleDisplayCondensed;
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 32px;
    color: #242e35;

    @media screen and (max-width: 767px) {
        padding: 0 20px 40px;
    }

    @media screen and (min-width: 768px) and (max-width: 1024px) {
        padding: 0 30px 23px;
    }
`;

export const GridDesktop = styled.div`
    display: grid;
    grid-template-columns: 135fr 225fr 202fr 138fr;
    grid-template-areas: ". . . .";
    font-family: VinovestMedium;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 26px;
    letter-spacing: 0.005em;
    color: #242e35;
    white-space: nowrap;
    border-bottom: 1px solid #eeeeee;
    padding: 13px 3px 13px 0;

    &.shrinkGridDesktop {
        @media screen and (min-width: 1025px) and (max-width: 1200px) {
            font-size: 13px;
        }
    }

    .gridCell,
    .gridCellOverflow {
        height: 100%;
        max-width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .gridCellOverflow {
        overflow: hidden;
    }

    span.ellipsis {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .lastGridCell {
        text-align: right;
        padding-right: 0;
    }
`;

export const GridMobile = styled(GridDesktop)`
    grid-template-columns: 222fr 93fr;
    grid-template-areas: ". .";
    gap: 0 5px;
`;

export const TransactionTypeWrapper = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    overflow: hidden;

    img {
        margin-right: 15px;
    }
`;

export const GridWrapper = styled.div`
    padding: 0 25px;
    background-color: transparent;
    transition: 0.3s;
    border-radius: 10px;

    &:hover {
        opacity: 0.7;
        cursor: pointer;
    }

    &.withTitles:hover {
        opacity: 1;
        cursor: default;
    }

    &.selectedGridWrapper {
        background-color: #eef2f7;
        opacity: 1;
        position: relative;

        @media screen and (min-width: 1025px) {
            &:after {
                position: absolute;
                top: 50%;
                right: -50px;
                transform: translateY(-50%);
                content: " ";
                display: block;
                width: 0px;
                height: 0px;
                border-top: 9px solid transparent;
                border-bottom: 9px solid transparent;
                border-left: 9px solid #c5d5e4;
            }
        }

        ${GridDesktop} {
            border-bottom: 1px solid transparent;
        }
    }

    .textEllipsis {
        text-overflow: ellipsis;
        overflow: hidden;
        width: 100%;
        white-space: nowrap;
        display: block;
    }

    .underText {
        font-size: 14px;
        line-height: 21px;
    }

    @media screen and (max-width: 767px) {
        padding: 0 20px;
    }

    @media screen and (min-width: 768px) and (max-width: 1024px) {
        padding: 0 30px;
    }
`;

export const GridDesktopTitle = styled(GridDesktop)`
    font-size: 14px;
    line-height: 18px;
    padding-top: 0;
    padding-bottom: 8px;
    font-family: VinovestMono;
    text-transform: uppercase;
`;

export const Empty = styled.div`
    font-family: VinovestMedium;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 26px;
    display: flex;
    align-items: center;
    justify-content: center;
    letter-spacing: 0.005em;
    color: #242e35;
    width: 80%;
    height: 205px;
    margin: 0 auto;
    text-align: center;

    @media screen and (max-width: 767px) {
        height: 236px;
    }
`;

export const TransactionFailed = styled.span`
    color: #ff4d00;
`;
