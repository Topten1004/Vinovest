import React, { useMemo } from "react";
import { range } from "lodash";
import { DepositElemMobile, DepositElemDesktop } from "./DepositElements";
import { SkeletonDesktop } from "./SkelotonDesktop";
import { GridWrapper } from "./styled";

interface PendingDepositsListProps {
    isMobile: boolean;
    pendingLength: number;
}

export const PendingDepositsList = ({ isMobile, pendingLength = 0 }: PendingDepositsListProps) => {
    const pendingItems = useMemo(() => range(pendingLength), [pendingLength]);

    return (
        <>
            {pendingItems.map((id: number) => (
                <React.Fragment key={id}>
                    {isMobile ? (
                        <GridWrapper>
                            <DepositElemMobile
                                type="show-skeleton"
                                typeLabel={<SkeletonDesktop />}
                                description={<SkeletonDesktop maxWidth="81px" />}
                                amount={<SkeletonDesktop />}
                                date={<SkeletonDesktop />}
                            />
                        </GridWrapper>
                    ) : (
                        <GridWrapper>
                            <DepositElemDesktop
                                type="show-skeleton"
                                description={<SkeletonDesktop maxWidth="81px" />}
                                amount={<SkeletonDesktop />}
                                date={<SkeletonDesktop />}
                            />
                        </GridWrapper>
                    )}
                </React.Fragment>
            ))}
        </>
    );
};
