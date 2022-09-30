import styled from "styled-components";
import { ListBasis, CellBasis } from "../assets/basicStyles";

export const SkeletonWrapper = styled.div`
    border: 1px solid ${(p) => p.theme.colors.lighterGray};
    background: ${(p) => p.theme.colors.lighterGray};
    box-sizing: border-box;
    box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    margin-top: 20px;
    overflow: hidden;

    @media screen and (max-width: 1023px) {
        border-radius: 10px;
        margin-top: 11px;
    }
`;

export const DesktopListElem = styled(ListBasis)`
    text-align: right;
    background: ${(p) => p.theme.colors.white};
    border: 1px solid ${(p) => p.theme.colors.lighterGray};
    box-sizing: border-box;
    box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    margin-top: 20px;
    padding: 21px 0 20px;
    min-height: 120px;
    cursor: pointer;
`;

export const MobileListElem = styled.div`
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    border: 1px solid #eeeeee;
    box-sizing: border-box;
    box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    margin-top: 11px;
    min-height: 90px;
    padding: 16px 23px 15px 0;
    cursor: pointer;
`;

export const CellExtended = styled(CellBasis)`
    padding-top: 11px;
    line-height: 26px;
    font-family: VinovestMedium;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    color: ${(p) => p.theme.colors.dark30};

    @media screen and (max-width: 1023px) {
        font-size: 14px;
        line-height: 18px;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-end;
        flex-shrink: 0;
        padding: 5px 0;
    }
`;

export const CellarBuying = styled(CellExtended)`
    display: flex;
    padding: 0;
    flex-direction: column;
    justify-content: center;
`;

export const Percentage = styled.div`
    margin-top: 5px;
    font-family: VinovestMedium;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 21px;
    text-align: right;
    letter-spacing: 0.005em;
    color: ${(p) => (p.negative ? p.theme.colors.darkRed : p.theme.colors.lighterGreen)};

    @media screen and (max-width: 1023px) {
        font-size: 11px;
        line-height: 21px;
        margin-top: 0px;
    }
`;

export const BottomData = styled(Percentage)`
    color: #242e35;
`;

export const WineDetailsContainer = styled(CellBasis)`
    display: flex;
    align-items: center;
    padding-left: 14px;
    text-align: left;

    @media screen and (max-width: 1023px) {
        padding: 0;
        margin: 0;
        align-items: stretch;
    }
`;

export const WineImg = styled.img`
    height: 79px;
    width: 79px;
    display: block;
    object-fit: scale-down;
    flex-shrink: 0;
    border: 0;
    ${(p) => p.addFunds && "padding: 13px;"};

    @media screen and (max-width: 1023px) {
        height: 59px;
        width: 59px;
    }
`;

export const WineDetailsText = styled.div`
    color: ${(p) => p.theme.colors.dark30};
    margin-left: 17px;
    font-family: VinovestMedium;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 26px;
    letter-spacing: 0.005em;

    @media screen and (max-width: 1023px) {
        font-size: 14px;
        line-height: 21px;
        margin: 0;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 5px 0;
    }
`;

export const WineDetailsMl = styled.div`
    margin-top: 5px;
    font-family: VinovestMedium;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 21px;
    text-align: left;
    letter-spacing: 0.005em;

    @media screen and (max-width: 1023px) {
        font-size: 11px;
        line-height: 21px;
        margin-top: 6px;
        color: #5b646b;
    }
`;

export const WineDetailsFunds = styled(WineDetailsMl)`
    color: ${(p) => p.theme.colors.burntOrange} !important;
    text-transform: none;

    &:hover {
        cursor: pointer;
    }
`;
