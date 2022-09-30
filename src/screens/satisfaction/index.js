import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { TopTitle, PDescription } from "#shared/ui/Typography/styled";
import MetaTagsReplacer from "#shared/components/MetaTagsReplacer";

const Satisfaction = () => {
    const { t } = useTranslation("the-vinovest-satisfaction-guarantee");

    return (
        <Section>
            <MetaTagsReplacer title={t("head-meta.title")} description={t("head-meta.description")} />

            <TopTitle as="h1">
                {t("head.title1")}
                <br />
                {t("head.title2")}
            </TopTitle>
            <PDescription>{t("head.description1")}</PDescription>
            <PDescription>{t("head.description2")}</PDescription>
        </Section>
    );
};

const Section = styled.section`
    padding: 100px 8.888% 100px;
    align-items: center;
    display: flex;
    flex-direction: column;
    ${TopTitle} {
        font-size: 48px;
        line-height: 56px;
        margin-bottom: 70px;
    }
    ${PDescription} {
        margin-bottom: 10px;
        width: 100%;
        max-width: 585px;
        text-align: start;
        font-size: 20px;
        line-height: 160%;
    }
    @media screen and (max-width: 768px) {
        ${PDescription} {
            max-width: 511px;
        }
    }
    @media screen and (max-width: 767px) {
        ${PDescription} {
            font-size: 18px;
        }
    } ;
`;
export default Satisfaction;
