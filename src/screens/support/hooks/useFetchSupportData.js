/* eslint-disable no-var */
import React from "react";
import { useParams } from "react-router-dom";
import { useRootStore } from "#shared/hooks";

const useSupport = () => {
    const s = useRootStore();

    const categoryParam = useParams().category || "";
    const category = categoryParam;

    const {
        supportCategories,
        fetchSupportCategories,
        isSupportCategoriesPending,
        fetchSearchFAQArticles,
        searchFAQArticlesList,
        isSearchFAQArticlesListPending,
        isSearchFAQArticlesListDone,
        isSupportCategoriesDone,
        isSupportCategoriesFirstRenderPending,
    } = s.support;

    React.useEffect(() => {
        if (!supportCategories.length && !isSupportCategoriesPending && !isSupportCategoriesDone) {
            fetchSupportCategories();
        }
    }, [supportCategories, fetchSupportCategories, isSupportCategoriesPending, isSupportCategoriesDone]);

    return {
        supportCategories,
        s,
        slugSupport: category,
        fetchSearchFAQArticles,
        searchFAQArticlesList,
        isSearchFAQArticlesListPending,
        isSearchFAQArticlesListDone,
        isSupportCategoriesFirstRenderPending,
    };
};

export default useSupport;
