/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { eachDayOfInterval } from "date-fns";
import MenuBtnSvg from "#assets/navigation/MenuBtn.js";
import { V3Logo } from "#assets/shared/v3Logo";
import { DepositButton } from "#shared/components/Deposit";
import { NavLogo, StyledNav, FirstNavSection, NavAnimationWrapper, NavAnimationContainer } from "../Navigation.styled";
import { ConditionalLink } from "./ConditionaLink";
import openMenu from "../assets/open-menu.svg";

const MobileNavBar = ({
    heightMobile,
    routetoInvite,
    toggleMobileNavMenu,
    toggleRightMobileMenu,
    classNameHeader,
    isOnboarding,
    logoType,
    isSticky,
    pathname,
    isAddFunds,
    authenticated,
    routeToDeposit,
    routeToSignup,
}) => (
    <NavAnimationWrapper className={isSticky || isAddFunds ? "sticky" : ""}>
        <NavAnimationContainer className={isSticky || isAddFunds ? "openNavBar" : "closeBavBar"}>
            <StyledNav
                authenticated={authenticated ? 1 : 0}
                isSticky
                height={heightMobile}
                className="darkBlue darkBlue__constant sticky"
            >
                <FirstNavMobile
                    {...{
                        routetoInvite,
                        toggleMobileNavMenu,
                        toggleRightMobileMenu,
                        classNameHeader: "light",
                        isOnboarding,
                        logoType,
                        isSticky: true,
                        pathname,
                        isAddFunds,
                        authenticated,
                        routeToDeposit,
                        routeToSignup,
                    }}
                />
            </StyledNav>
        </NavAnimationContainer>

        {!isAddFunds && (
            <NavAnimationContainer className={`outFromHtml ${!isSticky ? "openNavBar" : "closeBavBar"}`}>
                <StyledNav authenticated={authenticated ? 1 : 0} isSticky={false} height={heightMobile}>
                    <FirstNavMobile
                        {...{
                            routetoInvite,
                            toggleMobileNavMenu,
                            toggleRightMobileMenu,
                            classNameHeader,
                            isOnboarding,
                            logoType,
                            isSticky: false,
                            pathname,
                            isAddFunds,
                            authenticated,
                            routeToDeposit,
                            routeToSignup,
                        }}
                    />
                </StyledNav>
            </NavAnimationContainer>
        )}
    </NavAnimationWrapper>
);

const FirstNavMobile = ({
    routetoInvite,
    toggleMobileNavMenu,
    toggleRightMobileMenu,
    classNameHeader,
    isOnboarding,
    logoType,
    isSticky,
    pathname,
    isAddFunds,
    authenticated,
    routeToDeposit,
    routeToSignup,
}) => {
    const { t } = useTranslation("common");
    return (
        <FirstNavSection className={isSticky ? "sticky" : ""}>
            {!pathname.includes("personalize") && !isAddFunds && !authenticated && (
                <OpenMenuBtn onClick={toggleMobileNavMenu}>
                    <MenuBtnSvg colorClassName={classNameHeader || "light"} />
                </OpenMenuBtn>
            )}
            <NavLogo
                isCompact={isSticky}
                style={authenticated && !isAddFunds ? { left: "0", transform: "translateX(0)" } : { left: "50%" }}
            >
                <ConditionalLink condition={!isOnboarding}>
                    <V3Logo
                        isCompact={isSticky}
                        type={isSticky ? "standard" : logoType}
                        authenticated={authenticated ? 1 : 0}
                    />
                </ConditionalLink>
            </NavLogo>
            {isSticky && !pathname.includes("personalize") && !isAddFunds && !authenticated && (
                <ButtonWrap>
                    <DepositButton id="nav-deposit-button" onClick={routeToSignup}>
                        {t("get-started")}
                    </DepositButton>
                </ButtonWrap>
            )}
            {!pathname.includes("personalize") && !isAddFunds && authenticated && (
                <NavigationTools>
                    {!pathname.includes("personalize") && !isAddFunds && authenticated && (
                        <DepositButton className="deposit-btn" onClick={routeToDeposit}>
                            {t("common:navigation.funds")}{" "}
                        </DepositButton>
                    )}
                    <OpenInnerMenu onClick={toggleRightMobileMenu}>
                        <img src={openMenu} alt="open menu" />
                    </OpenInnerMenu>
                </NavigationTools>
            )}
        </FirstNavSection>
    );
};

const OpenMenuBtn = styled.div`
    height: fit-content;
    &:hover {
        cursor: pointer;
    }
`;

const NavigationTools = styled.div`
    position: absolute;
    right: 0;
    display: flex;

    .deposit-btn {
        font-size: 11px;
        padding: 8px 20px;
        border-radius: 4px;
        margin-right: 0.8rem;
    }
`;

const ButtonWrap = styled.div`
    height: fit-content;
    #nav-deposit-button {
        height: 37px;
        line-height: initial;
        font-size: 12px;
        padding: 7px 10px 6px;
        @media screen and (max-width: 340px) {
            white-space: nowrap;
            position: relative;
            right: -9px;
        }
    }
`;

const OpenInnerMenu = styled.button`
    border: 0;
    background: transparent;
`;

export default MobileNavBar;
