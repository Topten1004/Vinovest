import React from "react";
import styled from "styled-components";
import { ModalBase } from "#shared/components/ModalBase";
import Slider from "./slider";

const modalBaseStyles = `
    background: transparent;
    border-radius: 0px;
    box-shadow: none;

    .closeIcon {
        top: 73px;
    }
    
    @media screen and (max-width: 1023px) { 
        max-width: 600px; 
        width: 100%;
        padding: 0 17px;
        background: transparent;
        box-shadow: none;

        .closeIcon {
            right: 40px;
        }
    }
`;

const WineCellarModal = ({ wines, closeModal, goToSlide, fetchWinesData }) => (
    <>
        <ModalBase isOpen onClose={closeModal} borderRadius={0} additionalStyles={modalBaseStyles}>
            <ModalContainer>
                <Slider wines={wines} goToSlide={goToSlide} fetchWinesData={fetchWinesData} closeModal={closeModal} />
            </ModalContainer>
        </ModalBase>
    </>
);

const ModalContainer = styled.div`
    width: 904px;
    margin: 0 auto;
    border-radius: 0px;

    @media screen and (max-width: 1023px) {
        width: 100%;
    }
`;

export default WineCellarModal;
