import React from "react";
import { useLocation } from "react-router-dom";
import { I18nLink } from "#localization/localizedRouter";

export const ConditionalLink = ({ notOnboarding, authenticated, children }) => {
    const { search } = useLocation();
    const linkProps = authenticated ? { hard: true, to: "/portfolio", search } : { to: "/", search };

    return notOnboarding ? <I18nLink {...linkProps}>{children}</I18nLink> : <>{children}</>;
};
