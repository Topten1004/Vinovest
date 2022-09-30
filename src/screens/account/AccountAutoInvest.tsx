import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { PageHeader } from "#shared/components/PageHeader";

interface AccountAutoInvestProps {
    portalURIFetch: {
        data: string;
        status: {
            isSuccess: () => Promise<void>;
        };
    };
}

export const AccountAutoInvest = ({ portalURIFetch }: AccountAutoInvestProps) => {
    const { t } = useTranslation(["account"]);

    return (
        <>
            <PageHeader>{t("account_settings.auto_invest")}</PageHeader>

            <div>
                <div>{t("account_auto_invest.subtitle")}</div>

                <ButtonPrimary
                    className={!portalURIFetch.status.isSuccess() ? "disabled" : ""}
                    href={portalURIFetch.data}
                >
                    {t("account_auto_invest.title")}
                </ButtonPrimary>
            </div>
        </>
    );
};

AccountAutoInvest.propTypes = {
    portalURIFetch: PropTypes.shape({
        status: PropTypes.shape({
            isSuccess: PropTypes.func.isRequired,
        }),
        data: PropTypes.string,
    }).isRequired,
};

const ButtonPrimary = styled.a`
    font-family: VinovestMono;
    font-style: normal;
    font-weight: 500;
    line-height: 18px;
    letter-spacing: 0.025em;
    background: #a86d37;
    border: 1px solid #a86d37;
    color: #fff;
    cursor: pointer;
    display: inline-block;
    font-size: 0.875rem;
    margin-top: 1.5rem;
    min-width: 150px;
    padding: 1rem 2rem;
    text-align: center;
    text-decoration: none;
    text-transform: uppercase;
    width: 100%;

    ${(p) => p.theme.media.greaterThan("768px")`
        width: auto;
    `};

    &.disabled {
        background: #e5e5e5;
        border: 1px solid #e5e5e5;
        cursor: not-allowed;
    }
`;
