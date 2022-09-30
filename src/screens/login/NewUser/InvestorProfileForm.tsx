import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import styled from "styled-components";
import "react-phone-number-input/style.css";
import * as Yup from "yup";
import _ from "lodash";
import { useTranslation } from "react-i18next";
import { useRootStore, useCreateRoutingCallback } from "#shared/hooks";
import AccountService from "#services/UserService";
import { languageCodeChina, currencySymbol } from "#utils/constants";
import AlertMessage from "#shared/ui/Alert/AlertMessage";
import ErrorIcon from "#assets/shared/ErrorIcon";
import { MainButtonWithLoader } from "#shared/components/MainButtonWithLoader";
import { depositTiers, chDepositTiers } from "#localization/constants";
import { numberWithCommas } from "#utils/shared";

interface FormValues {
    consideredStartingInvestment: number | string;
    anticipatedCashAccess: string;
}

interface InvestorProfileFormProps {
    setTargetEstimate: any;
    plan: string;
}

const InvestorProfileForm = ({ setTargetEstimate, plan }: InvestorProfileFormProps) => {
    const store = useRootStore();
    const { t } = useTranslation(["account"]);
    const routeToProfileOverview = useCreateRoutingCallback('/portfolio/managed', {posthogId: ['signup_investment_q','quiz_completed']});
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const consideredStartingInvestmentMinimum = languageCodeChina ? chDepositTiers.minimum : depositTiers.minimum;
    const FormSchema = Yup.object().shape({
        consideredStartingInvestment: Yup.number()
            .moreThan(
                consideredStartingInvestmentMinimum,
                `${currencySymbol}${consideredStartingInvestmentMinimum} minimum deposit`,
            )
            .integer(t("deposit:amount_whole_number"))
            .min(
                consideredStartingInvestmentMinimum,
                t("deposit:amountvalidation", {
                    minValue: numberWithCommas(consideredStartingInvestmentMinimum),
                    currency: currencySymbol,
                }),
            )
            .required(t("onboard.error_starting_investment")),
        anticipatedCashAccess: Yup.string().required(t("onboard.error_timeframe")),
    });
    const { values, errors, touched, handleSubmit, handleBlur, handleChange, isValid, dirty } = useFormik<FormValues>({
        initialValues: {
            consideredStartingInvestment: "",
            anticipatedCashAccess: "immediately",
        },
        validationSchema: FormSchema,
        onSubmit: async (_) => {
            setIsLoading(true);
            await store.tracking.gtm.trackNewUserInvestingProfile(store, values, plan);
            await AccountService.createUserProfile(store.user.oktaUserEntity.data.sub, store.auth.accessToken, {
                investmentProfile: {
                    investingStyle: plan,
                    anticipatedCashAccess: values.anticipatedCashAccess,
                    consideredStartingInvestment: values.consideredStartingInvestment,
                },
            })
                .then(() => {
                    // Remove this after exchange launch
                    store.user.fetchProfile();
                    store.user.fetchUserInformation();
                    setIsLoading(false);
                    routeToProfileOverview(); 
                })
                .catch(() => {
                    setIsLoading(false);
                    setErrorMessage(t("error_post"));
                });
        },
    });

    const onKeyPress = (event) => {
        if (event.target.value.length > 6) {
            event.preventDefault();
        }
    };

    useEffect(() => {
        setTargetEstimate(values.consideredStartingInvestment);
    }, [setTargetEstimate, values.consideredStartingInvestment]);

    return (
        <Form onSubmit={handleSubmit}>
            <FormItem className="full spacing-bottom">
                <label htmlFor="consideredStartingInvestment">{t("profile.label_starting_investment")}</label>
                <InputWrapper>
                    <span className="currency-symbol">{currencySymbol}</span>
                    <input
                        aria-label="Investment Amount"
                        type="number"
                        name="consideredStartingInvestment"
                        value={values.consideredStartingInvestment}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        id="consideredStartingInvestment"
                        placeholder="0"
                        required
                        maxLength={6}
                        onKeyPress={onKeyPress}
                    />
                </InputWrapper>

                {touched.consideredStartingInvestment && errors.consideredStartingInvestment && (
                    <ErrorMessage>{errors.consideredStartingInvestment}</ErrorMessage>
                )}
            </FormItem>
            <FormItem className="full">
                <label htmlFor="anticipatedCashAccess">{t("profile.label_cash_access")}</label>
                <RadioGroup>
                    <label htmlFor="immediately" className="container">
                        <input
                            aria-label="immediately"
                            type="radio"
                            id="immediately"
                            value="immediately"
                            name="anticipatedCashAccess"
                            onChange={handleChange}
                            checked={values.anticipatedCashAccess === "immediately"}
                        />
                        {t("profile.option_1")}
                        <span className="checkmark" />
                    </label>
                </RadioGroup>
                <RadioGroup>
                    <label htmlFor="month" className="container">
                        <input
                            aria-label="month"
                            type="radio"
                            id="month"
                            value="month"
                            name="anticipatedCashAccess"
                            onChange={handleChange}
                        />
                        {t("profile.option_2")}
                        <span className="checkmark" />
                    </label>
                </RadioGroup>
                <RadioGroup>
                    <label htmlFor="unknown" className="container">
                        <input
                            aria-label="unknown"
                            type="radio"
                            id="unknown"
                            value="not sure"
                            name="anticipatedCashAccess"
                            onChange={handleChange}
                        />
                        {t("profile.option_3")}
                        <span className="checkmark" />
                    </label>
                </RadioGroup>
                {touched.anticipatedCashAccess && errors.anticipatedCashAccess && (
                    <ErrorMessage>{errors.anticipatedCashAccess}</ErrorMessage>
                )}
                {errorMessage && (
                    <AlertMessage type="error">
                        <ErrorIcon /> {errorMessage}
                    </AlertMessage>
                )}
            </FormItem>
            <MainButtonWithLoader
                CTA={t("profile.button_complete")}
                type="submit"
                isLoading={isLoading}
                disabled={!(isValid && dirty)}
            />
        </Form>
    );
};
const RadioGroup = styled.div`
    display: block;
    margin-bottom: 0.5rem;
    width: 100%;

    ul {
        color: #242e35;
        font-size: 0.875rem;
        list-style-type: none;
        padding-left: 2rem;
    }

    li {
        line-height: 22px;
        margin-bottom: 1rem;
        padding-left: 30px;
        position: relative;

        svg {
            left: 0;
            margin-right: 0.5rem;
            position: absolute;
            width: 30px;
        }
    }

    .container {
        display: block;
        font-size: 14px;
        position: relative;
        padding-left: 35px;
        margin-bottom: 12px;
        cursor: pointer;
        user-select: none;
        text-transform: none;
        line-height: 24px;

        input {
            position: absolute;
            opacity: 0;
            cursor: pointer;

            &:checked {
                ~ .checkmark {
                    background-color: #fff;
                    &:after {
                        display: block;
                    }
                }
            }
        }

        &:hover {
            input {
                ~ .checkmark:after {
                    top: 3px;
                    left: 3px;
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    background: #000;
                    content: "";
                    display: block;
                }
            }
        }

        .checkmark {
            &:after {
                top: 3px;
                left: 3px;
                width: 12px;
                height: 12px;
                border-radius: 50%;
                background: #000;
            }
        }
    }

    .checkmark {
        position: absolute;
        top: 2px;
        left: 0;
        height: 20px;
        width: 20px;
        background-color: #fff;
        border: 1px solid #000;
        border-radius: 50%;

        &:after {
            content: "";
            position: absolute;
            display: none;
        }
    }
`;
const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;
const FormItem = styled.div`
    color: #766a7f;
    font-size: 0.875rem;
    margin-bottom: 1.5rem;
    position: relative;
    width: 100%;

    ${(p: { theme: { media: { greaterThan: (arg0: string) => any } } }) => p.theme.media.greaterThan("768px")`
        width: 48%;
    `};

    &.full {
        width: 100%;
    }

    &.spacing-bottom {
        margin-bottom: 3.5rem;
    }

    label {
        color: #242e35;
        display: block;
        font-size: 12px;
        margin-bottom: 0.5rem;
        text-transform: uppercase;
    }

    input {
        background: #f7f7f7;
        border: 1px solid #caccce;
        border-radius: 3px;
        color: #242e35;
        font-size: 1rem;
        font-weight: 500;
        max-width: 215px;
        padding: 0.75rem 1rem;
        width: 100%;

        &::placeholder {
            color: #606060;
        }
    }
`;
const ErrorMessage = styled.div`
    color: #db4a38;
    font-size: 11px;
    margin-top: 5px;
`;

const InputWrapper = styled.div`
    align-items: center;
    display: flex;
    position: relative;

    input {
        padding-left: 1.5rem;
    }

    .currency-symbol {
        color: #242e35;
        position: absolute;
        left: 10px;
    }
`;

export default InvestorProfileForm;
