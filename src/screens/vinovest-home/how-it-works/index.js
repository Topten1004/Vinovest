import React from "react";
import { useTranslation } from "react-i18next";
import { range } from "lodash";
import useScrollReveal from "#shared/hooks/useScrollReveal";
import useIntersect from "#shared/hooks/useIntersect";
import { useMobile } from "#shared/hooks";
import {
    Wrapper,
    TopSmallTitle,
    TopTitle,
    MobileTitles,
    ImgsWrapper,
    ImgContainer,
    MobileDescriptions,
    HowImg,
    StickyWrapper,
    OptionTitle,
    OptionDescription,
    Dynamic,
} from "./styled";
import { howItWorks } from "./data";

const getThreshold = () => range(100).map((i) => i / 100);

const ImgOption = ({ src, title, description, gup, lastGap, color, background, index, updateIntersectionList, className }) => {
    const [setNode, { intersectionRatio }] = useIntersect({ threshold: getThreshold() });

    const isMobile = useMobile(991);

    React.useEffect(() => {
        updateIntersectionList((state) =>
            state.map((ratioOld, i) => (i === index ? (intersectionRatio || 0) * 100 : ratioOld)),
        );
    }, [index, intersectionRatio, updateIntersectionList]);

    return (
        <ImgContainer ref={setNode} className={className}>
            <HowImg src={src} alt={title} gup={gup ? "45px" : 0} lastGap={lastGap} width="904" height={isMobile ? "auto" : "828"} />
            <MobileDescriptions color={color} background={background}>
                <OptionTitle>{title}</OptionTitle>
                <OptionDescription>{description}</OptionDescription>
            </MobileDescriptions>
        </ImgContainer>
    );
};

const HowItWorks = () => {
    const { t } = useTranslation("vinovest-home");

    const ref = React.useRef();
    const { hasRevealed } = useScrollReveal({ ref });
    const runAnimation = hasRevealed ? "runAnimation" : "";

    const { innerHeight } = window;
    const [intersectionData, setIntersectionData] = React.useState(howItWorks.map(() => 0));
    const [current, setCurrent] = React.useState(0);

    React.useEffect(() => {
        setCurrent(intersectionData.reduce((iMax, x, i, arr) => (x > arr[iMax] ? i : iMax), 0));
    }, [intersectionData]);

    const top = 9.368 * (innerHeight / 100);

    return (
        <Wrapper ref={ref}>
            <MobileTitles>
                <TopSmallTitle>{t("scrollOptions.topSmallTitle")}</TopSmallTitle>
                <TopTitle>{t("scrollOptions.title")}</TopTitle>
            </MobileTitles>
            <ImgsWrapper>
                {howItWorks.map((data, i) => (
                    <ImgOption
                        key={data.description}
                        index={i}
                        {...data}
                        updateIntersectionList={setIntersectionData}
                        className={runAnimation}
                    />
                ))}
            </ImgsWrapper>
            <StickyWrapper top={`${top}px`}>
                <TopSmallTitle className={runAnimation}>{t("scrollOptions.topSmallTitle")}</TopSmallTitle>
                <TopTitle className={runAnimation}>{t("scrollOptions.title")}</TopTitle>
                {howItWorks.map(({ title, description }, i) => (
                    <Dynamic delay={i} className={`${current === i ? "active" : ""} ${runAnimation}`} key={title}>
                        <OptionTitle>{title}</OptionTitle>
                        {current === i && <OptionDescription>{description}</OptionDescription>}
                    </Dynamic>
                ))}
            </StickyWrapper>
        </Wrapper>
    );
};

export default HowItWorks;
