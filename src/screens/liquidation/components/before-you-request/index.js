import React from "react";
import styled from "styled-components";
import { useHistory } from "#shared/hooks/useHistory";
import { MainButton, Fade } from "#shared/ui";
import StickyBox from "./sticky-box";
import { data as translateData } from "./data";
import SharpeRatio from "./sharpe-ratio";
import { ROUTE_PATHS } from "../../../route-paths";
import { useTranslation } from "react-i18next";
import posthog from "posthog-js";

const BeforeYouRequest = () => {
    const { t } = useTranslation(["liquidation"]);
    const history = useHistory();
    const data = translateData(t);
    return (
        <Fade in>
            <Wrapper>
                <Title>{t("liquidate_info")}</Title>
                <Main>
                    <ContentWrapper>
                        <Divider />
                        {data.map(({ type, text, key, isBar, extraMargin }) => (
                            <React.Fragment key={key}>
                                {isBar ? (
                                    <SharpeRatioWrapper>
                                        <SharpeRatio />
                                        <div className="sharpeRatioDescription">{t("chart_description")}</div>
                                    </SharpeRatioWrapper>
                                ) : (
                                    <>
                                        {type === "title" ? (
                                            <TitleItem extraMargin={extraMargin}>{text}</TitleItem>
                                        ) : (
                                            <TextItem>{text}</TextItem>
                                        )}
                                    </>
                                )}
                            </React.Fragment>
                        ))}
                        <BottomWrapper>
                            <Back
                                onClick={() => {
                                    history.push(ROUTE_PATHS.account);
                                }}
                            >
                                {t("back")}
                            </Back>
                            <Continue
                                onClick={() => {
                                    history.push(ROUTE_PATHS.liquidation);
                                    try {
                                        posthog.capture("click_acknowledge", {});
                                    } catch (err) {}
                                }}
                            >
                                {t("acknowledge_button")}
                            </Continue>
                        </BottomWrapper>
                    </ContentWrapper>
                    <StickyWrapper>
                        <StickyBox />
                    </StickyWrapper>
                </Main>
            </Wrapper>
        </Fade>
    );
};

const Wrapper = styled.div`
    width: 100%;
    max-width: 1142px;
    padding: 91px 0 83px;
    margin: 0 auto;

    @media screen and (max-width: 766px) {
        padding: 66px 0 107px;
    }

    @media screen and (min-width: 768px) and (max-width: 1024px) {
        padding: 56px 0 63px;
    }
`;

const Title = styled.div`
    max-width: 899px;
    padding: 0 50px;
    width: 100%;
    font-family: RoslindaleDisplayCondensed;
    font-style: normal;
    font-weight: 500;
    font-size: 64px;
    line-height: 84px;
    text-align: center;
    color: #242e35;
    margin: 0 auto;

    @media screen and (max-width: 766px) {
        font-size: 32px;
        line-height: 41px;
        max-width: 307px;
        padding: 0 10px;
    }

    @media screen and (min-width: 768px) and (max-width: 1024px) {
        font-size: 45px;
        line-height: 60px;
    }
`;

const Main = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    padding-left: 79px;

    @media screen and (max-width: 1024px) {
        padding: 0 13px;
        flex-direction: column;
    }
`;

const ContentWrapper = styled.div`
    margin-top: 80px;
    padding: 0 107px 0 0;
    width: 100%;
    max-width: 713px;
    flex-shrink: 1;

    @media screen and (max-width: 766px) {
        margin-top: 61px;
        padding: 0;
    }

    @media screen and (min-width: 768px) and (max-width: 1024px) {
        max-width: 100%;
        padding: 0;
    }

    @media screen and (min-width: 1025px) and (max-width: 1200px) {
        max-width: 500px;
        padding: 0 20px 0 0;
        flex-shrink: 2;
        box-sizing: border-box;
    }
`;

const StickyWrapper = styled.div`
    margin-top: 80px;
    flex-shrink: 0;
    width: 350px;

    margin: 80px auto 0;

    @media screen and (max-width: 766px) {
        margin: 65px auto 0;
        width: 100%;
        max-width: 350px;
    }

    @media screen and (min-width: 768px) and (max-width: 1024px) {
        display: flex;
        width: 100%;
    }
`;

const Divider = styled.div`
    width: 100%;
    padding-bottom: 38px;
    border-top: 1px solid #eeeeee;

    @media screen and (max-width: 766px) {
        padding-bottom: 45px;
        width: auto;
        margin: 0 11px;
    }

    @media screen and (min-width: 768px) and (max-width: 1024px) {
        display: none;
    }
`;

const TitleItem = styled.div`
    font-family: RoslindaleDisplayCondensed;
    font-style: normal;
    font-weight: 500;
    font-size: 32px;
    line-height: 41px;
    color: #242e35;
    padding-left: 13px;
    ${({ extraMargin }) => (extraMargin ? "margin-top: 60px" : "")}

    @media screen and (max-width: 766px) {
        font-size: 24px;
        line-height: 32px;
        padding: 0 13px;

        ${({ extraMargin }) => (extraMargin ? "margin-top: 45px" : "")}
    }
`;

const TextItem = styled.div`
    padding-left: 13px;
    margin: 20px 0;
    font-family: VinovestMedium;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 26px;
    letter-spacing: 0.005em;
    color: #242e35;

    @media screen and (max-width: 766px) {
        font-size: 14px;
        line-height: 21px;
        padding: 0 13px;
    }
`;

const SharpeRatioWrapper = styled.div`
    margin: 34px 0;
    margin-left: 13px;

    .sharpeRatioDescription {
        font-family: VinovestMedium;
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 22px;
        display: flex;
        align-items: center;
        letter-spacing: 0.005em;
        color: #767a7f;
        margin-top: 15px;

        @media screen and (max-width: 766px) {
            margin-top: 27px;
        }
    }

    @media screen and (max-width: 766px) {
        padding: 0 13px;
        margin: 0;
        margin-bottom: 24px;
    }
`;

const BottomWrapper = styled.div`
    padding-left: 13px;
    padding-top: 20px;
    display: flex;
    justify-content: flex-start;

    @media screen and (max-width: 766px) {
        padding: 20px 13px 0;
    }

    @media screen and (min-width: 768px) and (max-width: 1024px) {
        padding: 46px 0 0;
        justify-content: center;
    }

    @media screen and (max-width: 766px) {
        flex-direction: column-reverse;
    }


`;
const Continue = styled(MainButton)`
    height: 70px;
    width: 287px;
    border-radius: 0px;
    margin: 0 !important;
    margin-top: 20px !important;

    @media screen and (max-width: 766px) {
        width: 100%;
    }
`;

const Back = styled(Continue)`
    background: #ffffff;
    border: 1px solid #caccce;
    color: #242e35;
    background: #ffffff;
    border: 1px solid #caccce;
    margin-right: 21px !important;

    @media screen and (max-width: 766px) {
        display: block;
        width: 100%;
        margin-right: 0 !important;
    }
`;

export default BeforeYouRequest;
