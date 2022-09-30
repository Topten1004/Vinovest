import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import recImg from "./images/recommendationImg.svg";
import { TopTitle, PDescription } from "#shared/ui/Typography/styled";

const RecommedSection = () => {
    const { t } = useTranslation("why-wine");
    return (
        <Section>
            <TopTitle>{t("wine_futures.recommended.title")}</TopTitle>
            <ContentWrapper>
                <PDescription>{t("wine_futures.recommended.description")}</PDescription>
                <div className="imageWrapper">
                    <img alt="wine recomendations" src={recImg} />
                </div>
            </ContentWrapper>
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
    ${TopTitle} {
        margin-bottom: 100px;
    }
    @media (max-width: 991px) {
        padding: 30px 6.666% 100px;
        ${TopTitle} {
            margin-bottom: 50px;
        }
    }
`;
const ContentWrapper = styled.div`
    max-width: 1014px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    .imageWrapper {
        max-width: 415px;
        width: 100%;
        img {
            width: 100%;
            object-fit: contain;
        }
    }
    ${PDescription} {
        max-width: 499px;
        width: 100%;
        text-align: start;
    }
    @media (max-width: 991px) {
        flex-direction: column-reverse;
        align-items: center;
        .imageWrapper {
            margin-bottom: 30px;
        }
        ${PDescription} {
            max-width: 100%;
        }
    }
`;

export default RecommedSection;
