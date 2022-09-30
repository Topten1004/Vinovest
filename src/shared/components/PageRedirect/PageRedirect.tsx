import React, { useEffect } from "react";
import styled from "styled-components";
import { useRootStore, useCreateRoutingCallback } from "#shared/hooks";
import ScreenSpinner from "#shared/components/ScreenSpinner";

export const PageRedirect: React.FC = ({ refreshOnAuth }: { refreshOnAuth: boolean }) => {
    const s = useRootStore();
    if (refreshOnAuth) {
        const redirectToExchange = useCreateRoutingCallback("/portfolio", { refresh: true });
        useEffect(() => {
            if (s.auth.isAuthenticated()) {
                redirectToExchange();
            }
        }, [redirectToExchange, s.auth, s.auth.isAuthenticated]);
    }
    return (
        <FlexRowContainer>
            <FlexColumnContianer>
                <ScreenSpinner loading />
            </FlexColumnContianer>
        </FlexRowContainer>
    );
};
const FlexRowContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    min-height: 100vh;
`;

const FlexColumnContianer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-width: 100vh;
    min-height: 100vh;
`;
