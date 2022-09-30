/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback, useEffect } from "react";
import _ from "lodash";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import posthog from "posthog-js";
import { InputSelectionBase } from "#shared/components/InputSelectionBase";
import { MainButtonWithLoader } from "#shared/components/MainButtonWithLoader";
import { useRootStore, useCreateRoutingCallback } from "#shared/hooks";
import expandArrow from "#shared/ui/Dropdown/assets/check.svg";
import { Fade } from "#shared/ui";
import { numberWithCommas } from "#utils/shared";
import { DEPOSIT_TYPE, currencySymbol } from "#utils/constants";
import { BankSource } from "#models/BankSource";
import { CreditCardSource } from "#models/CreditCardSource";
import { DepositPageFrameContainer } from "./styles";
import DepositCalculator from "#utils/depositCalculator";
import { DepositEvent } from "#screens/deposit/RootDepositPage";

interface AddFundsProps {
    userCurrency: string;
}

export const AddFunds = observer(({ userCurrency }: AddFundsProps) => {
    const { t } = useTranslation(["deposit", "common"]);
    const { deposit: depositStore, portfolio: portfolioStore, tracking: trackingStore } = useRootStore();
    const defaultDepositAmount = DepositCalculator.getDefaultDepositAmount(userCurrency);

    const { recurringMinDepositAmount, oneTimeMinDepositAmount } = depositStore;
    const [minDepositAmount, setMinDepositAmount] = useState(0);
    const [errorMsg, setErrorMsg] = useState("");
    const [isDepositInputFocused, setDepositInputFocused] = useState(false);
    const [depositAmt, setDepositAmt] = useState(defaultDepositAmount);
    const [selectedSourceIdx, selectSourceIdx] = useState(0);

    const routeTo = useCreateRoutingCallback();
    const accountCash = portfolioStore?.totals?.cash?.amount;
    const positionTotal = portfolioStore?.totals?.positionTotal?.amount;

    useEffect(() => {
        accountCash + positionTotal > 0 && depositStore.isSubscription
            ? setMinDepositAmount(recurringMinDepositAmount(userCurrency))
            : setMinDepositAmount(oneTimeMinDepositAmount(userCurrency));
    }, [userCurrency, depositStore.isSubscription]);

    const onChangeDepositInputField = useCallback((e) => {
        setErrorMsg("");

        if (e.target.value.length >= 10) {
            return;
        }
        /* Regardless of the input value, the event value type will be a string */
        const inputStringWithoutCommas = e.target.value.replace(/,/g, "");
        const convertedInputAsNumber = +inputStringWithoutCommas;

        /* Convert to 0 if a NaN is created, i.e. from passing a letter */
        setDepositAmt(!_.isNaN(convertedInputAsNumber) ? convertedInputAsNumber : 0);
    }, []);

    useEffect(() => {
        if (!depositStore.userSelectedFrequency) {
            depositStore.setDepositFrequencyKey("");
        }
    }, []);

    const onAddFundsCompletion = useCallback(() => {
        setErrorMsg("");
        const selectedSource = depositStore.normalizedSavedPaymentMethods[selectedSourceIdx];
        const numericalDepositAmt = depositAmt;

        /** Amount validation */
        if (numericalDepositAmt < minDepositAmount) {
            const msg = t("amountvalidation", {
                minValue: numberWithCommas(minDepositAmount),
                currency: currencySymbol,
            });
            setErrorMsg(msg);
            return;
        }

        /** Save Deposit amount in store */
        depositStore.setDepositAmt(numericalDepositAmt);
        posthog.capture(DepositEvent.DepositAmountAdded, { value: numericalDepositAmt });

        /** Defaults to "one time" if left unselected */
        if (!depositStore.selectedFrequencyKey) {
            depositStore.setDepositFrequencyKey("once");
        }

        /** Bypass payment source selection if default exists */
        if (selectedSource) {
            if (selectedSource.type === DEPOSIT_TYPE.BankTransfer) {
                depositStore.setPaymentSource(BankSource.build(selectedSource));
            }
            if (selectedSource.type === DEPOSIT_TYPE.CreditCard) {
                depositStore.setPaymentSource(CreditCardSource.build(selectedSource));
            }
            posthog.capture(DepositEvent.ClickExistingPayment, { value: selectedSource.type });
            trackingStore.gtm.trackSelectFundSource();
            routeTo("/deposit/review-transfer");
            return;
        }

        routeTo("/deposit/select-source");
        posthog.capture(DepositEvent.ClickNewPayment);
        trackingStore.gtm.trackSelectFundSource();
    }, [depositAmt, depositStore, routeTo, selectedSourceIdx, minDepositAmount]);

    const onInputFieldKeyDown = useCallback(
        (e) => {
            if (e.keyCode === 13) {
                onAddFundsCompletion();
            }
        },
        [onAddFundsCompletion],
    );

    return (
        <Fade in>
            <DepositPageFrameContainer>
                <OptionContainer>
                    <OptionLabel>{t("source")}</OptionLabel>
                    <SelectionDropdown>
                        <select
                            value={selectedSourceIdx}
                            onChange={(e) => selectSourceIdx(parseInt(e.target.value, 10))}
                        >
                            {_.map(
                                depositStore.normalizedSavedPaymentMethods,
                                (method: { id: number; name: string; lastFour: number }, idx: number) => (
                                    <option value={idx} key={method.id}>{`${method.name} ****${method.lastFour}`}</option>
                                ),
                            )}
                            <option value={99}>{t("new_payment_source")}</option>
                        </select>
                        <img src={expandArrow} alt="expand-icon" className="expand-dropdown-arrow" />
                    </SelectionDropdown>
                </OptionContainer>

                <OptionContainer>
                    <OptionLabel>{t("frequency")}</OptionLabel>
                    <AutoInvestFeeBanner>{t("feebanner", { amount: 5 })}</AutoInvestFeeBanner>
                    <SelectionDropdown>
                        <select
                            value={depositStore.selectedFrequencyKey}
                            onChange={(e) => {
                                depositStore.setDepositFrequencyKey(e.target.value);
                                depositStore.setUserSelectedFrequency();
                                posthog.capture(DepositEvent.SelectFrequency, { value: e.target.value });
                            }}
                        >
                            <option value="" disabled>
                                {t("option")}
                            </option>
                            {_.map(depositStore.depositFrequencyOptions, (key: string, value: string) => (
                                <option value={value} key={key}>
                                    {key}
                                </option>
                            ))}
                        </select>
                        <img src={expandArrow} alt="expand-icon" className="expand-dropdown-arrow" />
                    </SelectionDropdown>
                </OptionContainer>

                <OptionContainer>
                    <OptionLabel>{t("amount")}</OptionLabel>
                    <InputFloatContainer isFocused={isDepositInputFocused} hasInput={!!depositAmt}>
                        {!!depositAmt && <span id="currency-symbol">{currencySymbol}</span>}

                        <input
                            id="deposit-input-field"
                            type="text"
                            onKeyDown={onInputFieldKeyDown}
                            onFocus={() => {
                                setDepositInputFocused(true);
                            }}
                            onBlur={() => {
                                setDepositInputFocused(false);
                            }}
                            onChange={onChangeDepositInputField}
                            value={numberWithCommas(depositAmt) || ""}
                            placeholder={t("placeholder")}
                        />
                        {errorMsg && (
                            <Fade in timeout={200}>
                                <span id="add-funds-error">{errorMsg}</span>
                            </Fade>
                        )}
                    </InputFloatContainer>
                </OptionContainer>

                <MainButtonWithLoader
                    CTA={
                        depositAmt
                            ? t("continue", {
                                  currency_symbol: currencySymbol,
                                  amount: numberWithCommas(+depositAmt),
                              })
                            : t("continue")
                    }
                    onClick={onAddFundsCompletion}
                    isLoading={depositStore.savedPaymentMethodsFetch.status.isFetching()}
                />
            </DepositPageFrameContainer>
        </Fade>
    );
});

const OptionContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 26px 0;
    width: 100%;
`;
const OptionLabel = styled.label`
    font-family: ${(p) => p.theme.fonts.label};
    text-transform: uppercase;
    margin-bottom: 10px;

    font-size: 14px;
    ${(p) => p.theme.media.greaterThan("768px")`
        font-size: 16px;
  `}
`;

const AutoInvestFeeBanner = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-family: ${(p) => p.theme.fonts.label};
    text-transform: uppercase;
    background: #4f81b0;
    color: white;
    text-align: center;
    font-size: 12px;
    height: 48px;

    ${(p) => p.theme.media.greaterThan("768px")`
        font-size: 14px;
    `};
`;

const NewBadge = styled.div`
    font-family: ${(p) => p.theme.fonts.label};
    text-transform: uppercase;
    background: #4f81b0;
    color: white;
    padding: 7px 13px;
    border-radius: 4px;
    position: absolute;

    left: 55%;
    font-size: 14px;
    ${(p) => p.theme.media.greaterThan("768px")`
    font-size: 16px;
    left: 45%;
  `}
`;

const SelectionDropdown = styled(InputSelectionBase)`
    select {
        cursor: pointer;
        height: 100%;
        width: 100%;
        outline: 0;
        appearance: none;
        position: absolute;
        background: none;
        border: 0;
        left: 0;
        top: 0;
        z-index: 1;

        option {
            font-family: Verdana;
        }
        padding: 0 34px 0 20px;
        ${(p) => p.theme.media.greaterThan("768px")`
            padding: 0 34px 0 28px;
        `}
    }

    .expand-dropdown-arrow {
        position: absolute;
        right: 35px;
        height: 13px;
    }
`;

const InputFloatContainer = styled(InputSelectionBase)`
    padding: 0 34px 0 ${(p) => (p.hasInput ? "28px" : "10px")};
    #deposit-input-field {
        width: 100%;
        height: 100%;
        border: none;
        outline: none;
        padding: 0 15px;
        appearance: none;
    }
    #currency-symbol {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    #add-funds-error {
        position: absolute;
        font-family: ${(p) => p.theme.fonts.label};
        color: ${(p) => p.theme.colors.red};
        text-transform: uppercase;
        top: 70px;
        left: 0;

        font-size: 12px;
        ${(p) => p.theme.media.greaterThan("768px")`
            font-size: 14px;
        `}
    }
`;
