import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { TopDescription, TopTitle, Description } from "#shared/ui/Typography/styled";
import earthMarksSvg from "../assets/earthMarks.svg";
import carbonOffSettingSvg from "../assets/carbonOffSetting.svg";
import minimizeShippingSvg from "../assets/minimizeShipping.svg";
import digitalOwnershipSvg from "../assets/digtialOwnership.svg";
import effectiveTransparencySvg from "../assets/effectiveTransparency.svg";
import groundedInScienceSvg from "../assets/groundedInScience.svg";

const CarbonOffsetting = () => {
    const { t } = useTranslation("sustainable-future");

    return (
        <>
            {t("our-step-toward.steps.carbonOffsetting.description1")}{" "}
            <a href="https://onetreeplanted.org/" target="_blank">
                {t("our-step-toward.steps.carbonOffsetting.description2")}
            </a>{" "}
            {t("our-step-toward.steps.carbonOffsetting.description3")}
        </>
    );
};

const dataLIst = [
    {
        header: "our-step-toward.steps.globalFacilities.title",
        description: "our-step-toward.steps.globalFacilities.description",
        svg: earthMarksSvg,
    },
    {
        Component: CarbonOffsetting,
        header: "our-step-toward.steps.carbonOffsetting.title",
        description: null,
        component: "our-step-toward.steps.carbonOffsetting.description",
        svg: carbonOffSettingSvg,
    },
    {
        header: "our-step-toward.steps.minimizeShipping.title",
        description: "our-step-toward.steps.minimizeShipping.description",
        svg: minimizeShippingSvg,
    },
    {
        header: "our-step-toward.steps.digitalOwnership.title",
        description: "our-step-toward.steps.digitalOwnership.description",
        svg: digitalOwnershipSvg,
    },
    {
        header: "our-step-toward.steps.effectiveTransparency.title",
        description: "our-step-toward.steps.effectiveTransparency.description",
        svg: effectiveTransparencySvg,
    },
    {
        header: "our-step-toward.steps.groundedInScience.title",
        description: "our-step-toward.steps.groundedInScience.description",
        svg: groundedInScienceSvg,
    },
];

const GlobalFacilitiesWrapper = () => {
    const { t } = useTranslation("sustainable-future");

    return (
        <GlobalFacilities
            dataLIst={dataLIst}
            title={t("our-step-toward.title")}
            description={t("our-step-toward.topSmallTitle")}
            text={t("our-step-toward.description")}
        />
    );
};

const GlobalFacilitiesValueList = ({ dataLIst }) => (
    <OptionsContainer>
        {dataLIst.map((p) => (
            <GlobalFacilitiesProp key={p.header} {...p} />
        ))}
    </OptionsContainer>
);

const GlobalFacilitiesProp = ({ header, description, svg, Component }) => {
    const { t } = useTranslation("sustainable-future");

    return (
        <GlobalFacilitiesPropContainer>
            <img className="globalFacilitiesPropImg" src={svg} alt={header} />
            <span className="globalFacilitiesPropHeader">{t(header)}</span>
            <span className="globalFacilitiesPropDesc">{description ? t(description) : <Component />}</span>
        </GlobalFacilitiesPropContainer>
    );
};

export const GlobalFacilities = ({ dataLIst, title, description, text }) => (
    <Container>
        <TopDescription>{description}</TopDescription>
        <TopTitle>{title}</TopTitle>
        {text && <Description>{text}</Description>}
        <GlobalFacilitiesValueList dataLIst={dataLIst} />
    </Container>
);

const Container = styled.div`
    padding-top: 100px;
    color: #242e35;
    padding-right: 15px;
    padding-left: 15px;

    ${TopDescription},
    ${TopTitle},
    ${Description} {
        margin-left: auto;
        margin-right: auto;
    }

    ${TopDescription} {
        @media screen and (max-width: 767px) {
            font-size: 18px;
            line-height: 32px;
            margin-bottom: 24px;
            margin-top: 0;
        }
    }

    ${TopTitle} {
        margin-top: 30px;
        margin-bottom: 30px;

        @media screen and (max-width: 767px) {
            font-size: 40px;
            line-height: 54px;
            margin: 0 auto 28px;
        }
    }

    ${Description} {
        max-width: 700px;
        text-align: center;
        padding: 0;
        line-height: 36px;

        @media screen and (max-width: 767px) {
            font-size: 16px;
            line-height: 26px;
        }
    }

    @media screen and (max-width: 767px) {
        padding-right: 24px;
        padding-left: 24px;
        padding-top: 68px;
    }
`;

const OptionsContainer = styled.div`
    text-align: center;
    border: none;
    box-shadow: none;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    margin-top: 43.74px;
    max-width: 1200px;
    width: 100%;
    flex-direction: column;

    ${(p) => p.theme.media.greaterThan("767px")`
        flex-direction: row;
        align-items: stretch;
    `}
`;

const GlobalFacilitiesPropContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 28.7%;
    width: 100%;
    max-width: 32.7%;
    margin-bottom: 30px;
    padding: 0 15px;

    @media screen and (max-width: 767px) {
        max-width: 100%;
        width: 100%;
    }

    @media screen and (max-width: 1024px) {
        padding: 0;
    }

    .globalFacilitiesPropImg {
        margin-top: 43px;
        max-width: 290px;
        object-fit: cover;
        width: 100%;
    }
    .globalFacilitiesPropHeader {
        margin-top: 20px;
        margin-bottom: 20px;
        font-family: Roslindaledisplaycondensed, sans-serif;
        font-size: 32px;
        line-height: 150%;
        font-weight: 500;
        color: #242e35;
    }
    .globalFacilitiesPropDesc {
        font-family: ${(p) => p.theme.fonts.body};
        font-size: 16px;
        line-height: 24px;
        color: #242e35;

        a {
            color: inherit;
        }
    }
`;

export default GlobalFacilitiesWrapper;
