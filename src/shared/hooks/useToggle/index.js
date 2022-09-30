import React from "react";

const useToggle = (state) => {
    const [on, setOn] = React.useState(state);

    const onToggle = React.useCallback(() => setOn((prev) => !prev), []);
    const setToggle = React.useCallback((nextValue) => setOn(nextValue), []);

    /**
     * Refresh state base on state
     */
    React.useEffect(() => {
        setToggle(state);
    }, [state]);

    return [on, onToggle, setToggle];
};

export default useToggle;
