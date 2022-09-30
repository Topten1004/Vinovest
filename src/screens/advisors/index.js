import React from "react";
import styled from "styled-components";
import Header from "./Header";
import HowWeHelp from "./HowWeHelp";
import VinoOffers from "./VinovestOffers";
import WineMarket from "./WineMarket";
import YourSolution from "./YourSolution";
import HelpBanner from "./HelpBanner";

const Advisors = () => (
    <Wrapper>
        <Header />
        <VinoOffers />
        <WineMarket />
        <YourSolution />
        <HowWeHelp />
        <HelpBanner />
    </Wrapper>
);
export default Advisors;

const Wrapper = styled.div`
    position: relative;
`;