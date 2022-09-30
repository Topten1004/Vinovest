import React, { useEffect, useMemo, Suspense } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Security, useOktaAuth } from "@okta/okta-react";
import _pick from "lodash/pick";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useLocation } from "react-router";
import { observer } from "mobx-react-lite";
import { withProfiler as withSentryProfiler, setUser as setSentryUser } from "@sentry/react";
import { ThemeProvider } from "styled-components";
import { ThemeProvider as EmotionProvider } from "@emotion/react";
import { Theme as VinoTheme } from "@vinovest/components/theme";
import { format } from "date-fns";
import { I18nSwitch, I18nRoute } from "#localization/localizedRouter";
import Footer from "#shared/components/Footer";
import { AppHeader } from "#shared/components/Navigation/AppHeader";
import { MobileNavBar } from "#shared/components/Navigation/MobileNavBar";
import { useRootStore, useMobile, useCreateRoutingCallback } from "#shared/hooks";
import RouteFactory from "#shared/components/RouteFactory";
import { theme } from "#assets/theme/theme";
import { getStatus } from "#models/FetchStatus";
import { Routes } from "#screens/index";
import { PendingReferralInviteModal } from "#shared/components/PendingReferralInviteModal";
import { InviteModal } from "#screens/invite/InviteModal";
import ScreenSpinner from "#shared/components/ScreenSpinner";
import { AUTH_TYPE, currencyCode } from "#utils/constants";
import { postImpactNewUserData, setImpactClickIDCookie } from "#utils/impactData";
import ScrollToTop from "#shared/components/ScrollToTop";
import RemoveOptinmonster from "#shared/components/RemoveOptinmonster";
import useZendesk from "#shared/hooks/useZendesk";
import { setZendeskSettings } from "#shared/hooks/useZendesk/utils";
import {
    onAuthRequired,
    setReferralLinkCookie,
    getReferralLinkStatus,
    getUserDataStatus,
} from "#utils/authenticationUtils";
import { isPrintPath } from "#utils/shared";
import { PageRedirect } from "#shared/components/PageRedirect/PageRedirect";

const themeGenerator = new VinoTheme({ theme: "light", version: "v1" });
const emotionTheme = themeGenerator.produce();
const date = format(new Date(), "MM/dd/yyyy");

