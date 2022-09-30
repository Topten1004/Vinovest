import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import MainButton from "#shared/ui/Button/MainButton.styled";
import { useCreateRoutingCallback } from "#shared/hooks";
import { EmailCaptureCookie } from "#utils/constants";

const QuickSignUpForm = ({ embed }) => {
    const { t } = useTranslation(["blog"]);
    const [email, setEmail] = React.useState("");
    const redirectToSignUpCB = useCreateRoutingCallback("/signup", { refresh: true });

    const onSubmit = (e) => {
        e.preventDefault();
        document.cookie = `${EmailCaptureCookie.KEY}=${email};domain=${EmailCaptureCookie.CONFIG.domain};path=${EmailCaptureCookie.CONFIG.path};`;
        setEmail("");
        redirectToSignUpCB();
    };

    return (
        <QuickSignUp topGup={!embed ? 1 : 0}>
            <QuickSignUpTitle>{t("reading-position-bar.title")}</QuickSignUpTitle>
            {embed && <QuickSignUpParagraph>{t("reading-position-bar.paragraph")}</QuickSignUpParagraph>}
            <QuickForm onSubmit={onSubmit}>
                <EmailInput
                    required
                    type="email"
                    placeholder={t("reading-position-bar.emailPlaceholder")}
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                />
                <ContinueBtn>{t("reading-position-bar.getStarted")}</ContinueBtn>
            </QuickForm>
        </QuickSignUp>
    );
};

const QuickSignUp = styled.div`
    border: 1px solid #d8d8d8;
    padding: 16px 15px 25px;
    color: #242e35;
    ${({ topGup }) => topGup && "margin-top: 50px;margin-bottom: 30px;"}
`;

const QuickSignUpTitle = styled.h3`
    margin: 0;
    padding: 0;
    font-family: RoslindaleDisplayCondensed;
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 32px;
`;

const QuickSignUpParagraph = styled.h3`
    margin: 0;
    margin-top: 11px;
    padding: 0;
    font-family: VinovestMedium;
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    line-height: 18px;
    display: flex;
    align-items: center;
`;

const QuickForm = styled.form`
    display: flex;
    margin-top: 20px;
`;

export const ContinueBtn = styled(MainButton)`
    width: fit-content;
    height: 40px;
    font-size: 10px;
    line-height: 18px;
    min-width: 95px;

    @media screen and (min-width: 1233px) and (max-width: 1400px) {
        min-width: 85px;
        white-space: nowrap;
    }
`;

export const EmailInput = styled.input`
    padding: 8px 15px;
    border: 2px solid #242424;
    font-size: 12px;
    line-height: 21px;
    width: 100%;
    height: 40px;
    color: #242e35;
    margin-right: 11px;
    outline: 0;

    ::placeholder,
    ::-webkit-input-placeholder {
        color: #242e35;
    }
`;

export default QuickSignUpForm;
