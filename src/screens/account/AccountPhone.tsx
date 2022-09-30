import React, { useState } from "react";
import styled from "styled-components";
import { formatPhoneNumber } from "react-phone-number-input";
import Skeleton from "react-loading-skeleton";
import { useTranslation } from "react-i18next";
import { CheckCircle2 } from "#assets/home";
import { UserDisclaimer } from "./components/UserDisclaimer";
import AlertMessage from "#shared/ui/Alert/AlertMessage";
import UserPhoneForm from "./components/UserPhoneForm";
import { PageHeader } from "#shared/components/PageHeader";
import { AccountProps } from "./AccountAddress";

interface AccountPhoneProps extends AccountProps {
    query: {
        primaryPhone: string;
    };
}

export const AccountPhone = ({ query, fetchData }: AccountPhoneProps) => {
    const [submitComplete, updateSubmitComplete] = useState(false);
    const [editState, setEditState] = useState(false);
    const noResults = "Not provided";
    const toggleEditor = () => setEditState(!editState);
    const { t } = useTranslation("account");

    if (!query) {
        return (
            <>
                <Skeleton style={{ height: "48px", width: "50%", marginBottom: "42px" }} />
                <Skeleton count={1} height="51px" style={{ marginBottom: "1.5rem" }} />
                <Skeleton count={1} height="12px" />
            </>
        );
    }
    const formattedNumber = formatPhoneNumber(query.primaryPhone);

    return (
        <>
            <PageHeader>{t("account_mobile.title")}</PageHeader>

            {editState ? (
                <>
                    <UserPhoneForm
                        onSubmitComplete={() => updateSubmitComplete(true)}
                        onClick={toggleEditor}
                        query={query.primaryPhone}
                        fetchData={fetchData}
                    />
                </>
            ) : (
                <>
                    <EditLink onClick={toggleEditor}>{t("myaccount.edit")}</EditLink>
                    <Box>
                        <span>{t("account_mobile.label")}</span>
                        {formattedNumber ? (
                            <Populated>{formattedNumber}</Populated>
                        ) : (
                            <Unpopulated>{noResults}</Unpopulated>
                        )}
                    </Box>
                    <UserDisclaimer />
                    {submitComplete && (
                        <AlertMessage type="success">
                            <CheckCircle2 />
                            {t("account_mobile.success_updated")}
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
const Populated = styled.div`
    color: #242e35;
    word-break: break-word;
`;

const Unpopulated = styled.div`
    color: #a8abad;
`;
