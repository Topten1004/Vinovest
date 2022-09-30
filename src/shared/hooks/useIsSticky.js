import React from "react";

const useIsSticky = ({ offset = 40, skipOffset = 0 }) => {
    const [isSticky, setIsSticky] = React.useState(false);
    const [topOffset, setTopOffset] = React.useState(window.scrollY);

    const isStickyRef = React.useRef(isSticky);

    const handleScroll = () => {
        const isScrolledDown = window.scrollY >= offset;

        if (isStickyRef.current !== isScrolledDown) setIsSticky(isScrolledDown);
        setTopOffset(window.scrollY <= skipOffset ? window.scrollY : skipOffset);
    };

    React.useEffect(() => {
        isStickyRef.current = isSticky;
    }, [isSticky]);

    React.useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { isSticky, topOffset };
};

export default useIsSticky;
