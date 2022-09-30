import styled from "styled-components";

export const Wrapper = styled.div`
    width: 100%;
`;

export const ListsWrapper = styled.div`
    width: 100%;
    margin-bottom: 60px;

    @media screen and (max-width: 767px) {
        margin-bottom: 65px;
    }
`;

export const OptionsWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 45px;

    @media screen and (max-width: 767px) {
        padding-bottom: 27px;
    }
`;

export const NotesWrapper = styled(OptionsWrapper)`
    margin-bottom: 0;
    padding: 0;

    @media screen and (max-width: 767px) {
        padding-bottom: 0;
    }
`;

export const Description = styled.div`
    font-family: VinovestMedium;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 26px;
    letter-spacing: 0.005em;
    color: #242e35;
    margin: 0 auto 42px;
    width: ${(props) => (props.subPage === "rebalance-portfolio" ? "480px" : "783px")};
    text-align: center;

    a {
        color: #a86d37;
        text-decoration: none;
    }

    @media screen and (max-width: 767px) {
        margin: 32px 0;
        font-size: 12px;
        line-height: 21px;
        max-width: 317px;
    }
`;

export const FinishStepWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 28px;

    img {
        margin-bottom: 62px;
        max-width: 319px;
        width: 100%;
    }

    @media screen and (max-width: 767px) {
        padding-top: 46px;

        img {
            margin-bottom: 58px;
            max-width: 257px;
            width: 100%;
        }
    }
`;
