import React, { useCallback, useMemo, useState, useEffect } from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import * as Sentry from "@sentry/react";
import _ from "lodash";
import qs from "qs";
import cookie from "js-cookie";
import { Redirect, useLocation } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";
import config from "#app.config";
import { V3Logo } from "#assets/shared/v3Logo";
import { I18nLink as Link } from "#localization/localizedRouter";
import { useRootStore } from "#shared/hooks";
import { InvestmentGraph } from "./assets/InvestmentGraph";
import { LogoContainer, LogoRow } from "./components/styled";
import OktaAuthContainer from "./components/OktaAuthContainer";
import { ReferralConfirmationPane } from "./components/ReferralConfirmationPane";
import { ReferralInviteCookie } from "../../utils/constants";
import { useCreateRoutingCallback } from "#shared/hooks";
import SocialProofSlider from "./social-proof-slider";

const onError = () => {}; // no-op for now.  Use toastr in the future
const LoginPage = () => {
    const store = useRootStore();
    const location = useLocation();
    const { oktaAuth } = useOktaAuth();

    const authenticated = useMemo(() => store.auth.isAuthenticated, [store.auth.isAuthenticated]);
    const isReferralFlow = useMemo(() => !_.isNil(cookie.get(ReferralInviteCookie.KEY)), []);
    //const isReferralFlow = true;
    const isSignup = location.pathname.endsWith("/signup");
   
    const [loginStep, setLoginStep] = useState(0);
    const redirectToExchange = useCreateRoutingCallback("/portfolio", { refresh: true });
    useEffect(() => {
        authenticated && redirectToExchange();
    }, [authenticated]);
    useEffect(() => {
        window.scrollTo(0, 0);
        const { callback_pathname } = qs.parse(location.search, { ignoreQueryPrefix: true });
        if (callback_pathname) {
            oktaAuth.setOriginalUri(`${window.location.origin}${callback_pathname}`);
        }
    }, []);

    const onSuccess = useCallback(
        async ({ status, sessionToken }) => {
            const csrfResponse = await fetch("/api/auth/csrf");
            const csrf = csrfResponse.json();
            if (status === "SUCCESS") {
                try {
                    await oktaAuth.signInWithRedirect({
                        sessionToken,
                    });
                } catch (e) {
                    Sentry.captureException(new Error("Error on okta success callback"));
                }
            }

            Sentry.captureException(new Error("oktaAuth.signIn failed to return a SUCCESS response"), {
                extra: { status },
            });
            return Promise.resolve();

            // The user can be in another authentication state that requires further action.
            // For more information about these states, see:
            // https://github.com/okta/okta-signin-widget#rendereloptions-success-error
        },
        [oktaAuth],
    );

    return !authenticated ? (
        <>
            {isSignup && !isReferralFlow ? null : (
                <LogoRowWithoutRef>
                    <LogoContainerWithoutRef isSplitPane={isReferralFlow}>
                        <Link aria-label="link-to-homepage" to="/">
                            <V3Logo />
                        </Link>
                    </LogoContainerWithoutRef>
                </LogoRowWithoutRef>
            )}
            <Grid>
                <Column
                    className={loginStep === 0 ? "form half" : "form"}
                    isSignup={isSignup}
                    isReferralFlow={isReferralFlow}
                >
                    {isSignup && !isReferralFlow && (
                        <LogoContainerSignUp>
                            <Link aria-label="link-to-homepage" to="/">
                                <V3Logo />
                            </Link>
                        </LogoContainerSignUp>
                    )}
                    <OktaAuthContainer
                        baseUrl={config.baseUrl}
                        onSuccess={onSuccess}
                        onError={onError}
                        setLoginStep={setLoginStep}
                    />
                </Column>
                {loginStep === 0 && (
                    <Column className="graphic" isSignup={isSignup}>
                        {isReferralFlow ? (
                            <ReferralConfirmationPane />
                        ) : (
                            <GraphContainer>{!isSignup ? <InvestmentGraph /> : <SocialProofSlider />}</GraphContainer>
                        )}
                    </Column>
                )}
            </Grid>
        </>
    ) : (
        <Redirect to={"/portfolio"} push />
    );
};

export const LogoRowWithoutRef = styled(LogoRow)`

    border-bottom: 1px solid ${(p) => p.theme.colors.lighterGray};
    justify-content: center;
    padding: 0 16px;}

    ${(p) => p.theme.media.greaterThan("768px")`
        justify-content: flex-start;        
    `}
    
    @media screen and (min-width: 1024px) {
        justify-content: flex-start;
        padding: 0 16px;

        @media screen and (min-width: 1100px) {
            padding: 0 100px;
        }
    }
`;

export const LogoContainerWithoutRef = styled(LogoContainer)`
    ${(p) => p.theme.media.greaterThan("768px")`
        width: 104px;  
    `}
`;


const LogoContainerSignUp = styled(LogoContainer)`
    position: absolute;
    top: 0;
    ${(p) => p.theme.media.greaterThan("768px")`
    width: 104px;  
`}
`;

const Grid = styled.div`
    display: flex;
    flex-wrap: wrap;
    height: 100vh;
    margin: auto;
    width: 100%;

    h1 {
        font-size: 32px;

        ${(p) => p.theme.media.greaterThan("1024px")`
            font-size: 45px;
        `};
    }
`;

const Column = styled.div`
    width: 100%
        ${(p) => p.theme.media.greaterThan("1024px")`
        width: 50%;
    `};

    &.form {
        margin-bottom: ${(p) => p.isSignup ? 0 : "2rem"};
        padding: ${(p) => p.isSignup ? "2rem 1.5rem 0" : "2rem 1.5rem"};
        width: 100%;

        &.half {  
             padding-top: ${(p) => p.isSignup && !p.isReferralFlow ? "4.25rem" : 0};
             @media screen and (min-width: 768px) {
                padding-top: ${(p) => p.isSignup && !p.isReferralFlow ? "8rem" : "4.25rem"};
             }     
            ${(p) => p.theme.media.greaterThan("1024px")`
                max-width: 620px;
                margin-bottom: 0;
                margin-left: auto;
                padding-right: 5rem;
                padding-left: 1.5rem;
                padding-top: ${(p) => p.isSignup && !p.isReferralFlow ? "12rem" : "6rem"};
                width: 50%;
            `};
        }
    }

    &.graphic {
        background: ${(p) => p.isSignup ? "#FFF8F1" : "#3c400d"};
    }
`;
const GraphContainer = styled.div`
    position: relative;
    height: 100%;
`;

export default observer(LoginPage);
