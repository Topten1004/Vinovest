import React from "react";
import { Tabs, Tab } from "@vinovest/components/tabs";
import { useTranslation } from "react-i18next";
import { itemsToRender } from "../../../pricing/images/items";
import { GridMobilePlan } from './GridMobilePlan';

export const PlanTabs = ({ plan }) => {
    const { t } = useTranslation("pricing");

    return (
        <div className="mobile-tabs">
            <h2>{t("title_portfolio")}</h2>
            <Tabs>
                {itemsToRender.map((item, idx) => (
                    <Tab title={t(item.title)} key={item.id}>
                        <div className="plan-colors content-wrapper">
                            <GridMobilePlan item={item} idx={idx} plan={plan} /> 
                        </div>
                    </Tab>
                ))}
            </Tabs>
        </div>
    );
};
