import React from "react";
import { useLocation } from "react-router-dom";
import { useRootStore } from "#shared/hooks";
import { checkHasToken } from "#utils/shared";
import Navigation from "./navigation/index";
import { FooterContainer, GridContainer } from "./styles";
import RecentArticles from "./recent";
import Newsletters from "./Newsletters";
import Support from "./support";
import WineInvestingBanner from "./StartInvestingBanner";
import { hideForLogin } from "../Navigation/utils";

const Footer = ({ embed }) => {
    const store = useRootStore();
    const { pathname } = useLocation();
    const authenticated = store.auth.isAuthenticated || checkHasToken();
    const isTradingPage = pathname.includes("trading");
    const hideFooter =
        hideForLogin(pathname) ||
        window.location.pathname.includes("/deposit") ||
        window.location.pathname.includes("/new-user") ||
        window.location.pathname.includes("/personalize") ||
        window.location.pathname.includes("/implicit");

    if (hideFooter) {
        return null;
    }

    const advisors = window.location.pathname.includes("advisors");

    return (
        <div>
            {!authenticated && !isTradingPage && <WineInvestingBanner />}
            <FooterContainer embed={embed} withbanner={authenticated || isTradingPage ? 0 : 1}>
                <GridContainer>
                    <div className="a" withbanner={authenticated ? 0 : 1}>
                        <Navigation />
                    </div>
                    <div className="b">
                        <RecentArticles />
                    </div>
                    <div className="c">
                        <Newsletters />
                    </div>
                    <div className="d">
                        <Support />
                    </div>
                </GridContainer>
            </FooterContainer>
        </div>
    );
};

export default Footer;
