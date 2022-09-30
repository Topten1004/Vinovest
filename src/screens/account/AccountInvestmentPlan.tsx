import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { withOktaAuth } from "@okta/okta-react";
import Skeleton from "react-loading-skeleton";
import { useTranslation } from "react-i18next";
import { OktaAuth } from "@okta/okta-auth-js";
import AlertMessage from "#shared/ui/Alert/AlertMessage";
import { CheckCircle2 } from "#assets/home";
import UserInvestmentPlan from "./components/UserInvestmentPlan";
import UserInvestmentPlanForm from "./components/UserInvestmentPlanForm";
import AccountService from "#services/UserService";
import { useRootStore } from "#shared/hooks";
import { PageHeader } from "#shared/components/PageHeader";

interface AccountInvestmentPlanProps {
    oktaAuth: OktaAuth;
}

const AccountInvestmentPlan = ({ oktaAuth }: AccountInvestmentPlanProps) => {
    const [editState, setEditState] = useState(false);
    const [submitComplete, updateSubmitComplete] = useState(false);
    const [query, setQuery] = useState(null);
    const toggleEditor = () => setEditState(!editState);
    const store = useRootStore();
    const { t } = useTranslation("account");
    const fetchData = async () => {
        await store.user.requestUserDetailsFromOkta(oktaAuth);
        const response = await AccountService.useAccountPortfolioGet(
            store.user.oktaUserEntity.data.sub,
            store.auth.accessToken,
        );
        store.user.fetchProfile();
        setQuery(response);
    };

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <>
            {query === null ? (
                <Skeleton style={{ height: "48px", width: "50%", marginBottom: "42px" }} />
            ) : (
                <PageHeader>{t("account_investment_plan.title")}</PageHeader>
            )}
            {editState ? (
                <UserInvestmentPlanForm
                    onSubmitComplete={() => updateSubmitComplete(true)}
                    onClick={toggleEditor}
                    query={query}
                    fetchData={fetchData}
                />
            ) : (
                <>
                    {query && <EditLink onClick={toggleEditor}>{t("myaccount.edit")}</EditLink>}
                    <UserInvestmentPlan query={query} />
                    {submitComplete && (
                        <AlertMessage type="success">
                            <CheckCircle2 />
                            {t("account_investment_plan.updated")}
                        </AlertMessage>
                    )}
                </>
            )}
        </>
    );
};
export default withOktaAuth(AccountInvestmentPlan);

const EditLink = styled.span`
    color: #a86d37;
    cursor: pointer;
    font-size: 0.875rem;
    padding: 0.5rem 1rem;
    position: absolute;
    right: 0;
    text-transform: uppercase;
    top: 2rem;

    ${(p) => p.theme.media.greaterThan("1024px")`
        right: 2rem;
        top: 4.5rem;
    `};
`;
