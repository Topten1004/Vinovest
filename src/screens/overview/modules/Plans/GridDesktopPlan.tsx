import React from "react";
import { useTranslation } from "react-i18next";
import { IconCheck } from "@vinovest/components/icons";
import styled from "styled-components";
import { currencySymbol } from "#utils/constants";
import { numberWithCommas } from "#utils/shared";
import whiteBottle from "../../../pricing/images/whiteBottle.png";
import goldBottle from "../../../pricing/images/goldBottle.png";
import blackBottle from "../../../pricing/images/blackBottle.png";
import plusBottle from "../../../pricing/images/plusBottle.png";
import { I18nLink } from "#localization/localizedRouter";
import { itemsToRenderDesktop, chartHeaderDesktop, buttonsDesktop } from "../../../pricing/images/items";

export const GridDesktopPlan = ({ planLevelNumber, plan }) => {
    const { t } = useTranslation("pricing");
    return (
        <DesktopPlanGrid>
            <div>
                <MainTitle>{t("title_portfolio")}</MainTitle>
            </div>
            <GridItem>
                <div className={plan === "starter" ? "bg-0 border" : "border"}>
                    <ImageWrapper className="bg-0">
                        <img src={whiteBottle} className="img" alt="item" height="240" width="305" />
                    </ImageWrapper>
                </div>
            </GridItem>
            <GridItem>
                <div className={plan === "plus" ? "bg-1 border" : "border"}>
                    <ImageWrapper className="bg-1">
                        <img src={plusBottle} className="img" alt="item" height="240" width="305" />
                    </ImageWrapper>
                </div>
            </GridItem>
            <GridItem>
                <div className={plan === "premium" ? "bg-2 border" : "border"}>
                    <ImageWrapper className="bg-2">
                        <img src={goldBottle} className="img" alt="item" height="240" width="305" />
                    </ImageWrapper>
                </div>
            </GridItem>
            <GridItem>
                <div className={plan === "grandCru" ? "bg-3 border" : "border"}>
                    <ImageWrapper className="bg-3">
                        <img src={blackBottle} className="img" alt="item" height="240" width="305" />
                    </ImageWrapper>
                </div>
            </GridItem>
            <div />
            <GridItem>
                <Title>{t("standard.title")}</Title>
            </GridItem>
            <GridItem>
                <Title>{t("plus.title")}</Title>
            </GridItem>
            <GridItem>
                <Title>{t("premium.title")}</Title>
            </GridItem>
            <GridItem>
                <Title>{t("grandCru.title")}</Title>
            </GridItem>
            {chartHeaderDesktop.slice(0, 5).map((item, idx) => (
                <React.Fragment key={item.id}>
                    {item.text ? (
                        <Amount className={`bg-${idx - 1} ${idx === 4 && "white-text"} top-radius`}>
                            <p>
                                {currencySymbol}
                                {numberWithCommas(item.text)}
                            </p>
                        </Amount>
                    ) : (
                        <div />
                    )}
                </React.Fragment>
            ))}
            <div />
            {[1, 2, 3, 4].map((item, idx) => (
                <HeaderLabel className={`bg-${idx} ${idx === 3 && "white-text"}`} key={item}>
                    <p>{t("label_balance")}</p>
                </HeaderLabel>
            ))}
            {chartHeaderDesktop.slice(5).map((item, idx) => (
                <React.Fragment key={item.id}>
                    {item.text ? (
                        <Amount className={`bg-${idx - 1} ${idx === 4 && "white-text"}`}>
                            <p>{t(item.text)}</p>
                        </Amount>
                    ) : (
                        <div />
                    )}
                </React.Fragment>
            ))}
            <div />
            {[1, 2, 3, 4].map((item, idx) => (
                <HeaderLabel className={`bg-${idx} ${idx === 3 && "white-text"}`} key={item}>
                    <p>{t("label_annual")}</p>
                </HeaderLabel>
            ))}
            {itemsToRenderDesktop.map((item, index, array) => (
                <React.Fragment key={item.id}>
                    {item.text ? (
                        <div className={item.class}>
                            <p>{t(item.text)}</p>
                        </div>
                    ) : (
                        <div />
                    )}

                    {item.checkMarks &&
                        item.checkMarks.map((i, idx) =>
                            i ? (
                                <Populated className={`bg-${idx}`} key={idx}>
                                    <IconCheck fill="#448B47" height="11px" width="18px" />
                                </Populated>
                            ) : (
                                <Empty className={`bg-${idx}`} key={idx}>
                                    <span className="icon-empty" />
                                </Empty>
                            ),)}
                    {!item.checkMarks && [1, 2, 3, 4].map((i, idx) => <div className={`bg-${idx}`} key={i} />)}
                </React.Fragment>
            ))}
            <div />
            {buttonsDesktop.map((item, idx) => (
                <React.Fragment key={item.id}>
                    {idx >= planLevelNumber ? (
                        <ButtonContainer className={`bg-${idx} bottom-radius`}>
                            <I18nLink
                                hard
                                className={`${plan === item.id ? "current" : "cta"} ${
                                    planLevelNumber === 3 ? "white-text" : ""
                                }`}
                                to="/deposit"
                                disabled={plan === item.id}
                            >
                                {plan === item.id ? t("features.button_current") : t("features.button_upgrade")}
                            </I18nLink>
                        </ButtonContainer>
                    ) : (
                        <div className={`bg-${idx} bottom-radius`} />
                    )}
                </React.Fragment>
            ))}
        </DesktopPlanGrid>
    );
};

