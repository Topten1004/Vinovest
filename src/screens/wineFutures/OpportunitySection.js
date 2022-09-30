import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import oportunityImg from "./images/decadeOppurtunity.jpeg";
import { TopTitle, TopDescription, PDescription } from "#shared/ui/Typography/styled";

const OpportunitySection = () => {
    const { t } = useTranslation("why-wine");
    return (
        <Section>
            <TopDescription>{t("wine_futures.opportunity.top_description")}</TopDescription>
            <TopTitle>{t("wine_futures.opportunity.title")}</TopTitle>
            <ImgWrp>
                <img src={oportunityImg} alt="Wine Opportunity" />
            </ImgWrp>
            <PDescription>{t("wine_futures.opportunity.bottom_description")}</PDescription>
        </Section>
    );
};
const Section = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 1440px;
    padding: 30px 8.888% 100px;
    margin: 0 auto;
    ${TopDescription} {
        margin-bottom: 25px;
    }
    ${TopTitle} {
        margin-bottom: 50px;
    }
    ${PDescription} {
        max-width: 950px;
        text-align: start;
    }
    @media screen and (max-width: 991px) {
        padding: 30px 6.666% 100px;
    } ;
`;
const ImgWrp = styled.div`
    max-width: 1000px;
    margin-bottom: 60px;
    img {
        width: 100%;
        object-fit: contain;
    }
`;

export default OpportunitySection;
