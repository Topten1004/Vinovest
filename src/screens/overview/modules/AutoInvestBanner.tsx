import React from "react";

import styled from "styled-components";
import { useTranslation } from "react-i18next";
import posthog from "posthog-js";
import { useHistory } from "#shared/hooks/useHistory";
import { useMobile, useRootStore, useCreateRoutingCallback } from "#shared/hooks";

import { MainButton } from "#shared/ui";
import { TopBannerContainer } from "./styles";
import savePercentsSvg from "./assets/savePercents.svg";
import crossSvg from "./assets/cross.svg";
import { DepositEvent } from "#screens/deposit/RootDepositPage";


const isExpired = () => {
    const milliseconds = localStorage.getItem("closingAutoInvestBannerMilliseconds");

    return milliseconds ? +milliseconds + 86400000 * 7 < Date.now() : true;
};

const closeAutoInvestBannerForDays = () => {
    localStorage.setItem("closingAutoInvestBannerMilliseconds", `${Date.now()}`);
};

export const AutoInvestBanner = () => {
    const { t } = useTranslation(["overview"]);
    const redirectToDeposit = useCreateRoutingCallback("/deposit", {refresh: true, posthogId: DepositEvent.AddFunds})
    const [isClosing, setIsClosing] = React.useState(false);
    const isMobile = useMobile();
    const history = useHistory();
    const s = useRootStore();
    const showBanner = s.transfer.shouldShowAccountSubscription && isExpired();

    const closeHandler = () => {
        setIsClosing(true);

        setTimeout(() => {
            s.transfer.hideAccountSubscriptionBanner();
            closeAutoInvestBannerForDays();
        }, 300);
    };

    const onClickSavePercents = () => {
        s.deposit.setDepositFrequencyKey("monthly (Most Popular)");
        s.deposit.setUserSelectedFrequency(true);
        redirectToDeposit();
    };
    const ShowImg = ({ show }) => <>{show && <Img src={savePercentsSvg} alt="save 5%" />}</>;

    return (
        <>
            {showBanner ? (
                <BannerContainer className={isClosing ? "isClosing" : ""}>
                    <Cross onClick={closeHandler}>
                        <img src={crossSvg} alt="close banner" />
                    </Cross>
                    <div>
                        <div className="title">{t("auto-invest.title", { amount: 5 })}</div>
                        <ShowImg show={isMobile} />
                        <div className="description">{t("auto-invest.description")}</div>
                    </div>
                    <ShowImg show={!isMobile} />
                    <MainButtonSave onClick={onClickSavePercents}>
                        {t("auto-invest.enroll-button", { amount: 5 })}
                    </MainButtonSave>
                </BannerContainer>
            ) : null}
        </>
    );
};

const BannerContainer = styled(TopBannerContainer)`
    padding: 25px 20px 37px;
    min-height: 204px;
    background: #fff;
    border: 1px solid #eeeeee;
    box-sizing: border-box;
    box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    flex-direction: column !important;
    position: relative;

    ${(p) => p.theme.media.greaterThan("769px")`
        padding: 40px 45px 33.2px 69px;
        flex-direction: row !important;
        justify-content: space-around;
        align-items: center;
    `}

    .title {
        font-family: RoslindaleDisplayCondensed;
        font-style: normal;
        font-weight: bold;
        font-size: 32px;
        line-height: 41px;
        color: #242e35;

        ${(p) => p.theme.media.greaterThan("769px")`
            font-size: 36px;
            line-height: 54px;
        `}
    }

    .description {
        font-family: FavoritStd;
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 21px;
        letter-spacing: 0.005em;
        color: #242e35;

        ${(p) => p.theme.media.greaterThan("769px")`
            font-size: 16px;
            line-height: 26px;
            margin-top: 14px;
        `}
    }

    &.isClosing {
        transition: 0.3s;
        height: 0px;
        min-height: 0px;
        overflow: hidden;
        padding: 0;
        margin: 0;
        border: 0;
        opacity: 0;
    }
`;

const Cross = styled.button`
    width: 10.48px;
    height: 10.48px;
    position: absolute;
    top: 19px;
    right: 16.52px;
    background: transparent;
    border: 0;
    outline: 0;
    padding: 0;
    margin: 0;

    &:hover {
        cursor: pointer;
    }

    ${(p) => p.theme.media.greaterThan("769px")`
        width: 15.81px;
        height: 15.81px;
        top: 24px;
        right: 30.19px;
    `}

    img {
        position: absolute;
        top: 0;
        right: 0;
        object-fit: cover;
        width: 100%;
    }
`;

const Img = styled.img`
    width: 175px;
    display: block;
    margin: 40px auto;

    ${(p) => p.theme.media.greaterThan("769px")`
        margin: 0 40px;
        flex-shrink: 0;
    `}
`;

const MainButtonSave = styled(MainButton)`
    width: 100%;
    height: 44px;
    margin-top: 20px !important;

    ${(p) => p.theme.media.greaterThan("769px")`
        width: 216px;
        height: 50px;
        margin-top: 0 !important;
        flex-shrink: 0;
    `}
`;
