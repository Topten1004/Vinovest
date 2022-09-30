import * as React from "react";

import styled from "styled-components";
import { useTranslation, getI18n } from "react-i18next";
import { TopTitle, PDescription } from "#shared/ui/Typography/styled";
import { PDescriptionBold } from "../privacyPolicy/style";

import MetaTagsReplacer from "#shared/components/MetaTagsReplacer";
import {
    General,
    Privacy,
    Account,
    Program,
    Risk,
    AntiMoneyLaundering,
    Disclaimer,
    Liability,
    Indemnification,
    Trademarks,
    Copywrite,
    SubmittedWorks,
    Links,
    Disputes,
    ClassActionProhibition,
    Arbitration,
    Law,
    Severability,
    Modifications,
    Contact,
} from "./localized";

const TermsConditions: React.VFC = () => {
    const {t} = useTranslation('terms-conditions');
    const i18n = getI18n();
    const isChinese = /zh/.test(i18n.language)
    return (
    <Section>
        <MetaTagsReplacer title="Terms and Conditions | Vinovest | Wine Investment" />
        <TopTitle as="h1">{t('title')}</TopTitle>
        <General />
        <Privacy />
        <Account />
        <Program />
        <Risk />
        <AntiMoneyLaundering/>
        <Disclaimer />
        <Liability />
        <Indemnification />
        <Trademarks />
        <Copywrite />
        <SubmittedWorks />
        <Links />
        <Disputes />
        {isChinese && <ClassActionProhibition />}
        <Arbitration />
        <Law/>
        <Severability />
        <Modifications />
        <Contact />
    </Section>
)};
const Section = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 100px 6.666% 100px;

    ${TopTitle} {
        margin-bottom: 70px;
        font-size: 48px;
    }
    ${PDescription} {
        max-width: 569px;
        width: 100%;
        text-align: start;
        font-size: 20px;
        line-height: 160%;
    }
    ${PDescription}:not(:last-child) {
        margin-bottom: 10px;
    }
    br {
        margin-bottom: 16px;
    }
`;



export default TermsConditions;
