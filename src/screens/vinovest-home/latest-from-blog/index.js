import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import Slider from "react-slick";
import useScrollReveal from "#shared/hooks/useScrollReveal";
import WithLayersButton from "#shared/ui/WithLayersButton";
import { ROUTE_PATHS } from "#screens/route-paths";
import {
    Wrapper,
    TopTitle,
    TitleWrapper,
    BottomDescription,
    BlogListWrapper,
    BlogListContainer,
    BlogSliderContainer,
    BlogSlideWrapper,
    BlogSlide,
} from "./styled";
import BlogPreview from "./BlogPreview";
import { latestFromBlogData } from "./data";
import readerSvg from "../assets/reader.svg";

const LatestFromBlog = () => {
    const ref = React.useRef();
    const { hasRevealed } = useScrollReveal({ ref });
    const runAnimation = hasRevealed ? "runAnimation" : "";
    const history = useHistory();
    const { t } = useTranslation("vinovest-home");

    const gotoBlog = () => {
        history.push(ROUTE_PATHS.blog);
    };

    return (
        <Wrapper ref={ref}>
            <TitleWrapper>
                <TopTitle className={runAnimation}>{t("latest-from-blog.title")}</TopTitle>
                <BottomDescription className={runAnimation}>{t("latest-from-blog.description")}</BottomDescription>
                <WithLayersButton
                    colors={["#fff", "rgb(36, 46, 53)", "rgb(36, 46, 53)"]}
                    width="165.2px"
                    onClick={gotoBlog}
                >
                    {t("latest-from-blog.readMore")}
                </WithLayersButton>
            </TitleWrapper>
            <BlogListContainer>
                <BlogListWrapper>
                    {latestFromBlogData.map(({ id, ...props }) => (
                        <BlogPreview key={id} {...props} id={id} runAnimation={runAnimation} delay={id + 1} />
                    ))}
                </BlogListWrapper>
            </BlogListContainer>
            <BlogSliderContainer>
                <img className="reader" src={readerSvg} alt="reader" />
                <Slider
                    className="blog-slider-container"
                    accessibility
                    infinite
                    autoplay={false}
                    slidesToShow={1}
                    slidesToScroll={1}
                    arrows={false}
                    dots
                >
                    {latestFromBlogData.map(({ id, ...props }) => (
                        <BlogSlide key={id}>
                            <BlogSlideWrapper>
                                <BlogPreview {...props} id={id} />
                            </BlogSlideWrapper>
                        </BlogSlide>
                    ))}
                </Slider>
            </BlogSliderContainer>
        </Wrapper>
    );
};

export default LatestFromBlog;
