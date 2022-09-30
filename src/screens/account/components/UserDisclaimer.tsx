import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

export const UserDisclaimer = () => {
    const { t } = useTranslation("account");

    return <Disclaimer>{t("disclaimer")} </Disclaimer>;
};

const Disclaimer = styled.div`
    color: #767a7f;
    font-size: 0.688rem;
    margin-bottom: 1.5rem;
`;
