import * as React from "react";
import {I18nLink as Link} from "#localization/localizedRouter";
import styled from "styled-components";
import { useTranslation, getI18n} from "react-i18next";
import { PDescription } from "#shared/ui/Typography/styled";
import { ROUTE_PATHS } from "#screens/route-paths";
import { PDescriptionBold } from "../privacyPolicy/style";

interface TermsAndConditionsSectionProps {
    title: string | Element;
    sections: [string, Element];
    spacer: boolean
}


export const TermsAndCondtionsSection: React.FC<TermsAndConditionsSectionProps> = ({title, sections, spacer=true}) => {

    return (
        <>
        <PDescription>
            <strong>{title}</strong>
        </PDescription>
        {sections.map(paragraph => {
                <PDescription>
                   {paragraph}
               </PDescription> 
        })}
        {spacer && <><br /> <br /></>}
        </>
    )

}

export const General = () => {
    const {t} = useTranslation('terms-conditions');
    return (
        <>
        <PDescription>
            <strong>{t('general.title')}</strong>
        </PDescription>
        <PDescription>
            {t('general.paragraph1')}
        </PDescription>
        <PDescription>
            {t('general.paragraph2')}
        </PDescription>
        <PDescription>
            {t('general.paragraph3')}
        </PDescription>
        <br />
        <br />
        <PDescription>
            {t('general.paragraph4')}
        </PDescription>
        <br />
        <br />
        </>
    )
}

export const Privacy = () => {
        const {t} = useTranslation('terms-conditions');
    return (
        <>
         <PDescription>
            <strong>{t('privacy.title')}</strong>
        </PDescription>
        <PDescription>
            {t('privacy.paragraph1')}{" "}
            <RouterLink to={`${ROUTE_PATHS.privacyPolicy}`}>https://vinovest.co/privacy-policy</RouterLink>{" "}
            {t('privacy.paragraph2')}
        </PDescription> 
        <br />
        <br />
        </>
    )
}

export const Account = () => {
    const {t} = useTranslation('terms-conditions');
    return (
        <>
        <PDescription>
            <strong>{t('account.title')}</strong>
        </PDescription>
        <PDescription>
        <em>{t('account.registration')}</em> {t('account.paragraph1')}
        </PDescription>
        <PDescription>
            <em>{t('account.membership')}</em> {t('account.paragraph2')}
        </PDescription>
        <PDescription>
            <em>{t('account.payment')}</em> {t('account.paragraph3')}
        </PDescription>
        <PDescription>
            {t('account.paragraph4')}
        </PDescription>
        <PDescription>
            {t('account.paragraph5')}
        </PDescription>
        <br />
        <br />
        </>
    )
}

export const Program = () => {
    const {t} = useTranslation('terms-conditions');
    const i18n = getI18n();
    
    const isChinese = /zh/.test(i18n.language)
    return (
        <>
            <PDescription>
                <strong>{t("program.title")}</strong>
            </PDescription>
            <PDescription>{t("program.paragraph1")}</PDescription>
            <PDescription>{t("program.paragraph7")}</PDescription>
            <PDescription>
                {t("program.paragraph2")}               
            </PDescription>
            <PDescription>
                {t("program.paragraph8")}               
            </PDescription>
            <PDescription>
                {t("program.paragraph9")}               
            </PDescription>
            <PDescription>
                {t("program.paragraph10")}               
            </PDescription>
            <PDescription>{t("program.paragraph4")}</PDescription>
            <PDescription>{t("program.paragraph5")}</PDescription>
            <PDescription>{t("program.paragraph6")}</PDescription>
            {isChinese ? (
                <PDescription>{t("program.paragraph3")}</PDescription>
            ) : (
                <>
                    <PDescription>{t("program.paragraph3")}</PDescription>{" "}
                    <PDescription>{t("program.last-sentence")}</PDescription>{" "}
                </>
            )}
            <br />
            <br />
        </>
    );
}

export const Risk =() => {
    const {t} = useTranslation('terms-conditions');

    return(<><PDescription>
        <strong>{t('risk.title')}</strong>
    </PDescription>
    <PDescription>
       {t('risk.paragraph1')}
    </PDescription>
    <br />
        <br />
    </>)
}

