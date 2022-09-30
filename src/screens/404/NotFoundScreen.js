import React from "react";
import { I18nLink } from "#localization/localizedRouter";
import { ReactComponent as NotFoundIcon } from "./assets/404_bottle.svg";
import StyledNotFoundScreen from "./NotFoundScreen.styled";
import { createGlobalStyle } from "styled-components";
import { useTranslation } from "react-i18next";

const GlobalStyle = createGlobalStyle` 
footer{
display: none !important;
}`;

const NotFoundScreen = () => {
    const { t } = useTranslation(["404"]);
    return (
        <StyledNotFoundScreen>
            <GlobalStyle />
            <NotFoundIcon />
            <h1 data-testid="title">{t("title")}</h1>
            <h6 data-testid="subtitle">{t("subtitle")}</h6>
            <I18nLink to="/" data-testid="back">
                {t("back_link")}
            </I18nLink>
        </StyledNotFoundScreen>
    );
};

export default NotFoundScreen;
