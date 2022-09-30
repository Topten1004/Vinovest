import React from "react";
import { I18nLink as Link } from "#localization/localizedRouter";
import { PaginationWrapper } from "./styled.js";

const Pagination = ({ totalPages, numPage, showElements = 3, category }) => {
    const pagesList = [...new Array(totalPages)].map((_, i) => i + 1);
    const page = Number(numPage);

    return (
        <PaginationWrapper>
            {totalPages > 1 && (
                <Link
                    to={page > 1 ? `/blog/category/${category}/${page - 1}` : `/blog/category/${category}/${page}`}
                    className={`prevNext ${page === 1 ? "disabled" : ""}`}
                >
                    prev
                </Link>
            )}
            <Link
                to={`/blog/category/${category}/1`}
                className={`page ${page > showElements + 2 ? "withDotsRight" : ""} ${page === 1 ? "currentPage" : ""}`}
            >
                1
            </Link>
            {pagesList
                .slice(1, -1)
                .filter((p) => p - page <= showElements && page - p < showElements + 1)
                .map((pageNum) => (
                    <Link
                        to={`/blog/category/${category}/${pageNum}`}
                        className={`page ${page === pageNum ? "currentPage" : ""}`}
                        key={pageNum}
                    >
                        {pageNum}
                    </Link>
                ))}
            {totalPages > 1 && (
                <>
                    <Link
                        to={`/blog/category/${category}/${totalPages}`}
                        className={`page ${page < totalPages - (showElements + 1) ? "withDotsLeft" : ""} ${
                            page === totalPages ? "currentPage" : ""
                        }`}
                    >
                        {totalPages}
                    </Link>
                    <Link
                        to={
                            totalPages - page > 0
                                ? `/blog/category/${category}/${page + 1}`
                                : `/blog/category/${category}/${page}`
                        }
                        className={`prevNext ${page === totalPages ? "disabled" : ""}`}
                    >
                        next
                    </Link>
                </>
            )}
        </PaginationWrapper>
    );
};

export default Pagination;
