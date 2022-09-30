import React, { useState } from "react";
import styled from "styled-components";
import { withOktaAuth } from "@okta/okta-react";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import AccountService from "#services/UserService";
import { useRootStore } from "#shared/hooks";
import ErrorIcon from "#assets/shared/ErrorIcon";
import AlertMessage from "#shared/ui/Alert/AlertMessage";
import CheckIcon from "#assets/shared/CheckIcon";
import { planTypes as planGenerator } from "#screens/overview/modules/Plans/plans";
import { UserInformationProps } from "./UserForm";

interface UserInvestmentPlanFormProps extends UserInformationProps {
    query: {
        investmentStyle: string;
    };
}

interface FormValues {
    investmentStyle: string;
}

const UserInvestmentPlanForm = ({ query, fetchData, onClick, onSubmitComplete }: UserInvestmentPlanFormProps) => {
    const { t } = useTranslation("risk-tolerance");

    const [errorMessage, setErrorMessage] = useState("");
    const store = useRootStore();
    const planTypes = planGenerator(t);

    const { values, handleSubmit, handleChange } = useFormik<FormValues>({
        initialValues: {
            investmentStyle: query.investmentStyle,
        },
        onSubmit: (_: any, event: any) => {
            AccountService.useAccountPortfolioPut(store.user.oktaUserEntity.data.sub, store.auth.accessToken, values)
                .then(() => {
                    fetchData();
                    onClick(event);
                    onSubmitComplete(event);
                })
                .catch(() => {
                    setErrorMessage(t("error_post"));
                });
        },
    });
    const planOptions =
        Array.isArray(planTypes) &&
        planTypes.map((plan) => (
            <RadioGroup key={plan.id}>
                <label htmlFor={plan.id} className="container">
                    <input
                        aria-label={plan.id}
                        type="radio"
                        id={plan.id}
                        value={plan.id}
                        name="investmentStyle"
                        checked={values.investmentStyle === plan.id}
                        onChange={handleChange}
                    />
                    {plan.planName}
                    <span className="checkmark" />
                </label>

                <ul>
                    {plan[1].map((description: string, index: number) => (
                        <li key={index}>
                            <CheckIcon stroke="#82972D" /> {description}
                        </li>
                    ))}
                </ul>
            </RadioGroup>
        ));

    return (
        <Form onSubmit={handleSubmit}>
            <Notice>{t("form.notice")}</Notice>
            {planOptions}

            {errorMessage && (
                <AlertMessage type="error">
                    <ErrorIcon /> {errorMessage}
                </AlertMessage>
            )}
            <ButtonGroup>
                <ButtonSecondary type="button" onClick={(event: React.MouseEvent<HTMLElement>) => onClick(event)}>
                    {t("button_cancel")}
                </ButtonSecondary>
                <ButtonPrimary type="submit">{t("button_save")}</ButtonPrimary>
            </ButtonGroup>
        </Form>
    );
};
export default withOktaAuth<UserInvestmentPlanFormProps>(UserInvestmentPlanForm);
const RadioGroup = styled.div`
    display: block;
    margin-bottom: 1.5rem;
    width: 100%;

    label {
        font-size: 1.5rem;
        font-family: RoslindaleDisplayCondensed;
    }

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
        position: relative;
        padding-left: 35px;
        margin-bottom: 12px;
        cursor: pointer;
        user-select: none;

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

    .error {
        margin-bottom: 1.5rem;
    }
`;

const ButtonSecondary = styled.button`
    background: #fff;
    border: 1px solid #242e35;
    color: #242e35;
    cursor: pointer;
    display: inline-block;
    font-size: 0.875rem;
    margin-bottom: 1.5rem;
    margin-right: 1.5rem;
    min-width: 150px;
    padding: 1rem 2rem;
    text-align: center;
    text-transform: uppercase;
    width: 100%;

    ${(p: { theme: { media: { greaterThan: (arg0: string) => any } } }) => p.theme.media.greaterThan("768px")`
        margin-bottom: 0;
        margin-right: 1.5rem;
        width: auto;
    `};
`;

const ButtonPrimary = styled.button`
    background: #a86d37;
    border: 1px solid #a86d37;
    color: #fff;
    cursor: pointer;
    display: inline-block;
    font-size: 0.875rem;
    min-width: 150px;
    padding: 1rem 2rem;
    text-align: center;
    text-transform: uppercase;
    width: 100%;

    ${(p: { theme: { media: { greaterThan: (arg0: string) => any } } }) => p.theme.media.greaterThan("768px")`
        width: auto;
    `};
`;

const ButtonGroup = styled.div`
    text-align: right;
    width: 100%;
`;

const Notice = styled.div`
    color: ${(p: { theme: { colors: { mainAccentBlue: any } } }) => p.theme.colors.mainAccentBlue};
    font-size: 1rem;
    font-weight: 500;
    line-height: 26px;
    margin-bottom: 2rem;
    width: 100%;
`;
