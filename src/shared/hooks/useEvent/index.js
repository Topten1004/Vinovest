import React from "react";

const useEvent = (eventName, handler, node = window) => {
    React.useEffect(() => {
        node.addEventListener(eventName, handler);
        return () => {
            node.removeEventListener(eventName, handler);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};

export default useEvent;
