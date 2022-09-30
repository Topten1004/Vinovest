import React, { useState, useMemo, useCallback } from "react";
import styled from "styled-components";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { StripeCardElementOptions } from "@stripe/stripe-js";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import posthog from "posthog-js";
import { useHistory } from "#shared/hooks/useHistory";
import { CreditCardSource } from "#models/CreditCardSource";
import { MainButtonWithLoader } from "#shared/components/MainButtonWithLoader";
import { useRootStore, useCreateRoutingCallback } from "#shared/hooks";
import { normalizePaymentMethod } from "#stores/deposit";
import { BackButton, Fade } from "#shared/ui";
import { DepositPageFrameContainer, AlertMessage } from "./styles";
import { DepositEvent } from "./RootDepositPage";
/**
 * supported style options:
 * - https://stripe.com/docs/js/appendix/style
 *
 * Example JSX
 * - https://github.com/stripe/react-stripe-js/blob/90b7992c5232de7312d0fcc226541b62db95017b/examples/hooks/1-Card-Detailed.js
 *
 * Example styling
 * - https://github.com/stripe/react-stripe-js/blob/e13fae556b1a667a5dfa1130c00d5ec4c2bc154e/examples/styles/2-Card-Detailed.css
 *
 * Final Customization Example:
 * - https://stripe.com/docs/stripe-js/react#customization-and-styling
 */
const CARD_ELEMENT_OPTIONS: StripeCardElementOptions = {
    iconStyle: "solid",
    style: {
        base: {
            iconColor: "#A86D37",
            color: "#242E35",
            fontWeight: "500",
            fontFamily: "VinovestMono, Roboto, Open Sans, Segoe UI, sans-serif",
            fontSize: "16px",
            textTransform: "uppercase",
            fontSmoothing: "antialiased",
            ":-webkit-autofill": {
                color: "#767A7F",
            },
            "::placeholder": {
                color: "#767A7F",
            },
        },
        complete: {
            iconColor: "#27AE60",
            color: "#27AE60",
        },
        invalid: {
            iconColor: "#FF4D00",
            color: "#FF4D00",
        },
    },
};

interface EnterCreditCardProps {
    userRegion: string;
}

