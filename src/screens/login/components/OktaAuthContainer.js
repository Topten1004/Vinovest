/* eslint-disable no-nested-ternary */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router";
import { useOktaAuth } from "@okta/okta-react";
import { Login } from "./styled";
import OktaAuthLogin from "./OktaAuthLogin";
import OktaAuthRegister from "./OktaAuthRegister";
import OktaAuthReset from "./OktaAuthReset";
import OktaAuthCheck from "./OktaAuthCheck";

const OktaAuthContainer = ({ onSuccess, onError, setLoginStep }) => {
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const [renderCondition, setRenderCondition] = useState(0);
    const { oktaAuth } = useOktaAuth();
    const isSignup = location.pathname.endsWith("/signup");

    return (
        <Login isSignup={isSignup}>
            {renderCondition === 0 ? (
                location.pathname.endsWith("/login") ? (
                    <OktaAuthLogin
                        loading={loading}
                        setLoading={setLoading}
                        oktaAuth={oktaAuth}
                        onSuccess={onSuccess}
                        onError={onError}
                    />
                ) : location.pathname.endsWith("/signup") ? (
                    <OktaAuthRegister
                        loading={loading}
                        setLoading={setLoading}
                        oktaAuth={oktaAuth}
                        onSuccess={onSuccess}
                        onError={onError}
                        setLoginStep={setLoginStep}
                    />
                ) : (
                    <OktaAuthReset
                        loading={loading}
                        setLoading={setLoading}
                        oktaAuth={oktaAuth}
                        setRenderCondition={setRenderCondition}
                    />
                )
            ) : (
                <OktaAuthCheck oktaAuth={oktaAuth} setRenderCondition={setRenderCondition} />
            )}
        </Login>
    );
};

OktaAuthContainer.propTypes = {
    onSuccess: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired,
};

export default React.memo(OktaAuthContainer);
