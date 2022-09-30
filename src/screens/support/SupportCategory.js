import React from "react";
import { I18nLink as Link } from "#localization/localizedRouter";

import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import styled from "styled-components";
import { Title } from "./components/SupportMainWrapper";
import SupportCategoryWrapper from "./components/SupportCategoryWrapper";
import Breadcrumbs from "./components/Breadcrumbs";
import arrowSvg from "./assets/arrow.svg";
import { useMobile } from "#shared/hooks";
import useFetchSupportData from "./hooks/useFetchSupportData";
import { ROUTE_PATHS } from "../route-paths";
import { Fade } from "#shared/ui";
import MetaTagsReplacer from "#shared/components/MetaTagsReplacer";

const breadcrumbs = [
    {
        link: "/help",
        name: (
            <>
                <img src={arrowSvg} alt="back" /> {i18n.t("support:help-center-slug")}
            </>
        ),
    },
];

const SupportCategory = observer(() => {
    const isMobile = useMobile(991);

    const { t } = useTranslation("support");

    const { supportCategories, slugSupport } = useFetchSupportData();

    const { articles, supportCategoryName } = React.useMemo(() => {
        const foundCategory = supportCategories.find(({ slugSupport: slug }) => slug === slugSupport);
        const categoryName = foundCategory ? foundCategory.supportCategoryName : "";
        const mapPages = (foundCategory && foundCategory.supportPages) || [];

        return { articles: mapPages.map(({ fields }) => fields), supportCategoryName: categoryName };
    }, [supportCategories, slugSupport]);

    return (
        <Fade in>
            <SupportCategoryWrapper>
                <MetaTagsReplacer title={`${supportCategoryName} | ${t("support-category.meta.description")}`} />

                <Wrapper>
                    {isMobile && <Breadcrumbs breadcrumbs={breadcrumbs} />}
                    <Title>{supportCategoryName}</Title>
                    {articles.map(({ name, slug }) => (
                        <ArticleLink key={slug} to={`${ROUTE_PATHS.help}/${slug}`}>
                            {name}
                        </ArticleLink>
                    ))}
                </Wrapper>
            </SupportCategoryWrapper>
        </Fade>
    );
});

const Wrapper = styled.div`
    ${Title} {
        text-align: left;
        margin-bottom: 20px;
    }
`;

const ArticleLink = styled(Link)`
    color: #4f81b0;
    font-size: 20px;
    line-height: 57px;
    text-decoration: none;
    text-transform: none;
    font-family: Favoritstd, sans-serif;
    font-weight: 500;
    display: block;
`;

export default SupportCategory;
