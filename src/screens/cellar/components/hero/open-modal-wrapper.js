import React from "react";

const OpenModalWrapper = ({ onClick, disabled, children }) => {
    const clone = React.cloneElement(children, {
        onClick: (e) => {
            e.stopPropagation();
            onClick();
        },
    });
    return <>{disabled ? children : clone}</>;
};

export default OpenModalWrapper;
