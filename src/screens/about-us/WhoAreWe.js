import React from "react";
import { I18nLink as Link } from "#localization/localizedRouter";

import styled from "styled-components";
import { useTranslation } from "react-i18next";
import arrow from "./images/arrow.svg";
import { membersData } from "./imagesLinks";

const WhoWeAre = () => {
    const { t } = useTranslation("about-us");

    return (
        <Wrapper>
            <MembersSection>
                <div className="content_wrapper">
                    <div className="upperWrapper">
                        <span>{t("who-are-we.title-question")}</span>
                        <h2>{t("who-are-we.answer-title")}</h2>
                        <p>{t("who-are-we.answer-description")}</p>
                    </div>
                    <ul className="memeberWrapper">
                        {membersData.map((member) => (
                            <li className="memeberItem" key={member.photo}>
                                <img src={member.photo} alt={t("who-are-we.alt-member")} height="284" width="284" />
                                <h3 className="memberName">{member.title}</h3>
                                <span className="memberPosition">{member.position}</span>
                                <p className="memberText">{member.text}</p>
                            </li>
                        ))}
                        <li className="arrowWrapper">
                            <Link to="/careers">
                                <h3 className="memberName memberName--noWrap">{t("who-are-we.open-positions")}</h3>
                                <img
                                    className="arrow"
                                    src={arrow}
                                    alt={t("who-are-we.alt-arrow")}
                                    height="24"
                                    width="284"
                                />
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="blue_bg" />
            </MembersSection>
        </Wrapper>
    );
};
const Wrapper = styled.div`
    padding: 0px 8.888% 0px 8.888%;

    @media screen and (max-width: 991px) {
        padding: 0;
    }
`;

const MembersSection = styled.section`
    position: relative;
    z-index: 1;
    max-width: 1273px;
    display: flex;
    margin: 170px auto 0 auto;
    width: 100%;
    flex-direction: column;
    align-items: center;
    color: #242e35;

    .upperWrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .content_wrapper {
        z-index: 3;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    span {
        text-transform: uppercase;
        margin-bottom: 24px;
        font-family: Favoritmonostd, sans-serif;
        font-size: 18px;
    }
    h2 {
        font-family: Roslindaledisplaycondensed, sans-serif;
        font-size: 64px;
        text-align: center;
        margin: 0 auto 50px auto;
        max-width: 1000px;
        font-weight: 500;
        line-height: 137%;
    }
    p {
        max-width: 680px;
        font-size: 20px;
        line-height: 160%;
        margin: 0 auto 25px auto;
        text-align: center;
        font-family: Favoritstd, sans-serif;
    }
    .memeberWrapper {
        padding: 0;
        display: grid;
        grid-auto-columns: 1fr;
        grid-column-gap: 30px;
        grid-row-gap: 40px;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        grid-template-rows: auto auto;
        margin-bottom: 150px;
        @media screen and (max-width: 767px) {
            margin-bottom: 0;
        }
    }
    .memeberItem {
        width: 100%;
        height: 100%;
        list-style: none;
        position: relative;
        padding: 9% 7%;
        background-color: #242e35;
        color: #efddc7;

        @media screen and (max-width: 479px) {
            .memberName {
                font-size: 35px;
                line-height: 60px;
            }

            .memberName--noWrap {
                white-space: nowrap;
            }
        }

        @media screen and (max-width: 374px) {
            .memberName {
                font-size: 33px;
                line-height: 57px;
            }
        }
    }

    .arrowWrapper {
        list-style: none;
        border: 4px solid #242e35;
        padding-top: 26px;
        padding-left: 52px;
        padding-right: 52px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        grid-column: 2 / 4;
        width: 425px;
        margin: 34px auto 0;
        @media screen and (max-width: 1199px) {
            grid-column: 2/3;
            width: 100%;
            margin: 0 auto;
        }
        @media screen and (max-width: 1023px) {
            grid-column: 1/3;
            width: 425px;
        }
        @media screen and (max-width: 767px) {
            grid-column: 1/2;
            width: 100%;
            padding-bottom: 26px;
            padding-left: 30px;
            padding-right: 30px;
            margin: 20px auto 0;
        }
    }

    a {
        text-decoration: none;
        color: inherit;
    }
    img {
        width: 100%;
        max-width: 100%;
        margin-bottom: 20px;
        height: auto;
    }
    h3 {
        font-family: Roslindaledisplaycondensed, sans-serif;
        font-size: 32px;
        line-height: 41px;
        text-align: center;
        white-space: normal;
        font-weight: 500;
        margin-top: 0;
        margin-bottom: 10px;
    }
    .memberPosition {
        display: block;
        margin-bottom: 16px;
        font-family: Favoritmonostd, sans-serif;
        font-size: 14px;
        line-height: 24px;
        font-weight: 400;
        text-align: center;
        text-transform: uppercase;
    }
    .memberText {
        font-size: 14px;
        line-height: 21px;
        text-align: center;
        font-weight: 400;
        margin-bottom: 0;
    }
    .carrerLink {
        color: #efddc7;
        text-decoration: none;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .blue_bg {
        position: absolute;
        left: 0;
        height: 98%;
        top: 90px;
        right: 0;
        bottom: 0;
        max-width: 88%;
        margin-right: auto;
        margin-left: auto;
        background-color: #c5d5e4;
        z-index: 0;

        @media screen and (max-width: 991px) {
            max-width: 77%;
        }
    }
    @media screen and (max-width: 1199px) {
        .memeberWrapper {
            grid-template-columns: 1fr 1fr 1fr;
        }
        .blue_bg {
            height: 98.3%;
        }
    }
    @media screen and (max-width: 1023px) {
        margin-bottom: 0;
        padding: 0 6.666% 0px 6.666%;
        .memeberWrapper {
            grid-template-columns: 1fr 1fr;
        }
        .blue_bg {
            height: 98.8%;
        }
    }
    @media screen and (max-width: 767px) {
        margin-top: 101px;
        h2 {
            font-size: 48px;
        }
        .arrow {
            max-width: 240px;
            margin: 0 auto;
        }
        .memeberWrapper {
            grid-template-columns: 1fr;
        }
        .blue_bg {
            max-width: 100%;
            width: 100%;
            right: 0;
            left: 0;
            height: 99.9%;
            top: 79px;
        }
    }
    @media screen and (max-width: 480px) {
        h2 {
            font-size: 44px;
        }
    } ;
`;
export default WhoWeAre;
