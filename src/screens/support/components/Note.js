import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const Note = () => {
    const { t } = useTranslation("support");

    return (
        <Wrapper>
            <h3>{t("note.title")}</h3>
            <p>
            {t("note.text1")} <span>{t("note.text2")}</span> {t("note.text3")}
            </p>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    margin-top: 90px;
    padding: 34px 48px;
    background-color: #eee;

    h3 {
        margin-bottom: 10px;
        font-weight: 400;
        font-family: Favoritmonostd, sans-serif;
        font-size: 16px;
        line-height: 26px;
        letter-spacing: 1px;
    }

    p {
        font-size: 14px;
        line-height: 21px;
        margin-top: 0;
        margin-bottom: 10px;
        font-family: Favoritstd, sans-serif;
        color: #242e35;
        font-weight: 500;

        span {
            color: #a86d37;
        }
    }
`;

export default Note;
