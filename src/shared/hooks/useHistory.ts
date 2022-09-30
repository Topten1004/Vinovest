import { useCallback, useMemo } from "react";
import { useHistory as useReactRouterHistory } from "react-router";
import { localizedPath } from "#localization/localizedRouter";
import {History} from "history";
export const useHistory: () => History = () => {
    const getHistory = useCallback(() => {
        const history = useReactRouterHistory();
        const newHistory = Object.assign({}, history, { push: null, nativePush: history.push });
        newHistory.push = (path) => history.push(localizedPath(path));
        return newHistory;
    }, []);
    return getHistory();
};
