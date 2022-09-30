import React from "react";
import { useTranslation } from "react-i18next";
import { useMobile } from "#shared/hooks";
import HeroDesktop from "./hero-desktop";
import HeroMobile from "./hero-mobile";
import MetaTagsReplacer from "#shared/components/MetaTagsReplacer";

const Hero = () => {
    const isMobile = useMobile(991);

    const { t } = useTranslation("vinovest-home");

    return (
        <>
            <MetaTagsReplacer title={t("hero-meta.title")} description={t("hero-meta.description")} />
            {isMobile ? <HeroMobile /> : <HeroDesktop />}
        </>
    );
};

export default Hero;
