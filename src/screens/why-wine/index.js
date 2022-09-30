import React from "react";
import Quality from "./quality";
import SteadyYields from "./steady-yields";
import WineOutperform from "./wine-outperform";
import NetworkOfWine from "./network-of-wine";
import Head from "./head";

const WhyWinePage = () => (
    <div>
        <Head />
        <SteadyYields />
        <WineOutperform />
        <NetworkOfWine />
        <Quality />
    </div>
);

export default WhyWinePage;
