import { OktaAuth } from "@okta/okta-auth-js";
import config from "../app.config";
const oktaAuthInstance = new OktaAuth({
    pkce: config.pkce,
    redirectUri: config.redirectUri,
    clientId: config.clientId,
    issuer: config.issuer,
    scopes: config.scopes,
    restoreOriginalUri: async (oktaAuth, originalUri) => {
        const exchangePaths = [
            "fonts",
            "styles",
            "_next",
            "wine",
            "collections",
            "trade",
            "portfolio(?!(\\/managed))",
            "compare",
            "add-funds",
            "deposit",
        ];

        const exchangePathsRegex = new RegExp(`^\\/(${exchangePaths.join("|")}).*`);


        if (exchangePathsRegex.test(originalUri)) {
            window.location.assign(originalUri);
            return;
        }
        window.location.assign("/");
    },
});

export default oktaAuthInstance;
