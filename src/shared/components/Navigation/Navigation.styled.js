import styled, { css } from "styled-components";
import { DepositButton } from "#shared/components/Deposit";
import { StyledNavLink } from "#shared/ui/NavLink";
import { I18nLink as Link } from "#localization/localizedRouter";

export const resetStyles = css`
    text-decoration: none;
    outline: none;
    border: none;
`;

export const NavLogo = styled.div`
    height: 100%;
`;

export const StyledNavWrapper = styled.div`
    &.transparent,
    &.light,
    &.green,
    &.blue,
    &.darkBlue {
        position: absolute;
    }
    height: ${({ height }) => height || "64px"};

    a:not(.active) {
        transition: 0.3s;
        &:hover {
            opacity: 0.5;
        }
    }

    @media print {
        display: none;
    }
    
`;

export const FixedNavWrapper = styled.nav`
    z-index: 10;
    position: fixed;
    top: 0;
    width: 100%;

    .transparent,
    .light,
    .green,
    .blue,
    .darkBlue {
        color: ${({ sticky }) => (sticky ? "#242E35" : "#EFDDC7")};
    }

    .transparent {
        ${({ sticky }) => !sticky && "text-shadow: 0px 0px 2px #242E35;"};

        color: ${({ sticky }) => (sticky ? "#242E35" : "#efddc7")};
        @media screen and (max-width: 1023px) {
            ${({ sticky }) => (sticky ? "background-color: #fff" : "background-color: transparent")};
        }
    }

    .light {
        @media screen and (max-width: 1023px) {
            ${({ sticky }) => (sticky ? "background-color: #fff" : "background-color: #efddc7")};
        }
        color: #242e35;
    }

    .green {
        @media screen and (max-width: 1023px) {
            ${({ sticky }) => (sticky ? "background-color: #fff" : "background-color: #e0e5cd")};
        }
        color: ${({ sticky }) => (sticky ? "#242E35" : "#513011")};
    }

    .blue {
        @media screen and (max-width: 1023px) {
            ${({ sticky }) => (sticky ? "background-color: #fff" : "background-color: #c5d5e4")};
        }
        color: ${({ sticky }) => (sticky ? "#242E35" : "#3c400c")};
    }

    .darkBlue {
        color: ${({ sticky }) => (sticky ? "#242E35" : "#efddc7")};
        @media screen and (max-width: 1023px) {
            ${({ sticky }) => (sticky ? "background-color: #fff" : "background-color: #242e35")};
        }

        &__constant {
            background-color: #fff;
            color: #242e35;
        }
    }
`;

export const StyledNav = styled.nav`
    z-index: 10;
    top: 0;
    width: 100%;
    display: flex;
    justify-content: space-around;
    padding: 0 16px;
    height: ${({ height }) => height || "64px"};
    border-bottom: ${(p) => (p.authenticated ? "1px solid #e8e8e8" : "0")};

    &.withConstantShadow {
        box-shadow: 0px 4px 32px rgba(36, 46, 53, 0.1);
    }

    &.withBorder {
        border-bottom: 1px solid #eeeeee;
        box-shadow: none;
    }

    @media screen and (min-width: 1024px) {
        justify-content: flex-start;
        padding: 0 16px;

        @media screen and (min-width: 1100px) {
            padding: 0 40px;
        }
    }
`;

export const FirstNavSection = styled.div`
    display: flex;
    position: relative;
    width: 100%;
    justify-content: space-between;
    align-items: center;

    @media screen and (max-width: 1179px) {
        ${NavLogo} {
            transition: height 0.2s;
            position: absolute;
            left: 50%;
            height: 100%;
            transform: translateX(-50%);
        }
    }

    @media screen and (min-width: 1180px) {
        justify-content: center;
        width: 104px;
        max-width: initial;
    }
`;

export const LinksRow = styled.div`
    display: none;
    ${(p) => p.theme.media.greaterThan("medium")`
        display: flex;
        align-items: center;
        width: 100%;
        position: relative;
        max-width: ${() => (p.authenticated ? "442px" : "100%")};
        margin: ${() => (p.authenticated ? "0 auto" : "0")};
  `}
    ${StyledNavLink} {
        text-transform: ${(p) => (p.authenticated ? "capitalize" : "uppercase")};
    }
`;

