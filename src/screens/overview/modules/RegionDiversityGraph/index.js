import React from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import { I18nLink } from "#localization/localizedRouter";
import { useRootStore } from "#shared/hooks";
import { BaseModuleContainer } from "../styles";
import DiversificationBarComponent from "./DiversificationBarComponent";

export const RegionDiversityGraph = observer(() => {
    const { t } = useTranslation(["overview"]);
    const s = useRootStore();

    return (
        <CustomModuleContainer isRow>
            <span className="title-text_small">{t("diversification.title")}</span>

            <DiversificationBarComponent data={s.cellar.regionDiversityBreakdown} />

            <AddFundsSubtext>
                {t("diversification.addFunds")}{" "}
                <I18nLink hard to="/deposit">
                    {t("diversification.add-funds-link")}
                </I18nLink>{" "}
                {t("diversification.add-funds-2")}
            </AddFundsSubtext>
        </CustomModuleContainer>
    );
});

const CustomModuleContainer = styled(BaseModuleContainer)`
    display: flex;
    flex-direction: column;
    height: fit-content !important;
    padding: 26px 22px 34px;

    span {
        font-weight: 500;
        ${(p) => p.theme.media.greaterThan("768px")`
            margin-top: 5px;
        `};
    }
`;

const AddFundsSubtext = styled.div`
    font-size: 14px;

    a {
        text-decoration: none;
        color: ${(p) => p.theme.colors.burntOrange};
    }

    ${(p) => p.theme.media.greaterThan("768px")`
        margin-bottom: 17px;
    `};

    ${(p) => p.theme.media.greaterThan("1441px")`
        font-size: 20px;
        line-height: 36px
    `};
`;
