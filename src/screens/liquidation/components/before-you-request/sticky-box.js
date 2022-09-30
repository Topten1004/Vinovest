import React from "react";
import { useTranslation } from "react-i18next";
import posthog from "posthog-js";
import styled from "styled-components";
import { MainButton } from "#shared/ui";
import { useConfig } from "#shared/hooks";
import { languageCodeChina } from "../../../../utils/constants";

import Elaine from "../assets/icons/Elaine.png";

const StickyBox = () => {
    const { t } = useTranslation(["liquidation"]);

    const config = useConfig();
    const onBookACall = React.useCallback(() => {
        posthog.capture("calendly", { component: "StickyBox", progress: "launch", location: "liquidationFlow" });
        if (!languageCodeChina) {
            window.Calendly.initPopupWidget({
                url: config.calendly.wineExpertsUrl,
            });
        } else {
            window.location = "https://airtable.com/shr0yMiUh5ty4zjyP";
        }
    }, [config]);

    return (
        <StickyBoxWrapper>
            <div>
                <Title>{t("sticky_box_title")}</Title>
                <Text>{t("sticky_box_subtitle")}</Text>
            </div>{" "}
            <div>
                <Support>
                    <div className="advisor-avatar">
                        <img src={Elaine} width="54" height="54" alt="support" />
                    </div>
                    <div>
                        <div className="advisor-title">{t("elaine_lau")}</div>
                        <div className="advisor-name">{t("manager")}</div>
                    </div>
                </Support>
                <MainButtonExtended onClick={onBookACall}>{t("book_call")}</MainButtonExtended>
            </div>
        </StickyBoxWrapper>
    );
};

const StickyBoxWrapper = styled.div`
    position: sticky;
    top: 84px;
    width: 100%;
    padding: 43px;
    padding-bottom: 49px;
    background: #242e35;
    border: 1px solid #eeeeee;
    box-sizing: border-box;
    box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.1);
    border-radius: 10px;

    @media screen and (min-width: 768px) and (max-width: 1024px) {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr;
        gap: 0 41px;
        grid-template-areas: ". .";
        padding: 43px;
    }
`;

const Title = styled.div`
    font-family: RoslindaleDisplayCondensed;
    font-style: normal;
    font-weight: bold;
    font-size: 32px;
    line-height: 41px;
    color: #fae8d1;
`;

const Text = styled.div`
    margin-top: 9px;
    font-family: VinovestMedium;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 21px;
    letter-spacing: 0.005em;
    color: #e7d3bc;
`;

const Support = styled.div`
    margin-top: 30px;
    display: flex;
    align-items: center;

    .advisor-avatar {
        margin-right: 13px;
        position: relative;

        &:after {
            box-sizing: border-box;
            content: " ";
            position: absolute;
            bottom: 4px;
            right: -1.5px;
            border-radius: 50%;
            display: block;
            width: 15px;
            height: 15px;
            background: #80cb83;
            border: 2px solid #ffffff;
        }
    }

    .advisor-title,
    .advisor-name {
        font-family: VinovestMono;
        font-style: normal;
        font-weight: normal;
        font-size: 11px;
        line-height: 20px;
        letter-spacing: 0.025em;
        text-transform: uppercase;
        color: #fae8d1;
    }
    .advisor-name {
        text-transform: unset;
    }

    @media screen and (min-width: 768px) and (max-width: 1024px) {
        display: flex;
        justify-content: center;
    }
`;

const MainButtonExtended = styled(MainButton)`
    margin-top: 31px !important;
    height: 44px;
    white-space: nowrap;
`;

export default StickyBox;
