import React from "react";
import Skeleton from "react-loading-skeleton";

interface SkeletonProps {
    maxWidth?: string;
    height?: string;
}

export const SkeletonDesktop = ({ maxWidth, height }: SkeletonProps) => (
    <Skeleton
        style={{
            height: height || "20px",
            maxWidth: maxWidth || "58px",
            width: "100%",
            display: "inline-block",
            margin: "0",
        }}
    />
);
