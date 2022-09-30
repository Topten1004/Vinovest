import React from "react";
import Header from "./Header";
import LeveragingTechnology from "./LeveragingTechnology";
import WhoWeAre from "./WhoAreWe";
import VinovestCouncil from "./VinovestCouncil";
import BannerSection from "./BannerSect";
import ConditionalScrollToTop from "#shared/components/ConditionaScrollToTop";

const AboutUs = () => (
    <>
        <ConditionalScrollToTop path="/careers" />
        <Header />
        <LeveragingTechnology />
        <WhoWeAre />
        <VinovestCouncil />
        <BannerSection />
    </>
);

export default AboutUs;
