import React from "react";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import { Fade } from "#shared/ui";
import { Statements } from "./statements";
import { DocumentsPageBodyWrapper, DocumentsPageBody } from "./styles";

const documentNav = (t) => [
    {
        to: "/documents/account_statements",
        label: t("documents"),
        labelMobile: t("mobile_statements"),
        exact: true,
        isActive: (_, location) => location.pathname === "/documents/account_statements",
        search: "",
    },
];

const DocumentsPage = observer(() => {
    const { t } = useTranslation(["documents", "common"]);
    return (
        <Fade in>
            <DocumentsPageBodyWrapper>
                <DocumentsPageBody>
                    <Statements documentNav={documentNav(t)} />
                </DocumentsPageBody>
            </DocumentsPageBodyWrapper>
        </Fade>
    );
});
export default DocumentsPage;
