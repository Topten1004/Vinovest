/* eslint-disable no-nested-ternary */
import React from "react";
import styled from "styled-components";
import Skeleton from "react-loading-skeleton";

import { Wrapper, LearnMoreButton, LearnMoreButtonMobile } from "./styled";
import { useTranslation } from "react-i18next";

const RenderSkeleton = ({ height }) => <Skeleton style={{ width: "100%", height }} />;

const MobileLeft = () => {
    const { t } = useTranslation(["portfolio"]);

    return (
        <SkeletonLeft>
            <Skeleton style={{ height: "11px", width: "60%", margin: "10px auto", display: "block" }} />
            <Skeleton style={{ height: "15px", width: "70%", margin: "20px auto", display: "block" }} />
            <Skeleton style={{ height: "15px", width: "70%", margin: "10px auto", display: "block" }} />
            <Skeleton style={{ height: "230px", width: "80%", margin: "40px auto 40px", display: "block" }} />

            <LearnMoreButtonMobile disabled className="learnMoreMobile">
                {t("hero.pending-learn")}
            </LearnMoreButtonMobile>
        </SkeletonLeft>
    );
};

const TabletLeft = () => {
    const { t } = useTranslation(["portfolio"]);
    return (
        <SkeletonLeftTablet>
            <Text styles="max-width: 159px; margin-top: 21px;">
                <RenderSkeleton height="15px" />
            </Text>
            <Title>
                <RenderSkeleton height="30px" />
            </Title>
            <Title>
                <RenderSkeleton height="30px" />
            </Title>

            <Text styles="max-width: 259px; margin-top: 21px;">
                <RenderSkeleton height="15px" />
            </Text>
            <Text styles="max-width: 259px; margin-top: 13px;">
                <RenderSkeleton height="15px" />
            </Text>
            <Text styles="max-width: 159px; margin-top: 13px; margin-bottom: 20px">
                <RenderSkeleton height="15px" />
            </Text>
            <LearnMoreButton disabled> {t("hero.pending-learn")}</LearnMoreButton>
        </SkeletonLeftTablet>
    );
};

const DesktopLeft = () => {
    const { t } = useTranslation(["portfolio"]);

    return (
        <SkeletonLeft>
            <TopText>
                <RenderSkeleton height="15px" />
            </TopText>
            <Title>
                <RenderSkeleton height="39px" />
            </Title>
            <Title>
                <RenderSkeleton height="39px" />
            </Title>

            <Text styles="max-width: 359px; margin-top: 41px;">
                <RenderSkeleton height="15px" />
            </Text>
            <Text styles="max-width: 359px; margin-top: 13px;">
                <RenderSkeleton height="15px" />
            </Text>
            <Text styles="margin-top: 13px; margin-bottom: 60px">
                <RenderSkeleton height="15px" />
            </Text>
            <LearnMoreButton disabled> {t("hero.pending-learn")}</LearnMoreButton>
        </SkeletonLeft>
    );
};

const HeroPending = ({ isMobile, isTablet }) => (
    <WrapperSkeleton
        height={isMobile ? "490px" : isTablet ? "485px" : "650px"}
        padding={isMobile ? "31px 10px 21px" : isTablet ? "73px 71px 63px" : "95px 100px 98px"}
    >
        {isMobile ? <MobileLeft /> : isTablet ? <TabletLeft /> : <DesktopLeft />}
        {!isMobile && (
            <SkeletonRight>
                <RenderSkeleton height={isMobile ? "253px" : isTablet ? "349px" : "453px"} />
            </SkeletonRight>
        )}
    </WrapperSkeleton>
);

const WrapperSkeleton = styled(Wrapper)`
    max-width: 1440px;
    margin: 0 auto;
    display: flex;
    height: ${({ height }) => height || "650px"};
    padding: ${({ padding }) => padding || "95px 100px 98px"};

    @media screen and (max-width: 767px) {
        flex-direction: column;
        align-items: center;
    }
`;

const Text = styled.div`
    max-width: 249px;
    width: 100%;
    ${({ styles }) => styles || ""}
`;

const TopText = styled(Text)`
    margin-top: 22px;
    margin-bottom: 52px;
`;

const Title = styled.div`
    max-width: 359px;
    width: 100%;
    margin-top: 30px;

    @media screen and (max-width: 767px) {
        max-width: 159px;
    }
`;

const SkeletonLeft = styled(Wrapper)`
    max-width: 477px;
    width: 100%;
    margin-right: 118px;

    @media screen and (max-width: 767px) {
        margin: 0 auto;

        .learnMoreMobile {
            margin: 0 auto;
        }
    }

    @media screen and (min-width: 1024px) {
        margin-left: 39px;
    }
`;

const SkeletonLeftTablet = styled(Wrapper)`
    max-width: 477px;
    width: 100%;
    margin-right: 60px;
    flex-shrink: 1;
`;

const SkeletonRight = styled(Wrapper)`
    max-width: 720px;
    width: 100%;
`;

export default HeroPending;
