import React from "react";
import styled from "styled-components";
import { ModalBase } from "#shared/components/ModalBase";

const modalBaseStyles = `
    background: transparent;
    border-radius: 0px;
    box-shadow: none;
    width: 100%;
    max-width: 400px;
    margin: auto;

    .closeIcon {
        top: 31px;
        right: 31px
    }

`;

const ModalWrapper = ({ children, onClose }) => (
    <>
        <ModalBase isOpen onClose={onClose} borderRadius={0} additionalStyles={modalBaseStyles}>
            <ModalContainer>{children}</ModalContainer>
        </ModalBase>
    </>
);

const ModalContainer = styled.div`
    width: 100%;
    padding: 11px;
    margin: 0 auto;
    border-radius: 0px;
`;

export default ModalWrapper;
