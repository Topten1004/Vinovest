import React from "react";
import { observer } from "mobx-react-lite";
import styled from "styled-components";
import { useRootStore } from "#shared/hooks";
import { useTranslation } from "react-i18next";

export const RedemptionDisplay = observer(() => {
    const { t } = useTranslation("invite");

    const store = useRootStore();
    return (
        <DisplayContainer>
            <DisplayRow>
                <DisplayLabel>{t("monthsManagedFree")}</DisplayLabel>
                <DisplayValue>{store.referral.monthsManagedFreeCount}</DisplayValue>
            </DisplayRow>
            <DisplayRow>
                <DisplayLabel>{t("successfulInvites")}</DisplayLabel>
                <DisplayValue>{store.referral.successfulReferralCount}</DisplayValue>
            </DisplayRow>
        </DisplayContainer>
    );
});

const DisplayContainer = styled.div`
    border: 1px solid ${({ theme }) => theme.colors.borderGray};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 240px;

    width: 100%;
    padding: 30px 25px;
    margin-top: 20px;
    ${({ theme }) => theme.media.greaterThan("1024px")`
    width: 340px;
    height: 300px;
    margin-top: initial;
  `}
`;

const DisplayRow = styled.div``;

const DisplayLabel = styled.div`
    font-family: VinovestMono;
    margin: 10px 0;

    font-size: 14px;
    ${({ theme }) => theme.media.greaterThan("1024px")`
    font-size: 16px;
  `}
`;

const DisplayValue = styled.div`
    font-family: RoslindaleDisplayCondensed;

    font-size: 32px;
    ${({ theme }) => theme.media.greaterThan("1024px")`
    font-size: 42px;
  `}
`;