const Body: React.VFC = observer(() => {
    const s = useRootStore();
    useEffect(() => {
        if ((s.transfer.hasMadeTransfers || date === "01/01/2022") && localStorage.getItem("campaign")) {
            localStorage.removeItem("campaign");
        }
    }, [s.transfer.hasMadeTransfers]);
    const location = useLocation();
    const { oktaAuth, authState } = useOktaAuth();
    const isMobile = useMobile(1023);
    const routeTo = useCreateRoutingCallback();
    const fullScreenMode = isPrintPath(location);
    const hasUserDataLoaded = useMemo(() => {
        if (s.user.needsOnboarding) {
            return true;
        }
        return getUserDataStatus(s.user.oktaUserEntity, s.user.profileEntity, s.user.userInformationEntity);
    }, [s.user.oktaUserEntity, s.user.profileEntity, s.user.userInformationEntity, s.user.needsOnboarding]);

    const shouldShowReferralInviteModal = useMemo(
        () => getReferralLinkStatus(s.referral.hasPendingReferralInvite, location, s.transfer.transferInProgress),
        [location, s.referral.hasPendingReferralInvite, s.transfer.transferInProgress],
    );

    useEffect(() => {
        if (!s.auth.accessToken) {
            s.auth.checkAndSetAJwt(authState);
        }
    }, [authState, s.auth, s.auth.isAuthenticated]);

    /** Redirect: to Quiz if user needs onboarding */
    useEffect(() => {
        if (hasUserDataLoaded && !location.pathname.includes("new-user")) {
            if (s.user.needsOnboarding) {
                postImpactNewUserData(s, oktaAuth);
            }
        }
    }, [location.pathname, oktaAuth, s.user, s.auth, s, hasUserDataLoaded]);

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        setReferralLinkCookie(query);
        setImpactClickIDCookie(query);
    }, [location]);

    useEffect(() => {
        const fetchUserProfileData = async () => {
            await s.user.requestUserDetailsFromOkta(oktaAuth);

            await s.user.fetchProfile();
            await s.user.fetchUserInformation();
            await s.referral.pollForUserReferralDetails(4);
            await s.referral.validateReferralInviteIfExists();
        };

        if (s.auth.isAuthenticated) {
            fetchUserProfileData();
        }
    }, [authState, oktaAuth, s, s.auth.isAuthenticated]);

    useEffect(() => {
        const fetchTransactionData = async () => {
            await Promise.all([
                s.deposit.fetchReferenceKey(),
                s.transfer.fetchDeposits(),
                s.cellar.fetchPortfolioTotals("6m", currencyCode),
                s.transfer.fetchPendingTransfers(currencyCode),
                s.transfer.fetchShouldShowAccountSubscriptionEntity(),
                s.transfer.fetchBidsActive(),
            ]);
        };
        if (hasUserDataLoaded && !s.user.needsOnboarding && s.auth.isAuthenticated) {
            fetchTransactionData();
        }
    }, [hasUserDataLoaded, s.auth.isAuthenticated, s.deposit, s.cellar, s.transfer, s.user.needsOnboarding]);

    /** Events: login or signup */
    useEffect(() => {
        if (getStatus(s.user.oktaUserEntity).isDone()) {
            const authType = localStorage.getItem(AUTH_TYPE.KEY);
            const { status, ...userInfo } = s.user.oktaUserEntity;
            const { sub, ...restUserInfo } = s.user.oktaUserInfo;
            setSentryUser(userInfo);
            s.tracking.gtm.trackUserOverviewStatus(authType, sub, restUserInfo, s);
            localStorage.removeItem(AUTH_TYPE.KEY);
        }
    }, [s.user.oktaUserEntity, s.tracking.gtm, s]);

    // Zendesk Setup
    useEffect(() => {
        setZendeskSettings();
    }, []);
    useZendesk(s.auth.isAuthenticated);
    const hideHeaderPaths = ["/implicit/callback", "/"];
    const isRedirectingToExchange = useMemo(() => {
        const hide = new RegExp(`^(${hideHeaderPaths.join("|")})$`);

        return hide.test(location.pathname) && s.auth.isAuthenticated;
    }, [hideHeaderPaths, location.pathname, s.auth.isAuthenticated]);

    return isRedirectingToExchange ? (
        <PageRedirect />
    ) : (
        <div id="page-wrap">
            {!fullScreenMode && <AppHeader />}
            <main>
                <Suspense fallback={<ScreenSpinner loading />}>
                    <I18nSwitch>
                        {Routes.map((screen, i) => (
                            <RouteFactory {...screen} key={screen.path} />
                        ))}
                    </I18nSwitch>
                </Suspense>

                <PendingReferralInviteModal showPendingInviteModal={shouldShowReferralInviteModal} />
            </main>
            {!fullScreenMode && (
                <>
                    <Footer />
                    {isMobile && <MobileNavBar />}
                    {s.referral.referralInviteModalWindowOpen && (
                        <InviteModal onClose={s.referral.toggleReferralInviteModalWindowOpen} />
                    )}
                </>
            )}
        </div>
    );
});

const App = ({ oktaAuthInstance }) => (
    <ThemeProvider theme={theme}>
        <EmotionProvider theme={emotionTheme}>
            <Router>
                <ScrollToTop />
                <RemoveOptinmonster />
                {/* https://developer.okta.com/quickstart/#update-your-app-js */}
                <Security onAuthRequired={onAuthRequired} oktaAuth={oktaAuthInstance}>
                    <div id="outer-container">
                        <I18nRoute>
                            <Body />
                        </I18nRoute>
                        <ToastContainer autoClose={5000} hideProgressBar closeOnClick draggable />
                    </div>
                </Security>
            </Router>
        </EmotionProvider>
    </ThemeProvider>
);

export default withSentryProfiler(App);
