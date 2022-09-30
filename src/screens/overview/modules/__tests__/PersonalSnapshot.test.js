import React from "react";
import { ThemeProvider } from "styled-components";
import { render } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import { theme } from "#assets/theme/theme";
import { RootStoreProvider } from "#stores/rootStore";
import { emptyFetchEntity } from "#models/FetchStatus";
import { PersonalSnapshot } from "../PersonalSnapshot";
import i18n from "#localization/i18n";

xdescribe("PersonalSnapshot component", () => {
    const history = createMemoryHistory();
    it("should properly render the default value state", () => {
        const totalsEntity = { data: { bottleCount: "0" }, status: { isPending: () => false } };
        const root = {
            user: { oktaUserEntity: emptyFetchEntity({}), profileEntity: emptyFetchEntity({}) },
            portfolio: {
                totalsEntity: emptyFetchEntity(totalsEntity),
                totals: { bottleCount: 0 },
                totalReturn: 0,
                planLevel: "starter",
            },
        };
        const { getByTestId } = render(
            <Router history={history}>
                <RootStoreProvider value={root}>
                    <ThemeProvider theme={theme}>
                        <I18nextProvider i18n={i18n}>
                            <PersonalSnapshot />
                        </I18nextProvider>
                    </ThemeProvider>
                </RootStoreProvider>
            </Router>,
        );
        const header = getByTestId("name-header");
        const returns = getByTestId("net-returns");
        const level = getByTestId("account-level");
        const plan = getByTestId("investment-plan");

        expect(header.textContent).toEqual("Welcome, friend");
        expect(returns.textContent).toEqual("0 Bottles");
        expect(level.textContent).toEqual("Standard");
        expect(plan.textContent).toEqual("Not yet set");
    });

    it("should properly the user and portfolio state", () => {
        const bottleCount = 106;
        const oktaUser = { given_name: "franklin" };
        const profile = { investingStyle: "aggressive" };
        const totalsEntity = { bottleCount: 106 };

        const root = {
            user: { oktaUserEntity: emptyFetchEntity(oktaUser), profileEntity: emptyFetchEntity(profile) },
            portfolio: {
                totalsEntity: emptyFetchEntity(totalsEntity),
                totals: { bottleCount },
                planLevel: "Custom",
            },
        };

        const { getByTestId } = render(
            <Router history={history}>
                <RootStoreProvider value={root}>
                    <ThemeProvider theme={theme}>
                        <I18nextProvider i18n={i18n}>
                            <PersonalSnapshot />
                        </I18nextProvider>
                    </ThemeProvider>
                </RootStoreProvider>
            </Router>,
        );
        const header = getByTestId("name-header");
        const returns = getByTestId("net-returns");
        const level = getByTestId("account-level");
        const plan = getByTestId("investment-plan");

        // expect(header.context)
        expect(header.textContent).toEqual("Welcome, Franklin");
        expect(returns.textContent).toEqual("106 Bottles");
        expect(level.textContent).toEqual("Custom");
        expect(plan.textContent).toEqual("Aggressive Investing");
    });
});
