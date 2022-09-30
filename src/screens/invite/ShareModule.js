import React, { useState, useCallback, useMemo, useRef } from "react";
import { TwitterShareButton, FacebookShareButton, LinkedinShareButton } from "react-share";
import _ from "lodash";
import { observer } from "mobx-react-lite";
import styled from "styled-components";
import { useRootStore } from "#shared/hooks";
import { WhiteTwitterLogo, WhiteFacebookLogo, WhiteLinkedinLogo } from "./assets";
import { useTranslation } from "react-i18next";
import { languageCodeEnglish } from "#utils/constants";

export const ShareModule = observer(({ modalMode }) => {
    const { t } = useTranslation("invite");
    const store = useRootStore();
    const [copyStatus, setCopyStatus] = useState("");
    const inviteFieldRef = useRef(null);
    const SHARE_URL = useMemo(() => store.referral.referralProfileDetails.shareUrl, [
        store.referral.referralProfileDetails,
    ]);

    const onClickCopyButton = useCallback(
        (e) => {
            store.tracking.gtm.trackReferralAction("Copy URL to clipboard");
            setCopyStatus(t("copied"));

            inviteFieldRef.current.select();
            document.execCommand("copy");
            e.target.focus();

            setTimeout(() => {
                setCopyStatus("");
            }, 900);
        },
        [setCopyStatus, store.tracking.gtm],
    );

    const trackSocialShareClick = useCallback(
        (socialPlatform) => {
            store.tracking.gtm.trackReferralAction(`Click ${socialPlatform} share button`);
        },
        [store.tracking.gtm],
    );

    const socialButtons = (
        <SocialShareWrapper>
            {languageCodeEnglish && (
                <>
                    <SocialShareButton
                        background="#55ACEE"
                        onClick={() => {
                            trackSocialShareClick("Twitter");
                        }}
                    >
                        <TwitterShareButton
                            title={t("social_share_msg")}
                            url={SHARE_URL}
                            hashtags={[t("wine"), t("finewine"), t("investing")]}
                        >
                            <WhiteTwitterLogo />
                        </TwitterShareButton>
                    </SocialShareButton>

                    <SocialShareButton
                        background="#3B5998"
                        onClick={() => {
                            trackSocialShareClick("Facebook");
                        }}
                    >
                        <FacebookShareButton quote={t("social_share_msg")} url={SHARE_URL}>
                            <WhiteFacebookLogo />
                        </FacebookShareButton>
                    </SocialShareButton>
                </>
            )}

            <SocialShareButton
                background="#007fb1"
                onClick={() => {
                    trackSocialShareClick("LinkedIn");
                }}
            >
                <LinkedinShareButton
                    title={t("social_share_msg")}
                    summary={t("social_summary")}
                    url={SHARE_URL}
                    source={SHARE_URL}
                >
                    <WhiteLinkedinLogo />
                </LinkedinShareButton>
            </SocialShareButton>
        </SocialShareWrapper>
    );

    if (modalMode) {
        return (
            <>
                <div>
                    <InviteFieldWrapperModal>
                        <InviteTextFieldModal ref={inviteFieldRef} value={SHARE_URL} readOnly />
                        <InviteCopyButtonModal onClick={onClickCopyButton} disabled={!_.isEmpty(copyStatus)}>
                            {t("copyCTA")}
                        </InviteCopyButtonModal>
                    </InviteFieldWrapperModal>
                </div>
                {socialButtons}
            </>
        );
    }

    return (
        <ModuleContainer>
            <ShareInviteLabel>{t("shareInviteLink")}</ShareInviteLabel>

            <CopyContainer>
                <InviteFieldWrapper>
                    <InviteTextField ref={inviteFieldRef} value={SHARE_URL} readOnly />
                    <InviteCopyButton onClick={onClickCopyButton} disabled={!_.isEmpty(copyStatus)}>
                        {t("copyCTA")}
                    </InviteCopyButton>
                </InviteFieldWrapper>
                {!_.isEmpty(copyStatus) && <CopyStatusMessage>{copyStatus}</CopyStatusMessage>}
            </CopyContainer>
            {socialButtons}
        </ModuleContainer>
    );
});

const ModuleContainer = styled.div`
    border: 1px solid ${({ theme }) => theme.colors.borderGray};
    flex-grow: 1;

    padding: 20px 15px;
    height: 240px;
    ${({ theme }) => theme.media.greaterThan("1024px")`
    padding: 30px 25px;
    height: 300px;
    margin-left: 20px;
  `}

    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const ShareInviteLabel = styled.div`
    font-family: VinovestMono;
    margin: 10px 0;

    font-size: 14px;
    ${({ theme }) => theme.media.greaterThan("1024px")`
    font-size: 16px;
  `}
`;

const CopyContainer = styled.div`
    height: 75px;
`;

const InviteFieldWrapper = styled.div`
    display: flex;
    width: 100%;
    margin-bottom: 10px;
`;

const InviteFieldWrapperModal = styled(InviteFieldWrapper)`
    margin-bottom: 30px;

    ${({ theme }) => theme.media.greaterThan("1024px")`
            margin-bottom: 63px;

    `}
`;

const InviteTextField = styled.input`
    border: 1px solid ${({ theme }) => theme.colors.mainAccentBlue};
    height: 50px;
    flex-grow: 1;
    display: flex;
    align-items: center;
    padding: 0 15px;
`;

const InviteTextFieldModal = styled.input`
    background: #ffffff;
    border: 1px solid #caccce;
    border-right: 0;
    height: 60px;
    flex-grow: 1;
    padding: 0 18px;
    font-family: VinovestMedium;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 21px;

    ${({ theme }) => theme.media.greaterThan("1024px")`
        font-size: 20px;
        line-height: 36px;
    `}
`;

const InviteCopyButton = styled.button`
    font-family: VinovestMono;
    font-size: 14px;
    font-weight: 500;
    line-height: 22px;
    letter-spacing: 0.025em;
    font-style: normal;
    background: ${({ theme }) => theme.colors.mainAccentBlue};
    border: 1px solid ${({ theme }) => theme.colors.mainAccentBlue};
    color: #EFDDC7;
    height: 50px
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: ${(p) => (p.disabled ? 0.7 : 1)};
    transition: opacity 0.2s ease-in-out;
    padding-top: 5px;
    width: 25%;

    ${({ theme }) => theme.media.greaterThan("1024px")`
        width: 150px;
    `}

    &:hover {
        cursor: pointer;
    }
`;

const InviteCopyButtonModal = styled(InviteCopyButton)`
    height: 60px;
    background: #a86d37;
    border: 0;
    font-family: VinovestMedium;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 26px;
    display: flex;
    align-items: center;
    text-align: center;
    letter-spacing: 0.025em;
    text-transform: uppercase;
    color: #ffffff;
`;

const CopyStatusMessage = styled.div`
    font-family: VinovestMono;
    font-size: 14px;
`;

const SocialShareWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`;

const SocialShareButton = styled.div`
    background: ${(p) => p.background};
    border: 1px solid ${(p) => p.background};
    width: 32%;
    height: 50px;

    button {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;
