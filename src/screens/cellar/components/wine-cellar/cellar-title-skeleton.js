import React from "react";
import Skeleton from "react-loading-skeleton";

const CellarTitleSkeleton = ({ mobileMax, isTablet }) => {
    if (mobileMax) {
        return <Skeleton style={{ marginBottom: "32px", height: "32px", width: "142.61px", display: "block" }} />;
    }

    if (isTablet) {
        return <Skeleton style={{ height: "39px", width: "180px", display: "block" }} />;
    }

    return <Skeleton style={{ height: "39px", width: "323px", display: "block" }} />;
};

export default CellarTitleSkeleton;
