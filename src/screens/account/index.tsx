import React, { useEffect, useState, useCallback } from "react";
import ReactDOM from "react-dom";
import { observer } from "mobx-react-lite";
import styled from "styled-components";
import { withOktaAuth } from "@okta/okta-react";
import { Route, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { OktaAuth } from "@okta/okta-auth-js";
import { PageRedirect } from "#shared/components/PageRedirect/PageRedirect";
import { useLogoutCallback, useRootStore } from "#shared/hooks";
import { AccountPhone } from "./AccountPhone";
import { AccountAddress } from "./AccountAddress";
import { AccountEmail } from "./AccountEmail";
import { SellYourWine } from "./SellYourWine";
import { AccountAutoInvest } from "./AccountAutoInvest";
import AccountInvestmentPlan from "./AccountInvestmentPlan";
import { I18nSwitch, I18nNavLink } from "#localization/localizedRouter";
import { AccountPassword } from "./AccountPassword";

interface AccountPageProps {
    oktaAuth: OktaAuth;
}

const AccountPage = ({ oktaAuth }: AccountPageProps) => {
    const { t } = useTranslation("account");
    const onLogout = useLogoutCallback();
    const store = useRootStore();
    const [userInformation, setUserInformation] = useState(null);
    const { transfer: transferStore, auth: authStore } = useRootStore();
    const location = useLocation();

    useEffect(() => {
        if (authStore.isAuthenticated) {
            transferStore.requestGetSelfServicePortalURI();
        }
    }, [authStore.isAuthenticated, transferStore]);

    const fetchData = useCallback(async () => {
        await store.user.requestUserDetailsFromOkta(oktaAuth);
        await store.user.fetchUserInformation();
        setUserInformation(store.user.userInformationEntity.data);
    }, [oktaAuth, store.user]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);
    return (
        <AccountPageContainer>
            <NavigationPanel>
                <MenuTitle>{t("main.user_settings")}</MenuTitle>
                <I18nNavLink to="/account" activeClassName="active" exact>
                    {t("user_settings.account")}
                </I18nNavLink>
                <I18nNavLink to="/account/email" activeClassName="active">
                    {t("account_email.email")}
                </I18nNavLink>
                <I18nNavLink to="/account/password" activeClassName="active">
                    {t("user_settings.password")}
                </I18nNavLink>
                <I18nNavLink to="/account/phone" activeClassName="active">
                    {t("user_settings.phone")}
                </I18nNavLink>
                <MenuTitle>{t("main.account")}</MenuTitle>
                <I18nNavLink to="/account/investment-plan" activeClassName="active">
                    {t("user_settings.investment_plan")}
                </I18nNavLink>
                <I18nNavLink to="/account/auto-invest" activeClassName="active">
                    {t("account_settings.auto_invest")}
                </I18nNavLink>
                <I18nNavLink to="/account/sell" activeClassName="active">
                    {t("account_settings.sell_wine")}
                </I18nNavLink>
                <NavigationOption className="accent" onClick={onLogout}>
                    {t("user_settings.logout")}
                </NavigationOption>
            </NavigationPanel>
            <RightDetailPanel>
                <AccountFormWrapper loc={location.pathname}>
                    <I18nSwitch>
                        <Route
                            exact
                            path="/account"
                            render={(props) => (
                                <AccountAddress {...props} query={userInformation} fetchData={fetchData} />
                            )}
                        />
                        <Route
                            exact
                            path="/account/email"
                            render={(props) => (
                                <AccountEmail {...props} query={userInformation} fetchData={fetchData} />
                            )}
                        />
                        <Route exact path="/account/password" render={(props) => <AccountPassword />} />
                        <Route
                            exact
                            path="/account/phone"
                            render={(props) => (
                                <AccountPhone {...props} query={userInformation} fetchData={fetchData} />
                            )}
                        />
                        <Route exact path="/account/investment-plan" component={AccountInvestmentPlan} />
                        <Route
                            exact
                            path="/account/auto-invest"
                            render={(props) => (
                                <AccountAutoInvest {...props} portalURIFetch={transferStore.portalURIFetch} />
                            )}
                        />
                        <Route exact path="/account/sell" component={SellYourWine} />
                    </I18nSwitch>
                </AccountFormWrapper>
            </RightDetailPanel>
        </AccountPageContainer>
    );
};

export default withOktaAuth(observer(AccountPage));

const AccountFormWrapper = styled.div`
    border: ${(p) => (p.loc.includes("/account/sell") ? "none" : `1px solid ${p.theme.colors.lighterGray}`)};
    border-radius: 10px;
    box-shadow: ${(p) => (p.loc.includes("/account/sell") ? "none" : "0px 4px 40px rgba(0, 0, 0, 0.1)")};
    padding: 1.5rem 1rem;
    position: relative;

    ${(p) => p.theme.media.greaterThan("1024px")`
        margin: auto;
        max-width: 775px;
        padding: ${(p) => (p.loc.includes("/account/sell") ? "0" : "3rem")};
  `};
`;

const AccountPageContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
    width: 100%;

    ${(p) => p.theme.media.greaterThan("1024px")`
        flex-direction: row;
        margin: auto;
        max-width: 1240px;
        padding: 80px 12px;
  `};
    ${(p) => p.theme.media.greaterThan("1100px")`
        flex-direction: row;
  `};
`;

const NavigationPanel = styled.div`
    display: none;
    overflow: auto;
    font-family: VinovestMono;
    font-size: 14px;
    justify-content: flex-start;
    margin: 24px 0;
    padding-bottom: 18px;
    border-bottom: 1px solid ${(p) => p.theme.colors.lightGray};

    ${(p) => p.theme.media.greaterThan("1024px")`
    display: flex;
        flex-direction: column;
        justify-content: flex-start;
        margin: initial;
        border-bottom: none;
        height: 100%;
        width: 300px;
        padding: 20px 0;
    `};

    a {
        background: none;
        border-left: 2px solid transparent;
        color: ${(p) => p.theme.colors.mainAccentBlue};
        white-space: nowrap;
        outline: none;
        border: none;
        cursor: pointer;
        text-decoration: none;
        text-transform: uppercase;
        margin-bottom: 1.5rem;
        padding: 0.25rem 0.75rem;
        text-align: left;

        &:hover {
            border-left: 2px solid ${(p) => p.theme.colors.burntOrange};
        }

        &.active {
            border-left: 2px solid ${(p) => p.theme.colors.burntOrange};
        }
    }
`;

const NavigationOption = styled.button`
    background: none;
    border-left: 2px solid ${(p) => (p.emphasis ? p.theme.colors.burntOrange : "transparent")}
    color: ${(p) => p.theme.colors.mainAccentBlue};
    border: none;
    cursor: pointer;
    text-transform: uppercase;
    outline: none;
    margin-bottom: 1.5rem;
    padding: .25rem .75rem;
    text-align: left;
    white-space: nowrap;

    &:hover {
        border-left: 2px solid ${(p) => p.theme.colors.burntOrange}
    }

    &.accent {
        color: ${(p) => p.theme.colors.burntOrange};
    }
`;

const RightDetailPanel = styled.div`
    padding: 20px 0;
    width: 100%;

    ${(p) => p.theme.media.greaterThan("1024px")`
        padding: 20px 0 20px 40px;
    `};
`;

const MenuTitle = styled.span`
    display: none;
    font-size: 1.25rem;
    font-family: RoslindaleDisplayCondensed;
    font-weight: 500;

    ${(p) => p.theme.media.greaterThan("1024px")`
        display: block;
        margin-bottom: 1.5rem;
    `};
`;
