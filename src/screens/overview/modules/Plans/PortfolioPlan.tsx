import React, { useEffect, useState } from "react";
import _ from "lodash";
import styled from "styled-components";
import Cookies from "js-cookie";
import { useOktaAuth } from "@okta/okta-react";
import { itemsToRender } from "../../../pricing/images/items";
import { useRootStore, useMobile } from "#shared/hooks";
import { PlanTabs } from "./PortfolioTabs";
import { PlanButtons } from "./PlanButtons";
import { GridDesktopPlan } from "./GridDesktopPlan";

export const PortfolioPlan = () => {
    const { oktaAuth } = useOktaAuth();
    const isMobile = useMobile();
    const store = useRootStore();
    const currencyCode = Cookies.get("localCurrency") ? Cookies.get("localCurrency") : "USD";
    const [plan, setPlan] = useState("starter");

    const plans = {
        0: "starter",
        1: "plus",
        2: "premium",
        3: "grandCru",
    };
    function getKeyByValue(object, value) {
        return Object.keys(object).find((key) => object[key] === value);
    }
    const planLevelNumber = getKeyByValue(plans, plan);
    useEffect(() => {
        const fetchUserProfileData = async () => {
            await store.user.requestUserDetailsFromOkta(oktaAuth);
            await store.cellar.fetchPortfolioTotals("6m", currencyCode);
            setPlan(store.cellar.totalsEntity?.data?.planLevel);
        };
        fetchUserProfileData();
    }, [currencyCode, oktaAuth, store.cellar, store.user]);

    return (
        <Grid>
            {isMobile ? (
                <>
                    <PlanTabs plan={plan} />
                    <ButonWrapper className="plan-colors">
                        {itemsToRender.map((item, idx) => (
                            <PlanButtons
                                item={item}
                                plan={plan}
                                idx={idx}
                                planLevelNumber={planLevelNumber}
                                key={item.id}
                            />
                        ))}
                    </ButonWrapper>
                </>
            ) : (
                <>
                    <GridDesktopPlan planLevelNumber={planLevelNumber} plan={plan} />
                </>
            )}
        </Grid>
    );
};
const ButonWrapper = styled.div`
    padding: 1rem;
    width: 100%;
`;

const Grid = styled.div`
    background: #fff;
    box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    margin-bottom: 50px;

    ${({ theme }) => theme.media.greaterThan("1024px")`
        padding: 52px 43px 30px 59px;
        margin-bottom: 30px;
    `}

    .plan-mobile {
        width: 100%;
    }

    .mobile-tabs {
        width: 100%;

        > div {
            > ul {
                padding: 1rem;

                li {
                    flex: 1;
                }

                button {
                    border: 1px solid #eeeeee;
                    height: 50px;
                    white-space: nowrap;
                    width: 100%;

                    &.active {
                        color: #fff;
                        background: #a86d37;
                    }
                }
            }
        }
        h2 {
            font-family: RoslindaleDisplayCondensed;
            font-size: 32px;
            text-align: center;
        }
    }

     .border {
            border: 4px solid;
            border-radius: 100%;
            border-color: transparent;
            display: inline-block;

            .image-wrapper {
                border: 4px solid #fff;
            }
        }

        .accent0 {
            .background {
                background-color: #eeefef;
            }

            .active-border {
                border-color: #eeefef;
            }
        }
        .accent1 {
            .background {
                background-color: #eff7ff;
            }

            .active-border {
                border-color: #eff7ff;
            }
        }
        .accent2 {
            .background {
                background-color: #fae8d1;
            }

            .active-border {
                border-color: #fae8d1;
            }
        }
        .accent3 {
            .background {
                background-color: #242e35;
            }

            .active-border {
                border-color: #242e35;
            }

            .amount,
            .current {
                ${({ theme }) => theme.media.greaterThan("1024px")`
                    color: #fff;
                `}
            }

            .label {
                color: #a8abad;
            }
        }
    }

    .content-wrapper {
        display: flex;
    }

    ul {
        justify-content: space-between;

        button {
            padding: 5px;
            font-size: 12px;
        }
    }
`;
