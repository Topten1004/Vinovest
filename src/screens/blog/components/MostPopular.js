import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { range, get } from "lodash";
import { I18nLink as Link } from "#localization/localizedRouter";

import Skeleton from "react-loading-skeleton";
import { ROUTE_PATHS } from "../../route-paths";
import AuthorDate from "./AuthorDate";

const pendingRange = range(4);

const MostPopular = ({ popular, pending }) => {
    const { t } = useTranslation(["blog"]);

    return (
        <Wrapper>
            <TopTitle>{t("mostPopular.title")}</TopTitle>

            {popular.map(({ postTitle, blogAuthor, postDate, slug, id }) => (
                <PopularLink key={id} to={`${ROUTE_PATHS.blog}/${slug}`}>
                    <h2 className="popularTitle">{postTitle}</h2>
                    <AuthorDate author={get(blogAuthor, "fields.authorName", "")} />
                </PopularLink>
            ))}
            {!!pending &&
                pendingRange.map((id) => (
                    <SkeletonWrapper key={id}>
                        <h2 className="popularTitle">
                            <Skeleton
                                style={{ height: "28px", width: "100%", display: "block", marginBottom: "7px" }}
                            />
                            <Skeleton style={{ height: "28px", width: "50%", display: "block" }} />
                        </h2>
                        <Skeleton style={{ height: "20px", width: "50%", display: "block" }} />
                    </SkeletonWrapper>
                ))}
        </Wrapper>
    );
};

const Wrapper = styled.div``;

const TopTitle = styled.div`
    margin-bottom: 10px;
    font-family: VinovestMedium, sans-serif;
    font-size: 14px;
    line-height: 22px;
    text-transform: uppercase;
    padding-bottom: 17px;
    border-bottom: 1px solid #caccce;
`;

const LinkStyles = `
    margin-top: 20px;
    border-bottom: 1px solid #caccce;
    background-color: transparent;
    color: #242e35;
    text-decoration: none;
    text-transform: none;
    display: block;
    padding-bottom: 14px;

    .popularTitle {
        margin-top: 25px;
        margin-bottom: 14px;
        font-family: Roslindaledisplaycondensed, sans-serif;
        font-size: 24px;
        line-height: 34px;
        font-weight: 500;
        margin-top: 0;
    }

    .popularAuthor {
        display: inline-block;
        color: #606060;
        padding: 7px 0 3px;
        font-family: VinovestMedium, sans-serif;
        text-transform: uppercase;
        font-size: 12px;
        line-height: 20px;
        font-weight: 500;
    }
`;

const SkeletonWrapper = styled.div`
    ${LinkStyles};
`;

const PopularLink = styled(Link)`
    ${LinkStyles};
`;

export default MostPopular;
