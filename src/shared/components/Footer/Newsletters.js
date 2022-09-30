/* eslint-disable react/button-has-type */
import React from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import { FooterTitle } from "./styles";
import { useRootStore } from "#shared/hooks";

const Newsletters = observer(() => {
    const s = useRootStore();
    const {t} = useTranslation('footer');
    const [email, setEmail] = React.useState("");
    const [isSubscribed, setIsSubscribed] = React.useState(false);

    const onChange = ({ target }) => {
        setEmail(target.value);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        s.tracking.gtm.footerNewsletter({ email, id: email });
        setEmail("");
        setIsSubscribed(true);
    };

    return (
        <NewslettersWrapper>
            <FooterTitle>{t('newsletter.title')}</FooterTitle>

            <NewsletterInputWrapper onSubmit={onSubmit}>
                {isSubscribed ? (
                    <div className="isSubscribed">
                        {t('newsletter.subscribed')}
                    </div>
                ) : (
                    <>
                        <input placeholder={t('newsletter.email')} value={email} onChange={onChange} type="email" required />
                        <button>
                            <svg
                                width="35"
                                height="22"
                                viewBox="0 0 35 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <line x1="8.74228e-08" y1="11" x2="32" y2="11" stroke="#242E35" strokeWidth="2" />
                                <path d="M23 1L33 11L23 21" stroke="#242E35" strokeWidth="2" />
                            </svg>
                        </button>
                    </>
                )}
            </NewsletterInputWrapper>
        </NewslettersWrapper>
    );
});

const NewslettersWrapper = styled.div`
    padding-top: 28px;
    padding-bottom: 47px;
    padding-left: 66px;

    ${FooterTitle} {
        margin-bottom: 17px;
    }

    @media screen and (max-width: 1300px) {
        padding-left: 30px;
    }

    @media screen and (max-width: 1024px) {
        padding-top: 29px;
    }

    @media screen and (max-width: 767px) {
        padding-left: 0;
        padding-top: 54px;
        padding-bottom: 40px;

        ${FooterTitle} {
            margin-bottom: 22px;
        }
    }
`;

const NewsletterInputWrapper = styled.form`
    max-width: 371px;
    width: 100%;
    height: 60px;
    border: 1px solid #fae8d1;
    display: flex;
    position: relative;

    @media screen and (max-width: 767px) {
        max-width: 100%;
    }

    .isSubscribed {
        background-color: #fae8d1;
        color: #242e35;
        font-size: 16px;
        line-height: 16px;
        text-align: center;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    input {
        padding: 16px 24px;
        width: calc(100% - 60px);
        height: 100%;
        outline: 0;
        border: 0;
        flex-shrink: 1;
        background: transparent;
        font-family: VinovestMedium;
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 26px;
        color: #fae8d1;

        &::placeholder {
            font-family: VinovestMedium;
            font-style: normal;
            font-weight: 500;
            font-size: 16px;
            line-height: 26px;
            color: #fae8d1;
        }
    }

    button {
        width: 60px;
        height: 100%;
        flex-shrink: 0;
        outline: 0;
        border: 0;
        background: #fae8d1;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: 0.3s;

        &:hover {
            cursor: pointer;
            opacity: 0.8;
        }
    }
`;
export default Newsletters;
