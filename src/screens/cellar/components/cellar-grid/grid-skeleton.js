import React from "react";
import Skeleton from "react-loading-skeleton";
import styled from "styled-components";
import bottleSvg from "../assets/icons/bottleSkeleton.svg";

export const GridSkeleton = () => (
    <GridSkeletonWrapper>
        <Skeleton style={{ borderRadius: "0", height: "20px", width: "58%", display: "block", margin: "0 auto" }} />
        <img src={bottleSvg} alt="bottle" width="27.5%" />

        <div>
            <Skeleton style={{ borderRadius: "0", height: "20px", width: "58%", display: "block", margin: "0 auto" }} />
            <Skeleton
                style={{ borderRadius: "0", height: "20px", width: "36%", display: "block", margin: "9px auto 0" }}
            />
        </div>
    </GridSkeletonWrapper>
);

export const BuyingPowerSkeleton = ({ children, routeToDeposit }) => (
    <BuyingPowerSkeletonWrapper>
        <Skeleton style={{ borderRadius: "0", height: "20px", width: "58%", display: "block", margin: "0 auto" }} />
        <Circle>
            <Skeleton
                circle
                style={{ borderRadius: "0", height: "100px", width: "100px", display: "block", margin: "0 auto" }}
            />
        </Circle>
        <div>
            <Skeleton
                style={{ borderRadius: "0", height: "20px", width: "58%", display: "block", margin: "0 auto 42px" }}
            />
            <ButtonWrapper>{children}</ButtonWrapper>
        </div>
    </BuyingPowerSkeletonWrapper>
);

const GridSkeletonWrapper = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 29px 0 22px;
    background: #fff;
    border-radius: 10px;

    span,
    div {
        display: block;
        width: 100%;
    }

    @media screen and (max-width: 767px) {
        img {
            height: 160px;
        }
    }
`;

const BuyingPowerSkeletonWrapper = styled(GridSkeletonWrapper)`
    border-radius: 10px;

    @media screen and (max-width: 767px) {
        padding: 29px 0 0;
    }
`;

const Circle = styled.div`
    height: 100px;
    width: 100px !important;
    overflow: hidden;
    border-radius: 50px;
`;

const ButtonWrapper = styled.div`
    width: fit-content !important;
    margin: 0 auto 18px;

    button {
        max-width: 100% !important;
        margin: 0;
        background: #a86d37 !important;
    }
`;
