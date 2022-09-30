import React from "react";
import styled from "styled-components";
import { BalloonEnvelope, MicrophoneHeader } from "./assets";
import { t } from "./translations/en";
import { useTranslation } from "react-i18next";

export const InviteHero = () => {
    const { t } = useTranslation("invite");
    return (
        <HeroContainer>
            <HeaderCopy>
                {t("shareTheWealth")}
                <br/>
                {t("get3MonthsOfNoFees")}
            </HeaderCopy>
            <HeaderImageContainer>
                <MicrophoneHeader />
                <BalloonEnvelope />
            </HeaderImageContainer>
            <HeaderDescription style={{ marginBottom: "24px" }}>{t("helpEveryoneGrowTheirMoney")}</HeaderDescription>
            <HeaderDescription>{t("cheersToYouBoth")}</HeaderDescription>
        </HeroContainer>
    );
};

export const HeroContainer = styled.div`
    width: 100%;
    max-width: 1440px;
    padding: 0 20px;

    ${({ theme }) => theme.media.greaterThan("1024px")`
    padding: 0 18%;
  `}

    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const HeaderCopy = styled.h1`
    font-family: RoslindaleDisplayCondensed;
    font-weight: 500;
    text-align: center;
    font-size: 36px;
    line-height: 44px;
    margin-top: 0;
    margin-bottom: 24px;
    ${({ theme }) => theme.media.greaterThan("1024px")`
    font-size: 48px;
    line-height: 64px;
    margin-bottom: 32px;   
  `}
`;

export const HeaderImageContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 1440px;

    ${({ theme }) => theme.media.greaterThan("1024px")`
    position: absolute;
  `}
`;

export const HeaderDescription = styled.div`
    width: 100%;
    text-align: center;
    font-size: 16px;
    line-height: 34px;

    ${({ theme }) => theme.media.greaterThan("1024px")`
    font-size: 18px;
    line-height: 36px;
  `}
`;
