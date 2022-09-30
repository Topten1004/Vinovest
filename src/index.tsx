import * as React from "react";
import ReactDOM from "react-dom";
import "intersection-observer";
import "url-search-params-polyfill";
import "fast-text-encoding";
import "react-toastify/dist/ReactToastify.css";
import { Router, matchPath } from "react-router-dom";
import { createBrowserHistory } from "history";
import "normalize.css";
import "./index.css";
import "#localization/i18n";

import { ConfigProvider } from "#shared/hooks/useConfig";
import { TransportManager } from "#stores/transport";
import { RootStore, RootStoreProvider } from "#stores/rootStore";

import * as serviceWorker from "./serviceWorker";
import { initTrackers, clearConsoleLogs } from "./initTrackers";
import config from "./app.config"; // TODO: turn into factory
import App from "./App";
import oktaAuthInstance from "./services/oktaAuthInstance";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

(process.env?.NODE_ENV === "production" || process.env?.APP_ENV === "production") && clearConsoleLogs();
const history = createBrowserHistory();
if(!/zh/.test(window.location.pathname) && typeof window.yett?.unblock === 'function'){
window.yett.unblock();
}
const tracking = initTrackers(config, history);
const api = TransportManager.build(config);
const rootStore = RootStore.build(api, tracking);

ReactDOM.render(
    <ConfigProvider value={config}>
        <RootStoreProvider value={rootStore}>
            <Router history={history}>
                <App oktaAuthInstance={oktaAuthInstance} />
            </Router>
        </RootStoreProvider>
    </ConfigProvider>,
    document.getElementById("root"),
);

// https://bit.ly/CRA-PWA
serviceWorker.unregister();
