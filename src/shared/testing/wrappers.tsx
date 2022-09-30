import React, { ElementType, createContext, Context } from "react";
import { ThemeProvider } from "styled-components";
import { I18nextProvider } from "react-i18next";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { theme } from "#assets/theme/theme";
import { RootStoreProvider } from "#stores/rootStore";
import { emptyFetchEntity } from "#models/FetchStatus";
import i18n from "#localization/i18n";
import { ConfigProvider } from "#shared/hooks/useConfig";
import "jest-styled-components";
import appConfig from "#app.config";

export const withContexts = function (Component, rootStoreOverRide?: Object) {
    const defaultRoot = {
        auth: { isAuthenticated: true },
        user: {
            oktaUserEntity: emptyFetchEntity({}),
            profileEntity: emptyFetchEntity({}),
            requestUserDetailsFromOkta: emptyFetchEntity({}),
        },
        portfolio: { totalsEntity: emptyFetchEntity({}), totalReturn: 0, planLevel: "starter" },
        transfer: { portalURIFetch: emptyFetchEntity({ data: "stub" }), requestGetSelfServicePortalURI: jest.fn() },
        deposit: { fetchSavedBankAccountsAndCreditCards: emptyFetchEntity({}), setUserCurrency: jest.fn() },
    };

    const root = { ...defaultRoot, ...(rootStoreOverRide ?? {}) };

    const wrappedComponent: React.FunctionComponent = function (props, context) {
        const history = createMemoryHistory();
        const WrappedContext = createContext({});
        return (
            <Router history={history}>
                <RootStoreProvider value={root}>
                    <ThemeProvider theme={theme}>
                        <I18nextProvider i18n={i18n}>
                            {context && (
                                <WrappedContext.Provider value={context}>
                                    <ConfigProvider value={appConfig}>
                                        <Component {...props} history={history} />
                                    </ConfigProvider>
                                </WrappedContext.Provider>
                            )}
                            {!context && <Component {...props} history={history} />}
                        </I18nextProvider>
                    </ThemeProvider>
                </RootStoreProvider>
            </Router>
        );
    };

    return { component: wrappedComponent, history };
};
