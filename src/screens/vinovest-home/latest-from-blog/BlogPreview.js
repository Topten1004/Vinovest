import React from "react";
import { I18nLink as Link } from "#localization/localizedRouter";

import styled from "styled-components";
import { FadeFromBottomWithDelay } from "#shared/ui/Animations";
import { ROUTE_PATHS } from "#screens/route-paths";

const BlogPreview = ({ title, description, to, src, authorSrc, author, topImg, runAnimation, delay }) => (
    <Wrapper to={`${ROUTE_PATHS.blog}${to}`} className={runAnimation} delay={delay}>
        {topImg && <img className="topImg" src={topImg} alt={title} />}
        <img className="blocImg" src={src} alt={title} width="322" height="215" />
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="authorWrapper">
            <img className="img_author" src={authorSrc} alt={author} width="48" height="48" />
            <h4>{author}</h4>
        </div>
    </Wrapper>
);

const Wrapper = styled(Link)`
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 20px;
    border: 4px solid #000;
    color: #242e35;
    transition: 0.3s;
    outline: 0;
    text-decoration: none;
    min-height: 600px;

    @media screen and (max-width: 991px) {
        min-height: 600px;
    }

    &.runAnimation {
        animation: ${FadeFromBottomWithDelay} ${({ delay }) => delay * 0.3}s linear;
    }

    &:hover {
        background-color: #242e35;
        color: #fff;
        cursor: pointer;
    }

    .topImg {
        position: absolute;
        width: 100%;
        max-width: 334px;
        height: 236px;
        object-fit: contain;
        top: 0;
        transform: translateY(-100%);
    }

    .blocImg {
        width: 100%;
        display: block;
        object-fit: contain;
    }

    h3 {
        margin-top: 20px;
        margin-bottom: 10px;
        font-family: Roslindaledisplaycondensed, sans-serif;
        font-size: 32px;
        line-height: 150%;
        font-weight: 500;
    }

    p {
        flex-grow: 1;
        margin-top: 0;
        margin-bottom: 10px;
        font-size: 20px;
        line-height: 160%;
        font-family: Favoritstd, sans-serif;
        font-weight: 500;
    }

    .authorWrapper {
        display: flex;
        margin-top: auto;
        align-items: center;

        .img_author {
            height: auto;
            width: 48px;
            margin-right: 24px;
            flex: 0 0 auto;
            display: block;
            object-fit: contain;
        }

        h4 {
            margin-top: 10px;
            margin-bottom: 10px;
            font-family: Favoritstd, sans-serif;
            font-weight: 500;
            font-size: 16px;
            line-height: 28px;
            font-weight: 500;
            letter-spacing: 0.035em;
        }
    }
`;

export default BlogPreview;
