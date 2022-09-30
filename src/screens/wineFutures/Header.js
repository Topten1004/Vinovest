import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useConfig } from "#shared/hooks";
import heroImg from "./images/heroImage.png";
import { TopTitle } from "#shared/ui/Typography/styled";
import WithLayersButton from "#shared/ui/WithLayersButton";
import MetaTagsReplacer from "#shared/components/MetaTagsReplacer";

const Header = ({ setCalendlyOpen }) => {
    const config = useConfig();
    const { t } = useTranslation("why-wine");

    const onBookACall = React.useCallback(() => {
        window.Calendly.initPopupWidget({
            url: config.calendly.ceoUrl,
        });
        setCalendlyOpen(true);
    }, [config.calendly.ceoUrl, setCalendlyOpen]);

    return (
        <Section>
            <MetaTagsReplacer
                title={t("wine_futures.header-meta.title")}
                description={t("wine_futures.header-meta.description")}
            />
            <HeaderWrapper>
                <TopTitle as="h1">{t("wine_futures.header.title")}</TopTitle>
                <WithLayersButton onClick={onBookACall}>{t("wine_futures.header.button")}</WithLayersButton>
            </HeaderWrapper>
        </Section>
    );
};
const Section = styled.section`
    background-position: 50% 50%;
    background-size: cover;
    background-repeat: no-repeat;
    background-image: url(${heroImg});
    padding: 208px 8.888%;

    @media screen and (max-width: 767px) {
        padding: 148px 6.666% 208px;
    }
`;
const HeaderWrapper = styled.div`
    max-width: 1440px;
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    ${TopTitle} {
        max-width: 800px;
        color: #efddc7;
        line-height: 84px;
        margin-bottom: 40px;
    }
    @media screen and (max-width: 767px) {
        ${TopTitle} {
            font-size: 36px;
            line-height: 54px;
        }
    }
`;
export default Header;
