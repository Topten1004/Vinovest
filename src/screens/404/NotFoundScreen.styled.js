import styled from "styled-components";

const StyledNotFoundScreen = styled.div`
    height: calc(100vh - 64px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h1 {
        font-weight: 500;
        font-size: 36px;
        line-height: 30px;
        margin-bottom: 25px;
        margin-top: 35px;
    }
    h6 {
        font-weight: normal;
        font-size: 18px;
        line-height: 26px;
        margin-top: 0;
        margin-bottom: 45px;
    }

    a {
        width: 202px;
        border: 1px solid #000000;
        box-sizing: border-box;
        color: #000000;
        text-decoration: none;
        text-align: center;
        line-height: 50px;
        font-weight: 500;
        font-size: 14px;
        letter-spacing: 0.05em;
        text-transform: uppercase;

        :hover {
            cursor: pointer;
            box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.3);
        }
    }
`;

export default StyledNotFoundScreen;
