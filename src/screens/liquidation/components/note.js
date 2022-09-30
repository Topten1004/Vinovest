import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const Note = ({ children }) => {
    const { t } = useTranslation();
    return (
        <NoteLabel>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M1 12C1 5.92487 5.92487 1 12 1V1C18.0751 1 23 5.92487 23 12V12C23 18.0751 18.0751 23 12 23V23C5.92487 23 1 18.0751 1 12V12Z"
                    stroke="#4F81B0"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path d="M12 7V13" stroke="#4F81B0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 16V17" stroke="#4F81B0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

            <div>{children}</div>
        </NoteLabel>
    );
};

const NoteLabel = styled.label`
    margin: 11px 0;
    display: flex;
    max-width: 620px;
    width: 100%;
    min-height: 69px;
    align-items: center;
    padding: 24px 22px;
    background: #edf6ff;
    border-radius: 4px;
    font-family: VinovestMono;
    font-style: normal;
    font-weight: normal;
    font-size: 11px;
    line-height: 16px;
    letter-spacing: 0.025em;
    text-transform: uppercase;
    color: #242e35;

    svg {
        width: 22px;
        height: 22px;
        margin-right: 16px;
        flex-shrink: 0;
    }

    div {
        width: 100%;

        a {
            color: #a86d37;
            text-decoration: none;
        }
    }
`;

export default Note;
