/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable indent */
/* eslint-disable operator-linebreak */
import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import posthog from "posthog-js";
import { useTranslation } from "react-i18next";
import { V3Logo } from "#assets/shared/v3Logo";
import { DepositButton } from "#shared/components/Deposit";
import { NAVIGATION_LINKS_GUEST } from "../NavLinksData";
import { localizedPath } from "#localization/localizedRouter";
import { Beta } from "../Navigation.styled";

const MobileNavMenu = observer(({ open, toggleMobileNavMenu, authenticated }) => {
    const { t } = useTranslation("common");
    const history = useHistory();

    const changeRoute = (path) => {
        history.push(localizedPath(path));

        toggleMobileNavMenu();
    };

    const getStarted = () => {
        window.location.assign("/signup");

        posthog.capture("click_get_started", {});
    };

    const routeToLogin = () => {
        window.location.assign("/login");
    };

    const routeToHome = () => {
        changeRoute("/");
    };
    React.useEffect(() => {
        if (open) {
            document.querySelector("body").style.overflow = "hidden";
        } else document.querySelector("body").style.overflow = "auto";

        return () => {
            document.querySelector("body").style.overflow = "auto";
        };
    }, [open]);
    return (
        <MobileNavMenuWrapper className={open ? "open" : ""}>
            <Wrapper>
                <ListElem>
                    <Head>
                        <button onClick={toggleMobileNavMenu} type="button">
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M15 1L1 15"
                                    stroke="#FAE8D1"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M15 15L1 1"
                                    stroke="#FAE8D1"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                        <div className="V3LogoWrapper" onClick={routeToHome}>
                            <V3Logo type="light" />
                        </div>
                    </Head>
                </ListElem>
                {NAVIGATION_LINKS_GUEST.map(({ label, withHref, ...props }) => (
                    <ListElem key={label}>
                        {label === "trade" && <Beta isMobile={1}>Beta</Beta>}
                        {withHref ? (
                            <LinkHtml href={localizedPath(props.to)}>{label}</LinkHtml>
                        ) : (
                            <NavLink onClick={() => changeRoute(props.to)}>{label}</NavLink>
                        )}
                    </ListElem>
                ))}
                <div className="btnContainer">
                    {!authenticated && (
                        <DepositButton className="whiteTransparent" onClick={routeToLogin}>
                            {t("login:login")}
                        </DepositButton>
                    )}
                    <DepositButton onClick={getStarted}>{t("get-started")}</DepositButton>
                </div>
            </Wrapper>
        </MobileNavMenuWrapper>
    );
});

const MobileNavMenuWrapper = styled.div`
    position: fixed;
    background: #242e35;
    right: 0;
    left: 0;
    height: 100%;
    z-index: 9999;
    top: -110%;
    bottom: 110%;
    transition: 0.8s;
    overflow: auto;

    &.open {
        top: 0;
        bottom: 0;
    }
    .btnContainer {
        flex-shrink: 0;
        flex-grow: 1;
        display: flex;
        justify-content: center;
        padding: 44px 0 20px;
    }

    ${DepositButton} {
        border-radius: 3px;
        height: 50px;
        width: 100%;
        max-width: 154px;
        margin: 10px;

        &.whiteTransparent {
            background-color: transparent;
            border: 1px solid #fff;
        }
    }
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;

    .V3LogoWrapper {
        height: 100%;
    }
`;

const ListElem = styled.div`
    flex-shrink: 0;
    height: 81px;
    border-bottom: 1px solid #efddc7;
    padding: 0 24px;
    display: flex;
    align-items: center;
    color: #efddc7;
    position: relative;

    a {
        font-family: VinovestMono;
        font-style: normal;
        font-weight: 500;
        font-size: 18px;
        line-height: 26px;
        display: flex;
        align-items: center;
        height: 100%;
        width: 100%;
    }
`;

const Head = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;

    button {
        background: transparent;
        border: 0;
        outline: 0;
        position: absolute;
        left: 33px;
        font-weight: 500;
        font-size: 16px;
        line-height: 24px;
    }
`;

const nav = `    
    font-family: VinovestMono;
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 26px;
    display: flex;
    align-items: center;
    text-transform: uppercase;
    color: #EFDDC7;
`;

const LinkHtml = styled.a`
    ${nav};
    text-decoration: none;
`;
const NavLink = styled.button`
    ${nav};
    background: transparent;
    border: 0;
    outline: 0;
    padding: 0;
    display: flex;
    align-items: center;
    height: 100%;
    width: 100%;
`;

export default MobileNavMenu;
