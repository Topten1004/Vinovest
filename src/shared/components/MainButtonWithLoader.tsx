import React, { memo } from "react";
import styled from "styled-components";
import PulseLoader from "react-spinners/PulseLoader";
import { MainButton } from "../ui/Button";

interface MainButtonWithLoaderProps {
    isLoading?: boolean;
    disabled?: boolean;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    CTA: string;
    type?: string;
}

export const MainButtonWithLoader = memo(({ isLoading, disabled, onClick, CTA, type }: MainButtonWithLoaderProps) => (
    <MainButtonWithMargins disabled={isLoading || disabled} onClick={onClick} type={type}>
        {isLoading ? <PulseLoader size={8} margin="10px" color="#828282" loading={isLoading} /> : CTA}
    </MainButtonWithMargins>
));

const MainButtonWithMargins = styled(MainButton)`
    margin-top: 32px;
    @media screen and (min-width: 768px) {
        margin-top: 40px;
        max-width: initial;
    }
`;
