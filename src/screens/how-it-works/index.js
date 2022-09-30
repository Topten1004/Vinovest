import React from "react";
import styled from "styled-components";

import Head from "./head";
import AccessInvestmentPlatform from "./access-investment-platform";
import InvestmentWorthy from "./investmentWorthy";
import TrulyLiquidAssets from "./truly-liquid-assets";
import FAQLink from "./FAQLink";

const HowItWorksPage = () => (
    <HowItWorksContainer>
        <Head />
        <AccessInvestmentPlatform />
        <InvestmentWorthy />
        <TrulyLiquidAssets />
        <FAQLink />
    </HowItWorksContainer>
);

const HowItWorksContainer = styled.div`
    padding-bottom: 100px;
`;

export default HowItWorksPage;
