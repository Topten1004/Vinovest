import React, { useState } from "react";
import styled from "styled-components";
import { withOktaAuth } from "@okta/okta-react";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import { IOktaContext } from "@okta/okta-react/bundles/types/OktaContext";
import { useRootStore } from "#shared/hooks";
import AccountService from "#services/UserService";
import expandArrow from "#shared/ui/Dropdown/assets/check.svg";
import { UserDisclaimer } from "./UserDisclaimer";
import ErrorIcon from "#assets/shared/ErrorIcon";
import AlertMessage from "#shared/ui/Alert/AlertMessage";

export interface UserInformationProps extends IOktaContext {
    fetchData: () => Promise<void>;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    onSubmitComplete: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
interface UserFormProps extends UserInformationProps {
    query: {
        firstName: string;
        lastName: string;
        country: string;
        address: string;
        city: string;
        state: string;
        zip: string;
    };
}

const UserForm = ({ query, fetchData, onClick, onSubmitComplete }: UserFormProps) => {
    const { t } = useTranslation("account");
    const store = useRootStore();
    const [errorMessage, setErrorMessage] = useState("");

    const { values, handleSubmit, handleChange, handleBlur } = useFormik({
        initialValues: { ...query },
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
            <FormItem>
                <label htmlFor="firstName">{t("account_personal_information.label_first")}</label>
                <input
                    aria-label={t("account_personal_information.label_first")}
                    type="text"
                    name="firstName"
                    value={values.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="firstName"
                    placeholder={t("account_personal_information.placeholder_first")}
                    required
                />
            </FormItem>
            <FormItem>
                <label htmlFor="lastname">{t("account_personal_information.label_last")}</label>
                <input
                    aria-label={t("account_personal_information.label_last")}
                    type="text"
                    name="lastName"
                    value={values.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="lastName"
                    placeholder={t("account_personal_information.placeholder_last")}
                    required
                />
            </FormItem>
            <FormItem className="full">
                <label htmlFor="address">{t("account_personal_information.label_address")}</label>
                <input
                    aria-label={t("account_personal_information.label_address")}
                    type="text"
                    name="address"
                    value={values.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="address"
                    placeholder={t("account_personal_information.placeholder_address")}
                />
                <FormItemDescription>{t("account_personal_information.description_address")}</FormItemDescription>
            </FormItem>
            <FormItem>
                <label htmlFor="city"> {t("account_personal_information.label_city")}</label>
                <input
                    aria-label={t("account_personal_information.label_city")}
                    type="text"
                    name="city"
                    value={values.city}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="city"
                    placeholder={t("account_personal_information.placeholder_city")}
                />
            </FormItem>

            <FormItem>
                <label htmlFor="state">{t("account_personal_information.label_state")}</label>
                <RegionDropdown
                    name="state"
                    country={values.country}
                    value={values.state}
                    onChange={(_, e) => handleChange(e)}
                    onBlur={handleBlur}
                    disableWhenEmpty
                    countryValueType="short"
                    valueType="short"
                    aria-label={t("account_personal_information.label_state")}
                />
                <img src={expandArrow} alt="expand-icon" className="expand-dropdown-arrow" />
            </FormItem>
            <FormItem>
                <label htmlFor="zip">{t("account_personal_information.label_zip")}</label>
                <input
                    aria-label={t("account_personal_information.label_zip")}
                    type="text"
                    name="zip"
                    value={values.zip}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="zip"
                    placeholder={t("account_personal_information.placeholder_zip")}
                />
            </FormItem>
            <FormItem controlId="country">
                <label htmlFor="country">{t("account_personal_information.label_country")}</label>
                <CountryDropdown
                    aria-label={t("account_personal_information.label_country")}
                    id="country"
                    name="country"
                    value={values.country}
                    onChange={(_, e) => handleChange(e)}
                    onBlur={handleBlur}
                    priorityOptions={["CA", "US", "GB"]}
                    valueType="short"
                />

                <img src={expandArrow} alt="expand-icon" className="expand-dropdown-arrow" />
            </FormItem>
            {errorMessage && (
                <AlertMessage type="error">
                    <ErrorIcon /> {errorMessage}
                </AlertMessage>
            )}
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
export default withOktaAuth<UserFormProps>(UserForm);

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
        appearance: none;
        background-color: transparent;
        position: relative;
        z-index: 1;
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
const FormItemDescription = styled.div`
    color: #767a7f;
    font-size: 0.688rem;
    margin-top: 0.5rem;
`;
