import React from "react";
import { observer } from "mobx-react-lite";
import Skeleton from "react-loading-skeleton";
import { range, update } from "lodash";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useHistory, useParams, Redirect } from "react-router-dom";
import CardOfArticle from "./components/CardOfArticle";
import MostPopular from "./components/MostPopular";
import Category from "./components/Category";
import { useRootStore, useMobile } from "#shared/hooks";
import ConditionalScrollToTop from "#shared/components/ConditionaScrollToTop";
import Pagination from "#shared/components/Pagination";
import { ArticlesWrapper, Gup } from "./styled";
import { getStatus } from "#models/FetchStatus";

const Blog = observer(() => {
    const isMobile = useMobile();
    const s = useRootStore();
    const {
        blogCategories,
        fetchParams,
        updateCategory,
        fetchBlogCategories,
        fetchBlogs,
        blogList,
        isBlogListPagePending,
        popular,
        isPopularPending,
        isPopularPendingDone,
    } = s.blog;

    const { nameOfCategory, blogPage } = useParams();
    if (!nameOfCategory && !blogPage) {
        return (
            <Redirect
                to={{
                    pathname: "/blog/category/latest/1",
                }}
            />
        );
    }
    const categoryStatusSuccess = getStatus(s.blog.blogCategoriesEntity).isSuccess();
    const { t } = useTranslation(["blog"]);
    const history = useHistory();

    const category = React.useMemo(
        () =>
            nameOfCategory === "latest" || !nameOfCategory
                ? "latest"
                : nameOfCategory
                    .split("-")
                    .map((item) => item[0].toUpperCase() + item.slice(1))
                    .join(" "),
        [nameOfCategory],
    );

    React.useEffect(() => {
        blogCategories.length === 1 && fetchBlogCategories();
        if (categoryStatusSuccess && category === "latest") fetchBlogs(blogPage);
        if (categoryStatusSuccess) updateCategory({ page: blogPage, category });
    }, [
        categoryStatusSuccess,
        category,
        blogPage,
        history,
        nameOfCategory,
        fetchBlogs,
        updateCategory,
        blogCategories.length,
        fetchBlogCategories,
    ]);

    const pendingItems = React.useMemo(
        () => range(isBlogListPagePending ? fetchParams.limit : 0),
        [fetchParams.limit, isBlogListPagePending],
    );

    const isPopularFetching = isPopularPending || !isPopularPendingDone;

    return (
        <Wrapper>
            <ConditionalScrollToTop path="/blog/" />
            <Container>
                <h1 className="blogTitleMobile"> {t("blog.title")}</h1>
                <HeadWrapper>
                    {!isPopularFetching && (
                        <CardOfArticle
                            className="first"
                            card={popular.featured.length ? popular.featured[0] : {}}
                            isBig
                        />
                    )}
                    {isPopularFetching && <Skeleton style={{ height: "569.45px", width: "100%", display: "block" }} />}
                    <MostPopular className="second" popular={popular.mostPopular} pending={isPopularFetching} />
                </HeadWrapper>
                <Category blogCategories={blogCategories} active={category} disabled={isBlogListPagePending} />
                <ArticlesWrapper disable={isBlogListPagePending ? 1 : 0}>
                    {blogList.map((card) => (
                        <CardOfArticle key={card.id} card={card} />
                    ))}
                    {pendingItems.map((key) => (
                        <Skeleton key={key} style={{ height: "360px", width: "100%", display: "block" }} />
                    ))}
                </ArticlesWrapper>
                <PaginationContainer hide={!fetchParams.pagesCount ? 1 : 0}>
                    <Pagination
                        totalPages={fetchParams.pagesCount}
                        numPage={fetchParams.page}
                        showElements={isMobile ? 1 : 3}
                        category={nameOfCategory}
                    />
                </PaginationContainer>
            </Container>
        </Wrapper>
    );
});

const Wrapper = styled.div`
    padding-top: 40px;
    padding-bottom: 142px;
    color: #242e35;

    @media screen and (max-width: 991px) {
        padding-top: 37px;
        padding-bottom: 30px;
    }

    a,
    button {
        transition: 0.3s;

        &:hover {
            cursor: pointer;
            opacity: 0.7;
        }
    }
`;

const Container = styled.div`
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;

    .blogTitleMobile {
        position: absolute;
        width: 1px;
        height: 1px;
        overflow: hidden;
        opacity: 0;

        @media screen and (max-width: 991px) {
            position: static;
            width: 100%;
            height: fit-content;
            opacity: 1;
            display: block;
            font-family: Roslindaledisplaycondensed, sans-serif;
            font-size: 36px;
            line-height: 54px;
            font-weight: 500;
            text-align: center;
        }
    }
`;

const HeadWrapper = styled.div`
    display: grid;
    grid-auto-columns: 1fr;
    grid-column-gap: 45px;
    grid-row-gap: 45px;
    grid-template-columns: 6fr 3fr;

    ${Gup};

    @media screen and (max-width: 1360px) {
        grid-template-columns: 739fr 371fr;
    }

    @media screen and (max-width: 1100px) {
        grid-template-columns: 739fr 451fr;
    }

    @media screen and (max-width: 991px) {
        display: none;
    }
`;

const PaginationContainer = styled.div`
    ${({ hide }) => (hide ? "opacity: 0;" : "")};

    padding-top: 117px;

    @media screen and (max-width: 991px) {
        padding-top: 91px;
    }
`;

export default Blog;
