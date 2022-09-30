import React, { MouseEventHandler, useMemo, useState } from "react";
import { useLocation } from "react-router";
import { observer } from "mobx-react-lite";
import styled from "styled-components";
import i18n from "i18next";
import { useTranslation } from "react-i18next";
import { IAppConfig } from "app.config";
import { I18nLink } from "#localization/localizedRouter";
import { Updates } from "#shared/components/Navigation/Navigation.styled";
import { useRootStore, useConfig, useLogoutCallback } from "#shared/hooks";
import { HomeSVGComponent } from "#assets/navigation/home";
import { BottleSVGComponent } from "#assets/navigation/bottle";
import { ArrowSVGComponent } from "#assets/navigation/arrows";
import { ProfileSVGComponent } from "#assets/navigation/profile";
import { DocumentsSVGComponent } from "#assets/navigation/documents";
import { ChevronRight } from "../../../assets/home";
import {ROUTE_PATHS} from "../../../screens/route-paths"

const NavToIcon = {
    overview: { svg: HomeSVGComponent, path: "/portfolio/managed", title: i18n.t("common:overview") },
    portfolio: { svg: BottleSVGComponent, path: ROUTE_PATHS.cellar, title: i18n.t("common:portfolio") },
    transactions: { svg: ArrowSVGComponent, path: ROUTE_PATHS.transactions, title: i18n.t("common:transactions") },
    documents: { svg: DocumentsSVGComponent, path: `${ROUTE_PATHS.documentsPage}/account_statements`, title: i18n.t("common:documents") },
    account: { svg: ProfileSVGComponent, path: "/account", title: i18n.t("common:account") },
};

interface IIconNavOptionProps {
    nav?: string;
    isInverted?: boolean;
    cancelFill?: boolean;
    exceptiveActive?: boolean;
    updates?: JSX.Element;
    onClick?: MouseEventHandler<HTMLAnchorElement>;
}

