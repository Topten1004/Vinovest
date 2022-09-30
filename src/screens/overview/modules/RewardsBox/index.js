import React from "react";
import styled from "styled-components";
import { useRootStore, useMobile } from "#shared/hooks";
import { observer } from "mobx-react-lite";
import { currencyFormatter } from "#utils/shared";
import { BaseModuleContainer } from "../styles";
import moneySvg from "./money.svg";
import pigSvg from "./pig.svg";
import { useTranslation } from "react-i18next";

const RewardsBox = observer(() => {
    const { t } = useTranslation(["overview", "common"]);
    const s = useRootStore();
    const { monthsManagedFreeCount, successfulReferralCount, referralProfileDetails } = s.referral;
    const { shareUrl } = s.referral.referralProfileDetails;
    const [copyStatus, setCopyStatus] = React.useState("");
    const inviteFieldRef = React.useRef(null);
    const isMobile = useMobile();

    const onCopyButtonHandler = React.useCallback(
        (e) => {
            s.tracking.gtm.trackReferralAction("Copy URL to clipboard");
            setCopyStatus("COPIED!");

            inviteFieldRef.current.select();
            document.execCommand("copy");
            e.target.focus();

            setTimeout(() => {
                setCopyStatus("");
            }, 900);
        },
        [setCopyStatus, s.tracking.gtm],
    );
    return (
        <BaseModule>
            <HeadWrapper>
                <SnapshotHeader>{t("rewards-box.title")} </SnapshotHeader>
                <DescriptionWrap>
                    {t("rewards-box.snapshot-description")}{" "}
                    <span role="img" aria-labelledby="cups">
                        🥂
                    </span>
                </DescriptionWrap>
            </HeadWrapper>

            <Wrapper>
                <TotalBoxWrapper>
                    <img src={pigSvg} alt="pig" />
                    <div className="descriptionWrapper">
                        <div className="description">{t("rewards-box.fees-title")}</div>
                        <div className="dataMessage">
                            {successfulReferralCount} {t("rewards-box.fees-description")}
                        </div>
                    </div>
                    <div className="amount">{referralProfileDetails.savedFees || `${t("common:currencySymbol")}0`}</div>
                </TotalBoxWrapper>
                <TunedTotalBoxWrapper>
                    <img src={moneySvg} alt="money" />
                    <div className="descriptionWrapper">
                        <div className="description">{t("rewards-box.cycles")}</div>
                        {referralProfileDetails.endFreeFees && (
                            <div className="dataMessage">
                                {t("rewards-box.cycles-message")}
                                {` ${referralProfileDetails.endFreeFees}`}
                            </div>
                        )}
                    </div>
                    <div className="amount">
                        {monthsManagedFreeCount || 0} {t("rewards-box.cycles-period")}
                    </div>
                </TunedTotalBoxWrapper>
            </Wrapper>
            <InviteWrapper>
                <InviteField ref={inviteFieldRef} value={shareUrl} readOnly />
                <CopyButton onClick={onCopyButtonHandler} disabled={!shareUrl}>
                    <span style={copyStatus ? { opacity: 0 } : {}}>
                        {isMobile ? t("rewards-box.link-mobile") : t("rewards-box.link")}
                    </span>
                    <span className="copyStatus">{copyStatus}</span>
                </CopyButton>
            </InviteWrapper>
        </BaseModule>
    );
});

const BaseModule = styled(BaseModuleContainer)`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: fit-content;

    @media screen and (max-width: 914px) {
        min-height: 436px;
    }

    @media (min-width: 1020px) {
        padding: 44px 55px 48px 55px;
    }
`;

const HeadWrapper = styled.div``;

const SnapshotHeader = styled.div`
    font-size: 32px;
    line-height: 41px;
    font-family: RoslindaleDisplayCondensed;
    font-style: normal;
    font-weight: 500;
    color: #242e35;
    display: flex;
    justify-content: space-between;
    align-items: center;

    ${(p) => p.theme.media.greaterThan("1024px")`
        font-size: 45px;
        line-height: 60px;
    `}
`;

const DescriptionWrap = styled.div`
    margin-top: 13px;
    font-family: VinovestMedium;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 21px;
    letter-spacing: 0.005em;
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const TotalBoxWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 70px;
    border-radius: 9px;
    background: #eaeedd;
    color: #3c400c;
    padding: 10px 13.74px;

    img {
        width: 32px;
        display: none;
        flex-shrink: 0;
    }

    .amount {
        font-family: RoslindaleDisplayCondensed;
        font-style: normal;
        font-weight: bold;
        font-size: 20px;
        line-height: 32px;
        text-align: center;
    }

    .descriptionWrapper {
        flex-grow: 1;
    }

    .description {
        font-family: VinovestMedium;
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 21px;
        letter-spacing: 0.005em;
    }

    .dataMessage {
        font-family: VinovestMedium;
        font-style: normal;
        font-weight: 500;
        font-size: 11px;
        line-height: 21px;
        letter-spacing: 0.005em;
    }

    ${(p) => p.theme.media.greaterThan("1024px")`
        padding: 10px 24px;

        img {
            margin: 0 19px 0 0;
            display: block;
        }

        .amount {
            font-size: 24px;
            line-height: 32px;
        }
    `}
`;

const TunedTotalBoxWrapper = styled(TotalBoxWrapper)`
    background: #dce6ef;
    color: #112d47;
    margin-top: 16px;
`;

const InviteWrapper = styled.div`
    display: flex;
    align-items: center;
`;

const InviteField = styled.input`
    border: 0;
    border-radius: 3px;
    padding: 16px 21px;
    font-family: "VinovestMedium";
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 21px;
    letter-spacing: 0.005em;
    color: #242e35;
    height: 44px;
    flex-grow: 1;
    margin-right: 11px;
    background: #eeeeee;
    width: 60%;
    flex-grow: 1;
    flex-shrink: 1;
`;

const CopyButton = styled.button`
    border: 0;
    border-radius: 3px;
    outline: 0;
    min-width: 63px;
    width: fit-content;
    height: 44px;
    background: #a86d37;
    font-family: "VinovestMono";
    font-style: normal;
    font-weight: 500;
    font-size: 11px;
    line-height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    letter-spacing: 0.025em;
    text-transform: uppercase;
    color: #ffffff;

    .copyStatus {
        position: absolute;
    }

    ${(p) => p.theme.media.greaterThan("1024px")`
        padding: 20px;
        font-size: 14px;
        line-height: 18px;
    `}

    &:hover {
        cursor: pointer;
    }

    &:disabled {
        cursor: default;
    }
`;

export default RewardsBox;
