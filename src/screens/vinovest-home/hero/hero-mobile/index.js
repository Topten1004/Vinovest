import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { HeroTitle, HeroDescription } from "#shared/ui/Typography/styled";
import useScrollReveal from "#shared/hooks/useScrollReveal";
import WithLayersButton from "#shared/ui/WithLayersButton";
import { useHistory } from "react-router-dom";
import HoverWrapper from "../HoverWrapper";
import { HeroMobileContainer, TitlesSection, WinesImageSection, Trademarks, List, ListItem, HeroDescriptionHome } from "./styled";
import heroJpg from "../../assets/hero.jpg";
import yahooFinanceLogoSvg from "../../assets/yahooFinanceLogo.svg";
import forbesSvg from "../../assets/forbes.svg";
import businessInsiderSvg from "../../assets/businessInsider.svg";
import techCrunchSvg from "../../assets/techcrunch.svg";
import { languageCodeChina } from "../../../../utils/constants";


const HeroMobile = () => {
    const history = useHistory();
    const ref = React.useRef();
    const { hasRevealed } = useScrollReveal({ ref });
    const runAnimation = hasRevealed ? "runAnimation" : "";
    const { t } = useTranslation("vinovest-home");
    const onClickGetStarted = () => {
        window.location = "https://airtable.com/shr0yMiUh5ty4zjyP";
    };

    return (
        <HeroMobileContainer ref={ref}>
            <TitlesSection className={runAnimation}>
                <div className="titlesWrapper">
                    <HeroTitle className={runAnimation}>{t("hero.title")}</HeroTitle>
                    <HeroDescription className={runAnimation}>{t("hero.description")}</HeroDescription>
                    <List className={runAnimation}>
                        <ListItem>{t("hero.listItem1")}</ListItem>
                        <ListItem>{t("hero.listItem2")}</ListItem>
                        <ListItem>{t("hero.listItem3")}</ListItem>
                        <ListItem>{t("hero.listItem4")}</ListItem>
                    </List>
                    <WithLayersButton
                        className={runAnimation}
                        colors={["#242e35", "#efddc7"]}
                        onClick={languageCodeChina ? onClickGetStarted : null}
                    >
                        {t("hero.getStartedHome")}
                    </WithLayersButton>
                </div>
            </TitlesSection>
            <WinesImageSection>
                <div className={`imgWrapper ${runAnimation}`}>
                    <HoverWrapper runAnimation={runAnimation}>
                        <img src={heroJpg} alt="Hero" className="img" />
                    </HoverWrapper>
                </div>
            </WinesImageSection>
            <Trademarks className={runAnimation}>
                <div className="gup" />
                <div className={`list ${runAnimation}`}>
                    <img className={runAnimation} style={{ width: "122px" }} src={forbesSvg} alt="forbes" />
                    <img className={runAnimation} style={{ width: "154px" }} src={yahooFinanceLogoSvg} alt="yahoo" />
                    <img className={runAnimation} style={{ width: "112px" }} src={businessInsiderSvg} alt="business" />
                    <img className={runAnimation} style={{ width: "180px" }} src={techCrunchSvg} alt="tech crunch" />
                </div>
                <div className="text">
                    <span className={runAnimation}>{t("hero.takingNotice")}</span>
                </div>
            </Trademarks>
        </HeroMobileContainer>
    );
};

export default HeroMobile;

