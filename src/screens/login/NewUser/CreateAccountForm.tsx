import React, { useState } from "react";
import { useFormik } from "formik";
import styled from "styled-components";
import * as Yup from "yup";
import { useOktaAuth } from "@okta/okta-react";
import posthog from "posthog-js";
import PhoneInput from "react-phone-number-input";
import { useTranslation } from "react-i18next";
import AlertMessage from "#shared/ui/Alert/AlertMessage";
import ErrorIcon from "#assets/shared/ErrorIcon";
import "react-phone-number-input/style.css";
import { useRootStore, useCreateRoutingCallback } from "#shared/hooks";
import expandArrow from "#shared/ui/Dropdown/assets/check.svg";
import { MainButtonWithLoader } from "#shared/components/MainButtonWithLoader";
import { I18nLink } from "#localization/localizedRouter";
import AccountService from "#services/UserService";
import { postImpactNewUserData } from "#utils/impactData";
import { languageCodeChina } from "#utils/constants";

interface FormValues {
    primaryPhone: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    referalSource: string;
    acceptTerms: any;
}

const NewUserForm = () => {
    const store = useRootStore();
    const { t } = useTranslation(["account"]);
    const { oktaAuth } = useOktaAuth();
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const isAuthenticated = store.auth.isAuthenticated && !isLoading;
    const routeTo = useCreateRoutingCallback();
    const hardRefreshHome = useCreateRoutingCallback('/', {refresh: true})
    const routeToExchange = useCreateRoutingCallback('/portfolio', {refresh: true})
    const referalOptions = [
        { key: "placeholder", value: t("onboard.placeholder_referal") },
        { key: "radio", value: t("onboard.referal_option_1") },
        { key: "tv", value: t("onboard.referal_option_2") },
        { key: "search", value: t("onboard.referal_option_3") },
        { key: "personalReferal", value: t("onboard.referal_option_4") },
        { key: "social", value: t("onboard.referal_option_5") },
        { key: "podcast", value: t("onboard.referal_option_6") },
        { key: "billboard", value: t("onboard.referal_option_7") },
        { key: "email", value: t("onboard.referal_option_8") },
        { key: "affiliate", value: t("onboard.referal_option_9") },
        { key: "other", value: t("onboard.referal_option_10") },
    ];

    const FormSchemaNewUser = Yup.object().shape({
        email: Yup.string()
            .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+$/i, t("onboard.error_email_invalid"))
            .required(t("onboard.error_email")),
        primaryPhone: Yup.string().required(t("onboard.error_primaryPhone")),
        firstName: Yup.string().required(t("onboard.error_firstName")),
        lastName: Yup.string().required(t("onboard.error_lastName")),
        password: Yup.string()
            .required(t("onboard.error_password"))
            .min(8, t("password.error_characters"))
            .matches(/^(?=.*[0-9]).*$/, t("password.error_number"))
            .matches(/^(?=.*[A-Z]).*$/, t("password.error_upper"))
            .matches(/^(?=.*[@#$%^&+\-=!"'()*+,./:;<>?[\]^_`{}|~]).*$/, t("password.error_special")),
        acceptTerms: languageCodeChina && Yup.bool().oneOf([true], "Accept Terms & Conditions is required"),
    });

    const FormSchemaUpdateUser = Yup.object().shape({
        email: Yup.string()
            .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+$/i, t("onboard.error_email_invalid"))
            .required(t("onboard.error_email")),
        primaryPhone: Yup.string().required(t("onboard.error_primaryPhone")),
        firstName: Yup.string().required(t("onboard.error_firstName")),
        lastName: Yup.string().required(t("onboard.error_lastName")),
        acceptTerms: languageCodeChina && Yup.bool().oneOf([true], "Accept Terms & Conditions is required"),
    });

    const registerNewUser = async (values: FormValues) => {
        try {
            const responseRegister = await store.auth.registerNewUserAccount(values);
            if (responseRegister.code >= 400) {
                setIsLoading(false);
                setErrorMessage(t("onboard.error_password_email_new_user"));
            } else {
                const responseSignIn = await oktaAuth.signInWithCredentials({
                    username: values.email,
                    password: values.password,
                });

                if (responseSignIn.status === "SUCCESS") {
                    const { sessionToken } = responseSignIn;
                    const responseToken = await oktaAuth.token.getWithoutPrompt({
                        responseType: "id_token",
                        sessionToken,
                    });
                    const { tokens } = responseToken;
                    oktaAuth.tokenManager.setTokens(tokens);
                    store.tracking.gtm.trackNewUserInformation(store, values);
                    routeToExchange(); 
                } else {
                    setIsLoading(false);
                    setErrorMessage(t("onboard.error_create_account"));
                }
            }
        } catch (error) {
        
            setIsLoading(false);
            setErrorMessage(t("onboard.error_create_account"));
    
        }
        postImpactNewUserData(store, oktaAuth);
        hardRefreshHome()
    };

    const updateUser = async (values: FormValues) => {
        try {
            await AccountService.useAccountInformationPut(
                store.user.oktaUserEntity.data.sub,
                store.auth.accessToken,
                values,
            );
            store.tracking.gtm.trackNewUserInformation(store, values);
            setIsLoading(false);
            routeToExchange() 
            // routeTo("/portfolio", {refresh: true});
        } catch {
            setErrorMessage(t("onboard.error_create_account"));
        }
    };

    const { values, errors, touched, handleSubmit, handleBlur, setFieldValue, handleChange, isValid, dirty } =
        useFormik<FormValues>({
            enableReinitialize: true,
            initialValues: {
                primaryPhone: "",
                firstName: isAuthenticated ? store.user.oktaUserEntity.data.given_name : "",
                lastName: isAuthenticated ? store.user.oktaUserEntity.data.family_name : "",
                email: isAuthenticated ? store.user.oktaUserEntity.data.email : "",
                password: "",
                referalSource: "",
                acceptTerms: false,
            },
            validationSchema: isAuthenticated ? FormSchemaUpdateUser : FormSchemaNewUser,
            onSubmit: async (_) => {
                setIsLoading(true);
                if (isAuthenticated) {
                    posthog.capture("user_clicks_phone_entry", {
                        phone_number: values.primaryPhone,
                        referal_source: values.referalSource,
                    });
                    updateUser(values);
                } else {
                    registerNewUser(values);
                }
            },
        });

    return (
        <Form onSubmit={handleSubmit}>
            <FormItem>
                <input
                    aria-label="first name"
                    type="text"
                    name="firstName"
                    value={values.firstName || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="firstName"
                    placeholder={t("account_personal_information.label_first")}
                    required
                    disabled={isAuthenticated}
                />
                {touched.firstName && errors.firstName && <ErrorMessage>{errors.firstName}</ErrorMessage>}
            </FormItem>
            <FormItem>
                <input
                    aria-label="last name"
                    type="text"
                    name="lastName"
                    value={values.lastName || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="lastName"
                    placeholder={t("account_personal_information.label_last")}
                    required
                    disabled={isAuthenticated}
                />
                {touched.lastName && errors.lastName && <ErrorMessage>{errors.lastName}</ErrorMessage>}
            </FormItem>
            <FormItem>
                <input
                    aria-label="email"
                    type="text"
                    name="email"
                    value={values.email || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="email"
                    placeholder={t("account_email.label_email")}
                    required
                    disabled={isAuthenticated}
                />
                {touched.email && errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
            </FormItem>
            <FormItem>
                <PhoneInput
                    aria-label="phone"
                    id="primaryPhone"
                    name="primaryPhone"
                    displayInitialValueAsLocalNumber
                    defaultCountry="US"
                    placeholder={t("account_mobile.label")}
                    value={values.primaryPhone}
                    onChange={(event: React.MouseEvent<HTMLElement>) => setFieldValue("primaryPhone", event)}
                    onBlur={handleBlur}
                    required
                />
                {touched.primaryPhone && errors.primaryPhone && <ErrorMessage>{errors.primaryPhone}</ErrorMessage>}
            </FormItem>
            {!isAuthenticated && (
                <FormItem className="full">
                    <input
                        aria-label="password"
                        type="password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder={t("password.title")}
                        id="password"
                        required
                        value={values.password}
                        disabled={isAuthenticated}
                    />
                    {touched.password && errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
                    <FormItemDescription>{t("password.password_requirements")}</FormItemDescription>
                </FormItem>
            )}

            <FormItem className="full">
                <label htmlFor="referalSource">{t("onboard.label_referal")}</label>
                <select
                    onChange={handleChange}
                    name="referalSource"
                    id="referalSource"
                    aria-label="how did you hear about us"
                >
                    {referalOptions.map((option) => (
                        <option key={option.key} hidden={option.key === "placeholder"}>
                            {option.value}
                        </option>
                    ))}
                </select>
                <img src={expandArrow} alt="expand-icon" className="expand-dropdown-arrow" />
                {errorMessage && (
                    <AlertMessage type="error">
                        <ErrorIcon /> {errorMessage}
                    </AlertMessage>
                )}
            </FormItem>
            <FormItemDescription className="margin-bottom">
                {languageCodeChina ? (
                    <FormItem className="full check">
                        <label htmlFor="acceptTerms">
                            <input
                                aria-label="acceptTerms"
                                type="checkbox"
                                name="acceptTerms"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                id="acceptTerms"
                                required={languageCodeChina}
                                value={values.acceptTerms}
                            />
                            {t("login:okta-register.china_agree")}{" "}
                            <I18nLink to="/terms-conditions" target="_blank">
                                {t("login:okta-register.china_terms_and_conditions")}
                            </I18nLink>{" "}
                            {t("login:okta-register.china_and")}{" "}
                            <I18nLink to="/privacy-policy" target="_blank">
                                {t("login:okta-register.china_privacy_policy")}
                            </I18nLink>{" "}
                        </label>

                        {touched.acceptTerms && errors.acceptTerms && (
                            <ErrorMessage>{t("login:okta-register.agree_terms")}</ErrorMessage>
                        )}
                    </FormItem>
                ) : (
                    <>
                        {t("login:okta-register.disclaimer")}{" "}
                        <I18nLink to="/privacy-policy" target="_blank">
                            {t("login:okta-register.privacy")}
                        </I18nLink>{" "}
                        {t("login:okta-register.disclaimer-cont")}{" "}
                        <I18nLink to="/terms-conditions" target="_blank">
                            {t("login:okta-register.terms")}
                        </I18nLink>
                        .
                    </>
                )}
            </FormItemDescription>

            <MainButtonWithLoader
                CTA={t("onboard.button_create")}
                type="submit"
                isLoading={isLoading}
                disabled={!(isValid && dirty)}
            />
            <LoginOption>
                {t("login:okta-register.button-account")}{" "}
                <I18nLink to="/login">{t("login:okta-register.button-login")}</I18nLink>
            </LoginOption>
        </Form>
    );
};
const LoginOption = styled.p`
    color: #242e35;
    display: block;
    font-size: 12px;
    margin-bottom: 0.5rem;
    margin-top: 2rem;
    text-transform: uppercase;
    text-align: center;
    width: 100%;

    a {
        color: #a86d37;
        text-decoration: none;

        &:hover {
            text-decoration: underline;
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

    &.check {
        input {
            margin-right: 1rem;
            vertical-align: middle;
            width: auto;
        }

        label {
            color: #767a7f;
            font-size: 0.688rem;
            line-height: 21px;
            margin-top: 0.5rem;
        }
    }

    label {
        color: #242e35;
        display: block;
        font-size: 12px;
        margin-bottom: 0.5rem;
        text-transform: uppercase;
    }

    input,
    select {
        background: #f7f7f7;
        border: 1px solid #caccce;
        border-radius: 3px;
        color: #242e35;
        font-size: 1rem;
        font-weight: 500;
        padding: 0.75rem 1rem;
        width: 100%;

        &::placeholder {
            color: #606060;
        }

        &:disabled {
            color: #b5b5b5;
        }
    }

    select {
        appearance: none;
        z-index: 1;
    }

    img {
        position: absolute;
        right: 1rem;
        top: 2.25rem;
        width: 20px;
    }

    .PhoneInputCountryIcon {
        box-shadow: none;
    }

    .PhoneInputCountry {
        background: #f7f7f7;
        border-bottom: 1px solid #caccce;
        border-left: 1px solid #caccce;
        border-top: 1px solid #caccce;
        justify-content: center;
        margin-right: 0;
        width: 20%;

        img {
            right: auto;
            top: 0;
        }
    }
`;
const FormItemDescription = styled.div`
    color: #767a7f;
    font-size: 0.688rem;
    line-height: 21px;
    margin-top: 0.5rem;

    &.margin-bottom {
        margin-bottom: 2rem;
    }

    a {
        color: #242e35;
        text-decoration: none;

        &:hover {
            text-decoration: underline;
        }
    }
`;
const ErrorMessage = styled.div`
    color: #db4a38;
    font-size: 11px;
    margin-top: 5px;
`;

export default NewUserForm;
