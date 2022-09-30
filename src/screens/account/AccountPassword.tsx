import React, { useState } from "react";
import styled from "styled-components";
import Skeleton from "react-loading-skeleton";
import { useTranslation } from "react-i18next";
import AlertMessage from "#shared/ui/Alert/AlertMessage";
import { CheckCircle2 } from "#assets/home";
import { PageHeader } from "#shared/components/PageHeader";
import UserPasswordForm from "./components/UserPasswordForm";

export const AccountPassword = () => {
    const { t } = useTranslation("account");
    const [editState, setEditState] = useState(false);
    const [submitComplete, updateSubmitComplete] = useState(false);
    const toggleEditor = () => setEditState(!editState);

    return (
        <>
            <PageHeader>{t("password.title")}</PageHeader>

            {editState ? (
                <UserPasswordForm onSubmitComplete={() => updateSubmitComplete(true)} onClick={toggleEditor} />
            ) : (
                <>
                    <EditLink onClick={toggleEditor}>{t("myaccount.edit")}</EditLink>
                    <Box>
                        <span>{t("password.title")}</span>
                        <Populated type="password" value="notarealpassword" readOnly />
                    </Box>
                    {submitComplete && (
                        <AlertMessage type="success">
                            <CheckCircle2 />
                            {t("password.success_update")}
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

const Populated = styled.input`
    border: 0;
    color: ${(p) => p.theme.colors.mainAccentBlue};
    flex: 1;
    padding: 1rem 0;
    pointer-events: none;
    text-align: right;
`;
