import * as React from "react";
import { Route } from "react-router-dom";
import { SecureRoute } from "@okta/okta-react";
import { ErrorBoundary } from "@sentry/react";
import VinovestErrorBoundary from "#shared/components/ErrorBoundary";

const RouteFactory = ({ isSecure = false, isProtected = () => false, redirectTo = "/", ...props }): JSX.Element => {
    const Component = isSecure ? SecureRoute : Route;

    return (
        <ErrorBoundary
            fallback={({ error, componentStack, resetError }) => (
                <VinovestErrorBoundary error={error} resetError={resetError} />
            )}
        >
            <Component {...props} />
        </ErrorBoundary>
    );
};

export default RouteFactory;
