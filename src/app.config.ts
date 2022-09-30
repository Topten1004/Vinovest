import i18n from "i18next";
import { routeMapping } from "#localization/constants";

const localeRoute = routeMapping[i18n.language];
export interface IAppConfig {
    [key: string]: string | boolean | object;
    calendly?: {
        url: string;
        contactUsPageUrl: string;
        ceoUrl: string;
        wineExpertsUrl: string;
        huntervino: string;
        rebalancing: string;
    };
    ssoOidcRedirectConfig: {
        display: string;
        response_type: string;
        code_challenge: string;
        code_challenge_method: string;
        response_mode: string;
        scope: string;
        state: string;
        nonce: string;
    };
    feature?: {
        [key: string]: { enabled: boolean };
    };
    plaid?: {
        [key: string]: string;
    };
    sentry?: {
        [key: string]: string | number | (string | RegExp)[];
    };
    clientSettings?: {
        [key: string]: string | number | (string | RegExp)[];
    };
}
const locationPaths = {
    zh: true,
};
const path = window.location.pathname.split("/")[1];
const config: IAppConfig = {
    env: process.env.APP_ENV,
    issuer: "https://dev-404044.okta.com/oauth2/default",
    redirectUri: `${window.location.origin}${localeRoute ? `/${localeRoute}` : ""}/implicit/callback`,
    pkce: true,
    clientId: "0oa1gna6qqVVU3cGE357",

    scopes: ["openid", "profile", "email"],
    baseUrl: "https://dev-404044.okta.com",
    googleID: "0oa1iwssveTtDBwAv357",
    appleID: "0oad8s4y66Vgl8hQE357",
    ssoOidcRedirectConfig: {
        display: "page",
        response_type: "code",
        code_challenge: "qjrzSW9gMiUgpUvqgEPE4_-8swvyCtfOVvg55o5S_es",
        code_challenge_method: "S256",
        response_mode: "fragment",
        scope: "openid%20email%20profile",
        state: "WM6D",
        nonce: "YsG76j5",
    },
    apiEndpoint: "https://api.staging.vinovest.co",
    authServerID: null,
    calendly: {
        url: "https://calendly.com/vinovest/30min",
        contactUsPageUrl: "https://calendly.com/vinovestofficial/video-chat-with-vinovest-contact-us-page",
        ceoUrl: "https://calendly.com/vinovestofficial/video-call-with-vinovest-ceo-portfolio-advisor",
        wineExpertsUrl: "https://calendly.com/vinovest-team",
        huntervino: "https://calendly.com/huntervino/30min",
        rebalancing: "https://calendly.com/vinovestofficial/video-chat-with-vinovest-rebalancing",
    },
    stripeKey: "pk_test_KzpJ36ubFFlECuzf5eMVGz5H00esyPcPve",
    stripeKeyHK:
        "pk_test_51IalaDCWE2NiMXitFOiJ5EvVPfwX7lCttKLGBgOJLQkR13BLtGJN9BSSTmcEpSeDuGsUhvJpXxLORFMQ6vrXF7J700rCxwa4nM",
    feature: {
        accountValueGraph: { enabled: true },
        transactionsFeed: { enabled: true },
    },
    sentry: {
        dsn: "https://874883e6a8074ce681af16a8b8023df8@o344696.ingest.sentry.io/1895886",
        release: `web@${process.env.APP_RELEASE_TAG_OR_BRANCH_NAME}`,
        tracesSampleRate: Number(process.env.APP_SENTRY_TRACING_RATE),
        tracingOrigins: ["localhost", /.*vinovest.co.*/, /vinovest-web.*releaseapp.io/],
    },
    wineImagesBase: "https://staging-wine-images.s3-us-west-2.amazonaws.com/lwins",
    postHogKey: "v5luq5ViV_wnJ-jXntlKWNl0-9Vt3jSJOmZhSmzqH54",
    contentfulSpace: "zpx0hfp3jryq",
    contentfulAccessToken: "iHuWz8MmcL9GGDzNQMXX-dgQRy24BtE8o2HFZbS6l-Q",
    contentfulEnvironment: "prod-2020-12-22",
    sentryTag: process.env.SENTRY_TAG,
    algoliaSearchId: "CCOI1HW5Z1",
    algoliaSearchKey: "818a2bb30afaf66441d7c5e916a5b96b",
    algoliaSearchIndex: "prod_Contentful_Help",
    saveLastRouterPaths: "saveLastRouterPaths",
    optInBlogCampaign: "g9xfva37wfbtsxdew3re",
    impactURL: "https://api.impact.com/Advertisers/IRKoruE2tBoL2983667mEn622w64iw7bX1/Conversions?CampaignId=14416",
    strapiURL: "https://cdn4vest.com",
    strapiAccessToken: "q2HYWg93innfaCkwEuEH2yZKmxkAnrtwYK8gDXLcFFi",
    singualrAPIKey: "vinovest_c19743cf",
    singualrSecretKey: "4ac4dd62c53fbb32747289bf54660e20",
    singularProductId: "co.vinovest.staging",
    singularBaseLink: "https://vinovest-staging.sng.link/Aiwio/6apq?_dl=vinovest%3A%2F%2F&_smtype=3"
};
if (process.env.APP_ENV === "local") {
    config.apiEndpoint = "http://localhost:8080";
    config.singularBaseLink = "https://vinovest-debug.sng.link/Aclvt/elir?_dl=vinovest%3A%2F%2F&_smtype=3";
}
if (process.env.APP_ENV === "production") {
    config.env = "production";
    config.issuer = "https://vinovest.okta.com/oauth2/aus1w5vycgzymXjSh357";
    config.clientId = "0oa1w5q6ihvbriWcs357";
    config.baseUrl = "https://vinovest.okta.com";
    config.googleID = "0oa1w8go0eH9KHVbl357";
    config.appleID = "0oad8s8rj8l2tqHtb357";
    config.apiEndpoint = "https://api.vinovest.co";
    config.authServerID = "aus1w5vycgzymXjSh357";
    config.calendly.url = "https://calendly.com/vinovestofficial/video-call-with-vinovest-ceo-portfolio-advisor";
    config.stripeKey = "pk_live_n3KgC7LCzIU7ha5c0r0Eqk2s00VMmaNSaW";
    config.stripeKeyHK =
        "pk_live_51IalaDCWE2NiMXitXK5z67grUYj98WYEIMG9nxbfLfP3iQ5oPMWvPpvaTVjoO1fHluik00h5ogNdc4P4xODXKJkb006ZK5VLEt";
    config.wineImagesBase = "https://prod-wine-images.s3-us-west-2.amazonaws.com/lwins";
    config.postHogKey = "S-vQXo_K_76bZrF9bW4lltHL874rQalMNv_jd6UJoEA";

    config.feature.accountValueGraph.enabled = true;
    config.feature.transactionsFeed.enabled = true;
    config.contentfulSpace = "zpx0hfp3jryq";
    config.contentfulAccessToken = "iHuWz8MmcL9GGDzNQMXX-dgQRy24BtE8o2HFZbS6l-Q";
    config.contentfulEnvironment = "prod-2020-12-22";
    config.algoliaSearchId = "CCOI1HW5Z1";
    config.algoliaSearchKey = "818a2bb30afaf66441d7c5e916a5b96b";
    config.algoliaSearchIndex = "prod_Contentful_Help";
    config.singularProductId = "co.vinovest";
    config.singularBaseLink = "https://vinovest.sng.link/A1wqt/qt4z?_dl=vinovest%3A%2F%2F&_smtype=3";
}

export default config;
