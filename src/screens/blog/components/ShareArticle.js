import React from "react";
import { useTranslation } from "react-i18next";
import get from "lodash/get";
import styled from "styled-components";

const ShareArticle = ({ fixed }) => {
    const { t } = useTranslation(["blog"]);
    const [scroll, setScroll] = React.useState(document.documentElement.scrollTop);

    React.useEffect(() => {
        if (window.addthis) {
            const refresh = get(window, "addthis.layers.refresh");
            refresh && refresh();
        } else {
            const script = document.createElement("script");
            script.src = "//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5e67e40eac34d36d";
            script.async = true;
            document.body.appendChild(script);
        }
    }, []);

    React.useEffect(() => {
        if (fixed) {
            const setScrollHandler = () => setScroll(document.documentElement.scrollTop);
            window.addEventListener("scroll", setScrollHandler);

            return () => window.removeEventListener("mousemove", setScrollHandler);
        }
    }, []);

    return fixed ? (
        <ShareWrapperDark show={scroll > 214 ? 1 : 0}>
            <div className="shareWrapperLabel">{t("reading-position-bar.share")}</div>
            <Socials>
                <div className="addthis_inline_share_toolbox" />
            </Socials>
        </ShareWrapperDark>
    ) : (
        <ShareWrapper>
            <div className="shareWrapperLabel">{t("reading-position-bar.share")}</div>
            <Socials>
                <div className="addthis_inline_share_toolbox" />
            </Socials>
        </ShareWrapper>
    );
};

const ShareWrapper = styled.div`
    display: flex;
    align-items: center;
    height: 69px;
    margin-bottom: 22px;
    justify-content: space-between;
    border-top: 1px solid #d8d8d8;
    border-bottom: 1px solid #d8d8d8;

    .shareWrapperLabel {
        font-family: VinovestMedium;
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 20px;
        text-transform: uppercase;
        color: #242e35;

        @media screen and (min-width: 1233px) and (max-width: 1303px) {
            display: none;
        }
    }
`;

const Socials = styled.div`
    width: fit-content;
    display: flex;
    flex-direction: row;
    position: static;
    transform: none;

    .at-share-btn-elements {
        display: flex;
        flex-direction: row;
    }

    a {
        text-decoration: none;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 11px !important;
        margin-bottom: 0 !important;
        border: 0 !important;
        background-color: transparent !important;
        padding: 0px !important;
        width: 41px !important;
        height: 41px !important;

        span,
        svg {
            width: 41px !important;
            height: 41px !important;
        }

        svg {
            padding: 10px;
        }

        &:last-child {
            margin-right: 0 !important;
        }

        @media screen and (min-width: 1305px) and (max-width: 1400px) {
            margin-right: 0 !important;
        }
    }
`;

const ShareWrapperDark = styled(ShareWrapper)`
    position: fixed;
    bottom: -63px;
    left: 0;
    right: 0;
    background-color: #242e35;
    margin: 0;
    z-index: 99;
    border: 0;
    transition: 0.3s;
    height: 62px;
    opacity: 0;
    ${({ show }) => show && "bottom: 0; opacity: 1;"}

    .shareWrapperLabel {
        color: #fae8d1;
        margin-left: 25px;
    }

    ${Socials} {
        margin-right: 8px;

        svg {
            fill: #fae8d1 !important;
        }
        a {
            margin: 0 !important;
        }
    }
`;

export default ShareArticle;