export const AntiMoneyLaundering = () => {
    const { t } = useTranslation("terms-conditions");

    return (
        <>
            <PDescription>
                <strong>{t("anti-money-laundering.title")}</strong>
            </PDescription>
            <PDescription>
                {t("anti-money-laundering.paragraph1.part1")}
                <strong>
                    <em>{t("anti-money-laundering.paragraph1.part2")}</em>
                </strong>
                {t("anti-money-laundering.paragraph1.part3")}
            </PDescription>
            <PDescription>
                {t("anti-money-laundering.paragraph2.part1")}
                <strong>
                    <em>{t("anti-money-laundering.paragraph2.part2")}</em>
                </strong>
                {t("anti-money-laundering.paragraph2.part3")}
            </PDescription>
            <PDescription>
                {t("anti-money-laundering.paragraph3.part1")}
                <strong>
                    <em>{t("anti-money-laundering.paragraph3.part2")}</em>
                </strong>
                {t("anti-money-laundering.paragraph3.part3")}
                <strong>
                    <em>{t("anti-money-laundering.paragraph3.part4")}</em>
                </strong>
                {t("anti-money-laundering.paragraph3.part5")}
            </PDescription>
            <PDescription>
                {t("anti-money-laundering.paragraph4.part1")}
                <strong>
                    <em>{t("anti-money-laundering.paragraph4.part2")}</em>
                </strong>
                {t("anti-money-laundering.paragraph4.part3")}
                <strong>
                    <em>{t("anti-money-laundering.paragraph4.part4")}</em>
                </strong>
                {t("anti-money-laundering.paragraph4.part5")}
            </PDescription>
            <PDescription>
                {t("anti-money-laundering.paragraph5.part1")}
                <strong>
                    <em>{t("anti-money-laundering.paragraph5.part2")}</em>
                </strong>
                {t("anti-money-laundering.paragraph5.part3")}
            </PDescription>
            <br />
            <br />
        </>
    );
};

export const Disclaimer = ()  => {
    const {t} = useTranslation('terms-conditions');
    const i18n = getI18n();
    
    const isChinese = /zh/.test(i18n.language)
    return (
    <>
    <PDescription>
        <strong>{t('disclaimer.title')}</strong>
    </PDescription>
    <PDescription>
    {isChinese ? <b>{t('disclaimer.paragraph1')}</b> : <>{t('disclaimer.paragraph1')}</>}
    </PDescription> 
    <br />
        <br />
    </>
    ) 
}

export const Liability = () => {
    const {t} = useTranslation('terms-conditions');
    return (<>        <PDescription>
        <strong>{t('liability.title')}</strong>
    </PDescription>
    <PDescription>
        {t('liability.paragraph1')}
    </PDescription>
    <br />
    <br /></>) 
}

export const Indemnification = () => {
    const {t} = useTranslation('terms-conditions');
    return (<> <PDescription>
        <strong>{t('indemnification.title')}</strong>
    </PDescription>
    <PDescription>
        {t('indemnification.paragraph1')}
    </PDescription>
    <br />
    <br /></>) 
}

export const Trademarks = () => {
    const {t} = useTranslation('terms-conditions');
    return (<>        <PDescription>
        <strong>{t('trademarks.title')}</strong>
    </PDescription>
    <PDescription>
       {t('trademarks.paragraph1')} 
    </PDescription>
    <br />
    <br /></>) 
}

export const  Copywrite= () => {
    const {t} = useTranslation('terms-conditions');
    return (<>        <PDescription>
        <strong>{t("copywrite.title")}</strong>
    </PDescription>
    <PDescription>
        {t('copywrite.paragraph1')}
    </PDescription>
    <br />
    <br /></>) 
}

export const SubmittedWorks = () => {
    const {t} = useTranslation('terms-conditions');
    return (<>        <PDescription>
        <strong>{t("submitted-works.title")}</strong>
    </PDescription>
    <PDescription>
        {t('submitted-works.paragraph1')}
    </PDescription>
    <br />
    <br /></>) 
}

