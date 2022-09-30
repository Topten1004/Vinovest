import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import face from "./images/face.svg";
import handshake from "./images/HandShake.svg";
import MetaTagsReplacer from "#shared/components/MetaTagsReplacer";

const Header = () => {
    const { t } = useTranslation("advisory-council");

    return (
        <Section>
            <MetaTagsReplacer
                title={t("head-meta.title")}
                description={t("head-meta.description")}
            />

            <span>{t("head.topSmallTitle")}</span>
            <h1>{t("head.title")}</h1>
            <p>{t("head.description")}</p>
            <img className="face" alt="face_img" src={face} />
            <img className="handshake" alt="hand shake" src={handshake} />
        </Section>
    );
};

const Section = styled.section`
    max-width: 850px;
    margin: 0 auto;
    width: 100%;
    display: flex;
    padding-top: 80px;
    position: relative;
    align-items: center;
    flex-direction: column;
    color: #242e35;
    margin-bottom: 300px;

    span {
        font-family: Favoritmonostd, sans-serif;
        font-size: 18px;
        line-height: 178%;
        font-weight: 400;
        margin-bottom: 30px;
    }
    h1 {
        font-size: 64px;
        margin: 0;
        text-align: center;
        font-family: Roslindaledisplaycondensed, sans-serif;
        line-height: 133.33%;
        font-weight: 500;
        position: relative;
        z-index: 10;
    }
    p {
        max-width: 700px;
        line-height: 36px;
        text-align: center;
        font-size: 20px;
        text-align: center;
        position: relative;
        z-index: 10;
    }
    img {
        position: absolute;
    }

    .face {
        left: auto;
        top: 0;
        right: -17%;
        bottom: auto;
    }
    .handshake {
        left: -32%;
        top: auto;
        right: auto;
        bottom: -54%;
    }
    @media (max-width: 1200px) {
        margin-bottom: 250px;
        .handshake {
            left: -9%;
            bottom: 13%;
            width: 269px;
            transform: translateY(100%);
        }
        .face {
            right: 0%;
        }
    }
    @media (max-width: 767px) {
        img {
            display: none;
        }
    }
    @media (max-width: 767px) {
        padding: 0 20px;
        padding-top: 80px;
        h1 {
            margin-top: 0px;
            margin-bottom: 0px;
            font-size: 48px;
        }
        span {
            margin-bottom: 15px;
        }
    } ;
`;

export { Header };
