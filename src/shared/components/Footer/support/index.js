/* eslint-disable no-empty */
/* eslint-disable vars-on-top */
/* eslint-disable no-var */
import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { FooterTitle } from "../styles";

import ElanieImg from "./assets/Elaine.png";
import LaurenImg from "./assets/Lauren.png";
import { languageCodeChina } from "../../../../utils/constants";
import DownloadIosApp from "./DownloadIosApp";
import DownloadAndroidApp from "./DownloadAndroidApp";

const Support = () => {
    const { t } = useTranslation("footer");

    React.useEffect(() => {
        try {
            window.bbbprotocol = document.location.protocol == "https:" ? "https://" : "http://";
            // eslint-disable-next-line wrap-iife
            (function () {
                var s = document.createElement("script");
                s.src = `${window.bbbprotocol}seal-sanjose.bbb.org${unescape("%2Flogo%2Fvinovest-1284751.js")}`;
                s.type = "text/javascript";
                s.defer = true;
                setTimeout(() => {
                    try {
                        var st = document.body.getElementsByTagName("script");
                        if (st) {
                            st = st[st.length - 1];
                            var pt = st.parentNode;
                            document.body.appendChild(s);
                            if (pt) {
                                pt.insertAdjacentElement("afterbegin", s);
                            }
                        }
                    } catch (e) {}
                }, 1500);
            })();
        } catch (err) {}
    }, []);

    return (
        <SupportWrapper>
            <FooterTitle>{t("support.title")}</FooterTitle>
            <BindWithSupport>
                <div className="imgWrap">
                    <img src={ElanieImg} width="44" height="40" alt="Elaine Lau" />
                </div>
                <div className="links">
                    <a href="mailto:hello@vinovest.co?subject=I've%20got%20a%20question%20about%20Vinovest">
                        hello@vinovest.co
                    </a>
                    <a
                        className="bottomLink"
                        href="mailto:hello@vinovest.co?subject=I've%20got%20a%20question%20about%20Vinovest"
                    >
                        {t("support.reply")}
                    </a>
                </div>
            </BindWithSupport>
            <BindWithSupport className="last">
                <div className="imgWrap">
                    <img src={LaurenImg} width="44" height="40" alt="Lauren Bletcher" />
                </div>

                <div className="links">
                    <a href="tel:+1213-410-4546">+1 &nbsp;213-410-4546</a>
                    <a className="bottomLink" href="tel:+1949-415-8730">
                        {t("support.hours")}
                    </a>
                </div>
            </BindWithSupport>
            <a
                target="_blank"
                rel="noopener noreferrer"
                id="bbblink"
                className="accreditedBBB ruhzbum"
                href="https://www.bbb.org/us/ca/culver-city/profile/wholesale-wine/vinovest-inc-1216-1284751#bbbseal"
                title="Vinovest Inc., Wholesale Wine, Culver City, CA"
            >
                <img
                    className="accreditedImg"
                    id="bbblinkimg"
                    src="https://seal-sanjose.bbb.org/logo/ruhzbum/vinovest-1284751.png"
                    width="300"
                    height="68"
                    alt="Vinovest Inc., Wholesale Wine, Culver City, CA"
                />
            </a>
            {!languageCodeChina && (
                <div className="stores">
                    <DownloadIosApp />
                    <DownloadAndroidApp />
                </div>
            )}
        </SupportWrapper>
    );
};

const SupportWrapper = styled.div`
    padding-top: 30px;
    padding-bottom: 47px;
    padding-left: 66px;

    ${FooterTitle} {
        margin-bottom: 29px;
    }

    @media screen and (max-width: 1300px) {
        padding-left: 30px;
    }

    @media screen and (max-width: 767px) {
        padding: 0;
    }

    .accreditedBBB {
        /* max-width: 150px; */
        display: block;
        position: relative;
        overflow: hidden;
        width: 150px;
        height: 68px;
        margin: 0px;
        padding: 0px;

        .accreditedImg {
            padding: 0px;
            border: none;
        }
    }

    .fbi_newsletter {
        border-radius: 0px !important;
    }
    .stores {
        margin-top: 50px;
    }
`;

const BindWithSupport = styled.div`
    display: flex;
    align-items: center;

    &.last {
        margin-top: 21px;
        margin-bottom: 45px;
    }
    @media screen and (max-width: 1024px) {
        &.last {
            margin-top: 21px;
            margin-bottom: 36px;
        }
    }

    .imgWrap {
        width: 40px;
        margin-right: 26px;

        img {
            display: block;
            flex-shrink: 0;
            height: auto;
            width: 100%;
        }
    }

    .links {
        a {
            font-family: VinovestMedium;
            text-decoration: none;
            font-style: normal;
            font-weight: 500;
            font-size: 16px;
            line-height: 30px;
            display: block;
            color: #fae8d1;
        }

        .bottomLink {
            color: #7edf83;
        }
    }
`;

export default Support;
