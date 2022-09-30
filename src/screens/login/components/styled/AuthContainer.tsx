import styled from "styled-components";
import _ from "lodash";

export const AuthContainer = styled("div")`
    width: 100% !important;
    margin: 0;
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;
    ${(p) => p.theme.media.greaterThan("medium")`
      max-width:393px
  `}

    @media screen and (min-width: 600px) {
        margin: 0 auto !important;
        max-width: 393px;
    }
`;

export const AuthDisclaimer = styled("p")`
    color: #A3A3A3;
    font-size: 11px;
    line-height: 20px;
    text-transform: uppercase;
    @media screen and (min-width: 768px) {
        margin-top: auto;
        margin-bottom: 88px;
    }
    a {
        color: inherit;
        text-decoration: underline;
    }
`;

export const AuthHeaderTitleLabel = styled("div")`
    font-family: RoslindaleDisplayCondensed;
    font-size: 26px;
    line-height: 30px;
    letter-spacing: 0.005em;
    color: #102035;
    margin-top: 0px;
    margin-bottom: 20px;
    @media screen and (min-width: 1024px) {
        margin-bottom: 30px;
        font-size: 35px;
        line-height: 60px;
    }
`;

export const OrLabel = styled("p")`
    text-align: center;
    font-style: normal;
    font-size: 12px;
    line-height: 15px;
    color: ${(p) => p.theme.colors.disclaimerGray};
    margin: 15px 0 0 0;
    @media screen and (min-width: 1024px) {
        font-size: 16px;
        line-height: 20px;
    }
`;

export const Input = styled("input")`
    width: 100%;
    background: #ffffff;
    border: ${(p) => (p.isInvalid ? "1px solid #ed1c24" : "1px solid #e5e5e5")};
    box-shadow: "none";
    outline: none;
    box-sizing: border-box;
    padding: 15px;
    font-size: 14px;
    height: 50px;
    margin-top: 18px;
    ::placeholder {
        color: ${(p) => p.theme.colors.darkGray};
    }
    :focus {
        outline: none;
        border-color: #e5e5e5;
    }
    -webkit-appearance: none;
`;

export const HalfInput = styled("input")`
    width: 48%;
    background: #ffffff;
    border: ${(p) => (p.isInvalid ? "1px solid #ed1c24" : "1px solid #e5e5e5")};
    box-shadow: "none";
    outline: none;
    box-sizing: border-box;
    padding: 15px;
    font-size: 14px;
    height: 50px;
    margin-top: 18px;
    ::placeholder {
        color: ${(p) => p.theme.colors.darkGray};
    }
    :focus {
        outline: none;
        border-color: #e5e5e5;
    }
    -webkit-appearance: none;
`;

export const ErrorLabelContainer = styled("div")`
    margin-top: 10px;
    padding: 0 5px;
`;

export const AuthErrorLabel = styled("label")`
    font-family: VinovestMono;
    text-transform: uppercase;
    font-size: 12px;
    line-height: 21px;

    color: ${({ theme, isValid }) =>
        _.cond([
            [(v) => v === true, _.constant(theme.colors.green)],
            [(v) => v === false, _.constant(theme.colors.red)],
            [_.stubTrue, _.constant(theme.colors.disclaimerGray)],
        ])(isValid)};
`;

export const AuthAddonLabel = styled("label")`
    position: ${(p) => p.isSignup ? "absolute" : "static"};
    top: -80px;
    right: 0;
    font-family: VinovestMono;
    text-transform: uppercase;
    font-size: ${(p) => p.isSignup ? "14px" : "10px"};;
    line-height: 15px;
    color: ${(p) => (p.isNotDecrator ? p.theme.disclaimerGray : "#242424")};
    text-decoration: ${(p) => (p.hasUnderline ? "underline" : "none")};
    @media screen and (min-width: 768px) {
        position: static;
        font-size: 10px;
    }
    @media screen and (min-width: 1024px) {
        font-size: 12px;
        line-height: 17px;
    }
    :hover {
        text-decoration: ${(p) => (p.isNotDecrator ? "none" : "underline")};
        cursor: ${(p) => (p.isNotDecrator ? "default" : "pointer")};
    }
`;

export const AuthAddonLabelInternational = styled(AuthAddonLabel)`
    display: block;
    text-align: center;
    margin-top: 97px;

    @media screen and (min-width: 1024px) {
        margin-top: 121px;
    }
`;

export const InternationalFlags = styled("img")`
    display: block;
    width: 255px;
    margin: 22px auto;

    @media screen and (min-width: 1024px) {
        width: 361px;
        margin: 26px auto;
    }
`;

export const AuthSubtitleLabel = styled("p")`
    font-size: 13px;
    font-weight: 500;
    line-height: 20px;
    color: #636363;

    @media screen and (min-width: 1024px) {
        font-size: 16px;
        line-height: 24px;
    }
`;

export const SubmitButton = styled("button")`
    padding-top: 4px;
    font-family: VinovestMono;
    height: 50px;
    background: ${({ theme }) => theme.colors.burntOrange};
    color: ${({ theme }) => theme.colors.white};
    opacity: ${(p) => (p.disabled ? 0.7 : 1)};
    transition: opacity 0.2s ease-in-out;
    font-size: 16px;

    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    letter-spacing: 0.025em;
    text-transform: uppercase;
    line-height: 180%;
    font-weight: 500;
    font-style: normal;
    width: 100%;
    border: none;
    cursor: pointer;
    pointer-events: ${(props) => (props.disabled ? "none" : "initial")};
    :hover {
        box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.3);
        transition: box-shadow 0.6s ease-in-out;
    }
    :focus {
        outline: 0;
    }
    :disabled {
        background: ${({ theme }) => theme.colors.lightGray};
    }
    margin-top: 28px;
    @media screen and (min-width: 768px) {
        margin: 0 auto;
        margin-top: 40px;
    }
`;
