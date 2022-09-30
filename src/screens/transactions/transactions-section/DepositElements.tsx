import React from "react";
import { GridDesktop, GridMobile, TransactionTypeWrapper } from "./styled";
import TransactionType from "#shared/ui/TransactionType";

interface DepositElementProps {
    type: string;
    description: JSX.Element | string;
    amount: JSX.Element | string;
    date: JSX.Element;
    failed?: boolean;
}

interface DesktopDepositElementProps extends DepositElementProps {
    detailsId?: number;
}

interface MobileDepositElementProps extends DepositElementProps {
    typeLabel: JSX.Element;
}

export const DepositElemMobile = ({
    type,
    typeLabel,
    description,
    amount,
    date,
    failed,
}: MobileDepositElementProps) => (
    <GridMobile>
        <TransactionTypeWrapper>
            <TransactionType.TransactionTypeIcon type={type} />
            <div style={{ overflow: "hidden", width: "100%" }}>
                <div className="textEllipsis">{typeLabel}</div>
                <span className={`underText textEllipsis ${failed ? "failedTransaction" : ""}`}>{description}</span>
            </div>
        </TransactionTypeWrapper>
        <div className="gridCell lastGridCell">
            {amount}
            <span className="underText"> {date} </span>
        </div>
    </GridMobile>
);

export const DepositElemDesktop = ({
    type,
    description,
    amount,
    date,
    detailsId,
    failed,
}: DesktopDepositElementProps) => (
    <GridDesktop className={detailsId ? "shrinkGridDesktop" : ""}>
        <div className="gridCell">{date}</div>
        <div className="gridCell">
            <TransactionType type={type} skeleton={type === "show-skeleton"} index={detailsId} />
        </div>
        <div className="gridCell gridCellOverflow">
            <span className={`ellipsis  ${failed ? "failedTransaction" : ""}`}>{description} </span>
        </div>
        <div className="gridCell lastGridCell">{amount}</div>
    </GridDesktop>
);
