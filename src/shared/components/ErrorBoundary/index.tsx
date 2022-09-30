import * as React from "react";
import styled from "styled-components";
import unpluggedIconSvg from "#assets/shared/unplugged.svg";
import { MainButton } from "#shared/ui";
import { useTranslation } from "react-i18next";

interface IerrorBoundaryProps {
    error: Error;
    componentStack?: any[];
    resetError: () => void;
}

const ErrorBoundary = (props: IerrorBoundaryProps): JSX.Element => {
    const { t } = useTranslation("common");
    const { error, componentStack, resetError } = props;
    return (
        <ErrorPageContainer>
            <Title>{t("error-boundry.title")}</Title>
            <Img src={unpluggedIconSvg} />
            <Description>
                <p>{t("error-boundry.description")}</p>
                <p>{t("error-boundry.hold")}</p>
            </Description>
            <RetryButton
                onClick={() => {
                    window.location.href = "/login";
                    resetError();
                }}
            >
                {t("error-boundry.button-retry")}
            </RetryButton>

            <ErrorMsgLabel>{t("error-boundry.error")}</ErrorMsgLabel>
            <ErrorMsgContainer>{`"${error}"`}</ErrorMsgContainer>
        </ErrorPageContainer>
    );
};

export default ErrorBoundary;

const ErrorPageContainer = styled.div`
    font-family: ${(p) => p.theme.fonts.body};
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 900px;
    margin: 0 auto;
    height: 90vh;
    padding: 15px;
    color: ${(p) => p.theme.colors.mainAccentBlue};
    ${(p) => p.theme.media.greaterThan("768px")`
    height: 80vh;
  `}
`;

const Title = styled.div`
    font-family: ${(p) => p.theme.fonts.title};
    margin-bottom: 32px;

    font-size: 36px;
    ${(p) => p.theme.media.greaterThan("768px")`
    font-size: 42px;
  `}
`;

const Img = styled.img`
    margin-bottom: 32px;
`;

const Description = styled.div`
    text-align: center;
    margin-bottom: 28px;

    font-size: 16px;
    line-height: 24px;
    ${(p) => p.theme.media.greaterThan("768px")`
    font-size: 18px;
    line-height: 30px;
  `}

    p {
        margin: 0;
    }
`;

const ErrorMsgLabel = styled.label`
    font-family: ${(p) => p.theme.fonts.label};
    font-size: 12px;
    text-transform: uppercase;
    width: 100%;
    text-align: left;
    max-width: 500px;
`;
const ErrorMsgContainer = styled.div`
    background: ${(p) => p.theme.colors.lightGray};
    font-family: ${(p) => p.theme.fonts.label};
    text-transform: uppercase;
    font-size: 12px;
    line-height: 18px;
    padding: 20px;
    width: 100%;
    max-width: 500px;
`;

const RetryButton = styled(MainButton)`
    margin: 0 0 72px 0 !important;
    max-width: 500px !important;
`;
