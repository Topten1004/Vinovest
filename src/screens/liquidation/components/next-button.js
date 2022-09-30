import React from "react";
import PulseLoader from "react-spinners/PulseLoader";

import { MainButton } from "#shared/ui";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const NextButton = ({ goNext, nextTitle, disabled, isLoading }) => {
    const { t } = useTranslation(["liquidation"]);
    return (
        <Next disabled={!goNext || disabled} onClick={goNext}>
            {isLoading ? <PulseLoader size={8} margin="10px" color="#828282" loading /> : nextTitle || t("next")}
        </Next>
    );
};

const Next = styled(MainButton)`
    outline: 0;
    max-width: 393px !important;
    width: 100% !important;
    height: 70px;
    margin: 0 auto;
    position: relative;

    @media screen and (max-width: 1024px) {
        height: 60px;
    }
`;

export default NextButton;
