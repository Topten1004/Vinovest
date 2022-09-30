import React, { memo, useMemo, useEffect } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useTranslation } from "react-i18next";
import { PageHeader } from "#shared/components/PageHeader";
import { useRootStore } from "#shared/hooks";
import PATH_TO_FONT from "#assets/shared/fonts/Vinovest-Mono.otf";
import { DepositRouter } from "./DepositRouter";
import { getCurrentLng } from "#localization/i18n";
import CurrencySettings from "#utils/currencySelector";

const STRIPE_ELEMENTS_OPTIONS = {
    fonts: [
        {
            family: "VinovestMono",
            src: `url(${PATH_TO_FONT})`,
            weight: "400",
        },
    ],
};

const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

const RootDepositPage: React.VFC = memo(() => {
    const { t } = useTranslation(["deposit"]);
    const pathToHeaderMap = {
        "add-funds": t("add_funds"),
        "select-source": t("select_source"),
        "credit-card": t("credit_card"),
        "domestic-wire-transfer": t("domestic_wire_transfer"),
        "wire-transfer-type": t("wire_transfer_type"),
        "international-wire-transfer": t("international_wire_transfer"),
        "mail-a-check": t("mail_check"),
        "review-transfer": t("review_transfer"),
        wechat: t("wechat"),
        alipay: t("alipay"),
        confirmation: t("confirmation"),
        failed: t("failed"),
    };
    const { deposit: depositStore, auth: authStore, tracking: trackingStore } = useRootStore();
    const s = useRootStore();
    const { pathname } = useLocation();
    const userBrowserLanguage = getCurrentLng();
    const userRegion = CurrencySettings.getUserRegion(userBrowserLanguage);
    const userCurrency = CurrencySettings.getUserCurrency(userBrowserLanguage);
    const portfolioCurrency = CurrencySettings.getPortfolioCurrency(userBrowserLanguage);
    const isForiegnTransaction = CurrencySettings.getTransactionType(userCurrency);
    const stripeCredentials = CurrencySettings.getStripeCredentials(userCurrency);
    const stripePromise = useMemo(() => stripeCredentials && loadStripe(stripeCredentials), [stripeCredentials]);
    const parsedPathKey = useMemo(() => pathname.substring(pathname.lastIndexOf("/") + 1), [pathname]);

    const mappedPageTitleFromPath = useMemo(() => {
        return pathToHeaderMap[parsedPathKey];
    }, [parsedPathKey, pathToHeaderMap]);
    useEffect(() => {
        if (s.user.oktaUserInfo.sub && trackingStore.gtm) {
            trackingStore.gtm.trackDepositStarted();
            trackingStore.gtm.trackDepositStartedSecondPixel(s);
        }
    }, [s, trackingStore.gtm]);

    useEffect(() => {
        if (authStore.isAuthenticated) {
            depositStore.fetchSavedBankAccountsAndCreditCards(userRegion);
        }
    }, [authStore.isAuthenticated, depositStore, userRegion]);

    return (
        <RootDepositPageContainer>
            <ScrollToTop />
            <RootPageHeader as="h1">{mappedPageTitleFromPath}</RootPageHeader>
            {stripePromise && (
                <Elements stripe={stripePromise} options={STRIPE_ELEMENTS_OPTIONS}>
                    <DepositRouter
                        userCurrency={userCurrency}
                        isForiegnTransaction={isForiegnTransaction}
                        userRegion={userRegion}
                        portfolioCurrency={portfolioCurrency}
                    />
                </Elements>
            )}
        </RootDepositPageContainer>
    );
});
export { DepositEvent } from "./depositConstants";
export default RootDepositPage;

const RootDepositPageContainer = styled.div`
    width: 100%;
    max-width: 900px;
    margin: 20px auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: ${(p) => p.theme.colors.mainAccentBlue};

    padding: 24px 12px;
    ${(p) => p.theme.media.greaterThan("768px")`
    min-height: 80vh;
    padding: 108px 0;
  `}
`;

const RootPageHeader = styled(PageHeader)`
    text-align: center;
    margin-top: 0;
    font-weight: 500;

    @media print {
        display: none;
    }
`;
