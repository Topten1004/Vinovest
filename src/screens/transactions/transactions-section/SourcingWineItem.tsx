import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { DepositElemMobile, DepositElemDesktop } from "./DepositElements";
import { TransactionsContext } from "../transactionsContext";
import { GridWrapper } from "./styled";
import { useMobile } from "#shared/hooks";

interface SourcingWineItemProps {
    itemsSourcing: number;
    id: number;
}

export const SourcingWineItem = ({ itemsSourcing, id }: SourcingWineItemProps) => {
    const { setDetailsId, detailsId } = useContext(TransactionsContext);
    const isMobile = useMobile(767);
    const { t } = useTranslation(["transactions"]);
    const clickHandler = () => setDetailsId((data: number) => (data === id ? null : id));

    const description = `${t("wine-details.sourcing")} ${itemsSourcing} ${
        itemsSourcing > 1 ? `${t("wine-details.more_cases")}` : `${t("wine-details.more_case")}`
    }`;
    return (
        <React.Fragment key={id}>
            <GridWrapper onClick={clickHandler} className={detailsId === id ? "selectedGridWrapper" : ""}>
                {isMobile ? (
                    <DepositElemMobile
                        type="sourcing_wine"
                        typeLabel={t("items.sourcing")}
                        description={description}
                        amount={t("messages.pending")}
                        date={<span className="underText">{t("messages.pending")}</span>}

                    />
                ) : (
                    <DepositElemDesktop
                        detailsId={detailsId}
                        type="sourcing_wine"
                        description={description}
                        amount={t("messages.pending")}
                        date={t("messages.pending")}
                        
                    />
                )}
            </GridWrapper>
        </React.Fragment>
    );
};
