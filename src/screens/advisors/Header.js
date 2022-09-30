import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { UpperSubtitle, HeroTitle, HeroDescription, HeroImage } from "#shared/ui/Typography/styled";
import WithLayersButton from "#shared/ui/WithLayersButton";
import heroImage from "./images/header/hero-screen.png";
import MetaTagsReplacer from "#shared/components/MetaTagsReplacer";

const Header = () => {
    const onBookACall = () => {
        window.open(
            "https://docs.google.com/forms/d/1om-ntH2ojKsQjemPYyUok2TacEKATkpfKMugt9dS4yg/viewform?edit_requested=true",
            "_blank",
        );
    };

    const { t } = useTranslation("advisors");

    return (
        <>
            <SectionHeader>
                <MetaTagsReplacer title={t("header-meta.title")} description={t("header-meta.description")} />

                <UpperSubtitle>{t("header.topSmallTitle")}</UpperSubtitle>
                <HeroTitle>{t("header.title")}</HeroTitle>
                <HeroDescription>{t("header.description")}</HeroDescription>
                <WithLayersButton onClick={onBookACall}>{t("header.btn")}</WithLayersButton>
            </SectionHeader>
            <HeroImgWrapper>
                <HeroImageBottom src={heroImage} alt="background" />
            </HeroImgWrapper>
        </>
    );
};
const SectionHeader = styled.section`
    padding-top: 170px;
    background-color: #242e35;
    color: #efddc7;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (max-width: 991px) {
        padding-top: 145px;
        padding-left: 6.666%;
        padding-right: 6.666%;
    }
    ${WithLayersButton.styled.WithLayers} {
        margin-bottom: 50px;
    }
    ${UpperSubtitle} {
        margin-bottom: 40px;
        @media (max-width: 576px) {
            font-size: 11px;
        }
    }
    ${HeroTitle} {
        font-size: 64px;
        margin-bottom: 25px;
        @media (max-width: 767px) {
            font-size: 48px;
        }
        @media (max-width: 576px) {
            font-size: 36px;
        }
    }
    ${HeroTitle} {
        margin-bottom: 25px;
    }
    ${HeroDescription} {
        margin-bottom: 40px;
        @media (max-width: 576px) {
            font-size: 16px;
        }
    }
`;
export const HeroImgWrapper = styled("div")`
    background-color: #242e35;
    width: 100%;
    display: flex;
    justify-content: center;
`;
export const HeroImageBottom = styled(HeroImage)`
    background-color: #242e35;
`;

export default Header;
