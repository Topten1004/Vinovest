import React from "react";
import styled from "styled-components";
import { withOktaAuth } from "@okta/okta-react";
import Skeleton from "react-loading-skeleton";
import { useTranslation } from "react-i18next";
import { IOktaContext } from "@okta/okta-react/bundles/types/OktaContext";
import { UserDisclaimer } from "./UserDisclaimer";

interface UserInformationProps extends IOktaContext {
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
const UserInformation = ({ query }) => {
    const { t } = useTranslation("account");

    if (!query) {
        return (
            <>
                <Skeleton count={6} height="51px" style={{ marginBottom: "1.5rem" }} />
                <Skeleton count={1} height="12px" />
            </>
        );
    }
    const noResults = t("not_provided");
    return (
        <div>
            <Box>
                <span>{t("account_personal_information.label_fullname")}</span>
                {query.firstName || query.lastName ? (
                    <Populated>
                        {query.firstName} {query.lastName}
                    </Populated>
                ) : (
                    <Unpopulated>{noResults}</Unpopulated>
                )}
            </Box>
            <Box>
                <span>{t("account_personal_information.label_country")}</span>
                {query.country ? <Populated>{query.country}</Populated> : <Unpopulated>{noResults}</Unpopulated>}
            </Box>
            <Box>
                <span>{t("account_personal_information.label_address")}</span>
                {query.address ? <Populated>{query.address}</Populated> : <Unpopulated>{noResults}</Unpopulated>}
            </Box>
            <Box>
                <span>{t("account_personal_information.label_city")}</span>
                {query.city ? <Populated>{query.city}</Populated> : <Unpopulated>{noResults}</Unpopulated>}
            </Box>
            <Box>
                <span>{t("account_personal_information.label_state")}</span>
                {query.state ? <Populated>{query.state}</Populated> : <Unpopulated>{noResults}</Unpopulated>}
            </Box>
            <Box>
                <span>{t("account_personal_information.label_zip")}</span>
                {query.zip ? <Populated>{query.zip}</Populated> : <Unpopulated>{noResults}</Unpopulated>}
            </Box>
            <UserDisclaimer />
        </div>
    );
};
export default withOktaAuth<UserInformationProps>(UserInformation);

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
