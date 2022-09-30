import React, { useState } from "react";
import styled from "styled-components";
import Skeleton from "react-loading-skeleton";
import { useTranslation } from "react-i18next";
import UserEmailForm from "./components/UserEmailForm";
import UserEmail from "./components/UserEmail";
import AlertMessage from "#shared/ui/Alert/AlertMessage";
import { CheckCircle2 } from "#assets/home";
import { PageHeader } from "#shared/components/PageHeader";
import { AccountProps } from "./AccountAddress";

interface AccountEmailProps extends AccountProps {
    query: {
        email: string;
    };
}

export const AccountEmail = ({ query, fetchData }: AccountEmailProps) => {
    const { t } = useTranslation("account");
    const [editState, setEditState] = useState(false);
    const [submitComplete, updateSubmitComplete] = useState(false);
    const toggleEditor = () => setEditState(!editState);

    return (
        <>
            {!query ? (
                <Skeleton style={{ height: "48px", width: "50%", marginBottom: "42px" }} />
            ) : (
                <PageHeader>{t("account_email.email")}</PageHeader>
            )}
            {editState ? (
                <UserEmailForm
                    onSubmitComplete={() => updateSubmitComplete(true)}
                    onClick={toggleEditor}
                    query={query}
                    fetchData={fetchData}
                />
            ) : (
                <>
                    {query && <EditLink onClick={toggleEditor}>{t("myaccount.edit")}</EditLink>}
                    <UserEmail query={query} />
                    {submitComplete && (
                        <AlertMessage type="success">
                            <CheckCircle2 />
                            {t("account_email.updated")}
                        </AlertMessage>
                    )}
                </>
            )}
        </>
    );
};

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
