import TransactionType from "#shared/ui/TransactionType";
import { TransactionTypes } from "#utils/constants";
import { uppercaseWordsInString } from "#utils/stringUtils";

export const types = [
    TransactionTypes.trade_settlement_purchase,
    TransactionTypes.transfer_in,
    TransactionTypes.vinovest_monthly_fee_waived,
];

export const getListDescription = ({ type, name, meta, t }) => {
    let description = TransactionType.typeLabel(type, t);
    let status = "success";

    if (type === "wine_purchase" || type === "wine_sold") {
        description = meta?.name && uppercaseWordsInString(meta?.name);
    }
    if (types.includes(type) && name) {
        description = `${name.charAt(0).toUpperCase()}${name.slice(1)}`;
    }

    if (type === TransactionTypes.early_withdrawl_60_day) {
        description = t("details.early_withdrawal");
    }

    if (type === TransactionTypes.funds_failed) {
        description = t("details.failed");
        status = "failed";
    }

    return { description, status };
};
