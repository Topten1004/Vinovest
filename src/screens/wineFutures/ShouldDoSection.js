import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import shouldDo from "./images/shouldDoImg.svg";
import { TopTitle, PDescription } from "#shared/ui/Typography/styled";

const ShouldDoSection = () => {
    const { t } = useTranslation("why-wine");

    return (
        <Section>
            <TopTitle>{t("wine_futures.should_do.title")}</TopTitle>
            <ContentWrapper>
                <div className="imageWrapper">
                    <img src={shouldDo} alt="what you should do" />
                </div>
                <div className="text_Wrapper">
                    <PDescription>{t("wine_futures.should_do.top_description")}</PDescription>
                    <PDescription>{t("wine_futures.should_do.bottom_description")}</PDescription>
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
    display: flex;
    max-width: 1014px;
    width: 100%;
    justify-content: space-between;

    .text_Wrapper {
        padding-top: 40px;
        max-width: 499px;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .imageWrapper {
        max-width: 415px;
        width: 100%;
        img {
            width: 100%;
            object-fit: contain;
        }
    }
    ${PDescription} {
        text-align: start;
    }
    @media (max-width: 991px) {
        flex-direction: column;
        align-items: center;
        .text_Wrapper {
            max-width: 100%;
            width: 100%;
        }
        ${PDescription}:first-child {
            margin-bottom: 30px;
        }
    } ;
`;
export default ShouldDoSection;
