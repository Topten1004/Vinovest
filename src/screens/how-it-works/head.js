import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { TopDescription, TopTitle } from "#shared/ui/Typography/styled";
import { useMobile } from "#shared/hooks";
import WithLayersButton from "#shared/ui/WithLayersButton";
import { FadeFromBottomWithDelay } from "#shared/ui/Animations";
import useScrollReveal from "#shared/hooks/useScrollReveal";
import MetaTagsReplacer from "#shared/components/MetaTagsReplacer";

const HowItWorksHead = () => {
    const ref = React.useRef();
    const { hasRevealed } = useScrollReveal({ ref });
    const runAnimation = hasRevealed ? "runAnimation" : "";
    const { t } = useTranslation("how-works");
    const isMobile = useMobile(991);

    return (
        <HowItWorksHeadContainer ref={ref}>
            <MetaTagsReplacer title={t("head-meta.title")} description={t("head-meta.description")} />
            <TopDescription className={runAnimation}>
                {isMobile
                    ? t("access-investment-platform.topSmallTitleMobile")
                    : t("access-investment-platform.topSmallTitle")}
            </TopDescription>
            <TopTitle className={runAnimation}>{t("access-investment-platform.title")}</TopTitle>{" "}
            <WithLayersButton colors={["#242E35", "#FFFFFF"]}>{t("head.getStarted")}</WithLayersButton>
        </HowItWorksHeadContainer>
    );
};

const HowItWorksHeadContainer = styled.div`
    padding-top: 100px;
    padding-right: 8.888%;
    padding-left: 8.888%;
    text-align: center;

    ${TopTitle} {
        max-width: 900px;
        margin: 0 auto 52px;
        &.runAnimation {
            animation: ${FadeFromBottomWithDelay} 0.8s linear;
        }
    }

    ${TopDescription} {
        margin: 24px auto 40px;
        color: #242e35;

        &.runAnimation {
            animation: ${FadeFromBottomWithDelay} 0.8s linear;
        }
    }

    ${WithLayersButton.styled.WithLayers} {
        margin-top: 20px;
        margin-bottom: 25px;

        @media screen and (max-width: 991px) {
            width: 290px;
        }
    }

    @media screen and (max-width: 991px) {
        padding-right: 6.666%;
        padding-left: 6.666%;
        padding-top: 120px;
    }
`;

export default HowItWorksHead;
