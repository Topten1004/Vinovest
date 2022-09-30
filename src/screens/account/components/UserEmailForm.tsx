import React, { useState } from "react";
import styled from "styled-components";
import { withOktaAuth } from "@okta/okta-react";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as Yup from "yup";
import { UserDisclaimer } from "./UserDisclaimer";
import AccountService from "#services/UserService";
import { useRootStore } from "#shared/hooks";
import ErrorIcon from "#assets/shared/ErrorIcon";
import AlertMessage from "#shared/ui/Alert/AlertMessage";
import { UserInformationProps } from "./UserForm";

interface UserEmailFormProps extends UserInformationProps {
    query: {
        email: string;
    };
}

interface FormValues {
    email: string;
}

const UserEmailForm: React.FC<UserEmailFormProps> = ({
    query,
    fetchData,
    onClick,
    onSubmitComplete,
}: UserEmailFormProps) => {
    const { t } = useTranslation("account");
    const store = useRootStore();
    const [errorMessage, setErrorMessage] = useState("");

    const EmailSchema = Yup.object().shape({
        email: Yup.string()
            .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, t("account_email.error_invalid_email"))
            .required(t("account_email.required")),
    });
    const { values, errors, touched, handleSubmit, handleChange, handleBlur } = useFormik<FormValues>({
        initialValues: {
            email: query.email,
        },
        validationSchema: EmailSchema,

        onSubmit: (_, event: React.MouseEvent<HTMLElement>) => {
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
                <Notice>{t("account_email.notice")} </Notice>
                <label htmlFor="email">{t("account_email.label_email")}</label>
                <input
                    aria-label={t("account_email.label_email")}
                    type="text"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="email"
                    placeholder={t("account_email.placeholder_email")}
                />
                {touched.email && errors.email && (
                    <AlertMessage type="error">
                        <ErrorIcon /> {errors.email}
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
                <ButtonSecondary type="button" onClick={(event: React.MouseEvent<HTMLElement>) => onClick(event)}>
                    {t("button_cancel")}
                </ButtonSecondary>
                <ButtonPrimary type="submit">{t("button_save")}</ButtonPrimary>
            </ButtonGroup>
        </Form>
    );
};

export default withOktaAuth<UserEmailFormProps>(UserEmailForm);

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
