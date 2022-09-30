import React from "react";
import { I18nLink as Link } from "#localization/localizedRouter";

import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { vinovestCouncil } from "./imagesLinks";

const VinovestCouncil = () => {
    const { t } = useTranslation("about-us");
    return (
        <Wrapper>
            <MembersSection>
                <div className="content_wrapper">
                    <h2>{t("who-are-we.council")}</h2>
                    <ul className="memeberWrapper">
                        {vinovestCouncil.map((member) => (
                            <li className="memeberItem" key={member.photo}>
                                <img src={member.photo} alt={t("who-are-we.alt-member")} height="284" width="284" />
                                <h3 className="memberName">{member.title}</h3>
                                <span className="memberPosition">{member.position}</span>
                                <p className="memberText">{member.text}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </MembersSection>
        </Wrapper>
    );
};

export default VinovestCouncil;

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
    margin: 20px auto 0 auto;
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
    h2 {
        font-family: Roslindaledisplaycondensed, sans-serif;
        font-size: 64px;
        text-align: center;
        margin: 0 auto 70px auto;
        max-width: 1000px;
        font-weight: 500;
        line-height: 137%;
        @media screen and (max-width: 767px) {
            margin-top: 20px;
        }
    }
    .memeberWrapper {
        padding: 0;
        display: grid;
        grid-auto-columns: 1fr;
        grid-column-gap: 30px;
        grid-row-gap: 40px;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        grid-template-rows: auto auto;
        margin-bottom: 100px;
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
        line-height: 32px;
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

    @media screen and (max-width: 1199px) {
       .memeberWrapper {
            grid-template-columns: 1fr 1fr 1fr;
        }
    }
    @media screen and (max-width: 1023px) {
        margin-bottom: 0;
        padding: 0 6.666% 0px 6.666%;
        .memeberWrapper {
            grid-template-columns: 1fr 1fr;
        }
    }
    @media screen and (max-width: 767px) {
        margin-top: 101px;
        h2 {
            font-size: 48px;
        }
        .memeberWrapper {
            grid-template-columns: 1fr;
        }
    }
    @media screen and (max-width: 480px) {
        h2 {
            font-size: 44px;
        }
    } ;
`;
