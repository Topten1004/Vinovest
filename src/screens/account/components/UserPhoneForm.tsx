import React, { useState } from "react";
import styled from "styled-components";
import { withOktaAuth } from "@okta/okta-react";
import { useTranslation } from "react-i18next";
import PhoneInput from "react-phone-number-input";
import { useFormik } from "formik";
import { useRootStore } from "#shared/hooks";
import { UserDisclaimer } from "./UserDisclaimer";
import AccountService from "#services/UserService";
import AlertMessage from "#shared/ui/Alert/AlertMessage";
import ErrorIcon from "#assets/shared/ErrorIcon";
import "react-phone-number-input/style.css";
import { UserInformationProps } from "./UserForm";

interface UserPhoneFormProps extends UserInformationProps {
    query: string;
}
interface FormValues {
    primaryPhone: string;
}

const UserPhoneForm = ({ query, fetchData, onClick, onSubmitComplete }: UserPhoneFormProps) => {
    const { t } = useTranslation("account");
    const [errorMessage, setErrorMessage] = useState("");
    const store = useRootStore();

    const { values, errors, touched, handleSubmit, handleBlur, setFieldValue } = useFormik<FormValues>({
        initialValues: {
            primaryPhone: query,
        },
        onSubmit: (_, event: React.MouseEvent<HTMLButtonElement>) => {
            AccountService.useAccountInformationPut(store.user.oktaUserEntity.data.sub, store.auth.accessToken, values)
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

    return (
        <Form onSubmit={handleSubmit}>
            <FormItem className="full">
                <label htmlFor="primaryPhone">{t("account_mobile.label")}</label>
                <PhoneInput
                    aria-label={t("account_mobile.label")}
                    id="primaryPhone"
                    name="primaryPhone"
                    displayInitialValueAsLocalNumber
                    defaultCountry="US"
                    placeholder={t("account_mobile.placeholder")}
                    value={values.primaryPhone}
                    onChange={(event: React.MouseEvent<HTMLElement>) => setFieldValue("primaryPhone", event)}
                    onBlur={handleBlur}
                />
                {touched.primaryPhone && errors.primaryPhone && (
                    <AlertMessage type="error">
                        <ErrorIcon /> {errors.primaryPhone}
                    </AlertMessage>
                )}
                {errorMessage && (
                    <AlertMessage type="error">
                        <ErrorIcon /> {errorMessage}
                    </AlertMessage>
                )}
            </FormItem>

            <UserDisclaimer />
            <ButtonGroup>
                <ButtonSecondary onClick={(event: React.MouseEvent<HTMLElement>) => onClick(event)}>
                    {t("button_cancel")}
                </ButtonSecondary>
                <ButtonPrimary type="submit">{t("button_save")}</ButtonPrimary>
            </ButtonGroup>
        </Form>
    );
};
export default withOktaAuth<UserPhoneFormProps>(UserPhoneForm);
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

    ${(p) => p.theme.media.greaterThan("768px")`
        width: 48%;
    `};

    &.full {
        width: 100%;
    }

    label {
        color: #242e35;
        display: block;
        font-size: 0.688rem;
        margin-bottom: 0.5rem;
        text-transform: uppercase;
    }

    input,
    select {
        border: 1px solid #caccce;
        color: #242e35;
        font-size: 1rem;
        font-weight: 500;
        padding: 1rem;
        width: 100%;

        &::placeholder {
            color: #a8abad;
        }
    }

    select {
        background-color: transparent;
        appearance: none;
    }

    img {
        position: absolute;
        right: 1rem;
        top: 2.5rem;
        width: 20px;
    }

    .PhoneInputCountryIcon {
        box-shadow: none;
    }

    .PhoneInputCountry {
        border-bottom: 1px solid #caccce;
        border-left: 1px solid #caccce;
        border-top: 1px solid #caccce;
        justify-content: center;
        margin-right: 0;
        width: 10%;

        img {
            right: auto;
            top: 0;
        }
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

    ${(p) => p.theme.media.greaterThan("768px")`
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

    ${(p) => p.theme.media.greaterThan("768px")`
        width: auto;
    `};
`;

const ButtonGroup = styled.div`
    text-align: right;
    width: 100%;
`;
