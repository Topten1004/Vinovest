import React, { useState, useEffect } from "react";
import { IconCircleCheck } from "@vinovest/components/icons";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { V3Logo } from "#assets/shared/v3Logo";
import { DesktopNavBar } from "./DesktopNavBar";

import {
    NavLogo,
    StyledNav,
    FirstNavSection,
    NavAnimationWrapper,
    NavAnimationContainer,
    NavOnboarding,
} from "../Navigation.styled";
import { ConditionalLink } from "./ConditionaLink";

const DesktopNavWrapper = ({
    classNameHeader,
    isOnboarding,
    logoType,
    isSticky,
    height,
    isAddFunds,
    authenticated,
    pagesWithAnimation,
    isNewUserABTest,
}) => {
    if (!pagesWithAnimation) {
        return (
            <NavBar
                {...{
                    isSticky: true,
                    isOnboarding,
                    logoType,
                    authenticated,
                    classNameHeader: `darkBlue darkBlue__constant ${isSticky ? "withConstantShadow" : ""}`,
                    height,
                    isAddFunds,
                    isNewUserABTest,
                }}
            />
        );
    }

    return (
        <NavAnimationWrapper className={isSticky ? "sticky" : ""}>
            <NavAnimationContainer className={`outFromHtml ${!isSticky ? "openNavBar" : "closeBavBar"}`}>
                <NavBar
                    {...{
                        isSticky: false,
                        isOnboarding,
                        logoType,
                        authenticated,
                        classNameHeader,
                        height,
                        isAddFunds,
                        isNewUserABTest,
                    }}
                />
            </NavAnimationContainer>

            <NavAnimationContainer className={`${isSticky ? "openNavBar" : "closeBavBar"}`}>
                <NavBar
                    {...{
                        isSticky: true,
                        isOnboarding,
                        logoType: "standard",
                        authenticated,
                        classNameHeader: "darkBlue darkBlue__constant sticky",
                        height,
                        isAddFunds,
                        isNewUserABTest,
                    }}
                />
            </NavAnimationContainer>
        </NavAnimationWrapper>
    );
};
const NavBar = ({
    isSticky,
    isOnboarding,
    logoType,
    authenticated,
    classNameHeader,
    height,
    isAddFunds,
    isNewUserABTest,
}) => (
    <StyledNav authenticated={authenticated ? 1 : 0} isSticky={isSticky} height={height} className={`${classNameHeader} ${isAddFunds ? "withBorder" : ""}`}>
        <FirstNavSection>
            <NavLogo isCompact={isSticky}>
                <ConditionalLink notOnboarding={!isOnboarding} authenticated={authenticated}>
                    <V3Logo isCompact={isSticky} type={logoType} />
                </ConditionalLink>
            </NavLogo>
        </FirstNavSection>
        {!isAddFunds && !isNewUserABTest && (
            <DesktopNavBar authenticated={authenticated} linkClassName={classNameHeader} isSticky={isSticky} />
        )}
        {isNewUserABTest && <NavBarOnboarding />}
    </StyledNav>
);

const NavBarOnboarding = () => {
    const { pathname } = useLocation();
    const [accountClass, setAccountClass] = useState("");
    const [investorClass, setInvestorClass] = useState("");
    const { t } = useTranslation(["account"]);

    useEffect(() => {
        if (pathname.includes("create-account")) {
            setAccountClass("active");
        }
        if (pathname.includes("investor-profile")) {
            setAccountClass("completed");
            setInvestorClass("active");
        }
    }, [pathname]);

    return (
        <NavOnboarding>
            <li className={accountClass}>
                <IconCircleCheck fill="#242E35" height="16px" width="16px" />
                {t("nav.step_one")}
            </li>
            <li className={investorClass}>
                <IconCircleCheck fill="#242E35" height="16px" width="16px" />
                {t("nav.step_two")}
            </li>
            <li>
                <IconCircleCheck fill="#242E35" height="16px" width="16px" />
                {t("nav.step_three")}
            </li>
        </NavOnboarding>
    );
};

export default DesktopNavWrapper;
