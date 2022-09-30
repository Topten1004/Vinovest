import styled from "styled-components";

export const DepositButton = styled.button`
    font-family: VinovestMono;
    text-transform: uppercase;
    background-color: ${(p) => p.theme.colors.burntOrange};
    font-size: ${(p) => p.theme.typography.size.md}px;
    line-height: 18px;
    letter-spacing: 0.025em;
    font-style: normal;
    font-weight: 500;
    text-transform: uppercase;
    color: ${(p) => p.theme.colors.white};
    width: 100%;
    border: none;
    padding: 12px 0;
    outline: 0;
    cursor: pointer;
    pointer-events: ${(props) => (props.disabled ? "none" : "initial")};
    &:hover {
        box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.3);
        transition: box-shadow 0.6s ease-in-out;
    }
    &:disabled {
        background-color: ${(p) => p.theme.colors.lightGray};
    }
`;
