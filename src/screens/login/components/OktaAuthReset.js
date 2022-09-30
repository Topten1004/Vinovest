import React, { useState } from "react";
import { emailValidator } from "#utils/shared";
import { useCreateRoutingCallback } from "#shared/hooks";
import PulseLoader from "react-spinners/PulseLoader";
import {
    AuthContainer,
    AuthHeaderTitleLabel,
    AuthSubtitleLabel,
    Input,
    AuthAddonLabel,
    SubmitButton,
    AuthErrorLabel,
} from "./styled";
import { useTranslation } from "react-i18next";

const OktaAuthReset = ({ loading, setLoading, oktaAuth, setRenderCondition }) => {
    const { t } = useTranslation("login");

    const routeTo = useCreateRoutingCallback();
    const [email, setEmail] = useState("");
    const [emailInvalid, setEmailInvalid] = useState({ input: false, msg: "" });

    const enterKeyPress = (event) => {
        if (event.keyCode === 13) {
            handleSubmit();
        }
    };

    const handleSubmit = async () => {
        if (email === "") {
            setEmailInvalid({ input: true, msg: t("okta-reset.email-empty") });
            return;
        }
        if (!emailValidator(email)) {
            setEmailInvalid({
                input: true,
                msg: t("okta-reset.email-invalid"),
            });
            return;
        }
        setLoading(true);

        oktaAuth
            .forgotPassword({
                username: email,
                factorType: "EMAIL",
            })
            .then((transaction) => {
                setLoading(false);
                setRenderCondition(1);
            })
            .catch((err) => {
                setLoading(false);
                setEmailInvalid({ input: true, msg: err.errorSummary });
            });
    };

    return (
        <AuthContainer>
            <AuthHeaderTitleLabel as="h1">{t("okta-reset.title")}</AuthHeaderTitleLabel>
            <AuthSubtitleLabel>{t("okta-reset.message")} </AuthSubtitleLabel>
            <Input
                placeholder={t("okta-reset.email-placeholder")}
                type="text"
                value={email}
                onKeyDown={enterKeyPress}
                onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailInvalid({ input: false, msg: "" });
                }}
                isInvalid={emailInvalid.input}
            />
            <AuthErrorLabel isValid={!emailInvalid}>{emailInvalid.msg}</AuthErrorLabel>
            <div style={{ marginTop: "30px" }}>
                <AuthAddonLabel onClick={() => routeTo("/login")}>{t("okta-reset.button-back")}</AuthAddonLabel>
            </div>
            <SubmitButton disabled={loading} onClick={handleSubmit}>
                {loading ? (
                    <PulseLoader size={8} margin="10px" color="#828282" loading={loading} />
                ) : (
                    t("okta-reset.button-submit")
                )}
            </SubmitButton>
        </AuthContainer>
    );
};

export default OktaAuthReset;
