import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import Leveraging from "./images/leveraging.svg";


const LeveragingTechnology = () => {
    const { t } = useTranslation("about-us");
    return (
        <Section>
            <h2>{t("leveraging-technology.title")}</h2>
            <p>{t("leveraging-technology.description")}</p>

            <img src={Leveraging} alt="Leveraging technology" />
        </Section>
    );
};
const Section = styled.section`
    padding: 86px 8.888% 0px 8.888%;
    display: flex;
    margin: 0 auto;
    max-width: 1440px;
    width: 100%;
    flex-direction: column;
    align-items: center;
    color: #242e35;

    h2 {
        max-width: 720px;
        font-family: Roslindaledisplaycondensed, sans-serif;
        font-size: 64px;
        text-align: center;
        margin: 0 auto 50px auto;
        font-weight: 500;
        line-height: 137%;
    }

    p {
        max-width: 940px;
        font-size: 20px;
        line-height: 160%;
        margin: 0 auto 105px auto;
        text-align: center;
        font-family: Favoritstd, sans-serif;
        @media screen and (max-width: 767px) {
            margin-bottom: 60px;
        }
    }
    img {
        max-width: 100%;
    }

    @media screen and (max-width: 991px) {
        padding: 60px 6.666% 0 6.666%;

    }
    @media screen and (max-width: 767px) {
        h2 {
            font-size: 48px;
        }
    }
    @media screen and (max-width: 480px) {
        h2 {
            font-size: 40px;
        }
    }
`;
export default LeveragingTechnology;