const DesktopPlanGrid = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 340fr 180fr 180fr 180fr 180fr;
    gap: 0px 14px;
    grid-auto-flow: row;

    .bg-0 {
        background: #eeefef;
    }
    .bg-1 {
        background: #eff7ff;
    }
    .bg-2 {
        background: #fae8d1;
    }
    .bg-3 {
        background: #242e35;

        .current {
            color: #fff;
        }
    }

    .plan-label {
        color: #767a7f;
        font-size: 12px;
        font-family: VinovestMono;
        text-transform: uppercase;
        display: block;
        margin-bottom: 10px;
    }
    .plan-feature {
        color: #242e35;
        font-size: 14px;
        list-style-type: none;
    }

    .plan-feature p {
        margin-top: 0;
        margin-bottom: 24px;
    }

    .white-text {
        color: white;
    }

    .top-radius {
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
    }

    .bottom-radius {
        border-bottom-left-radius: 6px;
        border-bottom-right-radius: 6px;
    }

    a {
        background: #a86d37;
        font-family: VinovestMono;
        border: 1px solid #a86d37;
        border-radius: 3px;
        color: #fff;
        display: block;
        text-align: center;
        font-size: 12px;
        font-weight: 500;
        font-style: normal;
        letter-spacing: 0.025em;
        line-height: 18px;
        text-decoration: none;
        text-transform: uppercase;
        padding: 0.7rem 1.5rem;
        transition: 0.3s;

        &:hover {
            cursor: pointer;
            opacity: 0.5;
        }

        &.current {
            background: transparent;
            border: 1px solid #caccce;
            color: #242e35;
            pointer-events: none;
        }

        &.white-text {
            color: #fff;
        }
    }

    .border {
        border: 4px solid;
        border-radius: 100%;
        border-color: transparent;
        display: inline-block;
    }
`;

const MainTitle = styled.h2`
    font-size: 45px;
    font-family: RoslindaleDisplayCondensed;
    margin-bottom: 0px;
    margin-top: 20px;
`;

const GridItem = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Title = styled.h2` {
    font-size: 24px;
    font-family: RoslindaleDisplayCondensed;
    margin-top: 10px;
    margin-bottom: 20px;
`;

const ImageWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 61px;
    height: 61px;
    border-radius: 50%;
    border: 4px solid #fff;
    .img {
        max-width: 100%;
        width: 65px;
        height: auto;
        display: block;
    }
`;

const Amount = styled.div`
    color: #242e35;
    font-size: 16px;
    display: flex;
    justify-content: center;

    p {
        margin-top: 24px;
        margin-bottom: 0;
    }
`;

const HeaderLabel = styled.div`
    color: #767a7f;
    font-size: 12px;
    font-family: VinovestMedium;
    display: flex;
    justify-content: center;
    p {
        margin-top: 8px;
        margin-bottom: 8px;
    }
`;

const Populated = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
`;

const Empty = styled.div`
    position: relative;
    display: flex;
    justify-content: center;

    .icon-empty {
        background: #767a7f;
        display: block;
        height: 1px;
        width: 6px;
    }
`;

const ButtonContainer = styled.div`
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 24px;
    padding-bottom: 24px;
`;
