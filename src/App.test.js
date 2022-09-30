import React from "react";
import { render } from "@testing-library/react";
import { RootStoreProvider, RootStore } from "#stores/rootStore";
import { ConfigProvider } from "#shared/hooks/useConfig";
import App from "./App";
import config from "./app.config";

it("renders without crashing", () => {
    const api = {};
    const tracking = {
        trackLoginComplete: jest.fn(),
        trackRegistrationComplete: jest.fn(),
    };
    const mockStore = RootStore.build(api, tracking);
    render(
        <ConfigProvider value={config}>
            <RootStoreProvider value={mockStore}>
                <App oktaAuthInstance={null} />
            </RootStoreProvider>
        </ConfigProvider>,
    );
});
