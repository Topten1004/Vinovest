import React from "react";
import { get } from "lodash";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { observer } from "mobx-react-lite";
import styled from "styled-components";
import { useRootStore, useMobile, useConfig } from "#shared/hooks";
import RenderContentfulSection from "#shared/components/RenderContentfulSection";
import { Wrapper as ContentfulSectionWrapper } from "#shared/components/RenderContentfulSection/styled";
import MetaTagsReplacer from "#shared/components/MetaTagsReplacer";
import { ArticleHero, HeroDescription } from "./components/ArticleHero";
import Author from "./components/Author";
import Page404 from "../404";
import CardOfArticle from "./components/CardOfArticle";
import { ArticlesWrapper, Gup } from "./styled";
import ReadingPositionPopUp, { ReadingPositionStickyBar } from "./components/ReadingPositionPopUp";
import QuickSignUpForm from "./components/QuickSignupForm";
import ProgressBar from "./components/ProgressBar";
import ShareArticle from "./components/ShareArticle";
import { makeProgressive } from "./utils";
const Blog = observer(() => {
    const isMaxMobile = useMobile(767);
    const avoidPopUp = useMobile(1232);
    const showShareFroTablet = !isMaxMobile && avoidPopUp;

    const { t } = useTranslation(["blog"]);

    const s = useRootStore();
    const { slug } = useParams();
    const heroRef = React.useRef(null);
    const mainContentRef = React.useRef(null);

    const config = useConfig();

    const { fetchArticle, resetArticle, article, isArticlePagePending, articlePageDoesNotExist } = s.blog;
    const postSections = React.useMemo(
        () =>
            Object.entries(article)
                .filter(([key]) => key.includes("postSection"))
                .sort(([a], [b]) => +a.slice(11) - +b.slice(11)),
        [article],
    );

    const postIntro = get(article, "postIntro.content", []);
    const author = get(article, "blogAuthor.fields", {});
    const furtherReading = get(article, "furtherReading.content", []);
    const anchorLinks = get(article, "anchorLinks.content", []);
    const relatedArticlesFromResponse = get(article, "relatedArticlesFromResponse", []);

    React.useEffect(() => {
        slug && fetchArticle(slug);

        return () => resetArticle();
    }, [fetchArticle, resetArticle, slug]);

    React.useEffect(() => {
        document.querySelector("html").style.scrollBehavior = "smooth";

        const optInMonsterReset = get(window._omapp, `campaigns.${config.optInBlogCampaign}.reset`);
        optInMonsterReset && optInMonsterReset();

        return () => {
            document.querySelector("html").style.scrollBehavior = "auto";
        };
    }, []);

    if (articlePageDoesNotExist) {
        return <Page404 />;
    }

    return (
        <>
            <ProgressBar startFromZero />
            <MetaTagsReplacer title={get(article, "postTitle")} description={get(article, "metaPreviewText")} />
            <Wrapper optInBlogCampaign={config.optInBlogCampaign}>
                <Container>
                    <ArticleHero data={article} isArticlePagePending={isArticlePagePending} ref={heroRef} />

                    <WithStickyWrapper>
                        {!avoidPopUp && <ReadingPositionStickyBar />}

                        <ArticleWrapper ref={mainContentRef}>
                            <HeroDescription data={article} isArticlePagePending={isArticlePagePending} />
                            {showShareFroTablet && <ReadingPositionPopUp showPopUp mobile />}

                            <div className="gupWrapper">
                                <MobileGup>
                                    <RenderContentfulSection postSections={postIntro} />
                                </MobileGup>
                                <MobileGup>
                                    <FurtherReadingWrapper>
                                        <ContentfulSectionWrapper>
                                            <h3>{t("article.furtherReading")}</h3>
                                            <RenderContentfulSection postSections={furtherReading} />
                                        </ContentfulSectionWrapper>
                                    </FurtherReadingWrapper>
                                </MobileGup>

                                <MobileGup>
                                    <AnchorLinksWrapper className="anchors">
                                        <RenderContentfulSection postSections={anchorLinks} />
                                    </AnchorLinksWrapper>
                                </MobileGup>

                                {isMaxMobile && (
                                    <MobileGup>
                                        <QuickSignUpForm />
                                    </MobileGup>
                                )}
                                {isMaxMobile && <ShareArticle fixed />}

                                {postSections.map(([_, content], i) => {
                                    const postSections = get(content, "content");

                                    return (
                                        <RenderContentfulSection
                                            key={i}
                                            postSections={postSections}
                                            withMobileGup
                                            withOPtIn
                                        />
                                    );
                                })}

                                {isArticlePagePending && (
                                    <MobileGup>
                                        <Skeleton
                                            style={{
                                                height: "800px",
                                                width: "100%",
                                                display: "block",
                                                marginTop: "60px",
                                            }}
                                        />
                                    </MobileGup>
                                )}

                                {!isArticlePagePending && (
                                    <MobileGup>
                                        <Author author={author} />
                                    </MobileGup>
                                )}
                            </div>
                        </ArticleWrapper>
                    </WithStickyWrapper>
                </Container>
            </Wrapper>
            <RelatedWrapper>
                {relatedArticlesFromResponse && !!relatedArticlesFromResponse.length && (
                    <RelatedContainer>
                        <h3>{t("article.relatedArticles")}</h3>
                        <ArticlesWrapper>
                            {relatedArticlesFromResponse.map((card) => (
                                <CardOfArticle key={card.id} card={card} />
                            ))}
                        </ArticlesWrapper>
                    </RelatedContainer>
                )}
            </RelatedWrapper>
        </>
    );
});

