import React from "react";
import Lottie from "react-lottie";
import bottleLoadingJson from "#shared/animations/bottle-loading.json";

export const BottleAnimationLoader = ({ h = 400, w = 400 }) => (
    <>
        <Lottie
            height={h}
            width={w}
            options={{
                loop: true,
                autoplay: true,
                animationData: bottleLoadingJson,
                rendererSettings: {
                    preserveAspectRatio: "xMidYMid slice",
                },
            }}
        />
    </>
);
