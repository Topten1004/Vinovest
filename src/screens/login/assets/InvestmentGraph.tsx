import React from "react";
import styled from "styled-components";
import investmentGraphSvg from "#assets/login/investmentGraph.svg";


const InvestmentSvg = styled.img`
    padding-top: 4rem;
    width: 100%;
    background-color: #fff; 
`

export const InvestmentGraph = () => <InvestmentSvg src={investmentGraphSvg} alt="graph of Global Equity Index vs wine" />;