interface AccountMobileMenuProps {
    className: string;
    height: string;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const IconNavOption: React.FC<IIconNavOptionProps> = ({
    nav,
    isInverted,
    cancelFill,
    exceptiveActive,
    updates,
    onClick,
    keepInactive,
}) => {
    const { pathname, search } = useLocation();
    const route = useMemo(() => NavToIcon[nav], [nav]);
    const SVG = useMemo(() => route.svg, [route]);
    const title = useMemo(() => route.title, [route]);
    const isActive = pathname === route.path || exceptiveActive;

    return (
        <IconNavContainer
            isActive={isActive && !keepInactive}
            isInverted={isInverted}
            cancelFill={cancelFill}
        >
            {updates ? <NavUpdates>{updates}</NavUpdates> : null}
            <I18nLink to={{ pathname: route.path, search }} onClick={(event: React.MouseEvent<HTMLElement>) => onClick(event)}>
                <SVG isActive={isActive && !keepInactive} />
                <span>{title}</span>
            </I18nLink>
        </IconNavContainer>
    );
};

const AccountMobileMenu = ({className, height, onClick}: AccountMobileMenuProps) => {
    const { t } = useTranslation("account");
    const onLogout = useLogoutCallback();

    return (
        <MenuWrapper className={[className, height]}>
            <Section>
                <MenuTitle>{t("main.user_settings")}</MenuTitle>
                <I18nLink to={ROUTE_PATHS.account} onClick={(event: React.MouseEvent<HTMLElement>) => onClick(event)}>
                    {t("user_settings.account")}
                    <ChevronRight fill="#242E35" />
                </I18nLink>
                <I18nLink to="/account/email" onClick={(event:React.MouseEvent<HTMLElement>) => onClick(event)}>
                    {t("account_email.email")}
                    <ChevronRight fill="#242E35" />
                </I18nLink>
                <I18nLink to="/account/phone" onClick={(event:React.MouseEvent<HTMLElement>) => onClick(event)}>
                    {t("user_settings.phone")}
                    <ChevronRight fill="#242E35" />
                </I18nLink>
            </Section>
            <Section>
                <MenuTitle>{t("main.account")}</MenuTitle>
                <I18nLink to="/account/investment-plan" onClick={(event: React.MouseEvent<HTMLElement>) => onClick(event)}>
                    {t("account_investment_plan.title")}
                    <ChevronRight fill="#242E35" />
                </I18nLink>
                <I18nLink to="/account/auto-invest" onClick={(event: React.MouseEvent<HTMLElement>) => onClick(event)}>
                    {t("account_settings.auto_invest")}
                    <ChevronRight fill="#242E35" />
                </I18nLink>
                <I18nLink to="/account/sell" onClick={(event: React.MouseEvent<HTMLElement>) => onClick(event)}>
                    {t("account_settings.sell_wine")}
                    <ChevronRight fill="#242E35" />
                </I18nLink>
            </Section>
            <Section>
                <MenuTitle>{t("support.title")}</MenuTitle>
                <I18nLink to={ROUTE_PATHS.help} onClick={(event: React.MouseEvent<HTMLElement>) => onClick(event)}>
                    {t("support.help_support")}
                    <ChevronRight fill="#242E35" />
                </I18nLink>
                <I18nLink to={ROUTE_PATHS.terms} onClick={(event: React.MouseEvent<HTMLElement>) => onClick(event)}>
                    {t("support.terms_condition")}
                    <ChevronRight fill="#242E35" />
                </I18nLink>
                <I18nLink to={ROUTE_PATHS.privacy_policy} onClick={(event: React.MouseEvent<HTMLElement>) => onClick(event)}>
                    {t("support.privacy_policy")}
                    <ChevronRight fill="#242E35" />
                </I18nLink>
            </Section>

            <button type="button" className="accent" onClick={onLogout}>
                {t("main.logout")}
            </button>
        </MenuWrapper>
    );
};

export const MobileNavBar = observer(() => {
    const s = useRootStore();
    const config: IAppConfig = useConfig();
    const { pathname } = useLocation();
    const authenticated = useMemo(() => s.auth.isAuthenticated, [s.auth.isAuthenticated]);
    const [openMenu, setOpenMenu] = useState(false);
    const toggleMenu = () => setOpenMenu(!openMenu);
    const closeMenu = () => setOpenMenu(false);
    const menuHeight = "short";
    const { t } = useTranslation("account");

    if (!authenticated || pathname.includes("personalize") || pathname.includes("deposit")) {
        return null;
    }

    return (
        <>
            <AccountMobileMenu onClick={toggleMenu} className={openMenu ? "open" : ""} height={menuHeight} />
            <BottomStickyNavbarContainer>
                <IconNavOption nav="overview" onClick={closeMenu} keepInactive={openMenu} />
                <IconNavOption nav="portfolio" onClick={closeMenu} keepInactive={openMenu} />
                {config.feature.transactionsFeed.enabled && (
                    <IconNavOption nav="transactions" updates={s.transfer.pendingDeposits.length} onClick={closeMenu} keepInactive={openMenu} />
                )}
                <IconNavOption
                    nav="documents"
                    exceptiveActive={pathname.includes("documents")}
                    cancelFill
                    onClick={closeMenu}
                    keepInactive={openMenu}
                />
                <MenuButton className={openMenu ? "active" : ""} onClick={toggleMenu}>
                    <ProfileSVGComponent />
                    <span>{t("main.account")}</span>
                </MenuButton>
            </BottomStickyNavbarContainer>
        </>
    );
});

const BottomStickyNavbarContainer = styled.div`
    height: 65px;
    background: ${(p) => p.theme.colors.white};
    box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.2);
    z-index: 3000000000;

    width: 100%;
    position: fixed;
    bottom: 0;

    display: flex;
    justify-content: space-around;
    align-items: center;
`;

const MenuButton = styled.button`
    background: transparent;
    border: 0;
    font-size: 10px;
    line-height: 21px;
    display: flex;
    flex-direction: column;
    align-items: center;

    svg {
        margin-bottom: 4px;
    }

    &.active {
        color: ${(p) => p.theme.colors.burntOrange};

        svg {
            fill: ${(p) => p.theme.colors.burntOrange};

            path {
                stroke: #fff;
            }
        }
    }
`;

const IconNavContainer = styled.div`
    position: relative;
    a {
        text-decoration: none;
        color: #242e35;
        font-size: 10px;
        line-height: 21px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    svg {
        margin-bottom: 4px;
    }
    ${(p) =>
        p.isActive &&
        !p.cancelFill &&
        `svg {
            fill: ${p.theme.colors.burntOrange};
            path {
                stroke: ${p.isInverted ? "white" : p.theme.colors.burntOrange};
            }
        }

    `}
    ${(p) =>
        p.isActive &&
        `span {
            color: ${p.theme.colors.burntOrange};
        }
    `}
`;

const NavUpdates = styled(Updates)`
    position: absolute;
    top: -6px;
    right: 0;
    transform: translateX(50%);
`;
const MenuWrapper = styled.div`
    background: #fff;
    bottom: 65px;
    border-top: 1px solid #eee;
    overflow-x: hidden;
    padding: 0 1.5rem;
    position: fixed;
    right: 0;
    transition: 0.5s;
    transform: translateX(1200px);
    width: 100%;
    z-index: 10;

    &.open {
        transform: translateX(0px);
    }

    &.tall {
        top: 140px;
    }

    &.short {
        top: 80px;
    }

    .accent {
        color: ${(p) => p.theme.colors.burntOrange};
    }

    a,
    button {
        font-family: FavoritMonoStd;
        background: transparent;
        display: flex;
        justify-content: space-between;
        font-size: 0.875rem;
        outline: none;
        border: none;
        color: ${(p) => (p.emphasis ? p.theme.colors.burntOrange : p.theme.colors.mainAccentBlue)};
        cursor: pointer;
        text-transform: uppercase;
        padding: 1rem 0;
        text-decoration: none;
        text-align: left;
        width: 100%;
    }
`;

const Section = styled.div`
    border-bottom: 1px solid #eee;
    margin-bottom: 1rem;
    padding-bottom: 1rem;
`;

const MenuTitle = styled.div`
    font-size: 1.25rem;
    font-family: RoslindaleDisplayCondensed;
    padding: 1rem 0;
`;
