import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { NAVIGATION_LINKS_USER } from "../NavLinksData";
import { Dashboard } from "../Navigation.styled";
import { NavLink } from "#shared/ui";
import { ACCOUNT_LINK } from "../utils";
import userSvg from "#assets/shared/user.svg";
import close from "../assets/close-menu.svg";
import { useCreateRoutingCallback, useRootStore } from "#shared/hooks";
import { DepositEvent } from "#screens/deposit/RootDepositPage";
import { DepositButton } from "#shared/components/Deposit";
import { ROUTE_PATHS } from "#screens/route-paths.js";

const MobileRightMenu = ({ open, toggleRightMobileMenu }) => {
    const { pathname } = useLocation();

    const s = useRootStore();
    const routeToDeposit = useCreateRoutingCallback("/deposit", {
        refresh: true,
        posthogId: DepositEvent.AddFunds,
    });
    const { t } = useTranslation(["common"]);
    const closeMenu = () => {
        toggleRightMobileMenu();
    };

    const accountPage = pathname.includes(ROUTE_PATHS.account);

    return (
        <Wrapper open={open}>
            <Header>
                <DepositButton className="deposit-btn" onClick={routeToDeposit}>
                    {t("common:navigation.funds")}
                </DepositButton>

                <CloseBtn onClick={closeMenu}>
                    <img src={close} alt="close menu" />
                </CloseBtn>
            </Header>
            <Menu>
                <li key="Dashboard">
                    <Dashboard to="/portfolio" onClick={closeMenu} hard>
                        {t("common:dashboard")}
                    </Dashboard>
                </li>
                {!accountPage &&
                    NAVIGATION_LINKS_USER.map(({ to, label, exact, isActive }) => (
                        <li key={label}>
                            <NavLink to={to} isActive={isActive} exact={exact} authenticated={1} onClick={closeMenu}>
                                {label}
                            </NavLink>
                        </li>
                    ))}
                {!accountPage && (
                    <li key="Account">
                        <NavLink {...ACCOUNT_LINK} authenticated={1} className="account" onClick={closeMenu}>
                            <img src={userSvg} alt="account" />
                            {t("common:account")}
                        </NavLink>
                    </li>
                )}
            </Menu>
        </Wrapper>
    );
};

export default MobileRightMenu;

const Wrapper = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    z-index: 100;
    width: 300px;
    background: #fff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    transition: 0.8s;
    transform: ${(p) => (p.open ? "translateX(0)" : "translateX(100%)")};
    height: 100%;
`;
const Menu = styled.ul`
    list-style: none;
    margin: 0;
    padding: 48px 32px;
    li {
        margin-bottom: 24px;
    }
    li a {
        text-transform: capitalize;
    }
    .account {
        display: flex;
        align-items: center;
    }
    img {
        margin-right: 16px;
    }
`;
const Header = styled.div`
    padding: 11px 24px;
    border-bottom: 1px solid #e8e8e8;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .deposit-btn {
        font-size: 11px;
        padding: 8px 20px;
        border-radius: 4px;
        margin-right: 0.8rem;
        width: auto;
    }
`;
const CloseBtn = styled.button`
    border: 0;
    background: transparent;
`;
