import React from "react";
import styled from "styled-components";

import GlobalFacilities from "./global-facilities";
import Head from "./head";
import ScienceIsClear from "./science-is-clear";
import MoreSustainableFuture from "./more-sustainable-future";
import SustainableFuture from "./sustainable-future";

const SustainabilityPage = () => (
    <SustainabilityContainer>
        <Head />
        <ScienceIsClear />
        <MoreSustainableFuture />
        <GlobalFacilities />
        <SustainableFuture />
    </SustainabilityContainer>
);

const SustainabilityContainer = styled.div`
    padding-bottom: 100px;

    @media screen and (max-width: 767px) {
        padding-bottom: 85px;
    }
`;

export default SustainabilityPage;
