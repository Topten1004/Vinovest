import React from "react";
import VinovestExchange from "./components/VinovestExchange";
import WineGoals from "./components/WineGoals";
import TradingBenefits from "./components/TradingBenefits";
import FAQ from "./components/FAQ";

const TradingPage = () => {
    return (
        <>
            <VinovestExchange />
            <WineGoals />
            <TradingBenefits />
            <FAQ />
        </>
    );
};

export default TradingPage;