import React from "react";
import Slider from "react-slick";
import { useTranslation } from "react-i18next";
import { I18nLink as Link } from "#localization/localizedRouter";

import { useMobile } from "#shared/hooks";
import useScrollReveal from "#shared/hooks/useScrollReveal";

import { Wrapper, TopSmallTitle, TopTitle, TitleWrapper, SlickWrapper, SlideWrapper, SlideContainer } from "./styled";
import { testimonialsSliderData } from "./data";

const TestimonialsSlider = () => {
    const ref = React.useRef();
    const { hasRevealed } = useScrollReveal({ ref });
    const runAnimation = hasRevealed ? "runAnimation" : "";
    const isMobile = useMobile(991);
    const { t } = useTranslation("vinovest-home");

    return (
        <Wrapper ref={ref}>
            <div className="fillArea" />
            <TitleWrapper>
                <TopSmallTitle className={runAnimation}>{t("partners-are-saying.topSmallTitle")}</TopSmallTitle>
                <TopTitle className={runAnimation}>{t("partners-are-saying.title")}</TopTitle>
            </TitleWrapper>

            <SlickWrapper className={runAnimation}>
                <div className="container">
                    <Slider
                        className="testimonials-slider-container"
                        accessibility
                        infinite
                        autoplay={false}
                        slidesToShow={1}
                        slidesToScroll={1}
                        arrows={false}
                        dots
                    >
                        {testimonialsSliderData.map(
                            ({ id, src, title, description, fontSize, bottomText, background, color, to }) => (
                                <SlideWrapper key={id}>
                                    <SlideContainer
                                        fontSize={fontSize}
                                        color={color}
                                        background={background}
                                        className={`box${id}`}
                                    >
                                        <div className="topTitle"> {to ? <Link to={to}>{title}</Link> : title} </div>
                                        <img
                                            className="img"
                                            src={src}
                                            alt={title}
                                            height={isMobile ? "auto" : "240"}
                                            width="240"
                                        />
                                        <div className="message">
                                            <div className="description">{description}</div>
                                            <div className="bottomText">{bottomText}</div>
                                        </div>
                                    </SlideContainer>
                                </SlideWrapper>
                            ),
                        )}
                    </Slider>
                </div>
            </SlickWrapper>
        </Wrapper>
    );
};

export default TestimonialsSlider;
