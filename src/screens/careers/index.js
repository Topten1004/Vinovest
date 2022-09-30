import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { TopTitle, PDescription, TopDescription, SmallSubtitle, UpperSubtitle } from "#shared/ui/Typography/styled";
import MetaTagsReplacer from "#shared/components/MetaTagsReplacer";

const careersScript = () => {
    const rtscript = document.createElement("script");
    rtscript.type = "text/javascript";
    rtscript.id = "careers-rtscript";
    rtscript.onload = function () {
        const widget = new RTWidget({
            companies: [56698],
            detailsMode: "popup",
            language: "en",
            departmentsFilter: [],
            themeVars: {
                primary: "#242e35",
                secondary: "#fae8d1",
                text: "#242e35",
                textDark: "#242e35",
                fontFamily: '"Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;',
                baseFontSize: "16px",
            },
            flags: {
                showLocation: true,
                showCountry: true,
                showCity: true,
                groupByLocation: false,
                groupByDepartment: false,
                groupByCompany: false,
            },
        });
    };
    rtscript.src = "https://d10zminp1cyta8.cloudfront.net/widget.js";
    document.body.appendChild(rtscript);

    return rtscript;
};

const Careers = () => {
    React.useEffect(() => {
        const rtscript = careersScript();

        return () => {
            rtscript && rtscript.remove();
        };
    }, []);

    const { t } = useTranslation("careers");

    const aboutWorkTranslation = t("aboutWorkData");

    const aboutWorkData = typeof aboutWorkTranslation === "object" ? aboutWorkTranslation : [];

    return (
        <Section>
            <MetaTagsReplacer title={t("header-meta.title")} description={t("header-meta.description")} />

            <TopDescription>{t("header.topSmallTitle")}</TopDescription>
            <TopTitle as="h1">{t("header.title")}</TopTitle>
            <PDescription>{t("header.description")}</PDescription>
            <OpenPositionBlock>
                <TopTitle>{t("openPositions.title")}</TopTitle>
                <div id="recruitee-careers" />
            </OpenPositionBlock>
            {aboutWorkData.map((item) => (
                <InfoAboutWork key={item.id} title={item.title} description={item.description} />
            ))}
        </Section>
    );
};

function InfoAboutWork({ ...props }) {
    return (
        <WorkInfoWraper>
            <SmallSubtitle>{props.title}</SmallSubtitle>
            <UpperSubtitle>{props.description}</UpperSubtitle>
        </WorkInfoWraper>
    );
}
const Section = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 90px 0 50px 0;
    color: #242e35;

    @media screen and (max-width: 900px) {
        width: 95%;
        margin: 0 auto;
    }

    @media screen and (max-width: 479px) {
        padding-right: 20px;
        padding-left: 20px;
    }

    ${PDescription} {
        max-width: 700px;
        margin: 30px 0px;
        color: #242e35;
        font-family: Favoritstd, sans-serif;
    }
    ${UpperSubtitle} {
        max-width: 430px;
        margin-top: 0;
        margin-bottom: 10px;
        line-height: 160%;
        font-family: Favoritstd, sans-serif;
        color: #242e35;
        font-weight: 500;
        text-transform: none;
    }

    ${TopTitle} {
        font-weight: 500;
        letter-spacing: 2px;
        color: #242e35;
    }
`;

const OpenPositionBlock = styled.div`
    justify-content: flex-start;
    border: 2px solid #242e35;
    box-shadow: 11px 11px 0 1px #efddc7;
    display: flex;
    max-width: 1040px;
    width: 100%;
    margin-top: 120px;
    margin-bottom: 110px;
    padding: 95px;
    flex-direction: column;
    position: relative;

    @media screen and (max-width: 767px) {
        padding: 68px 49px 50px;
    }

    @media screen and (max-width: 479px) {
        padding: 58px 30px 34px;
    }

    @media screen and (min-width: 479px) and (max-width: 767px) {
        width: 95%;
        margin-left: auto;
        margin-right: auto;
    }

    ${TopTitle} {
        position: absolute;
        left: 60px;
        top: -45px;
        right: auto;
        bottom: auto;
        display: inline-block;
        width: 100%;
        max-width: 421px;
        background-color: #fff;
        z-index: 1;
        white-space: nowrap;

        @media screen and (max-width: 767px) {
            left: 18px;
            top: -31px;
            max-width: 273px;
            padding-right: 10px;
            padding-left: 10px;
            font-size: 40px;
        }

        @media screen and (max-width: 400px) {
            font-size: 35px;
            left: 50%;
            top: -27px;
            transform: translateX(-50%);
            padding: 0;
            max-width: 263px;
        }

        @media screen and (max-width: 350px) {
            max-width: 237px;
        }
    }

    #recruitee-careers-details-container .rt__text--secondary,
    #recruitee-careers .rt__text--secondary {
        color: #242e35 !important;
        padding: 10px 0;
    }
    #recruitee-careers-details-container .rt-theme-light.rt-body,
    #recruitee-careers .rt-theme-light.rt-body {
        border-color: #ffffff !important;
        box-shadow: none !important;
    }
    ​ #recruitee-careers .rt-body {
        position: relative;
        border-radius: 6px;
        padding: 0px !important;
    }
    ​ #recruitee-careers .rt-icon-arrow-forward:before.rt-icon-arrow-forward {
        color: #242e35 !important;
    }

    .rt-icon-arrow-forward:before {
        color: #242e35 !important;
    }
`;

const WorkInfoWraper = styled.div`
    display: flex;
    width: 100%;
    max-width: 850px;
    margin-top: 33px;
    padding: 20px;
    justify-content: space-between;
    border-top: 1px solid #caccce;

    ${SmallSubtitle} {
        text-align: left;
    }

    ${UpperSubtitle} {
        @media screen and (max-width: 767px) {
            width: 100%;
            max-width: none;
            margin-top: 10px;
        }
    }

    @media screen and (max-width: 767px) {
        flex-direction: column;
    }
`;

export default Careers;
