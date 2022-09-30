import React, { useState } from "react";
import styled from "styled-components";
import { Typography } from "@vinovest/components/index";
import { useTranslation } from "react-i18next";
import InvestorProfileForm from "./InvestorProfileForm";
import { InvestmentEstimator } from "./InvestmentEstimator";

const InvestorProfile = () => {
    const [targetEstimate, setTargetEstimate] = useState(10000);
    const [plan, setPlanLevel] = useState("conservative");
    const { t } = useTranslation(["account"]);

    return (
        <Grid>
            <Column className="form">
                <Typography large heading>
                    {t("profile.investor_title")}
                </Typography>
                <InvestorProfileForm setTargetEstimate={setTargetEstimate} plan={plan} />
            </Column>
            <Column>
                <InvestmentEstimator targetEstimate={targetEstimate} setPlanLevel={setPlanLevel} />
            </Column>
        </Grid>
    );
};
export default InvestorProfile;

const Grid = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: auto;
    max-width: 1240px;
    padding: 4rem 1.5rem;
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

        ${(p) => p.theme.media.greaterThan("1024px")`
            max-width: 450px;
            margin-bottom: 0;
            margin-right: auto;
            padding-right: 1rem;
        `};
    }
`;
