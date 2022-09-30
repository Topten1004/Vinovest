import React from "react";
import { useTranslation } from "react-i18next";
import { IconCheck } from "@vinovest/components/icons";
import styled from "styled-components";
import { currencySymbol } from "#utils/constants";
import { numberWithCommas } from "#utils/shared";

export const GridMobilePlan = ({ item, idx, plan }) => {
    const { t } = useTranslation("pricing");

    return (
        <div className={`${"plan-mobile accent" + `${idx}`}`}>
            <PlanDetails>
                <div className="column">
                    <div className={`${plan === item.id ? "active-border border" : "border"}`}>
                        <div className="image-wrapper background">
                            <img src={item.img} className="img" alt="item" height="240" width="305" />
                        </div>
                    </div>
                </div>
                <div className="column">
                    <h3>{t(item.title)}</h3>
                    <div className="amount">
                        {currencySymbol}
                        {numberWithCommas(item.amount)}
                    </div>
                    <div className="label">{t("label_balance")} </div>
                </div>
                <div className="column">
                    <div className="amount fee">{t(item.annual)}</div>
                    <div className="label">{t("label_annual")} </div>
                </div>
            </PlanDetails>
            <PlanCompareGrid>
                <RightBar color={item.colors[1]} />
                <div>
                    <FeatureLabel>{t(item.featureBasicLabel)}</FeatureLabel>
                </div>
                <div />
                {item &&
                    item.featuresBasic.map((feature) => (
                        <React.Fragment key={feature.text}>
                            <div>
                                <FeatureItem>{t(feature.text)}</FeatureItem>
                            </div>
                            <div>
                                {feature.active ? (
                                    <Populated>
                                        <IconCheck fill="#448B47" height="11px" width="18px" />
                                    </Populated> 
                                ) : (
                                    <Empty>
                                        <span className="icon-empty" />
                                    </Empty>
                                )}
                            </div>
                        </React.Fragment>
                    ))}
                <div>
                    <FeatureLabel>{t(item.featureProductLabel)}</FeatureLabel>
                </div>
                <div />
                {item &&
                    item.featuresProduct.map((feature) => (
                        <React.Fragment key={feature.text}>
                            <div>
                                <FeatureItem>{t(feature.text)}</FeatureItem>
                            </div>
                            <div>
                                {feature.active ? (
                                    <Populated>
                                        <IconCheck fill="#448B47" height="11px" width="18px" />
                                    </Populated>
                                ) : (
                                    <Empty>
                                        <span className="icon-empty" />
                                    </Empty>
                                )}
                            </div>
                        </React.Fragment>
                    ))}
                <div>
                    <FeatureLabel>{t(item.featureExclusiveLabel)}</FeatureLabel>
                </div>
                <div />
                {item &&
                    item.featuresExclusive.map((feature) => (
                        <React.Fragment key={feature.text}>
                            <div>
                                <FeatureItem>{t(feature.text)}</FeatureItem>
                            </div>
                            <div>
                                {feature.active ? (
                                    <Populated>
                                        <IconCheck fill="#448B47" height="11px" width="18px" />
                                    </Populated>
                                ) : (
                                    <Empty>
                                        <span className="icon-empty" />
                                    </Empty>
                                )}
                            </div>
                        </React.Fragment>
                    ))}
            </PlanCompareGrid>
        </div>
    );
};

const RightBar = styled.div`
    position: absolute;
    border-radius: 6px;
    width: 50px;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: ${(props) => props.color};
    z-index: 0;
`;
const FeatureItem = styled.p`
    color: #242e35;
    font-size: 14px;
    list-style-type: none;
    margin-bottom: 1.5rem;
    margin-top: 0;
    padding: 0;
`;
const FeatureLabel = styled.p`
    color: #767a7f;
    font-size: 12px;
    font-family: VinovestMono;
    text-transform: uppercase;
`;
const PlanCompareGrid = styled.div`
    margin-top: 20px;
    display: grid;
    grid-template-columns: 1fr 50px;
    gap: 0px 18px;
    position: relative;
`;

const PlanDetails = styled.div`
    align-items: flex-end;
    display: flex;
    margin: 0 -1rem;

    .column {
        padding: 0 1rem;

        h3 {
            font-family: RoslindaleDisplayCondensed;
            font-size: 20px;
        }
    }

    img {
        height: auto;
        padding: 10px;
        width: 55px;
    }

    .image-wrapper {
        border-radius: 100%;
    }

    .amount {
        color: #242e35;
        font-size: 16px;
    }

    .label {
        color: #767a7f;
        font-size: 12px;
        margin-top: 0.5rem;
    }

    .fee {
        margin-top: 1.5rem;
    }

    .border {
        display: inline-block;
    }
`;

const Populated = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
`;

const Empty = styled.div`
    position: relative;
    align-items: center;
    display: flex;
    height: 18px;
    justify-content: center;
    margin-bottom: 1.5rem;

    .icon-empty {
        background: #767a7f;
        display: block;
        height: 1px;
        width: 6px;
    }
`;
