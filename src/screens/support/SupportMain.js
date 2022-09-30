import React from "react";
import { I18nLink as Link } from "#localization/localizedRouter";

import { useTranslation } from "react-i18next";
import { observer } from "mobx-react-lite";
import { get } from "lodash";
import styled from "styled-components";
import useFetchSupportData from "./hooks/useFetchSupportData";
import ScreenSpinner from "#shared/components/ScreenSpinner";
import Search from "./components/Search";
import SupportMainWrapper, { Title } from "./components/SupportMainWrapper";
import { ROUTE_PATHS } from "../route-paths";
import { Fade } from "#shared/ui";
import MetaTagsReplacer from "#shared/components/MetaTagsReplacer";

const SupportMain = observer(() => {
    const {
        supportCategories,
        isSupportCategoriesFirstRenderPending,
        searchFAQArticlesList,
        fetchSearchFAQArticles,
        isSearchFAQArticlesListPending,
        isSearchFAQArticlesListDone,
    } = useFetchSupportData();
    const { t } = useTranslation("support");
    if (isSupportCategoriesFirstRenderPending) return <ScreenSpinner loading />;

    return (
        <Fade in>
            <SupportMainWrapper>
                <MetaTagsReplacer
                    title={t("support-main.meta.title")}
                    description={t("support-main.meta.description")}
                />
                <ExtendTitle>{t("support-main.title")}</ExtendTitle>
                <Search
                    searchFAQArticlesList={searchFAQArticlesList}
                    fetchSearchFAQArticles={fetchSearchFAQArticles}
                    isSearchFAQArticlesListPending={isSearchFAQArticlesListPending}
                    isSearchFAQArticlesListDone={isSearchFAQArticlesListDone}
                />
                <CategoriesWrapper>
                    {supportCategories.map(
                        ({ categoryImage, supportCategoryName, slugSupport, supportPages = [] }, i) => (
                            <Category
                                key={supportCategoryName}
                                icon={get(categoryImage, "fields.file.url")}
                                name={supportCategoryName}
                                id={slugSupport}
                                supportPages={supportPages}
                            />
                        ),
                    )}
                </CategoriesWrapper>
            </SupportMainWrapper>
        </Fade>
    );
});

const Category = ({ icon, name, id, supportPages }) => {
    const data = React.useMemo(() => {
        const cb = ({ fields }) => fields;
        return supportPages.filter(cb).map(cb).slice(0, 3);
    }, [supportPages]);

    const { t } = useTranslation("support");

    return (
        <CategoryWrapper>
            <CategoryIcon src={icon} alt={name} />
            <CategoryTitle>{name}</CategoryTitle>
            {data.map(({ slug, name: pageName }) => (
                <CategoryLink key={slug} to={`${ROUTE_PATHS.help}/${slug}`}>
                    {pageName}
                </CategoryLink>
            ))}
            <SupportCategoryLink to={`${ROUTE_PATHS.helpCategory}/${id}`}>
                {t("support-main.view-all")}{" "}
                <svg width="17" height="12" viewBox="0 0 17 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 6.00006L15 6.00006" stroke="#4F81B0" strokeWidth="1.5" />
                    <path d="M10 11.0001L15 6.00006L10 1.00006" stroke="#4F81B0" strokeWidth="1.5" />
                </svg>
            </SupportCategoryLink>
        </CategoryWrapper>
    );
};

const ExtendTitle = styled(Title)`
    margin-bottom: 50px;
`;

const CategoriesWrapper = styled.div`
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
    display: grid;
    margin-right: auto;
    margin-left: auto;
    grid-auto-columns: 1fr;
    grid-column-gap: 100px;
    grid-row-gap: 100px;
    grid-template-columns: 1fr 1fr 1fr;

    @media screen and (max-width: 991px) {
        grid-template-columns: 1fr 1fr;
    }

    @media screen and (max-width: 767px) {
        grid-column-gap: 30px;
        grid-row-gap: 50px;
    }

    @media screen and (max-width: 600px) {
        grid-template-columns: 1fr;
    }

    @media screen and (max-width: 480px) {
        grid-template-columns: 1fr;
        padding-right: 21px;
        padding-left: 21px;
    }
`;

const CategoryWrapper = styled.div``;

const CategoryIcon = styled.img`
    height: 117px;
`;

const CategoryTitle = styled.h2`
    margin-top: 20px;
    font-family: Roslindaledisplaycondensed, sans-serif;
    font-size: 32px;
    line-height: 150%;
    font-weight: 500;
`;

const LinkRouter = styled(Link)`
    background-color: transparent;
    color: #242e35;
    text-decoration: none;
    text-transform: none;
`;

const CategoryLink = styled(LinkRouter)`
    display: block;
    margin-bottom: 15px;
    font-family: Favoritstd, sans-serif;
    font-size: 16px;
    line-height: 26px;
    font-weight: 400;
    letter-spacing: 0.5px;
`;

const SupportCategoryLink = styled(LinkRouter)`
    display: inline-block;
    font-family: Favoritmonostd, sans-serif;
    color: #4f81b0;
    font-size: 14px;
    line-height: 18px;
    letter-spacing: 1px;
    text-transform: uppercase;
    padding: 5px 0;
`;

export default SupportMain;
