import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const Question = () => {
    const [done, setDone] = useState();

    useEffect(() => {
        setDone(false);
    }, []);

    const setAnswer = () => setDone(true);

    const { t } = useTranslation("support");

    return (
        <Wrapper>
            {done ? (
                <WithAnswerWrapper>{t("question.thank")}</WithAnswerWrapper>
            ) : (
                <QuestionWrapper>
                    <span>{t("question.wasHelpful")}</span> <button onClick={setAnswer}>👍</button>{" "}
                    <button onClick={setAnswer}>👎</button>
                </QuestionWrapper>
            )}
        </Wrapper>
    );
};

const Wrapper = styled.div`
    margin-top: 50px;
    margin-bottom: 15px;
`;

const QuestionWrapper = styled.div`
    display: flex;
    align-items: center;

    span {
        margin-right: 17px;
        font-family: Favoritmonostd, sans-serif;
        font-size: 14px;
        line-height: 18px;
        text-transform: uppercase;
    }

    button {
        position: relative;
        width: 50px;
        height: 50px;
        border: 1px solid #e6e6e6;
        border-radius: 50%;
        background-color: transparent;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 23px;
        margin-right: 8px;

        &:hover {
            cursor: pointer;
        }
    }
`;

const WithAnswerWrapper = styled.div`
    font-family: Favoritstd, sans-serif;
    color: #242e35;
    font-size: 20px;
    line-height: 160%;
    font-weight: 500;
    padding: 20px;
    background-color: #ebebeb;
    text-align: center;
`;

export default Question;
