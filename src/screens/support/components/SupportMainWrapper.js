import React from "react";
import styled from "styled-components";
import { I18nLink as Link } from "#localization/localizedRouter";

import { useTranslation } from "react-i18next";

const SupportMainWrapper = ({ children }) => {
    const { t } = useTranslation("support");

    return (
        <>
            <Wrapper>{children}</Wrapper>
            <BannerWrapper>
                <Banner to="/contact-us">
                <div className="circleSmall" />
                <div className="circleBig" />
                {t("contact-us.cant-find")} <span>{t("contact-us.contact")}</span>
                </Banner>
            </BannerWrapper>
        </>
    );
};

const Wrapper = styled.div`
    padding-top: 118px;
    padding-right: 40px;
    padding-left: 40px;
    color: #242e35;

    @media screen and (max-width: 480px) {
        padding-right: 15px;
        padding-left: 15px;
    }
`;

export const Title = styled.h1`
    font-size: 45px;
    line-height: 60px;
    text-align: center;
    font-family: Roslindaledisplaycondensed, sans-serif;
    font-weight: 500;
`;

export const BannerWrapper = styled.div`
    position: relative;
    padding-left: 24px;
    padding-right: 24px;
    margin-bottom: 180px;
    padding-top: 180px;

    
`;

export const Banner = styled(Link)`
    position: relative;
    display: block;
    text-decoration: none;
    text-transform: none;
    width: 100%;
    max-width: 980px;
    text-align: center;
    color: #242e35;
    border: 4px solid #242e35;
    margin-right: auto;
    margin-left: auto;
    padding: 50px 0;
    font-size: 32px;
    line-height: 48px;
    font-family: Roslindaledisplaycondensed, sans-serif;
    font-weight: 500;
    letter-spacing: 0.035em;
    transition: 0.3s;

    @media screen and (max-width: 991px) {
        font-size: 24px;
    }

    .circleSmall,
    .circleBig {
        border-radius: 50%;
        position: absolute;
        z-index: -1;
    }

    .circleSmall {
        width: 90px;
        height: 90px;
        background-color: rgb(239, 221, 199);
        bottom: -55px;
        left: 10%;
    }

    .circleBig {
        width: 138px;
        height: 138px;
        background-color: rgb(230, 201, 201);
        transform: translateY(-75%);
        right: -8%;
    }

    span {
        position: relative;
        display: inline-block;
        white-space: nowrap;

        &:before,
        &:after {
            content: " ";
            display: block;
            position: absolute;
        }

        &:before {
            bottom: -20px;
            border-bottom: 2px solid #242e35;
            width: 100%;
        }

        &:after {
            bottom: -27px;
            right: 0;
            border-bottom: 2px solid #242e35;
            border-left: 2px solid #242e35;
            width: 14px;
            height: 14px;
            transform: rotate(-135deg);
        }
    }

    &:hover {
        color: #fff;
        background-color: #242e35;
    }
`;

export default SupportMainWrapper;
