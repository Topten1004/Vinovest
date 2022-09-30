import React from "react";
import Skeleton from "react-loading-skeleton";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import { formatDatePP } from "#utils/shared";
import { Dropdown } from "#shared/ui";
import { Empty } from "../empty";
import OptionsMobile from "./options-mobile";
import useStatements from "./useStatements";
import { DocumentListElem, DocumentListElemWithGup, DocumentListTitle, Link, Date, LoadMore } from "./styles";
import { DocumentHead, DropDownContainer, DocumentsMain, DocumentsPageTitle } from "../styles";

const initPageSize = 10;
const initSkeletonItems = [...new Array(initPageSize)].map((_, i) => i);

const SkeletonRow = ({ isMobile }) => (
    <>
        <Skeleton width="140px" height={isMobile ? "17px" : "18px"} />
        <Skeleton width="40px" height={isMobile ? "17px" : "18px"} />
    </>
);

export const Statements = observer(() => {
    const { t } = useTranslation(["documents"]);
    const {
        isMobile,
        store,
        isPending,
        isDone,
        accountStatementsMonths,
        documentList,
        nextPageToken,
        options,
        currentYear,
        onFilterHandler,
        onFetchNextPage,
        currentOption,
        setNode,
        isDesktop,
    } = useStatements({ initPageSize });

    return (
        <>
            <DocumentsPageTitle>
                {!isDone ? (
                    <Skeleton
                        style={{
                            height: "39px",
                            width: "187px",
                            display: "inline-block",
                            padding: "10px 0 9px",
                        }}
                    />
                ) : (
                    t("documents")
                )}
            </DocumentsPageTitle>

            <DocumentHead>
                {!!accountStatementsMonths.length &&
                    !isMobile &&
                    (!isDone ? (
                        <Skeleton
                            style={{
                                height: "39px",
                                width: "238px",
                                display: "inline-block",
                            }}
                        />
                    ) : (
                        <DropDownContainer>
                            <Dropdown
                                options={options}
                                selectedInParent={currentYear}
                                selectedLabel={currentOption.label}
                                onChange={onFilterHandler}
                            />
                        </DropDownContainer>
                    ))}
                {!!accountStatementsMonths.length && isMobile && (
                    <OptionsMobile
                        options={options}
                        selected={currentYear || currentOption.label}
                        onChange={onFilterHandler}
                    />
                )}
            </DocumentHead>
            <DocumentsMain minHeight={!isMobile && nextPageToken ? "80vh" : ""}>
                {!isDone ? (
                    <DocumentListElem>
                        <Skeleton
                            style={{
                                height: "36px",
                                width: "144px",
                                display: "inline-block",
                                marginRight: "20px",
                            }}
                        />
                        <Skeleton
                            style={{
                                height: "36px",
                                width: "144px",
                                display: "inline-block",
                            }}
                        />
                    </DocumentListElem>
                ) : (
                    <DocumentListElem>
                        <DocumentListTitle>{t("list_title")}</DocumentListTitle>
                        <DocumentListTitle>{t("issued")}</DocumentListTitle>
                    </DocumentListElem>
                )}
                {!documentList.length && !isPending ? (
                    <Empty />
                ) : (
                    <>
                        {documentList.map(({ id, name, date, pending }) => (
                            <DocumentListElemWithGup key={id}>
                                {pending ? (
                                    <SkeletonRow isMobile={isMobile} />
                                ) : (
                                    <>
                                        <Link
                                            onClick={() => {
                                                store.documents.getDocumentItem(id, name, isDesktop);
                                            }}
                                        >
                                            <span>
                                                {name} {t("statement")}
                                            </span>
                                        </Link>
                                        <Date>{formatDatePP(date)}</Date>
                                    </>
                                )}
                            </DocumentListElemWithGup>
                        ))}

                        {isPending &&
                            initSkeletonItems.map((i) => (
                                <DocumentListElemWithGup key={i}>
                                    <SkeletonRow isMobile={isMobile} />
                                </DocumentListElemWithGup>
                            ))}
                    </>
                )}
                {nextPageToken && isMobile && (
                    <LoadMore type="button" onClick={onFetchNextPage}>
                        {t("loadmore")}
                    </LoadMore>
                )}
            </DocumentsMain>
            <div ref={setNode} />
        </>
    );
});
