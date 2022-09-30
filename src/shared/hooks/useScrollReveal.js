import { useEffect, useState } from "react";

const useScrollReveal = ({ ref, keepCalculating }) => {
    const [hasRevealed, setHasRevealed] = useState(false);
    const [fillScreen, setFillScreen] = useState(0);

    useEffect(() => {
        const { clientHeight } = ref.current;
        const { top } = ref.current.getBoundingClientRect();

        if (top - window.innerHeight <= 0 && top + clientHeight > 0) {
            setHasRevealed(true);
            setFillScreen(top + clientHeight);
        }
    }, [ref]);

    useEffect(() => {
        if (!hasRevealed || keepCalculating) {
            const onWindowScroll = () => {
                const { clientHeight } = ref.current;
                const { top } = ref.current.getBoundingClientRect();
                setFillScreen(top + clientHeight);

                if (top - window.innerHeight <= 0 && top + clientHeight > 0) {
                    setHasRevealed(true);
                } else if (keepCalculating) {
                    setHasRevealed(false);
                }
            };

            window.addEventListener("scroll", onWindowScroll);

            return () => window.removeEventListener("scroll", onWindowScroll);
        }
    }, [hasRevealed, ref, keepCalculating]);

    return { hasRevealed, fillScreen };
};

export default useScrollReveal;
