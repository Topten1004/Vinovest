import React from "react";
import styled from "styled-components";
import { withOktaAuth } from "@okta/okta-react";
import Skeleton from "react-loading-skeleton";
import { useTranslation } from "react-i18next";
import { IOktaContext } from "@okta/okta-react/bundles/types/OktaContext";
import { UserDisclaimer } from "./UserDisclaimer";

interface UserEmailProps extends IOktaContext {
    query: {
        email: string;
    };
}

const UserEmail: React.FC<UserEmailProps> = ({ query }: UserEmailProps) => {
    const { t } = useTranslation("account");

    if (!query) {
        return (
            <>
                <Skeleton count={1} height="51px" style={{ marginBottom: "1.5rem" }} />
                <Skeleton count={1} height="12px" />
            </>
        );
    }
    const noResults = t("not_provided");
    return (
        <div>
            <Box>
                <span>{t("account_email.label_email")}</span>
                {query.email ? <Populated>{query.email}</Populated> : <Unpopulated>{noResults}</Unpopulated>}
            </Box>
            <UserDisclaimer />
        </div>
    );
};
export default withOktaAuth<UserEmailProps>(UserEmail);

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
`;

const Unpopulated = styled.div`
    color: #a8abad;
`;
