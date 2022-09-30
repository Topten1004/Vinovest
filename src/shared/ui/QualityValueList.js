import React from "react";
import styled from "styled-components";
import { TopDescription, TopTitle } from "#shared/ui/Typography/styled";
import { FadeFromBottomWithDelay } from "#shared/ui/Animations";
import useScrollReveal from "#shared/hooks/useScrollReveal";

const QualityValueList = ({ valueProps }) => {
    const ref = React.useRef();
    const { hasRevealed } = useScrollReveal({ ref });

    return (
        <CustomModuleContainer ref={ref} isRow>
            {valueProps.map((p, i) => (
                <Prop key={p.header} {...p} index={i} hasRevealed={hasRevealed} />
            ))}
        </CustomModuleContainer>
    );
};

const Prop = ({ header, description, svg, index, hasRevealed, imgClassName }) => (
    <PropContainer index={index + 1} className={hasRevealed ? "runAnimations" : ""}>
        <img className={`prop-img ${imgClassName}`} src={svg} alt="prop-img" />
        <span className="prop-header">{header}</span>
        <span className="prop-desc">{description}</span>
    </PropContainer>
);

const Quality = ({ valueProps, title, description, trading }) => (
    <Container trading={trading}>
        <TopDescription>{description}</TopDescription>
        <TopTitle>{title}</TopTitle>
        <QualityValueList valueProps={valueProps} />
    </Container>
);

const Container = styled.div`
    padding-right: 8.888%;
    padding-left: 8.888%;
    padding-bottom: 120px;
    color: #242e35;

    ${TopDescription},
    ${TopTitle} {
        margin-left: auto;
        margin-right: auto;
    }
    padding-top: ${(p) => (p.trading ? "0" : "165px")};

    @media screen and (max-width: 991px) {
        padding-top: 110px;
        text-align: center;
        padding-right: 6.666%;
        padding-left: 6.666%;
    }
    @media screen and (max-width: 767px) {
        padding-top: 46px;
        padding-bottom: 33px;
    }
`;

const CustomModuleContainer = styled.div`
    text-align: center;
    border: none;
    box-shadow: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    margin-top: 43.74px;
    max-width: 1200px;
    width: 100%;
    flex-direction: column;

    ${(p) => p.theme.media.greaterThan("991px")`
        flex-direction: row;
        flex-wrap: wrap;
        align-items: stretch;
    `}
`;

const PropContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 28.7%;
    width: 100%;
    padding: 12px;

    &.runAnimations {
        animation: ${FadeFromBottomWithDelay} ${({ index }) => 0.5 * index}s ease-out;
    }

    .prop-img {
        margin-top: 43px;
        height: 120px;
        max-width: 129px;
        width: 100%;
        margin-bottom: 23px;

        @media screen and (max-width: 767px) {
            margin-bottom: 20px;
            margin-top: 0;
        }
    }
    .prop-header {
        margin-top: 20px;
        margin-bottom: 10px;
        font-family: Roslindaledisplaycondensed, sans-serif;
        font-size: 32px;
        line-height: 150%;
        font-weight: 500;
        color: #242e35;
    }
    .prop-desc {
        font-family: ${(p) => p.theme.fonts.body};
        font-size: 16px;
        line-height: 28px;
        color: #242e35;
    }

    @media screen and (max-width: 991px) {
        max-width: 330px;
        padding: 0;
        padding-bottom: 64px;
    }
    @media screen and (max-width: 767px) {
        max-width: 330px;
        padding: 0;
        padding-bottom: 40px;
    }
`;

export { Quality, Container, CustomModuleContainer, PropContainer, TopTitle };
