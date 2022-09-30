import styled, { css } from "styled-components";

export const HiddenCheckbox = styled.input`
    clip: rect(0 0 0 0);
    clippath: inset(50%);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    white-space: nowrap;
    width: 1px;
`;

export const StyledCheckbox = styled.div`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 24px;
    height: 24px;
    background: transparent;
    border-radius: 4px;
    box-sizing: border-box;
    border: 1px solid #242424;
    transition: all 150ms;
    ${HiddenCheckbox}:focus + & {
        box-shadow: 0 0 0 3px #242424;
    }

    ${(p) =>
        p.square &&
        css`
            border: 1px solid #f1f1f1;
            border-radius: 0;
            width: 30px;
            height: 30px;
            background: ${(p) => (p.checked ? "black" : "white")};
            path {
                fill: white;
            }
        `}

    svg {
        visibility: ${(props) => (props.checked ? "visible" : "hidden")};
    }
`;

export const CheckboxContainer = styled.div`
    display: inline-block;
    vertical-align: middle;
`;
