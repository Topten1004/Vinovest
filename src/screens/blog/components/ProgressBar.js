import React from "react";
import styled from "styled-components";

const ProgressBar = ({ freeze, startFromZero }) => {
    const [scrollPosition, setScrollPosition] = React.useState(startFromZero ? 0 : 100);

    React.useEffect(() => {
        function getScrollPercent() {
            const h = document.documentElement;
            const b = document.body;
            const st = "scrollTop";
            const sh = "scrollHeight";
            const scrollProgress = ((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100;

            setScrollPosition(startFromZero ? scrollProgress : scrollProgress > 1 ? scrollProgress : 100);
        }
        if (!freeze) {
            window.addEventListener("scroll", getScrollPercent);

            return () => window.removeEventListener("mousemove", getScrollPercent);
        }
    }, [freeze]);

    return <ProgressBarLine freeze={freeze ? 4 : 0} width={scrollPosition} />;
};

const ProgressBarLine = styled.div`
    position: fixed;
    z-index: 2;
    top: 91px;
    left: 0;
    height: 4px;
    width: ${({ freeze, width }) => (freeze ? "100%" : `${width}%`)};
    transition: ${({ width }) => (width === 100 || width <= 10 ? "1s" : "0.5s")};
    background-color: #3c400c;

    @media screen and (max-width: 1023px) {
        top: 80px;
    }
`;

export default ProgressBar;
