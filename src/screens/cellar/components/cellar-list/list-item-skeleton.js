import React from "react";
import styled from "styled-components";
import Skeleton from "react-loading-skeleton";

import {
    DesktopListElem,
    MobileListElem,
    CellExtended,
    BottomData,
    WineDetailsContainer,
    WineImg,
    WineDetailsText,
} from "./styled";
import bottleSkeletonSvg from "../assets/icons/bottleSkeleton.svg";
import circleSvg from "../assets/icons/circle.svg";

const Conditional = ({ withFund, children, width = "85px" }) => {
    return (
        <>
            {!withFund ? (
                children
            ) : (
                <AddFundsCell>
                    <div>
                        <Skeleton style={{ width, height: "17px", justifySelf: "center" }} />
                    </div>
                </AddFundsCell>
            )}
        </>
    );
};

export const ListItemSkeleton = ({ isMobile, withFund }) => (
    <>
        {isMobile ? (
            <MobileListElem>
                <WineDetailsContainer>
                    <WineImgMobile src={withFund ? circleSvg : bottleSkeletonSvg} alt="bottle" />
                    <WineDetailsText>
                        <Skeleton style={{ width: "100px", height: "17px" }} />
                        <Skeleton style={{ width: "62px", height: "17px" }} />
                    </WineDetailsText>
                </WineDetailsContainer>

                <Conditional withFund={withFund}>
                    <CellExtended>
                        <Skeleton style={{ width: "36px", height: "17px" }} />
                        <BottomData>
                            <Skeleton style={{ width: "109px", height: "17px" }} />
                        </BottomData>
                    </CellExtended>
                </Conditional>
            </MobileListElem>
        ) : (
            <DesktopListElem>
                <WineDetailsContainer>
                    <WineImg src={withFund ? circleSvg : bottleSkeletonSvg} alt="bottle" />
                    <WineDetailsText>
                        <Skeleton style={{ width: "141px", height: "17px" }} />
                        <br />
                        {!withFund && <Skeleton style={{ width: "82px", height: "17px" }} />}
                    </WineDetailsText>
                </WineDetailsContainer>

                <Conditional withFund={withFund}>
                    <CellExtended>
                        <Skeleton style={{ width: "36px", height: "17px" }} />
                        <BottomData>
                            <Skeleton style={{ width: "109px", height: "17px" }} />
                        </BottomData>
                    </CellExtended>
                </Conditional>

                <Conditional withFund={withFund}>
                    <CellExtended>
                        <Skeleton style={{ width: "85px", height: "17px" }} />
                        <BottomData>
                            <Skeleton style={{ width: "109px", height: "17px" }} />
                        </BottomData>
                    </CellExtended>
                </Conditional>

                <Conditional withFund={withFund} width="99px">
                    <CellExtended>
                        <Skeleton style={{ width: "85px", height: "17px" }} />
                        <BottomData>
                            <Skeleton style={{ width: "109px", height: "17px" }} />
                        </BottomData>
                    </CellExtended>
                </Conditional>
            </DesktopListElem>
        )}
    </>
);

const AddFundsCell = styled(CellExtended)`
    display: flex;
    flex-direction: row !important;
    padding-top: 0;
    align-items: center !important;
    justify-content: flex-end !important;
`;

const WineImgMobile = styled(WineImg)`
    padding: 9px;
`;
