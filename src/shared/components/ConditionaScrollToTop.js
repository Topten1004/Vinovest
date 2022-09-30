import React from "react";
import { useConfig } from "#shared/hooks";

const ConditionalScrollToTop = ({ path }) => {
    const config = useConfig();

    React.useEffect(() => {
        const lastPathNames = window.localStorage.getItem(config.saveLastRouterPaths);
        const [prevPath] = lastPathNames ? JSON.parse(lastPathNames) : [];

        if (!prevPath || !prevPath.includes(path)) {
            window.scrollTo(0, 0);
        }
    }, [config.saveLastRouterPaths, path]);

    return null;
};

export default ConditionalScrollToTop;
