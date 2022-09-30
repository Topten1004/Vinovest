import React from "react";
import { useTranslation } from "react-i18next";
import { formatWithOptions } from "date-fns/fp";
import i18n from "i18next";
import { useRootStore, useMobile } from "#shared/hooks";
import { getStatus } from "#models/FetchStatus";
import useIntersect from "#shared/hooks/useIntersect";
import { locales } from "#localization/constants";

const dateToString = formatWithOptions({ locale: locales[i18n.language] }, " MMMM yyyy");

const useStatements = ({ initPageSize }) => {
    const { t } = useTranslation(["documents", "overview"]);

    const isMobile = useMobile();
    const isDesktop = !useMobile(1024);

    const store = useRootStore();
    const isPending = getStatus(store.documents.accountStatementsEntity).isPending();
    const isDone = getStatus(store.documents.accountStatementsEntity).isDone();
    React.useEffect(() => {
        if (store.auth.isAuthenticated && store.user.oktaUserInfo && store.user.oktaUserInfo.sub) {
            if (!isPending && !isDone) {
                store.documents.fetchAccountStatements({ year: "", pageSize: initPageSize });
                store.documents.fetchAccountStatementMonths();
                store.documents.fetchWineCertificates();
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [store.auth.isAuthenticated, store.user.oktaUserInfo.sub]);

    const { accountStatementsMonths, accountStatements } = store.documents;

    const documentList =
        (store.documents.accountStatements.documents &&
            store.documents.accountStatements.documents.map(({ id, name, date, pending }) => ({
                id,
                name: dateToString(new Date(date)),
                date,
                pending,
            }))) ||
        [];

    const wineCertificateList =
        (store.documents.wineCertificates.documents &&
            store.documents.wineCertificates.documents.map(({ id, name, date, pending }) => ({
                id,
                name,
                date,
                pending,
            }))) ||
        [];

    const { nextPageToken } = store.documents.accountStatements;
    const options = [{ label: t("overview:all"), value: "" }, ...accountStatementsMonths];
    const currentYear = accountStatements.year;

    const onFilterHandler = (option) => {
        store.documents.fetchAccountStatements({ pageToken: 0, year: option.value, pageSize: initPageSize });
    };

    const onFetchNextPage = () => {
        if (nextPageToken) {
            store.documents.fetchAccountStatements(
                {
                    pageToken: nextPageToken,
                    year: currentYear,
                    pageSize: initPageSize,
                },
                true,
            );
        }
    };
    const currentOption = options.find(({ value }) => value === currentYear) || {};

    const [setNode, entry] = useIntersect({});

    React.useEffect(() => {
        if (entry.intersectionRatio && nextPageToken && !isMobile) {
            onFetchNextPage();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [entry.intersectionRatio]);

    return {
        isMobile,
        store,
        isPending,
        isDone,
        accountStatementsMonths,
        accountStatements,
        documentList,
        nextPageToken,
        options,
        currentYear,
        onFilterHandler,
        onFetchNextPage,
        currentOption,
        setNode,
        entry,
        isDesktop,
        wineCertificateList,
    };
};

export default useStatements;
