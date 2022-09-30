import styled from "styled-components";

const DropDownContainer = styled.div`
    margin-top: 55px;
    width: 100%;
    flex-shrink: 0;
    font-family: VinovestMono;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    letter-spacing: 0.025em;

    span {
        text-transform: uppercase;
        margin-bottom: -2px;
        white-space: nowrap;
    }

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
            min-width: ${({ desktopWidth }) => desktopWidth || "132px"};
            width: ${({ desktopWidth }) => desktopWidth || "132px"};
        `}
    }

    li {
        border: 1px solid #eeeeee;
        border-top: 0;
        border-bottom: 1px solid #eeeeee;
        height: 40px;
        padding: 0 16px;

        span {
            text-transform: uppercase;
            white-space: nowrap;
        }
    }

    ${(p) => p.theme.media.greaterThan("768px")`
        margin: 0;
        width: ${({ desktopWidth }) => desktopWidth || "132px"};
    `}
`;

export default DropDownContainer;
