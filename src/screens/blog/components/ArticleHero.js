import React from "react";
import Skeleton from "react-loading-skeleton";
import styled from "styled-components";
import { get } from "lodash";
import { useMobile } from "#shared/hooks";
import AuthorDate, { AuthorDateWrapper } from "./AuthorDate";
import { makeProgressive } from "../utils";

export const ArticleHero = ({ data, isArticlePagePending, forwardRefProp }) => {
    const skeletonHeight1 = useMobile(991) && 300;
    const skeletonHeight2 = useMobile(768) && 151;
    const height = skeletonHeight2 || skeletonHeight1 || 500;
    const width = Math.floor((1028 / 500) * height);
    const src = get(data, "heroImage.fields.file.url");

    return (
        <Wrapper className="heroWrapper">
            <div ref={forwardRefProp} className="heroImgWrapper">
                {isArticlePagePending ? (
                    <Skeleton
                        style={{
                            height: `${height}px`,
                            width: "100%",
                            display: "block",
                        }}
                    />
                ) : (
                    <img
                        className="heroImg"
                        src={makeProgressive(src, { width: width, height: height })}
                        alt="hero"
                        height={`${height}px`}
                        width={`${width}px`}
                    />
                )}
            </div>
        </Wrapper>
    );
};

export const HeroDescription = ({ isArticlePagePending, data }) => {
    const title = get(data, "postTitle");
    const author = get(data, "blogAuthor.fields.authorName");

    const ref = React.useRef(null);
    const [height, setHeight] = React.useState(0);

    React.useEffect(() => {
        setHeight(ref.current.clientHeight);
    }, [data]);

    return (
        <HeroDescriptionWrapper height={height}>
            <div className="heroDescriptions" ref={ref}>
                <h1>
                    {isArticlePagePending ? (
                        <Skeleton style={{ height: "64px", width: "100%", display: "block" }} />
                    ) : (
                        title
                    )}
                </h1>
                {isArticlePagePending ? (
                    <Skeleton style={{ height: "20px", width: "60px", display: "block", marginTop: "15px" }} />
                ) : (
                    <AuthorDate isBig author={author} full />
                )}
            </div>
        </HeroDescriptionWrapper>
    );
};

const Wrapper = styled.div`
    position: relative;

    .heroImgWrapper {
        @media screen and (max-width: 767px) {
            height: 62px;
        }
    }

    .heroImg {
        width: 100%;
        display: block;
        height: 500px;
        object-fit: cover;

        @media screen and (max-width: 991px) {
            height: 300px;
        }

        @media screen and (max-width: 768px) {
            height: 151px;
        }
    }
`;

const HeroDescriptionWrapper = styled.div`
    height: fit-content;
    position: relative;

    @media screen and (max-width: 768px) {
        padding: 0 20px;
    }

    .socialsWrapper,
    .heroDescriptions {
        max-width: 780px;
        margin: 0 auto;
    }

    .heroDescriptions {
        position: relative;
        margin: ${({ height }) => (height ? `-${height / 2}px` : "-180px")} auto 0;

        padding: 33px 50px;
        background: #ffffff;
        border: 2px solid #242e35;
        box-sizing: border-box;

        @media screen and (max-width: 991px) {
            margin: -41px auto 0;
            padding: 40px;
        }

        @media screen and (max-width: 600px) {
            padding: 20px;
        }

        h1 {
            font-family: RoslindaleDisplayCondensed;
            font-style: normal;
            font-weight: 700;
            font-size: 44px;
            line-height: 64px;
            margin: 0;
            color: #242e35;

            @media screen and (max-width: 768px) {
                font-size: 50px;
                line-height: 55px;
            }

            @media screen and (max-width: 767px) {
                font-size: 26px;
                line-height: 36px;
            }
        }
    }

    ${AuthorDateWrapper} {
        color: #242e35;
        padding: 0;
        padding-top: 20px;

        @media screen and (max-width: 991px) {
            &.isBig {
                font-size: 10px;
                line-height: 20px;
                padding-top: 15px;
            }
        }
    }
`;
export default React.forwardRef((props, ref) => <ArticleHero {...props} forwardRefProp={ref} />);
