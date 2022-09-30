import React, { ReactDOM } from "react";
import { render, screen } from "@testing-library/react";
import { AccountAutoInvest } from "../account/AccountAutoInvest";
import Account from "../account/index";
import { withContexts } from "#shared/testing/wrappers";
import { account_auto_invest } from "#translations/en/account.json";
import { i18nFailRegex } from "../../shared/testing/i18n";

const { title: sTitle, subtitle: sSubtitle } = account_auto_invest;

jest.mock("@okta/okta-react", () => ({
    useOktaAuth: () => ({
        authState: { isAuthenticated: true },
        authService: { handleAuthentication: jest.fn() },
    }),
    withOktaAuth: (x) => x,
}));
xdescribe("AccountAutoInvest component", () => {
    let component;
    const props = {
        portalURIFetch: {
            status: {
                isSuccess: jest.fn(() => true),
                isInvalidated: jest.fn(() => true),
            },
            data: "hello",
        },
    };
    component = withContexts(AccountAutoInvest);

    it("Should match snapshot", () => {
        const { baseElement } = render(component(props));
        expect(baseElement).toMatchSnapshot();
    });
    it("Check Translations", () => {
        const { getByTestId } = render(component(props));
        const title = getByTestId("acc-auto-link");
        const subtitle = getByTestId("acc-subtitle");

        expect(title.textContent).toEqual(sTitle);
        expect(subtitle.textContent).toEqual(sSubtitle);
    });
});
describe("Full Component", () => {
    // FULL COMPONENT HERE
    const props = {
        editState: false,
        query: true,
        fetchData: jest.fn(),
    };

    const { component } = withContexts(Account);

    const { baseElement } = render('<div id="root"/>', component(props));
    it("Should Translate correctly", () => {
        expect(baseElement).toMatchSnapshot();

        const failedTranslations = screen.queryByText(i18nFailRegex);
        expect(failedTranslations).toBeNull();
    });
});
