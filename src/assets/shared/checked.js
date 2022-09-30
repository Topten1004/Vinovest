import React from "react";

export default ({ checked }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect
            x="0.5"
            y="0.5"
            width="23"
            height="23"
            rx="3.5"
            fill={checked ? "#A86D37" : "white"}
            stroke={checked ? "#A86D37" : "#A8ABAD"}
        />
        {checked && <path d="M7 12.2353L11.1905 16L18 8" stroke="white" strokeLinecap="round" strokeLinejoin="round" />}
    </svg>
);
