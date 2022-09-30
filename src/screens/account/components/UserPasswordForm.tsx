import React, { useState } from "react";
import styled from "styled-components";
import { withOktaAuth } from "@okta/okta-react";
import { useTranslation } from "react-i18next";
import { IOktaContext } from "@okta/okta-react/bundles/types/OktaContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import AccountService from "#services/UserService";
import { useRootStore } from "#shared/hooks";
import ErrorIcon from "#assets/shared/ErrorIcon";
import AlertMessage from "#shared/ui/Alert/AlertMessage";

interface UserPasswordFormProps extends IOktaContext {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    onSubmitComplete: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

interface FormValues {
    newPassword: string;
    oldPassword: string;
    passwordConfirm: string;
    length?: string;
    digit?: string;
    upperCase?: string;
    specialCharacter?: string;
}

const UserPasswordForm = ({ onClick, onSubmitComplete }: UserPasswordFormProps) => {
    const { t } = useTranslation("account");
    const [errorMessage, setErrorMessage] = useState("");
    const store = useRootStore();
    const PasswordSchema = Yup.object().shape({
        newPassword: Yup.string().required(t("password.error_new_required")),
        oldPassword: Yup.string().required(t("password.error_old_password")),
        passwordConfirm: Yup.string()
            .oneOf([Yup.ref("newPassword"), null], t("password.match"))
            .required(t("password.error_confirm_password")),
    });

    const { values, errors, touched, handleSubmit, handleChange, handleBlur } = useFormik<FormValues>({
        initialValues: {
            newPassword: "",
            oldPassword: "",
            passwordConfirm: "",
        },
        validationSchema: PasswordSchema,
        onSubmit: (_, event) => {
            AccountService.useAccountPasswordPut(store.user.oktaUserEntity.data.sub, store.auth.accessToken, values)
                .then(() => {
                    onClick(event);
                    onSubmitComplete(event);
                })
                .catch((error: string) => {
                    setErrorMessage(error);
                });
        },
    });

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <FormItem>
                    <Notice>{t("password.notice")}</Notice>
                    <label htmlFor="oldPassword">{t("password.label_current_password")} </label>
                    <input
                        aria-label={t("password.label_current_password")}
                        type="password"
                        name="oldPassword"
                        value={values.oldPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        id="oldPassword"
                    />
                </FormItem>
                <FormItem>
                    <label htmlFor="newPassowrd">{t("password.label_new_password")}</label>
                    <input
                        aria-label={t("password.label_new_password")}
                        type="password"
                        name="newPassword"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        id="newPassword"
                    />
                    <FormItemDescription>{t("password.password_requirements")}</FormItemDescription>
                </FormItem>
                <FormItem>
                    <label htmlFor="passwordConfirm">{t("password.label_confirm_password")}</label>
                    <input
                        aria-label={t("password.label_confirm_password")}
                        type="password"
                        name="passwordConfirm"
                        onChange={handleChange}
                        id="passwordConfirm"
                        onBlur={handleBlur}
                    />
                    <FormItemDescription>{t("password.retype_password")}</FormItemDescription>
                    {touched.oldPassword && errors.oldPassword && (
                        <AlertMessage type="error">
                            <ErrorIcon /> {errors.oldPassword}
                        </AlertMessage>
                    )}
                    {touched.newPassword && errors.newPassword && (
                        <AlertMessage type="error">
                            <ErrorIcon /> {errors.newPassword}
                        </AlertMessage>
                    )}
                    {touched.passwordConfirm && errors.passwordConfirm && (
                        <AlertMessage type="error">
                            <ErrorIcon /> {errors.passwordConfirm}
                        </AlertMessage>
                    )}
                    {errorMessage && (
                        <AlertMessage type="error">
                            <ErrorIcon /> {errorMessage}
                        </AlertMessage>
                    )}
                </FormItem>
                <ButtonGroup>
                    <ButtonSecondary type="button" onClick={(event: React.MouseEvent<HTMLElement>) => onClick(event)}>
                        {t("password.button_cancel")}
                    </ButtonSecondary>
                    <ButtonPrimary type="submit">{t("password.button_change")}</ButtonPrimary>
                </ButtonGroup>
            </Form>
        </>
    );
};
export default withOktaAuth(UserPasswordForm);
const FormItemDescription = styled.div`
    color: ${(p) => p.theme.colors.disclaimerGray};
    font-size: 0.688rem;
    margin-top: 0.5rem;
`;
const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .error {
        margin-bottom: 1.5rem;
    }
`;

const FormItem = styled.div`
    color: #766a7f;
    font-size: 0.875rem;
    margin-bottom: 1.5rem;
    position: relative;
    width: 100%;

    label {
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

    .password-validation {
        label {
            display: inline;
            font-family: "VinovestMedium";
            text-transform: none;
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

const Notice = styled.div`
    color: ${(p) => p.theme.colors.mainAccentBlue};
    font-size: 1rem;
    font-weight: 500;
    line-height: 26px;
    margin-bottom: 2rem;
    width: 100%;
`;
