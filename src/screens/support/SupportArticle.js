import React from "react";
import { observer } from "mobx-react-lite";
import { get } from "lodash";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { Title } from "./components/SupportMainWrapper";
import SupportCategoryWrapper from "./components/SupportCategoryWrapper";
import RenderContentfulSection from "#shared/components/RenderContentfulSection";
import Breadcrumbs from "./components/Breadcrumbs";
import arrowSvg from "./assets/arrow.svg";
import { useMobile } from "#shared/hooks";
import Note from "./components/Note";
import { ROUTE_PATHS } from "../route-paths";
import useFetchSupportData from "./hooks/useFetchSupportData";
import MetaTagsReplacer from "#shared/components/MetaTagsReplacer";

const SupportArticle = observer(() => {
    const isMobile = useMobile(991);
    const { slug } = useParams();

    const { t } = useTranslation("support");

    const { supportCategories } = useFetchSupportData();

    const article = React.useMemo(() => {
        const flatArticles = supportCategories.reduce(
            (acc, { supportPages }) => [...acc, ...(supportPages || []).map(({ fields }) => fields)],
            [],
        );

        return flatArticles.find(({ slug: findSlug }) => findSlug === slug) || {};
    }, [slug, supportCategories]);

    const { pageBody, name, noteSwitch } = article;

    const pageContent = get(pageBody, "content", []);
    const parentCategorySlug = get(article, "parentCategorySlug");
    const parentCategoryName = get(article, "parentCategoryName");

    const breadcrumbs = React.useMemo(() => {
        const mobileSlugs = [
            {
                link: `${ROUTE_PATHS.helpCategory}/${parentCategorySlug}`,
                name: (
                    <>
                        <img src={arrowSvg} alt="back" /> {parentCategoryName}
                    </>
                ),
            },
        ];

        const desktopSlug = [
            {
                link: "/help",
                name: t("help-center-slug"),
            },
            {
                link: `${ROUTE_PATHS.helpCategory}/${parentCategorySlug}`,
                name: parentCategoryName,
            },
        ];

        const data = isMobile ? mobileSlugs : desktopSlug;

        return data;
    }, [isMobile, parentCategorySlug, parentCategoryName]);

    return (
        <SupportCategoryWrapper>
            <MetaTagsReplacer title={`${name} | ${parentCategoryName} | ${t("support-category.meta.description")}`} />
            <Wrapper>
                <Breadcrumbs breadcrumbs={breadcrumbs} />
                <Title>{name}</Title>

                <Post>
                    <RenderContentfulSection fillingOnly postSections={pageContent} />
                </Post>
                {noteSwitch && <Note />}
            </Wrapper>
        </SupportCategoryWrapper>
    );
});

const Wrapper = styled.div`
    ${Title} {
        text-align: left;
        margin-bottom: 20px;
    }
`;

const Post = styled.div`
    margin-top: 60px;
    font-family: Favoritstd, sans-serif;
    color: #242e35;

    p {
        margin-top: 10px;
        margin-bottom: 28px;
        font-size: 20px;
        line-height: 160%;
        font-weight: 400;
        strong {
            font-size: 24px; 
        }
    }

    ul {
        font-weight: 400;

        li {
            margin-top: 3px;
            margin-bottom: 8px;
            font-size: 20px;
            line-height: 160%;
        }
    }


    strong {
        font-family: RoslindaleDisplayCondensed;
        font-weight: 500;
    }

    a {
        text-decoration: none;
        color: #0066cc;
    }
`;

export default SupportArticle;
