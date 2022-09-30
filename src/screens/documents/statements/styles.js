import styled from "styled-components";

export const DocumentListElem = styled.div`
    width: 100%;
    border-bottom: 1px solid #eeeeee;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-bottom: 12px;
    font-family: VinovestMedium;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 19px;
    letter-spacing: 0.005em;

    ${(p) => p.theme.media.greaterThan("768px")`
        padding-bottom: 17px;
        font-weight: 500;
        font-size: 16px;
        line-height: 20px;
        flex-wrap: no-wrap;
        flex-direction: row;
    `}
`;

export const DocumentListElemWithGup = styled(DocumentListElem)`
    padding: 14px 0 11px;
    flex-direction: row;

    ${(p) => p.theme.media.greaterThan("768px")`
        padding: 22px 0 24px;
        flex-direction: row;
    `}
`;

export const DocumentListTitle = styled.div`
    display: flex;
    flex-direction: row:
    font-family: VinovestMono;
    font-style: normal;
    font-weight: 500;
    font-size: 11px;
    line-height: 16px;
    letter-spacing: 0.025em;
    text-transform: uppercase;

    ${(p) => p.theme.media.greaterThan("768px")`
        font-weight: 500;
        font-size: 14px;
        line-height: 18px;
    `}
`;

export const Link = styled.div`
    text-align: left;
    color: ${(p) => p.theme.colors.burntOrange};
    text-decoration: none;
    flex-grow: 1;

    span {
        width: fit-content;

        &:hover {
            cursor: pointer;
        }
    }
`;

export const Date = styled.div`
    width: 106px;
    text-align: right;
    white-space: nowrap;
`;

export const LoadMore = styled.button`
    margin: 48px auto 0;
    width: 229px;
    height: 44px;
    border: 2px solid #caccce;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: VinovestMono;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 26px;
    letter-spacing: 0.025em;
    text-transform: uppercase;
    color: #242e35;
    background: transparent;
    outline: 0;
    transition: 0.5s;

    &:hover {
        opacity: 0.6;
        cursor: pointer;
    }

    &:disabled {
        opacity: 0.4;
        cursor: default;
    }

    ${(p) => p.theme.media.greaterThan("768px")`
        height: 60px;           
    `};
`;
