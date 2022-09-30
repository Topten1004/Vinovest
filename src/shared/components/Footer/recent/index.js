import React from "react";
import styled from "styled-components";
import { I18nLink as Link } from "#localization/localizedRouter";

import {useTranslation} from "react-i18next";
import { data } from "./data";
import { FooterTitle } from "../styles";

const RecentArticles = () => {
    const{t} = useTranslation('footer')
    return (
    <RecentArticlesWrapper>
        <FooterTitle>{t('recent-articles.title')}</FooterTitle>
        {data.map(({ title, link }) => (
            <RecentArticleLink key={title} to={link}>
                {title}
            </RecentArticleLink>
        ))}
    </RecentArticlesWrapper>
)};

const RecentArticlesWrapper = styled.div`
    padding-top: 28px;
    padding-bottom: 39px;

    ${FooterTitle} {
        padding-bottom: 9px;
    }

    @media screen and (max-width: 1024px) {
        padding-top: 29px;
        padding-right: 40px;
    }

    @media screen and (max-width: 767px) {
        padding-top: 31px;
        padding-bottom: 42px;
        border-bottom: 1px solid #fae8d1;

        ${FooterTitle} {
            padding-bottom: 11px;
        }
    }
`;

const RecentArticleLink = styled(Link)`
    text-decoration: none;
    color: inherit;
    font-family: VinovestMedium;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 30px;
    margin-top: 6px;
    display: block;
    transition: 0.3s;

    &:hover {
        opacity: 0.8;
    }

    @media screen and (max-width: 1024px) {
        margin-top: 20px;
    }

    @media screen and (max-width: 767px) {
        font-size: 12px;
        line-height: 20px;
        margin-top: 17px;
    }
    @media screen and (min-width: 375px) {
        font-size: 16px;
    }
  
    @media screen and (min-width: 320px) {
        font-size: 15px;
     }
`;
export default RecentArticles;