const MobileGup = styled.div`
    @media screen and (max-width: 768px) {
        padding: 0 20px;
    }
`;

const WithStickyWrapper = styled.div`
    max-width: 780px;
    width: 100%;
    margin: 0 auto;
    display: flex;
`;

const Wrapper = styled.div`
    max-width: 1148px;
    width: 100%;
    margin: 0 auto;
    padding-top: 44px;
    position: relative;

    @media screen and (max-width: 991px) {
        padding-top: 0;
    }
    ${({ optInBlogCampaign }) => {
        return `#om-${optInBlogCampaign}-holder {
            margin-top: 60px;

            @media screen and (max-width: 767px) {
                margin-top: 30px;
            }
        }`;
    }}
`;

const Container = styled.div`
    max-width: 900px;
    margin: 0 auto;
`;

const ArticleWrapper = styled.div`
    max-width: 780px;
    margin: 0 auto;
    flex-grow: 1;

    .gupWrapper {
        margin-top: 35px;
        overflow: hidden;

        @media screen and (max-width: 767px) {
            margin-top: 30px;
        }
    }
`;

const FurtherReadingWrapper = styled.div`
    max-width: 780px;
    width: 100%;
    border: 2px solid #242e35;
    padding: 40px 50px;
    margin-top: 15px;
    margin-bottom: 15px;

    h3,
    ul,
    ol,
    p {
        padding: 0;
    }

    ul li,
    ol li {
        padding: 0 !important;
    }

    @media screen and (max-width: 991px) {
        padding: 30px 20px;
        width: 100%;
        margin-bottom: 25px;
    }
`;

const AnchorLinksWrapper = styled.div`
    color: #0066cc;
    h2 {
        padding-bottom: 23px;
    }

    ul,
    ol,
    ul li,
    ol li,
    p {
        padding-bottom: 0 !important;
        padding-top: 0 !important;
    }

    ul ol,
    ol ul,
    ul ul,
    ol ol {
        margin-left: 0;
        padding-left: 25px;
    }

    ul,
    ol {
        li {
            &::marker {
                color: #0066cc;
            }
        }
    }
`;

const RelatedWrapper = styled.div`
    margin: 112px auto 119px;
    max-width: 1201px;
    width: 100%;

    @media screen and (max-width: 991px) {
        margin: 73px auto 132px;
    }
`;

const RelatedContainer = styled.div`
    h3 {
        font-family: Helvetica;
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 30px;
        color: #242e35;
        margin: 0;
        margin-bottom: 50px;
        ${Gup};

        &:after {
            content: " ";
            display: block;
            margin-top: 36px;
            border-bottom: 1px solid #242e35;
        }

        @media screen and (max-width: 991px) {
            margin-bottom: 22px;

            &:after {
                display: none;
            }
        }
    }
`;
export const ShareWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    .shareWrapperLabel {
        font-family: RoslindaleDisplayCondensed;
        font-size: 32px;
        font-style: normal;
        font-weight: 700;
        line-height: 44px;
        letter-spacing: 0px;
        text-align: left;
        padding-top: 100px;
    }
`;

export const Socials = styled.div`
    width: 200px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    position: static;
    transform: none;
    margin-top: 50px;

    .at-share-btn-elements {
        display: flex;
        justify-content: space-around;
        width: 200px;
    }

    a {
        text-decoration: none;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 11px !important;
        margin-bottom: 0 !important;
        border: 1px solid #a8abad !important;
        background-color: transparent !important;
        padding: 0px !important;
        width: 41px !important;
        height: 41px !important;

        span,
        svg {
            width: 41px !important;
            height: 41px !important;
        }

        svg {
            padding: 10px;
        }

        &:last-child {
            margin-right: 0 !important;
        }

        @media screen and (min-width: 1233px) and (max-width: 1400px) {
            margin-right: 0 !important;
        }
    }
`;

export default Blog;
