export const ROUTE_PATHS = {
    home: "/",
    managedPortfolio: "/managed",
    cellar: "/managed/portfolio",
    account: "/account",
    invite: "/invite",
    login: "/login",
    signup: "/signup",
    deposit: "/deposit",
    transactions: "/managed/transactions",
    documentsPage: "/managed/documents",
    beforeYouRequest: "/before-you-liquidate-your-portfolio",
    liquidation: "/liquidation",
    scheduledWines: "/scheduled-wines",
    print: "/print",

    whyWine: "/why-wine",
    aboutUs: "/about-us",
    council: "/advisory-council",
    advisors: "/advisors",
    contactUs: "/contact-us",
    howItWorks: "/how-it-works",
    sustainability: "/sustainability",
    pricing: "/pricing",
    adSlider: "/advisory-council/:id",
    satisfaction: "/the-vinovest-satisfaction-guarantee",
    wineFutures: "/wine-futures",
    terms: "/terms-conditions",
    vinovestHome: "/home",
    vinovest100Index: "/vinovest-100-index",
    privacyPolicy: "/privacy-policy",
    careers: "/careers",
    contactSupport: "/contact-support",
    help: "/help",
    press: "/press",
    helpCategory: "/help-category",
    blog: "/blog",
    accessibility: "/accessibility",
    trading: "/trading",
    collections: "/trade/collections",
    community: "/community",
};

export const EXTERNAL_SERVICE_PATHS = {
    wine: "/trade",
    exchange: "/trade/collections",
};

export const REDIRECT_PATHS = {
    login: {
        paths: ["login"],
        options: {
            pathname: "/login",
            hard: true,
            isSecure: false,
            title: "Login",
            exact: true,
        },
    },
    signup: {
        paths: ["signup"],
        options: {
            pathname: "/signup",
            hard: true,
            isSecure: false,
            title: "Signup",
            exact: true,
        },
    },
    wine: {
        paths: ["/trade"],
        options: {
            pathname: EXTERNAL_SERVICE_PATHS.wine,
            hard: true,
            isSecure: false,
            title: "Explore Our Wines",
            exact: true,
        },
    },
    exchange: {
        paths: ["/trade/collections"],
        options: {
            pathname: EXTERNAL_SERVICE_PATHS.exchange,
            hard: true,
            isSecure: false,
            title: "Trade Wine At The Exchange",
            exact: true,
        },
    },
    support: {
        paths: ["/support", "/support-category"],
        options: {
            pathname: ROUTE_PATHS.help,
            hard: false,
            isSecure: false,
            title: "Get Help On Our Support Page",
            exact: true,
        },
    },
    managedOverview: {
        paths: ["/portfolio/managed"],
        options: {
            pathname: ROUTE_PATHS.managedPortfolio,
            hard: true,
            exact: true,
            title: "Managed Portfolio Overview",
        },
    },
    managedCellar: {
        paths: ["/portfolio/managed/cellar"],
        options: {
            pathname: ROUTE_PATHS.cellar,
            hard: true,
            exact: true,
            title: "Managed Portfolio Details",
        },
    },
    managedDocuments: {
        paths: ["/managed/documents/account_statements", "/portfolio/managed/documents/account_statements"],
        options: {
            pathname: ROUTE_PATHS.documentsPage,
            hard: true,
            exact: true,
            title: "Managed Statements",
        },
    },
    account: {
        paths: [ROUTE_PATHS.account],
        options: {
            pathname: ROUTE_PATHS.account,
            hard: true,
            exact: true,
            title: "Account Details",
        },
    },
    invite: {
        paths: [ROUTE_PATHS.invite],
        options: {
            pathname: ROUTE_PATHS.invite,
            hard: true,
            exact: true,
            title: "Invite a Friend",
        },
    },
};
