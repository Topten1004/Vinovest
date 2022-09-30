import React from "react";
import { I18nLink as Link } from "#localization/localizedRouter";

import { debounce } from "lodash";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import iconSearchSvg from "../assets/iconSearch.svg";
import iconCloseSvg from "../assets/iconClose.svg";

const Search = ({
    searchFAQArticlesList,
    isSearchFAQArticlesListPending,
    fetchSearchFAQArticles,
    isSearchFAQArticlesListDone,
}) => {
    const { t } = useTranslation("support");

    const [query, setQuery] = React.useState("");

    const hits = searchFAQArticlesList.hits || [];

    const onChangeHandler = ({ target }) => {
        setQuery(target.value);
    };

    const close = () => setQuery("");

    const debounceSearchFAQ = React.useMemo(() => debounce(fetchSearchFAQArticles, 500), [fetchSearchFAQArticles]);

    React.useEffect(() => {
        if (searchFAQArticlesList.query !== query && query) {
            debounceSearchFAQ(query);
        }
    }, [searchFAQArticlesList.query, query, fetchSearchFAQArticles, debounceSearchFAQ]);

    return (
        <SearchWrapper>
            <img className="search" src={iconSearchSvg} alt="search" />
            <input
                className="queryInput"
                placeholder={t("search.placeholder")}
                value={query}
                onChange={onChangeHandler}
                type="text"
            />
            <button onClick={close} type="button" className="closeWrapper">
                <img className="close" src={iconCloseSvg} alt="close" />
            </button>
            {!isSearchFAQArticlesListPending && searchFAQArticlesList && searchFAQArticlesList.query === query && (
                <SearchResultWrapper>
                    {!hits.length && isSearchFAQArticlesListDone && (
                        <Message>
                            {t("search.message")} <em>&quot;{query}&quot;</em>.
                        </Message>
                    )}
                    {hits.map(({ title, slug, "Item ID": objectID }) => (
                        <RouterLink key={slug} to={slug.startsWith("category/") ? `/help-${slug}` : `help/${slug}`}>
                            {title &&
                                title.split(" ").map((word, index) => (
                                    // eslint-disable-next-line react/no-array-index-key
                                    <React.Fragment key={index}>
                                        {query.toLocaleLowerCase().split(" ").includes(word.toLocaleLowerCase()) ? (
                                            <span>{word} </span>
                                        ) : (
                                            `${word} `
                                        )}
                                    </React.Fragment>
                                ))}
                        </RouterLink>
                    ))}
                </SearchResultWrapper>
            )}
        </SearchWrapper>
    );
};

const SearchWrapper = styled.div`
    position: relative;
    display: flex;
    max-width: 678px;
    width: 100%;
    margin: 0 auto;
    margin-bottom: 100px;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 0px 3px 0 rgb(85 95 110 / 20%);
    border: 1px solid #f7f7f7;

    .queryInput {
        flex-grow: 1;
        background: transparent;
        border: 0;
        outline: 0;
        font-family: Favoritmonostd, sans-serif;
        height: 50px;
        border: 0 !important;
        outline: 0 !important;
        width: 100%;
        padding: 0 20px;
    }
    .closeWrapper {
        outline: 0;
        border: 0;
        width: fit-content;
        background-color: transparent;
    }
    .search,
    .close {
        width: fit-content;

        display: block;
        margin-left: 15px;
        margin-right: 15px;
    }
    .search {
        width: 18px;
    }
    .close {
        width: 12px;

        &:hover {
            cursor: pointer;
        }
    }
`;

const SearchResultWrapper = styled.div`
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    padding: 20px;
    font-family: Favoritmonostd;
    overflow: auto;
    max-height: 400px;
    background-color: #fcfcfc;
    border: 1px solid #e0e0e0;
    border-top: 0;
    box-shadow: 1px 3px 4px rgb(0 0 0 / 9%);
    text-transform: uppercase;
`;

const RouterLink = styled(Link)`
    background-color: transparent;
    color: #242e35;
    text-decoration: none;
    text-transform: none;
    display: block;
    margin-bottom: 20px;
    text-transform: uppercase;

    span {
        font-style: italic;
    }
`;

const Message = styled.div`
    margin-bottom: 20px;
    color: #a86d37;
    font-family: Favoritmonostd;
    font-size: 20px;
    line-height: 160%;
`;

export default Search;
