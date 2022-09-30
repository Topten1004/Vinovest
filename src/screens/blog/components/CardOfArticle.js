import React from "react";
import styled from "styled-components";
import { get } from "lodash";
import { I18nLink as Link } from "#localization/localizedRouter";
import { makeProgressive } from "../utils";
import { ROUTE_PATHS } from "../../route-paths";
import AuthorDate from "./AuthorDate";

const CardOfArticle = ({ isBig, card }) => {
    const src = get(card, "heroImage.fields.file.url");
    const title = get(card, "postTitle");
    const author = get(card, "blogAuthor.fields.authorName");
    const date = get(card, "postDate");
    const slug = get(card, "slug");

    const classPostfix = isBig ? "isBig" : "";
    const height = isBig ? 351 : 187;
    const width = isBig ? 740 : 356;
    return (
        <Wrapper to={`${ROUTE_PATHS.blog}/${slug}`}>
            <img
                className={`cardOfArticleImage ${classPostfix}`}
                src={makeProgressive(src, { height, width })}
                alt={title}
                height={`${height}px`}
                width={`100%`}
            />
            <div className={`wrap ${classPostfix}`}>
                <h2 className={`cardOfArticleTitle ${classPostfix}`}>{title}</h2>
                <AuthorDate isBig={isBig} author={author} />
            </div>
        </Wrapper>
    );
};

const Wrapper = styled(Link)`
    width: 100%;
    min-height: 360px;
    border: 2px solid #242e35;
    background-color: #fff;
    box-shadow: 1px 1px 40px 0 rgb(0 0 0 / 10%);
    text-decoration: none;
    overflow: hidden;
    color: #242e35;
    display: flex;
    flex-direction: column;

    &:hover {
        opacity: 1 !important;
        box-shadow: 10px 10px 0px 0px #fae8d1;
    }

    .wrap {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        padding: 24px 24px 25px;

        &.isBig {
            padding: 30px 38px 4px;
        }
    }

    .cardOfArticleImage {
        width: 100%;
        height: 187px;
        display: block;
        object-fit: cover;

        &.isBig {
            height: 351px;
        }
    }
    .cardOfArticleTitle {
        margin: 0;
        font-size: 20px;
        line-height: 32px;
        font-family: Roslindaledisplaycondensed, sans-serif;
        font-weight: 500;
        flex-grow: 1;

        &.isBig {
            font-size: 36px;
            line-height: 54px;
        }
    }
`;

export default CardOfArticle;
