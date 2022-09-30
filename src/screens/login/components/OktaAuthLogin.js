import React, { useState, useEffect } from "react";
import _ from "lodash";
import PulseLoader from "react-spinners/PulseLoader";
import { useTranslation } from "react-i18next";
import { useCreateRoutingCallback } from "#shared/hooks";
import { emailValidator } from "#utils/shared";
import {
    AuthContainer,
    AuthHeaderTitleLabel,
    OrLabel,
    Input,
    AuthAddonLabel,
    SubmitButton,
    AuthErrorLabel,
} from "./styled";
import GoogleSigninWidget from "./GoogleButton";
import AppleSigninWidget from "./AppleButton";
import { AUTH_TYPE, languageCodeEnglish } from "#utils/constants";

const OktaAuthLogin = ({ loading, setLoading, oktaAuth, onSuccess }) => {
    const { t } = useTranslation("login");

    const routeTo = useCreateRoutingCallback();
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [emailInvalid, setEmailInvalid] = useState({ input: false, msg: "" });
    const [passwordInvalid, setPasswordInvalid] = useState({ input: false, msg: "" });

    useEffect(() => {
        localStorage.removeItem("signup_quiz");
    }, []);

    const enterKeyPress = (event) => {
        if (event.keyCode === 13) {
            handleLogin();
        }
    };

    const handleLogin = async () => {
        localStorage.setItem("signFrom", "normal");

        if (name === "") {
            setEmailInvalid({ input: true, msg: t("okta-login.empty-email") });
            return;
        }

        if (password === "") {
            setPasswordInvalid({ input: true, msg: t("okta-login.invalid-password") });
            return;
        }

        if (!emailValidator(name)) {
            setEmailInvalid({
                input: true,
                msg: t("okta-login.invalid-email"),
            });
            return;
        }

        setLoading(true);

        oktaAuth
            .signInWithCredentials({
                username: name,
                password,
            })
            .then((res) => {
                localStorage.setItem(AUTH_TYPE.KEY, AUTH_TYPE.LOGIN);

                setLoading(false);
                onSuccess(res);
            })
            .catch((err) => {
                setLoading(false);
                if (err.errorCode === "E0000004") {
                    setPasswordInvalid({
                        fInput: true,
                        msg: t("okta-login.fail-login"),
                    });
                } else {
                    setPasswordInvalid({
                        fInput: t("okta-login.fail-login"),
                    });
                }
            });
    };

    return (
        <AuthContainer>
            <AuthHeaderTitleLabel as="h1">{t("okta-login.button-login")}</AuthHeaderTitleLabel>
            <GoogleSigninWidget type={AUTH_TYPE.LOGIN} />
            {languageCodeEnglish && <AppleSigninWidget type={AUTH_TYPE.LOGIN} />}
            <OrLabel>{t("okta-login.or")}</OrLabel>
            <Input
                placeholder={t("okta-register.email")}
                type="text"
                value={name}
                onKeyDown={enterKeyPress}
                onChange={(e) => {
                    setName(e.target.value);
                    setEmailInvalid({ input: false, msg: "" });
                }}
                isInvalid={emailInvalid.input}
            />
            <AuthErrorLabel>{emailInvalid.msg}</AuthErrorLabel>
            <Input
                placeholder={t("okta-register.password")}
                type="password"
                value={password}
                onKeyDown={enterKeyPress}
                onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordInvalid({ input: false, msg: "" });
                }}
                isInvalid={passwordInvalid.input}
            />
            <AuthErrorLabel isValid={_.isEmpty(passwordInvalid.msg)}>{passwordInvalid.msg}</AuthErrorLabel>
            <div style={{ marginTop: "30px" }}>
                <AuthAddonLabel onClick={() => routeTo("/signup", { refresh: true })}>
                    {t("okta-login.button-create")}
                </AuthAddonLabel>
                <AuthAddonLabel style={{ float: "right" }} onClick={() => routeTo("/reset_password")}>
                    {t("okta-login.button-forgot")}
                </AuthAddonLabel>
            </div>
            <SubmitButton disabled={loading} onClick={handleLogin}>
                {loading ? (
                    <PulseLoader size={8} margin="10px" color="#828282" loading={loading} />
                ) : (
                    t("okta-login.button-login")
                )}
            </SubmitButton>
        </AuthContainer>
    );
};

export default OktaAuthLogin;
