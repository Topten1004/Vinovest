import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import posthog from "posthog-js";
import { Fade } from "#shared/ui";
import { MainButton } from "#shared/ui";
import { useConfig } from "#shared/hooks";
import { ROUTE_PATHS } from "../../../route-paths";
import { useHistory } from "#shared/hooks/useHistory";
import { languageCodeChina } from "../../../../utils/constants";

const RebalancePortfolio = () => {
    const config = useConfig();
    const history = useHistory();
    const { t } = useTranslation(["liquidation"]);
    const onBookACall = React.useCallback(() => {
        posthog.capture("rebalance_calendly", {
            component: "RebalancePortfolio",
            progress: "launch",
            location: "liquidationFlow",
        });
        if (!languageCodeChina) {
            window.Calendly.initPopupWidget({
                url: config.calendly.rebalancing
            })
        } else {
            window.location.href = "https://airtable.com/shr0yMiUh5ty4zjyP";
        }
    }, [config]);
    const goToDashboard = () => {
        history.push(ROUTE_PATHS.home);
        try {
            posthog.capture("leave_liquidation", {});
        } catch (err) {}
    };
    return (
        <Fade in>
            <ButtonsWrapper>
                <BookACall onClick={onBookACall}>{t("book_a_call")}</BookACall>
                <Return onClick={goToDashboard}>{t("return_to_dashboard")}</Return>
            </ButtonsWrapper>
        </Fade>
    );
};

export default RebalancePortfolio;

const ButtonsWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    width: 630px;
    margin-top: 20px;
    margin-left: auto;
    margin-right: auto;
    @media screen and (max-width: 767px) {
        flex-direction: column;
        width: 100%;
        align-items: center;
    }
`;

const BookACall = styled(MainButton)`
    height: 70px;
    width: 287px;
    border-radius: 0px;
    @media screen and (max-width: 767px) {
        width: 100%;
        margin-bottom: 24px;
    }
`;

const Return = styled(BookACall)`
    background: #ffffff;
    border: 1px solid #caccce;
    color: #242e35;
    background: #ffffff;
    border: 1px solid #caccce;
    @media screen and (max-width: 767px) {
        width: 100%;
    }
`;