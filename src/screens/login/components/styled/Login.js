import styled from "styled-components";

const Login = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: ${(p) => p.isSignup ? "100%" : "auto"};
    ${(p) => p.theme.mq({ alignItems: ["flex-start", "center"] })}

    padding: 40px 20px;
    ${(p) => p.theme.media.greaterThan("medium")`
    padding: initial;
  `}
`;

export default Login;
