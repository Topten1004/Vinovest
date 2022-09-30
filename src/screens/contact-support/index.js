import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react-lite";
import { useHistory } from "react-router-dom";
import { HeroTitle, HeroDescription } from "#shared/ui/Typography/styled";
import { useRootStore } from "#shared/hooks";
import MetaTagsReplacer from "#shared/components/MetaTagsReplacer";

const ContactSupport = observer(() => {
    const s = useRootStore();
    const [wasSubmitted, setWasSubmitted] = React.useState(false);

    const { t } = useTranslation("contact-support");

    const [fields, setFields] = React.useState({
        email: "",
        Name: "",
        Phone: "",
        Question: "",
    });

    const history = useHistory();

    const onChange = ({ target }) => setFields((f) => ({ ...f, [target.name]: target.value }));

    const onSubmit = (e) => {
        e.preventDefault();
        setWasSubmitted(true);
        s.tracking.gtm.contactUsForm({ ...fields, id: fields.email });
    };

    return (
        <ContactSupportContainer>
            <MetaTagsReplacer title={t("head-meta.title")} />

            <HeroTitle>{t("head.title")}</HeroTitle>
            <HeroDescription>{t("head.description")}</HeroDescription>

            {wasSubmitted ? (
                <HeroDescription className="thanksMessage">{t("form.thankYou")}</HeroDescription>
            ) : (
                <FormWrapper>
                    <form onSubmit={onSubmit}>
                        <label className="contact-form-label">{t("form.fullName")}</label>
                        <input
                            type="text"
                            className="contactInput"
                            maxLength="256"
                            placeholder={t("form.placeholderName")}
                            required
                            value={fields.Name}
                            name="Name"
                            onChange={onChange}
                        />
                        <label className="contact-form-label">{t("form.email")}</label>
                        <input
                            type="email"
                            className="contactInput"
                            maxLength="256"
                            placeholder={t("form.placeholderEmail")}
                            required
                            value={fields.email}
                            name="email"
                            onChange={onChange}
                        />
                        <label className="contact-form-label">{t("form.phoneNumber")}</label>
                        <input
                            type="tel"
                            className="contactInput"
                            maxLength="256"
                            data-name="Phone"
                            placeholder="(___) ___ - ____"
                            value={fields.Phone}
                            name="Phone"
                            onChange={onChange}
                        />
                        <label className="contact-form-label">{t("form.message")}</label>
                        <textarea
                            placeholder={t("form.placeholderMessage")}
                            maxLength="5000"
                            required
                            className="contactInput contact-form-textarea"
                            value={fields.Question}
                            name="Question"
                            onChange={onChange}
                        />
                        <input type="submit" value="SUBMIT" className="submit" />
                    </form>
                </FormWrapper>
            )}
            <Back onClick={() => history.push("/contact-us")}>
                <svg width="25" height="16" viewBox="0 0 25 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M8 15L1 8M1 8L8 1M1 8H23.5"
                        stroke="#242E35"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </Back>
        </ContactSupportContainer>
    );
});

const ContactSupportContainer = styled.div`
    padding: 120px 0 100px;
    color: #242e35;
    text-align: center;

    ${HeroTitle} {
        font-size: 64px;
        line-height: 70px;
        font-weight: 500;
        letter-spacing: 2px;
    }

    ${HeroDescription} {
        margin: 24px auto 40px;
        max-width: 550px;
        width: fit-content;
        font-family: Favoritstd, sans-serif;
        color: #242e35;
        font-size: 20px;
        line-height: 160%;
        font-weight: 500;

        padding-right: 40px;
        padding-left: 40px;

        &.thanksMessage {
            padding: 20px;
            text-align: center;
            max-width: 380px;
        }
    }
`;

const FormWrapper = styled.div`
    max-width: 462px;
    width: 100%;
    margin: 0 auto;
    text-align: left;
    padding-right: 40px;
    padding-left: 40px;

    .contactInput {
        height: 50px;
        margin-bottom: 22px;
        border: solid 1px #caccce;
        display: block;
        margin-bottom: 25px;
        background-color: #fff;
        font-family: VinovestMedium, sans-serif;
        font-weight: 400;
        padding: 8px 12px;
        outline: 0;
        width: 100%;
        color: #242424;
        font-size: 20px;

        &::placeholder {
            color: #a8abad;
            font-weight: 200;
            font-size: 16px;
            line-height: 26px;
            font-family: Favoritstd book, sans-serif;
        }
    }

    .contact-form-label {
        font-family: Favoritmonostd, sans-serif;
        font-size: 11px;
        line-height: 16px;
        font-weight: 500;
        letter-spacing: 0.7px;
        text-transform: uppercase;
        text-align: left;
        display: block;
        margin-bottom: 5px;
    }

    .contact-form-textarea {
        height: 150px;
    }

    .submit {
        width: 100%;
        height: 50px;
        padding-top: 9px;
        padding-bottom: 9px;
        font-family: Favoritmonostd, sans-serif;
        font-size: 16px;
        width: 100%;
        border-color: #a86d37;
        background-color: #a86d37;
        color: #fff;
        border: 0;
        outline: 0;
        transition: 0.3s;

        &:hover {
            opacity: 0.7;
            cursor: pointer;
        }
    }
`;

const Back = styled.button`
    position: fixed;
    width: 60px;
    height: 60px;
    left: 7.749vw;
    top: 40%;
    border: 2px solid #eeeeee;
    box-sizing: border-box;
    background: transparent;
    outline: 0;

    &:hover {
        cursor: pointer;
    }

    @media screen and (max-width: 1024px) {
        left: 2.749vw;
    }

    @media screen and (max-width: 1023px) {
        position: fixed;
        z-index: 999;
        top: 0;
        height: 80px;
        left: 10px;
        background: white;
        border: 0;
    }
`;

export default ContactSupport;
