import React, { useMemo, useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";
import { useOktaAuth } from "@okta/okta-react";
import { IconInfo, IconCheck } from "@vinovest/components/icons";
import { Typography } from "@vinovest/components/index";
import { css } from "@emotion/react";
import { ROUTE_PATHS } from "#screens/route-paths";
import { useRootStore, useMobile } from "#shared/hooks";
import { getData, getStatus } from "#models/FetchStatus";
import { BaseModuleContainer } from "./styles";
import { I18nLink } from "#localization/localizedRouter";
import { InvestmentPlan } from "./assets/InvestmentPlan";
import { capitalizeWord } from "#utils/stringUtils";
import { planTypes } from "#screens/overview/modules/Plans/plans";

export const PersonalSnapshot = observer(() => {
    const { t } = useTranslation(["risk-tolerance"]);
    const s = useRootStore();
    const isMobile = useMobile();
    const { oktaAuth } = useOktaAuth();
    const currencyCode = Cookies.get("localCurrency") ? Cookies.get("localCurrency") : "USD";
    const [level, setLevel] = useState("starter");
    const defaultFirstName =t("overview:personal-snapshot.friend");

    useEffect(() => {
        const fetchUserProfileData = async () => {
            await s.user.requestUserDetailsFromOkta(oktaAuth);
            await s.cellar.fetchPortfolioTotals("6m", currencyCode);
            setLevel(s.cellar.totalsEntity?.data?.planLevel);
        };
        if(!s.user.needsOnboarding){
            fetchUserProfileData();
        }
     
    }, [currencyCode, oktaAuth, s.cellar, s.user, s.user.needsOnboarding]);

    const levelTitles = {
        starter: t("pricing:standard.title"),
        plus: t("pricing:plus.title"),
        premium: t("pricing:premium.title"),
        grandCru: t("pricing:grandCru.title"),
    };

    const getLevel = function (options, property) {
        return options && options[property];
    };
    const displayLevelTitle = getLevel(levelTitles, level);

    const firstName = useMemo(() => {
        if(s.user.oktaUserEntity?.data?.given_name){
            const ou = getData(s.user.oktaUserEntity);
            const c = capitalizeWord(ou?.given_name);
    
            const name = c 
            return name
        }
        
        return defaultFirstName 


    }, [s.user.needsOnboarding, s.user.oktaUserEntity?.data?.given_name]);

    const plan = useMemo(() => {

        if(!s.user.needsOnboarding){
            const p = getData(s.user.profileEntity);
            const investingStyle = p ? p.investingStyle : t("common:utils.constants.conservative");
            return investingStyle;
        }
     
    }, [s.user.profileEntity?.data?.investingStyle,  s.user.needsOnboarding]);

    const investmentPlanTitle = useMemo(() => {
        const c = capitalizeWord(plan);
        return c ? `${c} ${t("overview:personal-snapshot.investing")}` : t("overview:personal-snapshot.not-investing");
    }, [plan, t]);

    const fetching = useMemo(() => {
        if(s.user.needsOnboarding){
            return false
        }
    
            const portfs = getStatus(s.cellar.totalsEntity);
            const proffs = getStatus(s.user.profileEntity);
            const userfs = getStatus(s.user.oktaUserEntity);
            return portfs.isPending() || proffs.isPending() || userfs.isPending();
     

    }, [s.cellar.totalsEntity, s.user.profileEntity, s.user.oktaUserEntity, s.user.needsOnboarding]);

    const results = useMemo(() => planTypes(t).filter((planType: { id: string }) => planType.id === plan), [plan, t]);

    const InvestmentPlanSummary = () => (
        <Card>
            <Typography tiny label cssOverride={cardLabel}>
                {t("your_portfolio.plan_title")}
            </Typography>
            <Typography medium heading cssOverride={textCenter}>
                {investmentPlanTitle}
            </Typography>
            <div className="graphic">
                <InvestmentPlan />
            </div>
            <Typography tiny label cssOverride={cardLabel}>
                {t("your_portfolio.plan_subtitle")}
            </Typography>

            {results.length > 0 &&
                results[0][1].map((item, index) => (
                    <Typography tooltip paragraph cssOverride={planDescription} key={index}>
                        <IconCheck height="12px" width="12px" fill="#82972D" />
                        {item}
                    </Typography>
                ))}
        </Card>
    );
    return (
        <BaseModuleContainer>
            <SnapshotHeader className="title-text" data-testid="name-header">
                {fetching ? (
                    <Skeleton count={isMobile ? 1 : 2} />
                ) : (
                    <>
                        {t("overview:personal-snapshot.welcome")}, {!isMobile && <br />}
                        {firstName}
                    </>
                )}
            </SnapshotHeader>
            <LineItemContainer>
                <Subheader>{t("overview:personal-snapshot.snapshot-header")}</Subheader>
                {fetching ? (
                    <Skeleton count={3} height="40px" />
                ) : (
                    <>
                        <Row>
                            <span className="row-label">{t("overview:personal-snapshot.wine_collection")}</span>
                            <span className="row-value" data-testid="net-returns">
                                <Link to={ROUTE_PATHS.cellar}>
                                    {t("common:utils.shared.bottle", { count: s.cellar.totals.bottleCount })}
                                </Link>
                            </span>
                        </Row>
                        <Row>
                            <span className="row-label">{t("overview:personal-snapshot.account-level")}</span>
                            <span className="row-value" data-testid="account-level">
                                {displayLevelTitle}
                            </span>
                        </Row>
                        <Row>
                            <span className="row-label">{t("overview:personal-snapshot.investment-plan")}</span>
                            <span className="row-value">
                                <Link className="link" to="/account/investment-plan" data-testid="investment-plan">
                                    {investmentPlanTitle}
                                </Link>
                                <TooltipWrapper>
                                    <IconInfo height="14px" width="14px" fill="#767A7F" />
                                    <Tooltip>
                                        <InvestmentPlanSummary />
                                    </Tooltip>
                                </TooltipWrapper>
                            </span>
                        </Row>
                    </>
                )}
            </LineItemContainer>
        </BaseModuleContainer>
    );
});

const cardLabel = css`
    text-transform: uppercase;
    text-align: center;
`;

const textCenter = css`
    text-align: center;
`;

const planDescription = css`
    display: flex;

    svg {
        min-width: 12px;
        margin-right: 0.5rem;
    }
`;

const Tooltip = styled.div`
    bottom: 0;
    left: 0;
    position: absolute;
    visibility: hidden;
    width: 350px;
    z-index: 1;

    ${(p) => p.theme.media.greaterThan("1024px")`
        left: auto;
    `}
`;

const TooltipWrapper = styled.div`
    display: inline-block;

    ${(p) => p.theme.media.greaterThan("1024px")`
        position: relative;
    `}

    > svg {
        margin-left: 0.5rem;
    }

    &:hover {
        ${Tooltip} {
            cursor: pointer;
            visibility: visible;
        }
    }
`;

const Card = styled.div`
    background: #ffffff;
    box-shadow: -8px 8px 24px rgba(36, 46, 53, 0.16);
    border-radius: 8px;
    margin-bottom: 3rem;
    padding: 2rem;
    position: relative;

    .graphic {
        text-align: center;
    }
`;

const Link = styled(I18nLink)`
    text-decoration: none;
    color: ${(p) => p.theme.colors.burntOrange};
`;

const SnapshotHeader = styled.div`
    text-align: center;
    margin-bottom: 16px;

    ${(p) => p.theme.media.greaterThan("768px")`
        text-align: left;
    `}

    .title-text {
        ${(p) => p.theme.media.greaterThan("1024px")`
            font-size: 65px;
        `}
    }
`;

const LineItemContainer = styled.div`
    margin-top: 24px;
    ${(p) => p.theme.media.greaterThan("1441px")`
            margin-bottom: 60px;
        `}
`;

const Subheader = styled.div`
    font-family: ${(p) => p.theme.fonts.label};
    text-transform: uppercase;
    font-size: 12px;
    margin-bottom: 18px;

    text-align: center;
    ${(p) => p.theme.media.greaterThan("768px")`
        text-align: left;     
    `}
    ${(p) => p.theme.media.greaterThan("1441px")`
        font-size: 14px;  
        line-height: 18px;  
    `}
`;

const Row = styled.div`
    font-size: 14px;
    display: flex;
    border-top: 1px solid ${(p) => p.theme.colors.borderGray};
    padding: 18px 0;
    ${(p) => p.theme.media.greaterThan("1441px")`
        font-size: 16px;  
        line-height: 26px;  
        padding: 25px 0;
        padding-top: 28px;
    `}
    .row-label {
        margin-right: auto;
    }
    .row-value {
        display: flex;
        margin-left: auto;
    }
`;
