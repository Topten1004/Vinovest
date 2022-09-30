import React from "react";
import styled from "styled-components";
import { PDescription, SmallSubtitle, TopTitle } from "#shared/ui/Typography/styled";
import MetaTagsReplacer from "#shared/components/MetaTagsReplacer";
import { useTranslation } from "react-i18next";
import i18n from "i18next";

const Accessibility = () => {
    const { t } = useTranslation("accessibility");
    return (
        <Section>
            <MetaTagsReplacer title={t("title")} description={t("title")} />

            <TopTitle as="h1">{t("title")}</TopTitle>
            <Description>{t("description")}</Description>
            <TableBoard>
                <SmallSubtitle>{t("ada-compliance-statement.title")}</SmallSubtitle>
                <br />

                <PDescription>{t("ada-compliance-statement.paragraph1")}</PDescription>
                <br />
                <PDescription>{t("ada-compliance-statement.paragraph2")}</PDescription>
                <br />
                <PDescription>{t("ada-compliance-statement.paragraph3")}</PDescription>

                <ul>
                    <li>{t("ada-compliance-statement.list1")}</li>
                    <li>{t("ada-compliance-statement.list2")}</li>
                    <li>{t("ada-compliance-statement.list3")}</li>
                    <li>{t("ada-compliance-statement.list4")}</li>
                    <li>{t("ada-compliance-statement.list5")}</li>
                </ul>

                <PDescription>{t("ada-compliance-statement.last-assessment")}</PDescription>

                <br />
                <br />
                <SmallSubtitle className="toLeft">{t("feedback.title")}</SmallSubtitle>
                <PDescription>{t("feedback.paragraph1")}</PDescription>
                <br />
                <PDescription>{t("feedback.paragraph2")}</PDescription>
                <br />
                <br />
                <SmallSubtitle className="toLeft"> {t("reaching-out.title")}</SmallSubtitle>
                <PDescription>
                    {t("reaching-out.description")}
                    <a href="mailto:accessibility@vinovest.co">accessibility@vinovest.co</a>
                </PDescription>
            </TableBoard>
        </Section>
    );
};

const Section = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 100px 6.666% 100px;
    color: #242e35;

    br {
        margin-bottom: 16px;
    }
    ${TopTitle} {
        font-size: 48px;
    }
    ${PDescription} {
        font-size: 18px;
        text-align: start;
    }
`;
const TableBoard = styled.div`
    border: 2px solid #242e35;
    box-shadow: 11px 11px 0 1px #efddc7;
    max-width: 1040px;
    width: 100%;
    margin-top: 78px;
    margin-bottom: 110px;
    padding: 80px 120px;
    flex-direction: column;
    display: flex;
    align-items: flex-start;
    li {
        margin: 23px;
        line-height: 160%;
        font-family: Favoritstd, sans-serif;
        font-weight: 500;
        font-size: 18px;
    }
    a {
        color: #a86d37;
        text-decoration: none;
    }
    ${SmallSubtitle} {
        margin-bottom: 13px;

        &.toLeft {
           text-align: left;
        }
    }

    @media screen and (max-width: 768px) {
        padding: 68px 49px 50px;
        
        ul {
            padding: 0;
        }
    }

    @media screen and (max-width: 479px) {
        padding: 58px 30px 34px;
    }

    @media screen and (min-width: 479px) and (max-width: 767px) {
        width: 95%;
        margin-left: auto;
        margin-right: auto;
    }
`;
const Description = styled.p`
    margin: 0;
    padding: 0;
    letter-spacing: 0.005em;
    font-size: 20px;
    line-height: 150%;
    font-family: Favoritstd, sans-serif;
    max-width: 700px;
    width: 100%;
    text-align: center;
    color: #242e35;
    margin: 26px 0px 0px;
`;

export default Accessibility;
