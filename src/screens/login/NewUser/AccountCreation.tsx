import React from "react";
import styled from "styled-components";
import { Typography } from "@vinovest/components/index";
import { useTranslation } from "react-i18next";
import NewUserForm from "./CreateAccountForm";
import { InvestmentGraph } from "../assets/InvestmentGraph";

const OnboardUser = () => {
    const { t } = useTranslation(["account"]);

    return (
        <Grid>
            <Column className="form">
                <Typography large heading>
                    {t("onboard.create_account_title")}
                </Typography>
                <NewUserForm />
            </Column>
            <Column className="graphic">
                <InvestmentGraph />
            </Column>
        </Grid>
    );
};
export default OnboardUser;

const Grid = styled.div`
    display: flex;
    flex-wrap: wrap;
    height: 100vh;
    margin: auto;
    padding: 4rem 0 0;
    width: 100%;

    h1 {
        font-size: 32px;

        ${(p) => p.theme.media.greaterThan("1024px")`
            font-size: 55px;
        `};
    }
`;

const Column = styled.div`
    width: 100%
        ${(p) => p.theme.media.greaterThan("1024px")`
        width: 50%;
    `};

    &.form {
        margin-bottom: 2rem;
        padding: 0 20px;

        ${(p) => p.theme.media.greaterThan("1024px")`
            max-width: 620px;
            margin-bottom: 0;
            margin-left: auto;
            padding-right: 5rem;
            padding-left: 20px;
        `};
    }

    &.graphic {
        background: #3c400c;

        svg {
            background: #fff;
        }
    }
`;
