import React, { useState } from "react";
import styled from "styled-components";
import Skeleton from "react-loading-skeleton";
import { useTranslation } from "react-i18next";
import UserInformation from "./components/UserInformation";
import UserForm from "./components/UserForm";
import { CheckCircle2 } from "#assets/home";
import AlertMessage from "#shared/ui/Alert/AlertMessage";
import { PageHeader } from "#shared/components/PageHeader";

export interface AccountProps {
    fetchData: () => Promise<void>;
}
interface AccountAddressProps extends AccountProps {
    query: {
        firstName: string;
        lastName: string;
        country: string;
        address: string;
        city: string;
        state: string;
        zip: string;
    };
}

export const AccountAddress = ({ query, fetchData }: AccountAddressProps) => {
    const { t } = useTranslation("account");
    const [editState, setEditState] = useState(false);
    const toggleEditor = () => setEditState(!editState);
    const [submitComplete, updateSubmitComplete] = useState(false);

    return (
        <>
            {!query ? (
                <Skeleton style={{ height: "48px", width: "50%", marginBottom: "42px" }} />
            ) : (
                <PageHeader>{t("account_personal_information.title")}</PageHeader>
            )}
            {editState ? (
                <UserForm
                    onSubmitComplete={() => updateSubmitComplete(true)}
                    onClick={toggleEditor}
                    query={query}
                    fetchData={fetchData}
                />
            ) : (
                <>
                    {query && <EditLink onClick={toggleEditor}>{t("myaccount.edit")}</EditLink>}
                    <UserInformation query={query} />
                    {submitComplete && (
                        <AlertMessage type="success">
                            <CheckCircle2 />
                            {t("account_personal_information.success")}
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
