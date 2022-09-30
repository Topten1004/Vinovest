import React from "react";
import HowProcessWorksDesktop from "./components/HowProcessWorksDesktop";
import HowProcessWorksMobile from "./components/HowProcessWorksMobile";

import { useMobile, useRootStore } from "#shared/hooks";

const HowProcessWorks = () => {
    const isMobile = useMobile(767);

        return isMobile ? <HowProcessWorksMobile /> : <HowProcessWorksDesktop />;
};

export { HowProcessWorks };
