import React, { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import posthog from "posthog-js";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { useConfig } from "#shared/hooks";
import { languageCodeChina } from "../../utils/constants";

const BookBtn = () => {
    const [hovered, setHover] = useState(false);
    const { t } = useTranslation("about-us");
    const config = useConfig();
    const location = useLocation();
    const posthogLocation = location.pathname === "/" ? "home" : location.pathname.slice(1);

    const onBookACall = useCallback(() => {
        posthog.capture("calendly", {
            component: "BookBtn",
            progress: "launch",
            location: posthogLocation,
        });

        if (!languageCodeChina) {
            window.Calendly.initPopupWidget({
                url: config.calendly.wineExpertsUrl,
            });
        } else {
            window.location = "https://airtable.com/shr0yMiUh5ty4zjyP";
        }
    }, [config]);
    const toggleHover = () => setHover(!hovered);
    return (
        <OverWrapper className="overflow_Wrapper">
            <BookingBtn
                className={hovered ? "mouseIn" : "mouseOut"}
                onMouseEnter={() => toggleHover()}
                onMouseLeave={() => toggleHover()}
                onClick={onBookACall}
            >
                <h3 className="bannerTitle recomended">
                    <span className="sp_hide_mobile">{t("book-button.not-sure")} </span>
                    <span className="sp_only_mobile">{t("book-button.undecided")}</span>
                </h3>
                <div className="contentWrapper">
                    <h3 className="bannerTitle">{t("book-button.talk-to-expert")}</h3>
                    <div className="arrowWrapper">
                        <svg
                            width="100%"
                            height="22"
                            viewBox="0 0 380 22"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <line x1="-8.74228e-08" y1="11" x2="377" y2="11" stroke="#242E35" strokeWidth="2" />
                            <path d="M368 1L378 11L368 21" stroke="#242E35" strokeWidth="2" />
                        </svg>
                    </div>
                </div>
                <div className="circle1" />
                <div className="circle2" />
            </BookingBtn>
        </OverWrapper>
    );
};

const BookingBtn = styled.button`
    display: flex;
    cursor: pointer;
    position: relative;
    max-width: 980px;
    padding: 44px 20px;
    border: 4px solid #242e35;
    line-height: 150%;
    margin: 0 auto 0 auto;
    justify-content: center;
    flex-wrap: wrap;
    text-decoration: none;

    @media screen and (max-width: 991px) {
        padding: 40px 20px;
    }

    .sp_only_mobile {
        display: none;
    }

    .bannerTitle {
        margin-top: 20px;
        margin-bottom: 10px;
        background-color: transparent !important;
        font-family: Roslindaledisplaycondensed, sans-serif;
        font-size: 34px;
        font-weight: 500;
    }
    .recomended {
        margin-right: 10px;
    }
    .contentWrapper {
        position: relative;
        display: inline-block;
        font-weight: 500;
        text-transform: none;
    }
    .arrowWrapper {
        position: absolute;
        left: 0;
        top: auto;
        right: 0;
        bottom: -23px;
    }
    .circle1 {
        position: absolute;
        left: 14.28%;
        bottom: -50px;
        width: 90px;
        height: 90px;
        border-radius: 50%;
        z-index: -1;
        background-color: #efddc7;
    }
    .circle2 {
        position: absolute;
        left: auto;
        z-index: -1;
        top: -48px;
        border-radius: 50%;
        right: -6.42%;
        bottom: auto;
        width: 138px;
        height: 138px;
        background-color: #e6c9c9;
    }
    @media screen and (max-width: 991px) {
        .circle2 {
            top: 0;
            right: 0;
            transform: translate(50%, -34.78%);
        }
    }
    @media screen and (max-width: 768px) {
        flex-direction: column;
        align-items: center;
        .sp_hide_mobile {
            display: none;
        }
        .bannerTitle {
            text-align: center;
            font-size: 24px;
        }
        .sp_only_mobile {
            display: block;
        }
    }
`;
const OverWrapper = styled.div`
    /* overflow: hidden; */
    padding: 46px 8.888% 0px 8.888%;

    @keyframes mouseIn {
        0% {
            background-color: transparent;
            color: rgb(36, 46, 53);
            stroke: rgb(36, 46, 53);
        }
        50% {
            background-color: rgb(36, 46, 53);
            color: rgb(36, 46, 53);
            stroke: rgb(36, 46, 53);
        }

        100% {
            background-color: rgb(36, 46, 53);
            color: rgb(255, 255, 255);
            stroke: rgb(255, 255, 255);
        }
    }
    @keyframes mouseOut {
        0% {
            background-color: rgb(36, 46, 53);
            color: rgb(255, 255, 255);
            stroke: rgb(255, 255, 255);
        }
        50% {
            background-color: transparent;
            color: rgb(255, 255, 255);
            stroke: rgb(255, 255, 255);
        }
        100% {
            background-color: transparent;
            color: rgb(36, 46, 53);
            stroke: rgb(36, 46, 53);
        }
    }
    .mouseIn {
        animation: mouseIn 0.2s ease forwards;
    }
    .mouseIn line,
    .mouseIn path,
    .mouseIn h3 {
        animation: mouseIn 0.2s ease forwards;
    }
    .mouseOut {
        animation: mouseOut 0.2s ease forwards;
    }
    .mouseOut line,
    .mouseOut path,
    .mouseOut h3 {
        animation: mouseOut 0.2s ease forwards;
    }
    @media screen and (max-width: 991px) {
        padding: 46px 6.666% 0px;
    }
    @media screen and (max-width: 768px) {
    }
`;
BookBtn.styled = { OverWrapper };
export default BookBtn;
