import React from "react";
import { ModalBase } from "#shared/components/ModalBase";
import styled from "styled-components";
import { Fade } from "#shared/ui";
import { ShareModule } from "./ShareModule";
import { BalloonEnvelope, MicrophoneHeader } from "./assets";
import { t } from "./translations/en";
import { useTranslation } from "react-i18next";

const modalBaseStyles = ` 

    background: transparent;
    border-radius: 0px;
    box-shadow: none;
    width: 100%;
    max-width: 660px;
    margin: auto;

    .closeIcon {
        top: 41px;
        right: 41px
    }

    @media screen and (min-width: 1024px) {
        max-width: 860px;
    }
`;

const InviteModal = ({ onClose }) => {
    return (
        <ModalBase isOpen onClose={onClose} additionalStyles={modalBaseStyles}>
            <Fade in>
                <ModalContainer>
                    <InviteHero />
                    <ShareModuleWrapper>
                        <ShareModule modalMode />
                    </ShareModuleWrapper>
                </ModalContainer>
            </Fade>
        </ModalBase>
    );
};

const InviteHero = () => {
    const { t } = useTranslation(["invite"]);
    return (
        <HeroContainer>
            <HeaderCopy>
                <div>{t("shareTheWealth")}</div>
                <div>{t("get3MonthsOfNoFees")}</div>
            </HeaderCopy>
            <HeaderImageContainer>
                <MicrophoneHeader />
                <BalloonEnvelope />
            </HeaderImageContainer>
            <HeaderDescription>{t("helpEveryoneGrowTheirMoney")}</HeaderDescription>
            <HeaderDescription className="gupMobile">{t("cheersToYouBoth")}</HeaderDescription>
        </HeroContainer>
    );
};

const ModalContainer = styled.div`
    width: auto;
    padding: 50px 20px 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 11px;
    background: #ffffff;
    border: 1px solid #eeeeee;
    box-sizing: border-box;
    box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.1);
    border-radius: 10px;

    ${({ theme }) => theme.media.greaterThan("1024px")`
        padding: 78px 53px 104px;
        margin: 0;
    `}
`;

const HeroContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ShareModuleWrapper = styled.div`
    width: 100%;
    max-width: 478px;
`;

const HeaderCopy = styled.div`
    font-family: RoslindaleDisplayCondensed;
    text-align: center;
    font-size: 32px;
    line-height: 41px;
    position: relative;
    z-index: 1;
    margin-bottom: 17px;

    ${({ theme }) => theme.media.greaterThan("1024px")`
        font-size: 48px;
        line-height: 64px;
        margin-bottom: 24px;
    `}
`;

const HeaderImageContainer = styled.div`
    display: none;
    justify-content: space-between;

    svg {
        max-width: 124px;
        width: 100%;
    }

    ${({ theme }) => theme.media.greaterThan("1024px")`
       display: flex;
       top: 0;
        right:53px;
        left: 53px;
        position: absolute;
    `}
`;

const HeaderDescription = styled.div`
    margin-bottom: 26px;
    font-family: VinovestMedium;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 21px;
    text-align: center;
    letter-spacing: 0.005em;
    color: #000000;
    max-width: 637px;
    width: 100%;

    &.gupMobile {
        margin-bottom: 9px;
    }

    ${({ theme }) => theme.media.greaterThan("1024px")`
        font-size: 16px;
        line-height: 26px;

        &.gupMobile {
            margin-bottom: 26px;
        }
    `}
`;

export { InviteModal };
