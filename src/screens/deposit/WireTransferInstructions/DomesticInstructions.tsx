import React from "react";
import { TFunction } from "react-i18next";

export const DomesticInstructions = (
    t: TFunction<string[]>,
    query: { bankName: string; routingNumber: string; bankAddress: string; beneficiary: string; accountNumber: string },
) => {
    const list = [
        { title: t("bank.domestic.bank_name"), value: [query?.bankName] },
        { title: t("bank.aba_number"), value: [query?.routingNumber] },
        { title: t("bank.bank_address"), value: [query?.bankAddress] },
        { title: t("bank.domestic.beneficiary_name"), value: [query?.beneficiary] },
        { title: t("bank.acct_number"), value: [query?.accountNumber] },
    ];
    return list;
};
