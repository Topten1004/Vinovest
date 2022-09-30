import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { showDateAgo } from "../utils";

const AuthorDate = ({ isBig, author, date, full }) => {
    const { t } = useTranslation(["blog"]);

    return (
        <AuthorDateWrapper className={`${isBig ? "isBig" : ""}`}>
            {t("utils.by")} {author}
            {date && (
                <>
                    <span className="divider">/</span> {`${showDateAgo(date, full)}`}
                </>
            )}
        </AuthorDateWrapper>
    );
};

export const AuthorDateWrapper = styled.div`
    font-family: VinovestMono;
    color: #606060;
    font-size: 12px;
    line-height: 20px;
    font-weight: 500;
    text-transform: uppercase;

    &.isBig {
        font-size: 14px;
        line-height: 22px;
        padding: 35px 0;
    }

    .divider {
        padding: 0 8px;
    }
`;

export default AuthorDate;
