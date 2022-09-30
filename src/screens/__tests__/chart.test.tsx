import React from "react";
import { render } from "@testing-library/react";
import Chart from "../chart/ChartScreen";
import { withContexts } from "#shared/testing/wrappers";

jest.mock("@okta/okta-react", () => ({
    useOktaAuth: () => ({
        authState: { isAuthenticated: true },
        authService: { handleAuthentication: jest.fn() },
    }),
    withOktaAuth: (x) => x,
}));
describe("Chart component", () => {
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
    const { component: Comp } = withContexts(Chart);
    component = Comp;

    it("Should match snapshot", () => {
        const { baseElement } = render(component(props));
        expect(baseElement).toMatchSnapshot();
    });
});
