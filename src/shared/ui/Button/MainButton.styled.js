import styled from "styled-components";

const MainButton = styled.button`
    font-family: VinovestMono;
    height: 50px;
    background: ${({ theme }) => theme.colors.burntOrange};
    opacity: ${(p) => (p.disabled ? 0.7 : 1)};
    color: ${({ theme }) => theme.colors.white};
    font-size: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 3.5px;
    text-align: center;
    letter-spacing: 0.025em;
    line-height: 26px;
    font-weight: 500;
    font-style: normal;
    text-transform: uppercase;
    width: 100%;
    border: none;
    cursor: pointer;
    pointer-events: ${(props) => (props.disabled ? "none" : "initial")};
    transition: box-shadow 0.3s ease-in-out;
    :hover {
        box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.3);
    }
    :focus {
        outline: 0;
    }
    @media screen and (min-width: 768px) {
        margin: 0 auto;
        max-width: ${(p) => (p.fullWidth ? "initial" : "300px")};
    }
    :disabled {
        background: ${({ theme }) => theme.colors.lightGray};
    }
`;

export default MainButton;
