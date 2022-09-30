import { routeToLocale } from "../../constants";
export default {
    name: "path",

    find(options) {
        let found;
        if (typeof window !== "undefined") {
            const language = window.location.pathname.match(/\/([a-zA-Z-]*)/g);
            if (language instanceof Array) {
                if (typeof options.lookupFromPathIndex === "number") {
                    if (typeof language[options.lookupFromPathIndex] !== "string") {
                        return undefined;
                    }
                    const localeString = language[options.lookupFromPathIndex].replace("/", "");
                    const possibleFind = routeToLocale[localeString];
                    if (possibleFind) {
                        found = possibleFind;
                    }
                } else {
                    const localeString = language[0].replace("/", "");
                    const possibleFind = routeToLocale[localeString];
                    if (possibleFind) {
                        found = possibleFind;
                    } else {
                        found = "en";
                    }
                }
            }
        }
        return found;
    },
};
