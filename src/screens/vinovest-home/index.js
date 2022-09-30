import React from "react";
import styled from "styled-components";
import Hero from "./hero";
import Quality from "./quality";
import HowItWorks from "./how-it-works";
import Pricing from "../pricing";
import TestimonialsSlider from "./testimonials-slider";
import LatestFromBlog from "./latest-from-blog";
import IncomeSlider from "./income-slider";

const VinovestHome = () => (
    <Container>
        <Hero />
        <Quality />
        <HowItWorks />
        <Pricing embed />
        <TestimonialsSlider />
        <LatestFromBlog />
        <IncomeSlider />
    </Container>
);

const Container = styled.div`
    ${Pricing.styled.Section} {
        padding-top: 180px;
        margin-bottom: 200px;
        @media screen and (max-width: 991px) {
            padding-bottom: 48px;
        }

        @media screen and (max-width: 479px) {
            padding-top: 70px;
        }
    }
`;

export default VinovestHome;
