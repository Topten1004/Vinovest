import React from "react";
import styled from "styled-components";
import { useScrollReveal } from "#shared/hooks";
import { FadeFromBottomWithDelay } from "#shared/ui/Animations";
import { animated } from "react-spring";
import useHoverAnimation from "#shared/hooks/useHoverAnimation";

const OptionBox = ({ src, alt = "access option", title, data, color, reverse, background = "#c5d5e4" }) => {
    const ref = React.useRef();
    const animationWrapper = React.useRef(null);

    const { hasRevealed } = useScrollReveal({ ref });
    const runRevealedAnimation = hasRevealed ? "runRevealedAnimation" : "";

    const { calcHoverPositions, translate1, translateCustom1, xy, set } = useHoverAnimation({ frequency: 0.08 });

    return (
        <OptionBoxContainer
            color={color}
            background={background}
            ref={animationWrapper}
            onMouseMove={({ clientX: x, clientY: y }) => {
                set({ xy: calcHoverPositions(x, y, animationWrapper) });
            }}
        >
            <OptionBoxWrapper reverse={reverse ? "margin-left: 8.888%" : ""}>
                <Left reverse={reverse ? "margin: 0 0 0 auto" : ""} style={{ transform: xy.interpolate(translate1) }}>
                    <img src={src} alt={alt} />
                </Left>
                <Right
                    ref={ref}
                    reverse={reverse ? "left: 0" : ""}
                    style={{ transform: xy.interpolate(translateCustom1(0.13)) }}
                >
                    <div className="RightWrapper">
                        <h3 className={runRevealedAnimation}>{title}</h3>
                        {data.map(({ title, value }, i) => (
                            <React.Fragment key={title}>
                                <RightTitle className={runRevealedAnimation} index={i + 1}>
                                    {title}
                                </RightTitle>
                                <RightParagraph className={runRevealedAnimation} index={i + 1}>
                                    {value}
                                </RightParagraph>
                            </React.Fragment>
                        ))}
                    </div>
                </Right>
            </OptionBoxWrapper>
        </OptionBoxContainer>
    );
};

const OptionBoxContainer = styled.div`
    max-width: 1440px;
    margin: 104px auto 0;
    color: ${({ color }) => color || "#242e35"};

    @media screen and (max-width: 991px) {
        padding-bottom: 40px;
        margin-top: 0;
        background: ${({ background }) => background};
    }
`;

const OptionBoxWrapper = styled.div`
    position: relative;
    max-width: 1312px;
    ${({ reverse }) => reverse || "margin-right: 8.888%"};

    @media screen and (max-width: 991px) {
        margin: 0;
    }
`;

const Right = styled(animated.div)`
    position: absolute;
    top: 0;
    ${({ reverse }) => reverse || "right: 0"};
    height: 100%;
    width: 43.6%;
    max-width: 572px;
    text-align: left;

    .RightWrapper {
        position: absolute;
        ${({ reverse }) => reverse || "right: 0"};
        top: 50%;
        height: fit-content;
        width: 100%;
        transform: translateY(-50%);
    }

    h3 {
        &.runRevealedAnimation {
            animation: ${FadeFromBottomWithDelay} 0.4s ease-out;
        }
        font-size: 48px;
        line-height: 133%;
        margin-top: 20px;
        margin-bottom: 10px;
        font-family: Roslindaledisplaycondensed, sans-serif;

        @media screen and (max-width: 767px) {
            font-size: 32px;
            line-height: 150%;
        }
    }

    @media screen and (max-width: 991px) {
        text-align: center;
        position: static;
        transform: none !important;
        width: 86.8%;
        max-width: 799px;
        margin-right: 6.6%;
        margin-left: 6.6%;
        padding-bottom: 13px;

        .RightWrapper {
            position: static;
            transform: none !important;
        }
    }
`;

const RightTitle = styled.h4`
    &.runRevealedAnimation {
        animation: ${FadeFromBottomWithDelay} ${({ index }) => 0.5 * index}s ease-out;
    }
    font-family: Roslindaledisplaycondensed, sans-serif;
    font-size: 34px;
    font-weight: 500;
    margin-bottom: 0px;

    @media screen and (max-width: 767px) {
        font-size: 24px;
        line-height: 167%;
    }
`;

const RightParagraph = styled.p`
    &.runRevealedAnimation {
        animation: ${FadeFromBottomWithDelay} ${({ index }) => 0.6 * index}s ease-out;
    }
    margin-bottom: 10px;
    font-size: 20px;
    line-height: 160%;
    font-family: Favoritstd, sans-serif;
    font-weight: 500;

    @media screen and (max-width: 767px) {
        font-size: 18px;
    }
`;
const Left = styled(animated.div)`
    width: 100%;
    img {
        ${({ reverse }) => reverse || ""};
        display: block;
        width: 68.95%;
    }

    @media screen and (max-width: 991px) {
        width: 100%;
        transform: none !important;

        img {
            width: 100%;
        }
    }
`;

export default OptionBox;
