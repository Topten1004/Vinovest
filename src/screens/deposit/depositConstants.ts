export enum DepositEvent {
    ClickExistingPayment = "click_exisiting_payment", // fires when a user selects a payment method that has already been added to their account and clicks
    ClickNewPayment = "click_new_payment",
    SelectCryptocurrency = "select_cryptocurrency",
    BeginBitpayPayment = "begin_bitpay_payment",
    CompletedBitpayPayment = "completed_bitpay_payment",
    LinkCryptoWallet = "link_crypto_wallet", // triggers when the the user links their crypto wallet in bitpay
    SelectCreditCard = "select_credit_card",
    CreditCardLinked = "credit_card_linked",
    SelectBank = "select_bank",
    BankLinked = "bank_linked",
    SelectWire = "select_wire",
    DownloadWirePdf = "download_wire_pdf",
    AddFunds = "add_funds",
    SelectFrequency = "select_frequency",
    DepositAmountAdded = "depsoit_amount_added",
    AddFundsRetry = "add_funds_retry",
}