export const AccountSection = styled.div`
    display: flex;
    align-items: center;
    text-align: right;
    margin-left: auto;

    ${DepositButton},
    ${StyledNavLink}.login {
        border-radius: 3px;
        padding: 12px 20px;
        padding-top: 12px;
        margin-left: 20px;
        line-height: 18px;
        font-size: 14px;
        white-space: nowrap;
    }

    ${StyledNavLink}.login {
        border: 1px solid #242e35;
        box-sizing: border-box;
        border-radius: 3px;
        color: #242e35;
        text-shadow: none;
        margin: 0;
        border: 1px solid #242e35;

        &.light {
            border: 1px solid #242e35;
            color: #242e35;
        }

        &.green {
            border: 1px solid #513011;
            color: #513011;
        }

        &.blue {
            border: 1px solid #3c400c;
            color: #3c400c;
        }

        &.darkBlue {
            border: 1px solid #efddc7;
            color: #efddc7;
        }
    }

    ${StyledNavLink}.account {
        margin-left: 1rem;
        margin-right: 0;
        padding: 0;
        border: 0;
        width: 38px;
        height: 38px;

        &:after {
            display: none;
        }
    }
`;

export const DesktopNavBarContainer = styled.div`
    display: flex;
    align-items: center;
    padding: ${(p) => (p.authenticated ? "0 0 0 24px" : "0 0 0 58px")};
    width: 100%;
`;

export const Updates = styled.div`
    width: 25px;
    height: 25px;
    border-radius: 25px;
    font-family: VinovestMedium;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    display: flex;
    align-items: center;
    letter-spacing: 0.025em;
    text-transform: uppercase;
    color: #ffffff;
    background: #a4465d;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const NavUpdates = styled(Updates)`
    position: absolute;
    top: ${({ top }) => top || 0};
    right: 0;
    transform: translate(100%, -100%);
    transition: top 0.3s;
`;

export const NavAnimationWrapper = styled.div`
    overflow: hidden;
    position: relative;

    &.sticky {
        box-shadow: 0px 4px 32px rgba(36, 46, 53, 0.1);

        animation: delayBoxShadow 0.7s linear;

        @keyframes delayBoxShadow {
            0% {
                box-shadow: none;
            }

            80% {
                box-shadow: 0px 4px 32px transparent;
            }

            100% {
                box-shadow: 0px 4px 32px rgba(36, 46, 53, 0.1);
            }
        }
    }
`;

export const NavAnimationContainer = styled.div`
    width: 100%;

    &.outFromHtml {
        position: absolute;
        top: 0;
        left: 0;
    }

    &.openNavBar {
        transform: translateY(0%);
        transition: transform 0.7s;
        z-index: 1;
        opacity: 1;
    }

    &.closeBavBar {
        transition: transform 0.5s;
        transform: translateY(-101%);
        opacity: 1;
    }
`;

export const NavOnboarding = styled.ul`
    align-items: center;
    display: flex;
    list-style-type: none;

    li {
        align-items: center;
        color: #b5b5b5;
        display: flex;
        font-size: 14px;
        padding-right: 2rem;
        text-transform: uppercase;

        svg {
            fill: #b5b5b5;
            margin-right: 0.5rem;

            path {
                &:first-child {
                    stroke: #b5b5b5;
                }

                &:last-child {
                    fill: #fff;
                }
            }
        }

        &.active {
            color: #242e35;
        }

        &.completed {
            color: #242e35;

            svg {
                fill: #51ac55;

                path {
                    &:first-child {
                        stroke: #51ac55;
                    }
                }
            }
        }
    }
`;

export const ManagedCash = styled.div`
    white-space: nowrap;
    font-size: 11px;
    text-transform: uppercase;
    margin-right: 8px;
`;

export const Amount = styled.div`
    font-size: 11px;
    color: #a86d37;
    margin-right: 16px;
`;

export const Dashboard = styled(Link)`
    display: flex;
    align-items: center;
    color: #242e35;
    text-decoration: none;
    img {
        margin-bottom: 4px;
    }
`;

export const Beta = styled.span`
    position: absolute;
    font-size: 8px;
    line-height: 1;
    top: ${(p) => (p.isMobile ? "10px" : "-20px")};
    left: ${(p) => (p.isMobile ? "70px" : "60px")};
    background: #51ac55;
    padding: 4px 4px;
    text-transform: uppercase;
    border-radius: 2px;
    border-bottom-left-radius: 0;
    color: #ffffff;
`;
