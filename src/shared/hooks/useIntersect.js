import { useEffect, useRef, useState } from "react";

export default ({ root = null, rootMargin, threshold = 0 }) => {
    const [entry, updateEntry] = useState({});
    const node = useRef(null);

    const observer = useRef(
        new window.IntersectionObserver(([newEntry]) => updateEntry(newEntry), {
            root,
            rootMargin,
            threshold,
        }),
    );

    useEffect(() => {
        const { current: currentObserver } = observer;
        currentObserver.disconnect();

        node.current && currentObserver.observe(node.current);

        return () => currentObserver.disconnect();
    }, [node.current]);

    return [node, entry];
};