export const Links = () => {
    const {t} = useTranslation('terms-conditions');
    return (<>        <PDescription>
        <strong>{t("links.title")}</strong>
    </PDescription>
    <PDescription>
        {t("links.paragraph1")}
    </PDescription>
    <br />
    <br /></>) 
}

export const Disputes = () => {
    const {t} = useTranslation('terms-conditions');
    return (<>        <PDescription>
        <strong>{t('disputes.title')}</strong>
    </PDescription>
    <PDescription>
        {t('disputes.paragraph1')}
    </PDescription>
    <br />
    <br /></>) 
}

export const  ClassActionProhibition = () => {
    const {t} = useTranslation('terms-conditions');

    return ( <><PDescription>
        <strong>{t('class-action-prohibition.title')}</strong>
    </PDescription>
    <PDescription>
        {t('class-action-prohibition.paragraph1')}
    </PDescription>
    <br />
    <br /> </>) 
}

export const  Arbitration = () => {
    const {t} = useTranslation('terms-conditions');
    const i18n = getI18n();
    const isChinese = /zh/.test(i18n.language);

    return (<>         <PDescription>
        <strong>
            <em>{t('arbitration.title')}</em>
        </strong>
    </PDescription>
    <PDescription>
        {t('arbitration.paragraph1')}
    </PDescription>{" "}
    <PDescription>
        {t('arbitration.paragraph2')}
    </PDescription>
    <PDescription>
        {t('arbitration.paragraph3')}
    </PDescription>
    <PDescription>
        {t('arbitration.paragraph4')}
    </PDescription>
    <PDescription>
        {t('arbitration.paragraph5')}
    </PDescription>
    {!isChinese &&    
    <><PDescriptionBold><strong><em>{t("arbitration.class-action.title")}</em></strong></PDescriptionBold>
    <PDescription>      
        {t("arbitration.class-action.paragraph1")} 
    </PDescription>
    <PDescription>
        {t("arbitration.class-action.paragraph2")}
    </PDescription></>}
    <br />
    <br /></>) 
}

export const Law = () => {
    const {t} = useTranslation('terms-conditions');
    return (<>
            <PDescription>
            <strong>{t('law.title')}</strong>
        </PDescription>
        <PDescription>
           {t('law.paragraph1')}
        </PDescription>
        <PDescription>
           {t('law.paragraph2')}
        </PDescription>{" "}
        <br />
        <br />
    </>) 
}

export const Severability = () => {
    const {t} = useTranslation('terms-conditions');
    return (<>        <PDescription>
        <strong>{t('severability.title')}</strong>
    </PDescription>
    <PDescription>
        {t('severability.paragraph1')}
    </PDescription>{" "}
    <br />
    <br /></>) 
}

export const  Agreement = () => {
    const {t} = useTranslation('terms-conditions');
    return (<>
            <PDescription>
            <strong>{t('agreement.title')}</strong>
        </PDescription>
        <PDescription>
            {t('agreement.paragraph1')}
        </PDescription>{" "}
        <br />
        <br />
    </>) 
}

export const  Modifications = () => {
    const {t} = useTranslation('terms-conditions');
    return (<> <PDescription>
        <strong>{t('modifications.title')}</strong>
    </PDescription>
    <PDescription>
        {t('modifications.paragraph1')}
        
    </PDescription>
    <PDescription>{t('modifications.paragraph2')}</PDescription> <br />
    <br /></>) 
}

export const  Contact = () => {
    const {t} = useTranslation('terms-conditions');
    return (<>
            <PDescription>
            <strong>{t('contact.title')}</strong>
        </PDescription>
        <PDescription>
            {t('contact.paragraph1')}
        </PDescription>{" "}
        <br />
        <br />
        <PDescription>{t('address.name')}</PDescription>
        <PDescription>{t('address.street')}</PDescription>
        <PDescription>{t('address.city-state-zip')}</PDescription>
        <br />
        <br />
        <PDescription><a href="tel:+12134104546">+1 213-410-4546</a></PDescription>
        <br />
        <br />
        <PDescription><a href="mailto:help@vinovest.co">help@vinovest.co</a></PDescription>
    </>) 
}


const RouterLink = styled(Link)`
    color: inherit;
    text-decoration: none;
`;