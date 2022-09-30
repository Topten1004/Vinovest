import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useConfig } from "#shared/hooks";

const ScrollToTop = () => {
    const { pathname } = useLocation();
    const config = useConfig();

    useEffect(() => {
        if (!["/about-us", "/blog"].includes(pathname)) {
            window.scrollTo(0, 0);
        }

        if (!window.localStorage.getItem(config.saveLastRouterPaths)) {
            window.localStorage.setItem(config.saveLastRouterPaths, "[]");
        }

        const lastPathNames = JSON.parse(window.localStorage.getItem(config.saveLastRouterPaths));
        const updatePaths = [lastPathNames[lastPathNames.length - 1], pathname];
        window.localStorage.setItem(config.saveLastRouterPaths, JSON.stringify(updatePaths));
    }, [config.saveLastRouterPaths, pathname]);

    return null;
};

export default ScrollToTop;
