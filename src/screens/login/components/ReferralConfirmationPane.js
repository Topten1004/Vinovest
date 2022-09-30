import React from "react";
import styled from "styled-components";
import { useMobile } from "#shared/hooks";
import { BalloonPaperAirplane } from "../assets/BalloonPaperAirplane";
import { useTranslation } from "react-i18next";

export const ReferralConfirmationPane = () => {
    const { t } = useTranslation("login");

    const isMobile = useMobile();
    return (
        <PaneContainer>
            {!isMobile && (
                <ImageContainer>
                    <BalloonPaperAirplane />
                </ImageContainer>
            )}
            <CopyContainer>
                <Title>{t("referral-confirmation.woohooTitle")}</Title>
                <Description>{t("referral-confirmation.welcomeToVinovest")}</Description>
                <Description>{t("referral-confirmation.depositCta")}</Description>
            </CopyContainer>
        </PaneContainer>
    );
};

const PaneContainer = styled.div`
    position: relative;
    background: ${(p) => p.theme.colors.mainAccentBlue};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    margin-bottom: 25px;
    ${({ theme }) => theme.media.greaterThan("1024px")`
    flex: 1;
    height: 100%;
    margin: initial;
  `}
`;

const ImageContainer = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
`;

const CopyContainer = styled.div`
    color: ${(p) => p.theme.colors.mainInnerTaupe};
    text-align: center;

    padding: 25px 10px;
    ${({ theme }) => theme.media.greaterThan("1024px")`
    padding: 0;
    max-width: 400px
    transform: translateY(-45px)
  `}
`;

const Title = styled.div`
    font-family: RoslindaleDisplayCondensed;

    font-size: 29px;
    line-height: 36px;
    margin-bottom: 24px;
    ${({ theme }) => theme.media.greaterThan("1024px")`
    font-size: 48px;
    line-height: 64px;
  `}
`;

const Description = styled.div`
    font-size: 14px;
    line-height: 24px;
    margin-top: 16px;

    ${({ theme }) => theme.media.greaterThan("1024px")`
    font-size: 18px;
    line-height: 36px;
    margin-top: 32px;
  `}
`;
