import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { I18nLink } from "#localization/localizedRouter";

export const PlanButtons = ({ plan, item, idx, planLevelNumber }) => {
    const { t } = useTranslation("pricing");
    return (
        <PlanButton className={`${"accent" + `${idx}`}`}>
            <div className="name">
                <div className={`${plan === item.id ? "active-border border" : "border"}`}>
                    <div className="image-wrapper background">
                        <img src={item.img} className="img" alt="item" height="240" width="305" />
                    </div>
                </div>
                <h3>{t(item.title)}</h3>
            </div>

            {idx >= planLevelNumber && (
                <I18nLink hard className={`${plan === item.id && "current"}`} to="/deposit">
                    {plan === item.id ? t("features.button_current") : t("features.button_upgrade")}
                </I18nLink>
            )}
        </PlanButton>
    );
};

const PlanButton = styled.div`
    align-items: center;
    border-top: 1px solid #eeeeee;
    display: flex;
    justify-content: space-between;
    padding: 1rem 0;
    width: 100%;

    img {
        height: auto;
        padding: 10px;
        width: 55px;
    }

    a {
        font-family: VinovestMono;
        font-style: normal;
        font-weight: 500;
        line-height: 18px;
        letter-spacing: 0.025em;
        background: #a86d37;
        border: 1px solid #a86d37;
        border-radius: 3px;
        color: #fff;
        display: block;
        font-size: 12px;
        text-decoration: none;
        text-transform: uppercase;
        padding: 0.7rem 1.8rem;
        transition: 0.3s;

        &:hover {
            cursor: pointer;
            opacity: 0.5;
        }

        &:disabled {
            pointer-events: none;
        }

        &.current {
            background: transparent;
            border: 1px solid #caccce;
            color: #242e35;
            pointer-events: none;
        }
    }

    h3 {
        font-family: RoslindaleDisplayCondensed;
        font-size: 20px;
        margin-left: 1rem;
    }

    .border {
        align-items: center;
        display: flex;
    }

    .image-wrapper {
        border-radius: 100%;
    }

    .name {
        display: flex;
    }
`;
