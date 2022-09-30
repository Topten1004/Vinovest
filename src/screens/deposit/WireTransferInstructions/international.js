const international = (t) => [
    { title: t("bank.international.bank_name"), value: [t("bank.international.bank_name_value")] },
    { title: t("bank.bank_address"), value: [t("bank.international.bank_address_value")] },
    { title: t("bank.international.swift_code"), value: [t("bank.international.swift_code_value")] },
    { title: t("bank.acct_number"), value: [t("bank.international.account_number_value")] },
    { title: t("bank.international.beneficiary"), value: [t("bank.beneficiary_name_value")] },

    { title: t("bank.international.beneficiary_addr"), value: [t("bank.domestic.beneficiary_addr_value")] },
];

export default international;
