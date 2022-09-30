import React from "react";
import styled from "styled-components";

function AlertSuccess(props) {
    return <CompleteMessage className={props.type}>{props.children}</CompleteMessage>;
}
export default AlertSuccess;

const CompleteMessage = styled.div`
    border-radius: 4px;
    color: ${(p) => p.theme.colors.mainAccentBlue};
    display: flex;
    font-size: 1rem;
    font-family: ${(p) => p.theme.fonts.body};
    margin-top: 2rem;
    padding: 1rem;
    align-items: center;
    width: 100%;

    svg {
        height: 22px;
        margin-right: 1rem;
        min-width: 22px;
        vertical-align: middle;
        width: 22px;
    }

    &.success {
        background: ${(p) => p.theme.alerts.success};
    }

    &.error {
        background: ${(p) => p.theme.alerts.error};
    }
`;