export const EnterCreditCard = observer(({ userRegion }: EnterCreditCardProps) => {
    const { t } = useTranslation("deposit");
    const history = useHistory();
    const stripe = useStripe();
    const elements = useElements();
    const routeTo = useCreateRoutingCallback();
    const { deposit: depositStore } = useRootStore();

    const [isLoading, setLoading] = useState(false);

    const [name, setName] = useState("");

    const [cardError, setCardError] = useState(null);
    const [isCardComplete, setCardComplete] = useState(false);
    const [isNameComplete, setNameComplete] = useState(false);
    const [nameError, setNameError] = useState(null);

    const onNameFieldChange = useCallback(
        (e) => {
            const min = 2;
            const max = 26;
            const regex = /[^a-z ]/gi;
            const val = e.target.value.replace(regex, "");
            const insideBounds = val.length >= min && val.length <= 26;
            const aboveMax = val.length > 26;
            setName(val);
            aboveMax && setNameError(t("cc_name_length"));
            insideBounds && setNameComplete(true);
            insideBounds && setNameError(null);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
    );

    const getCountryMetadata = (country: string) => (country === "US" ? "domestic" : "international");

    const onFormCompletion = useCallback(async () => {
        setLoading(true);
        const card = elements.getElement(CardElement);

        let err;
        const { paymentMethod, error } = await stripe.createPaymentMethod({
            card,
            billing_details: { name },
            type: "card",
        });
        err = error;

        if (!err && depositStore.isSubscription) {
            const result = await depositStore.requestAndConfirmStripeSetupIntent(stripe, paymentMethod, userRegion);
            err = result.error;
        }

        setLoading(false);
        if (err) {
            setCardError(err);
            return;
        }

        const source = CreditCardSource.build(normalizePaymentMethod(paymentMethod));
        depositStore.setPaymentSource(source);
        const countryMetaData = getCountryMetadata(paymentMethod.card.country);
        routeTo("/deposit/review-transfer");
        posthog.capture(DepositEvent.CreditCardLinked, { country: countryMetaData });
    }, [elements, stripe, name, depositStore, routeTo, userRegion]);

    const isFormComplete = useMemo(() => isCardComplete && isNameComplete, [isCardComplete, isNameComplete]);

    const onNameFieldKeydown = useCallback(
        (e) => {
            if (e.keyCode === 13 && isFormComplete) {
                onFormCompletion();
            }
        },
        [isFormComplete, onFormCompletion],
    );

    const onBlurCreditCardName = (e) => {
        const { value } = e.target;
        value.length < 2 && setNameError(t("cc_name_length_min"));
        name.length === 26 && nameError && setNameError(null);
    };

    return (
        <Fade in>
            <DepositPageFrameContainer>
                <FormWrapper>
                    <CardFormField className="sb-block" isComplete={isCardComplete}>
                        <CardElement
                            options={CARD_ELEMENT_OPTIONS}
                            onChange={(e) => {
                                setCardError(e.error);
                                setCardComplete(e.complete);
                            }}
                        />
                    </CardFormField>
                    {cardError && (
                        <AlertMessage position="unset" paddingBottom="15px" role="alert" level="error">
                            {cardError.message}
                        </AlertMessage>
                    )}
                    <CardFormField isComplete={isNameComplete} nameError={nameError}>
                        <input
                            id="cc-name-row"
                            autoComplete="name"
                            value={name}
                            onKeyDown={onNameFieldKeydown}
                            onChange={onNameFieldChange}
                            placeholder={t("cc_name_placeholder")}
                            minLength={2}
                            maxLength={27}
                            onBlur={(e) => onBlurCreditCardName(e)}
                        />
                    </CardFormField>
                    {nameError && (
                        <AlertMessage role="alert" level="error">
                            {nameError}
                        </AlertMessage>
                    )}
                </FormWrapper>
                <MainButtonWithLoader
                    CTA={t("next")}
                    isLoading={isLoading}
                    disabled={!isFormComplete}
                    onClick={onFormCompletion}
                />
                <BackButton goBack={history.goBack} />
            </DepositPageFrameContainer>
        </Fade>
    );
});

const FormWrapper = styled.div`
    width: 100%;
    position: relative;
    margin-top: 32px;
    display: "flex";
    flex-direction: "column";
`;

const CardFormField = styled.div`
    margin: 0 0 20px;
    padding: 0;
    border: 1px solid
        ${(p) => (p.nameError ? p.theme.colors.red : p.isComplete ? p.theme.colors.green : p.theme.colors.borderGray)};

    will-change: opacity, transform;
    box-shadow: ${(p) => p.theme.shadow.v2};
    height: 80px;
    display: flex;
    align-items: center;
    padding: 0 15px;

    .StripeElement,
    #cc-name-row {
        width: 100%;
    }

    #cc-name-error {
        position: absolute;
        font-family: ${(p) => p.theme.fonts.label};
        color: ${(p) => p.theme.colors.red};
        text-transform: uppercase;
        top: 90px;
        left: 0;

        font-size: 12px;
        ${(p) => p.theme.media.greaterThan("768px")`
            font-size: 14px;
        `}
    }

    #cc-name-row,
    .InputElement {
        font-family: Roboto, Open Sans, Segoe UI, sans-serif;
        text-transform: uppercase;
        color: ${(p) =>
            p.nameError ? p.theme.colors.red : p.isComplete ? p.theme.colors.green : p.theme.colors.mainAccentBlue};
        font-size: 16px;
        outline: none;
        ::placeholder {
            font-family: Roboto, Open Sans, Segoe UI, sans-serif;
            color: ${(p) => p.theme.colors.labelGray};
            font-size: 16px;
            font-weight: 500;
        }
        background: none;
        border: 0;
    }
`;
