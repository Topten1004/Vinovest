import React from "react";
import { StyledNavigation } from "./styled";
import { FooterTitle } from "../styles";
import { I18nLink } from "#localization/localizedRouter";
import { useLocation } from "react-router-dom";

interface NavigationColumnProps {
    title: string;
    navItems: Array<{
        isLink: boolean;
        path: string;
        title: string;
        onRoute: string;
        isAbsolute: boolean
    }>;
}

const NavigationColumn = ({ title, navItems }: NavigationColumnProps) => {
    const location = useLocation();

    return (
        <div>
            <FooterTitle>{title}</FooterTitle>
            <StyledNavigation>
                {navItems.map((nav) => {
                    if (nav.isLink && !nav.onRoute && !nav.isAbsolute) {
                        return (
                            <I18nLink key={nav.path} to={nav.path}>
                                {nav.title}
                            </I18nLink>
                        );
                    }
                    if (nav.isLink && nav.onRoute && !nav.isAbsolute && nav.onRoute === location.pathname) {
                        return (
                            <I18nLink key={nav.path} to={nav.path}>
                                {nav.title}
                            </I18nLink>
                        );
                    }

         
                    if (nav.isLink && nav.onRoute && !nav.isAbsolute && nav.onRoute !== location.pathname) {
                        return null;
                    }
                    return (
                        <a key={nav.path} href={nav.path}>
                            {nav.title}
                        </a>
                    );
                })}
            </StyledNavigation>
        </div>
    );
};

export default NavigationColumn;
