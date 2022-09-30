const fs = require("fs");

/** This file simplifies different versions of environmental variables between
 *  different NODE_ENV values. To add secrets (e.g. API Keys) just create a
 * standard .env file and the values will be appended.*/
const env = {
    development: {
        APP_ENV: "development",
        NODE_ENV: "development",
        APP_GTM_APPEND: "&gtm_auth=SeQn2y1k4L29iN6zePLw9Q&gtm_preview=env-7&gtm_cookies_win=x",
        APP_SENTRY_TRACING_RATE: 0.0,
       OKTA_ISSUER: "https://dev-404044.okta.com/oauth2/default"
    },
    production: {
        APP_ENV: "production",
        APP_GTM_APPEND: "&gtm_auth=NCzhHiWC1oB__WBmtY27CA&gtm_preview=env-1&gtm_cookies_win=x",
        APP_SENTRY_TRACING_RATE: 0.05,
        NODE_ENV: "production",
        OKTA_ISSUER: "https://vinovest.okta.com/oauth2/aus1w5vycgzymXjSh357"
    },
    local : {
        APP_ENV: "local",
        NODE_ENV: "development",
        APP_GTM_APPEND: "&gtm_auth=SeQn2y1k4L29iN6zePLw9Q&gtm_preview=env-7&gtm_cookies_win=x",
        APP_SENTRY_TRACING_RATE: 0.2,
        OKTA_ISSUER: "https://dev-404044.okta.com/oauth2/default"
    },
    staging: {
        APP_ENV: "staging",
        APP_GTM_APPEND: "&gtm_auth=NCzhHiWC1oB__WBmtY27CA&gtm_preview=env-1&gtm_cookies_win=x",
        APP_SENTRY_TRACING_RATE: 0.05,
        NODE_ENV: "production",
        OKTA_ISSUER: "https://dev-404044.okta.com/oauth2/default"
    },
    test: {
        APP_ENV: "test",
        NODE_ENV: "test",
        APP_GTM_APPEND: "&gtm_auth=SeQn2y1k4L29iN6zePLw9Q&gtm_preview=env-7&gtm_cookies_win=x",
        APP_SENTRY_TRACING_RATE: 0.0,
        OKTA_ISSUER: "https://dev-404044.okta.com/oauth2/default"
    },
};

if (fs.existsSync("./.env")) {
    const secrets = fs.readFileSync("./.env", { encoding: "utf-8" });
    const parsedSecrets = secrets.split("\n").reduce((acc, curr) => {
        const [key, val] = curr.split("=");
        acc[key] = val;
        return acc;
    }, {});
    const { NODE_ENV } = process.env;
    if (!env[NODE_ENV]) throw new Error("Your node environment needs to be one of: development, production, test");
    env[NODE_ENV] = { ...env[NODE_ENV], ...parsedSecrets };
}

module.exports = env;
