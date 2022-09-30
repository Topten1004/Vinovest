import React from "react";
import Header from "./Header.js";
import WineFuturesSection from "./WineFutures";
import OpportunitySection from "./OpportunitySection.js";
import RecommedSection from "./RecommendSection";
import ShouldDoSection from "./ShouldDoSection";

const WineFutures = () => {
    const [calendlyOpen, setCalendlyOpen] = React.useState(false);

    React.useEffect(() => {
        if (calendlyOpen) {
            const node = document.querySelector(".calendly-popup-close");
            node.addEventListener("click", listener);

            function listener() {
                node.removeEventListener("click", listener);
                setCalendlyOpen(false);
            }
        }
    }, [calendlyOpen]);

    return (
        <div style={{ overflow: calendlyOpen ? "hidden" : "auto" }}>
            <Header setCalendlyOpen={setCalendlyOpen} />
            <WineFuturesSection />
            <OpportunitySection />
            <RecommedSection />
            <ShouldDoSection />
        </div>
    );
};

export default WineFutures;
