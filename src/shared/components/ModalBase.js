/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useCallback, useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import closeIconSvg from "#assets/shared/close-icon.svg";

const modalRoot = document.getElementById("modal-root");

export const ModalBase = ({ isOpen, onClose, children, additionalStyles }) => {
    const [fadeType, setFadeType] = useState(null);

    const background = useRef();

    const onTransitionEnd = useCallback(
        (e) => {
            if (e.propertyName !== "opacity" || fadeType === "in") return;
            if (fadeType === "out") {
                onClose();
            }
        },
        [fadeType, onClose],
    );

    const handleCloseModalClick = useCallback((e) => {
        e.preventDefault();
        setFadeType("out");
    }, []);

    const onEscKeyDown = useCallback((e) => {
        if (e.key !== "Escape") return;
        setFadeType("out");
    }, []);

    useEffect(() => {
        const body = document.querySelector("body");
        body.style.overflow = "hidden";
        window.addEventListener("keydown", onEscKeyDown, false);
        setFadeType(isOpen ? "in" : "out");
        return () => {
            body.style.overflow = "initial";
            window.removeEventListener("keydown", onEscKeyDown, false);
        };
    }, [isOpen, onEscKeyDown]);

    return ReactDOM.createPortal(
        <StyledModal
            className={`fade-${fadeType}`}
            onTransitionEnd={onTransitionEnd}
            additionalStyles={additionalStyles}
        >
            <div className="box-dialog">
                <CloseIcon src={closeIconSvg} onClick={handleCloseModalClick} className="closeIcon" />
                {children}
            </div>
            <div className="background" onMouseDown={handleCloseModalClick} ref={background} />
        </StyledModal>,
        modalRoot,
    );
};

const StyledModal = styled.div`
    position: fixed; //TODO:
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity linear 0.15s;
    z-index: 10000;

    margin: 40px auto;

    &.fade-in {
        opacity: 1;
        transition: opacity linear 0.15s;
    }
    &.fade-out {
        opacity: 0;
        transition: opacity linear 0.15s;
    }
    .box-dialog {
        position: relative;
        z-index: 1050;
        background-color: #fefefe;
        box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);
        border-radius: 4px;
        ${(p) => p.additionalStyles}
    }
    .background {
        background: rgba(0, 0, 0, 0.5);
        position: fixed;
        z-index: 1040;
        display: block;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        outline: 0;
    }
`;

const CloseIcon = styled.img`
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
    z-index: 100;
    @media (max-width: 768px) {
        top: 30px;
    }
`;
