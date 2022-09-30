import React from "react";
import {
    Switch as ReactSwitch,
    Route as ReactRoute,
    NavLink as ReactNavLink,
    Link as ReactLink,
} from "react-router-dom";
import i18n from "./i18n";
import { routeMapping } from "./constants";

const possibleRoutes = [Object.values(routeMapping)].filter((f) => !!f).join("|");
const localeRouteRegex = new RegExp(`^\/?(${possibleRoutes})\/?`, "g");

export const I18nSwitch: React.FC = ({ children }) => (
    <ReactSwitch>
        {React.Children.map(children, (child: JSX.Element) => {
            if (React.isValidElement(child)) {
                const { path } = child.props;
                const localize = localizedPath(path);
                return React.cloneElement(child, { ...child.props, path: localize });
            }
            return child;
        })}
    </ReactSwitch>
);

export const I18nRoute: React.FC = ({ children }) => {
    const localizedPath = `/:language(${possibleRoutes})?`;
    return <ReactRoute path={localizedPath}>{({ match, location }) => <>{children}</>}</ReactRoute>;
};

export const I18nNavLink = ({ to, ...props }) => {
    const changedTo = { ...props, to: localizedPath(to) };
    return <ReactNavLink {...changedTo} />;
};

export const I18nLink: React.FC<{to: string, hard?: boolean, children?: React.Children, props?: any[]}> = ({ to, hard, children, ...props }) => {
    const changedTo = { ...props, to: localizedPath(to) };
    return hard ? <a href={to} {...props}>{children}</a> : <ReactLink {...changedTo} >{children}</ReactLink>;
};

export const localizePathString = (path?: string) => {
    if(!path){
        return ''
    }
    const localeRoute = routeMapping[i18n.language];
    const cleanedPath = path.replace(localeRouteRegex, "");

    return cleanPath(localeRoute ? `${localeRoute}${cleanedPath}` : path);
};
export const localizedPath = (to?: string | object | any) => {
    let localizedTo;
    switch (typeof to) {
    case "string":
        localizedTo = localizePathString(to);
        break;
    case "object":
        localizedTo = { ...to, pathname: localizePathString(to.pathname) };
        break;
    default:
        localizedTo = to;
        break;
    }
    return localizedTo;
};

const cleanPath = (route) => {
    try {
        // remove leading slash so we can prepend one to all
        const removeSlashes = route.replace(/(^\/|\/$)/gm, "");
        return `/${removeSlashes}`;
    } catch (e) {
        console.error("There was a problem cleaning the route path", e);
        return route;
    }
};
