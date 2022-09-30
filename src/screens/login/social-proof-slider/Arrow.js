import React from 'react';
import arrowLeft from "./assets/arrow-left.svg";
import arrowRight from "./assets/arrow-right.svg";

const Arrow = (props) => {
    let className = props.type === "next" ? "nextArrow" : "prevArrow";
    className += " arrow";
    const arrow = props.type === "next" ? arrowRight : arrowLeft;
    return (
        <div
            className={className}
            onClick={() => {
                props.onClick();
                props.pause();
            }}
            style={{
                ...props.style,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "#ffffff",
                width: 40,
                height: 40,
                borderRadius: "50%",
                border: "1px solid #CACCCE",
                position: "absolute",
            }}
        >
            <img src={arrow} />
        </div>
    );
}

export default Arrow;