import styled from "styled-components";

export const ContainerButton = styled.div`
  height: ${(p) => p.isSignup ? "60px" : "50px"};
  background: ${(p) => (p.normal ? p.theme.colors.burntOrange : p.theme.colors.white)};
  border: 1px solid ${(p) => (p.normal ? p.theme.colors.burntOrange : p.theme.colors.lightGray)};
  width: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  text-align: right;
  margin-top: 20px;
  margin-left: ${(p) => (p.isSignup ? "8px" : "0")};
  pointer-events: ${(p) => (p.disabled ? "none" : "initial")}
  :hover {
    box-shadow:  0px 1px 10px rgba(0, 0, 0, 0.3);
    transition: box-shadow 0.6s ease-in-out;
  }
  :focus {
    outline: 0;
  }
  @media screen and (min-width: 768px) {
      margin: 0 auto;
      margin-top: 25px;

  }
  :disabled {
    background: #E5E5E5;
  }
`;

export const ButtonLabel = styled.label`
    padding-left: ${(p) => p.paddingLeft ? "16px" : 0};
    padding-top: 2.5px;
    font-family: VinovestMono;
    cursor: pointer;
    margin: auto;
    text-transform: uppercase;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 25px;
    color: ${(p) => (p.normal ? p.theme.colors.white : "#828282")};
`;
