import React from "react";
import styled from "styled-components";
import { useCreateRoutingCallback } from "#shared/hooks";

const WithLayersButton = ({
    className,
    children,
    onClick,
    disabled,
    width,
    colors = ["rgb(239, 221, 199)", "rgb(36, 46, 53)"],
}) => {
    const [first, second, optional] = colors;
    const routeToSignup = useCreateRoutingCallback("/signup", { refresh: true });
    return (
        <WithLayers
            onClick={onClick || routeToSignup}
            second={second}
            first={first}
            disabled={disabled}
            width={width}
            className={className}
            optional={optional}
        >
            <Layer second={second} first={first} optional={optional}>
                {children}
            </Layer>
        </WithLayers>
    );
};

const Layer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    line-height: 177%;
    font-family: Favoritmonostd, sans-serif;
    background: transparent;
    border: 2px ${({ first, optional }) => optional || first} solid;
    transform: translate3d(-8px, -8px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
    transform-style: preserve-3d;
    background-color: ${({ first }) => first};
    color: ${({ second }) => second};
    transition: 0.3s;
    text-transform: uppercase;
`;

const WithLayers = styled.button`
    min-width: ${({ width }) => width || "254px"};
    height: 71px;
    padding: 0 10px;
    position: relative;
    background: transparent;
    border: 2px ${({ first, optional }) => optional || first} solid;

    :hover {
        cursor: pointer;
        outline: 0;

        ${Layer} {
            transform: translate3d(-16px, -16px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg)
                skew(0deg, 0deg);
            transform-style: preserve-3d;
            background-color: ${({ second }) => second};
            color: ${({ first }) => first};
        }
    }
    :focus {
        outline: 0;
    }
    :disabled {
        background: ${({ theme }) => theme.colors.lightGray};
    }
`;

WithLayersButton.styled = { Layer, WithLayers };

export default WithLayersButton;
