import React from "react";
import styled from "styled-components";
import { withOktaAuth } from "@okta/okta-react";
import Skeleton from "react-loading-skeleton";
import { useTranslation } from "react-i18next";
import { IOktaContext } from "@okta/okta-react/bundles/types/OktaContext";
import { UserDisclaimer } from "./UserDisclaimer";
import { I18nLink as Link } from "#localization/localizedRouter";

interface UserInvestmentPlanProps extends IOktaContext {
    query: {
        investmentStyle: string;
    };
}

const UserInvestmentPlan = ({ query }: UserInvestmentPlanProps) => {
    const { t } = useTranslation("account");

    if (query === null) {
        return (
            <>
                <Skeleton count={1} height="51px" style={{ marginBottom: "1.5rem" }} />
                <Skeleton count={1} height="12px" />
            </>
        );
    }
    return (
        <div>
            <Box>
                <span>{t("account_investment_plan.title")}</span>
                {query?.investmentStyle ? (
                    <Populated>{query.investmentStyle}</Populated>
                ) : (
                    <Unpopulated>
                        <Link to="/new-user/investor-profile">Set Investing Style</Link>
                    </Unpopulated>
                )}
            </Box>
            <UserDisclaimer />
        </div>
    );
};
export default withOktaAuth<UserInvestmentPlanProps>(UserInvestmentPlan);

const Box = styled.div`
    align-items: center;
    border-bottom: 1px solid #eeeeee;
    color: #766a7f;
    display: flex;
    font-size: 0.875rem;
    justify-content: space-between;
    margin-bottom: 1rem;

    span {
        padding-right: 2rem;
        white-space: nowrap;
    }

    div {
        font-size: 1rem;
        font-weight: 500;
        padding: 1rem 0;
        text-align: right;
        word-break: break-all;
    }
`;

const Populated = styled.div`
    color: ${(p) => p.theme.colors.mainAccentBlue};
    text-transform: capitalize;
`;

const Unpopulated = styled.div`
    color: #a8abad;

    a {
        color: #a86d37;
        text-decoration: none;

        &:hover {
            text-decoration: underline;
        }
    }
`;
