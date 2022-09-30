import React from "react";
import posthog from "posthog-js";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { HeroTitleHome, HeroDescription } from "#shared/ui/Typography/styled";
import useScrollReveal from "#shared/hooks/useScrollReveal";
import WithLayersButton from "#shared/ui/WithLayersButton";
import { HeroDesktopContainer, TitlesSection, WinesImageSection, Trademarks, List, ListItem } from "./styled";
import HoverWrapper from "../HoverWrapper";
import heroJpg from "../../assets/hero.jpg";
import yahooFinanceLogoSvg from "../../assets/yahooFinanceLogo.svg";
import forbesSvg from "../../assets/forbes.svg";
import businessInsiderSvg from "../../assets/businessInsider.svg";
import techCrunchSvg from "../../assets/techcrunch.svg";
import arrowSvg from "../../assets/arrow.svg";
import { languageCodeChina } from "../../../../utils/constants";


const HeroDesktop = () => {
    const ref = React.useRef();
    const { hasRevealed } = useScrollReveal({ ref });
    const runAnimation = hasRevealed ? "runAnimation" : "";
    const { t } = useTranslation("vinovest-home");
    const onClickGetStarted = () => {
        window.location = "https://airtable.com/shr0yMiUh5ty4zjyP";
    };

    return (
        <HeroDesktopContainer ref={ref}>
            <TitlesSection className={runAnimation}>
                <div className="titlesWrapper">
                    <HeroTitleHome className={runAnimation}>{t("hero.title")}</HeroTitleHome>
                    <HeroDescription className={runAnimation}>{t("hero.description")}</HeroDescription>
                    <List className={runAnimation}>
                        <ListItem>{t("hero.listItem1")}</ListItem>
                        <ListItem>{t("hero.listItem2")}</ListItem>
                        <ListItem>{t("hero.listItem3")}</ListItem>
                        <ListItem>{t("hero.listItem4")}</ListItem>
                    </List>
                    <WithLayersButton className={runAnimation} onClick={languageCodeChina ? onClickGetStarted : null}>
                        {t("hero.getStartedHome")}
                    </WithLayersButton>
                </div>
                <Trademarks className={runAnimation}>
                    <img style={{ width: "122px" }} src={forbesSvg} alt="forbes" />
                    <img style={{ width: "154px" }} src={yahooFinanceLogoSvg} alt="yahoo" />
                    <img style={{ width: "112px" }} src={businessInsiderSvg} alt="business" />
                    <img style={{ width: "180px" }} src={techCrunchSvg} alt="tech crunch" />
                    <div className={`rightBlock ${runAnimation}`}>
                        <img src={arrowSvg} alt="arrow" /> {t("hero.takingNotice")}
                    </div>
                </Trademarks>
            </TitlesSection>
            <WinesImageSection className={runAnimation}>
                <div className="imgWrapper">
                    <HoverWrapper runAnimation={runAnimation}>
                        <img src={heroJpg} alt="heroDesktop" width="1000" height="600" className="img" />
                    </HoverWrapper>
                </div>
            </WinesImageSection>
        </HeroDesktopContainer>
    );
};

export default HeroDesktop;

