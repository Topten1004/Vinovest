import { lazy } from "react";
import ImplicitCallback from "#shared/components/ImplicitCallback";
import Home from "./home";
import NotFound from "./404";
import { ROUTE_PATHS, REDIRECT_PATHS } from "./route-paths";
import { useCreateRoutingCallback } from "#shared/hooks";
import { withAuthentication } from "#shared/components/withAuthentication";
import { withReloadOnNavigate } from "#shared/components/withReloadOnNavigate";

const OverviewPage = lazy(() => import("./overview"));
const OnboardUser = lazy(() => import("./login/NewUser/AccountCreation"));
const InvestorProfile = lazy(() => import("./login/NewUser/InvestorProfile"));
const LoginPage = lazy(() => import("./login"));

const Cellar = lazy(() => import("./cellar"));
const ChartPage = lazy(() => import("./chart")); // unused - keep for example recharts implementation

/** v2 */
const InvitePage = lazy(() => import("./invite").then((InvitePage) => InvitePage));
const AccountPage = lazy(() => import("./account"));
const RootDepositPage = lazy(() => import("./deposit").then((RootDepositPage) => RootDepositPage));
const TransactionsPage = lazy(() => import("./transactions").then((TransactionsPage) => TransactionsPage));

const DocumentsPage = lazy(() => import("./documents").then((DocumentsPage) => DocumentsPage));
const Liquidation = lazy(() => import("./liquidation"));
const BeforeYouRequest = lazy(() => import("./liquidation/components/before-you-request"));
const FeedbackOptions = lazy(() => import("./liquidation/components/feedback-options"));

const AboutUs = lazy(() => import("./about-us"));
const WhyWinePage = lazy(() => import("./why-wine"));
const Advisors = lazy(() => import("./advisors/index.js"));
const ContactUs = lazy(() => import("./contact-us"));
const HowItWorksPage = lazy(() => import("./how-it-works"));
const SustainabilityPage = lazy(() => import("./sustainability"));
const adSlider = lazy(() => import("./ad-slider"));
const Council = lazy(() => import("./council/index"));
const PricingPage = lazy(() => import("./pricing"));
const Satisfaction = lazy(() => import("./satisfaction"));
const WineFutures = lazy(() => import("./wineFutures/index.js"));
const TermsConditions = lazy(() => import("./terms-conditions/index"));
const VinovestHome = lazy(() => import("./vinovest-home"));
const Vinovest100Index = lazy(() => import("./vinovest-100-index"));
const PrivacyPolicy = lazy(() => import("./privacyPolicy/index"));
const Careers = lazy(() => import("./careers/index"));
const ContactSupport = lazy(() => import("./contact-support"));
const HelpMain = lazy(() => import("./support/SupportMain"));
const HelpCategory = lazy(() => import("./support/SupportCategory"));
const HelpArticle = lazy(() => import("./support/SupportArticle"));
const Blog = lazy(() => import("./blog/Blog"));
const BlogArticle = lazy(() => import("./blog/Article"));
const PressPage = lazy(() => import("./press/index.js"));
const Accessibility = lazy(() => import("./accessibility/index"));
const Trading = lazy(() => import("./trading/index"));
const Community = lazy(() => import("./community/index"));

const AllRedirects = Object.values(REDIRECT_PATHS).reduce((acc, { paths, options }) => {
    const { isSecure, exact, ...rest } = options;
    paths.map((path) => {
        acc.push({ path, exact, component: () => useCreateRoutingCallback(rest.pathname, { refresh: true })() });
    });
    return acc;
}, []);

export const Routes = [
    {
        path: ROUTE_PATHS.login,
        exact: true,
        component: LoginPage,
        isSecure: false,
    },
    {
        path: ROUTE_PATHS.signup,
        exact: true,
        component: LoginPage,
        isSecure: false,
    },
    {
        path: "/reset_password",
        exact: true,
        component: LoginPage,
        isSecure: false,
    },
    {
        path: "/new-user/create-account",
        exact: false,
        component: OnboardUser,
        isSecure: false,
    },
    {
        path: "/new-user/investor-profile",
        exact: false,
        component: withAuthentication(InvestorProfile),
        isSecure: false,
    },
    {
        path: ROUTE_PATHS.managedPortfolio,
        exact: true,
        component: withReloadOnNavigate(withAuthentication(OverviewPage)),
    },
    {
        path: ROUTE_PATHS.home,
        exact: true,
        component: Home,
    },
    {
        path: ROUTE_PATHS.cellar,
        exact: true,
        component: withReloadOnNavigate(withAuthentication(Cellar)),
        isSecure: true,
    },
    {
        path: ROUTE_PATHS.transactions,
        exact: true,
        component: withReloadOnNavigate(withAuthentication(TransactionsPage)),
        isSecure: true,
    },
    {
        path: ROUTE_PATHS.documentsPage,
        exact: true,
        component: withReloadOnNavigate(withAuthentication(DocumentsPage)),
        isSecure: true,
    },
    {
        path: `${ROUTE_PATHS.documentsPage}/:doc`,
        exact: true,
        component: withReloadOnNavigate(withAuthentication(DocumentsPage)),
        isSecure: true,
    },
    {
        path: ROUTE_PATHS.deposit,
        component: withAuthentication(RootDepositPage),
        isSecure: true,
    },
    {
        path: `${ROUTE_PATHS.account}/:setting(email|phone|auto-invest|investment-plan|sell)?`,
        exact: false,
        component: withReloadOnNavigate(withAuthentication(AccountPage)),
        isSecure: true,
    },
    {
        path: ROUTE_PATHS.beforeYouRequest,
        exact: true,
        component: withAuthentication(BeforeYouRequest),
        isSecure: true,
    },
    {
        path: ROUTE_PATHS.liquidation,
        exact: true,
        component: withAuthentication(Liquidation),
        isSecure: true,
    },
    {
        path: ROUTE_PATHS.scheduledWines,
        exact: true,
        component: FeedbackOptions,
        isSecure: true,
    },
    {
        path: "/implicit/callback",
        exact: true,
        component: ImplicitCallback,
        isSecure: false,
    },
    {
        path: ROUTE_PATHS.invite,
        exact: true,
        component: withReloadOnNavigate(withAuthentication(InvitePage)),
        isSecure: true,
    },
    {
        path: "/chart",
        exact: true,
        component: ChartPage,
    },
    {
        path: ROUTE_PATHS.terms,
        exact: true,
        component: TermsConditions,
    },
    {
        path: ROUTE_PATHS.contactUs,
        exact: true,
        component: ContactUs,
    },
    {
        path: ROUTE_PATHS.whyWine,
        exact: true,
        component: WhyWinePage,
    },
    {
        path: ROUTE_PATHS.press,
        exact: true,
        component: PressPage,
    },
    {
        path: ROUTE_PATHS.advisors,
        exact: true,
        component: Advisors,
    },
    {
        path: ROUTE_PATHS.aboutUs,
        exact: true,
        component: AboutUs,
    },
    {
        path: ROUTE_PATHS.council,
        exact: true,
        component: Council,
    },
    {
        path: ROUTE_PATHS.howItWorks,
        exact: true,
        component: HowItWorksPage,
    },
    {
        path: ROUTE_PATHS.sustainability,
        exact: true,
        component: SustainabilityPage,
    },
    {
        path: ROUTE_PATHS.pricing,
        exact: true,
        component: PricingPage,
    },
    {
        path: ROUTE_PATHS.wineFutures,
        exact: true,
        component: WineFutures,
    },
    {
        path: ROUTE_PATHS.adSlider,
        exact: true,
        component: adSlider,
    },
    {
        path: ROUTE_PATHS.satisfaction,
        exact: true,
        component: Satisfaction,
    },
    {
        path: ROUTE_PATHS.vinovestHome,
        exact: true,
        component: VinovestHome,
    },
    {
        path: ROUTE_PATHS.vinovest100Index,
        exact: true,
        component: Vinovest100Index,
    },
    {
        path: ROUTE_PATHS.privacyPolicy,
        exact: true,
        component: PrivacyPolicy,
        isSecure: false,
    },
    {
        path: ROUTE_PATHS.careers,
        exact: true,
        component: Careers,
    },
    {
        path: ROUTE_PATHS.contactSupport,
        exact: true,
        component: ContactSupport,
    },
    {
        path: ROUTE_PATHS.help,
        exact: true,
        component: HelpMain,
    },
    {
        path: `${ROUTE_PATHS.helpCategory}/:category`,
        exact: true,
        component: HelpCategory,
    },
    {
        path: `${ROUTE_PATHS.help}/:slug`,
        exact: true,
        component: HelpArticle,
    },
    {
        path: `${ROUTE_PATHS.blog}`,
        exact: true,
        component: Blog,
    },
    {
        path: `${ROUTE_PATHS.blog}/category/:nameOfCategory/:blogPage`,
        exact: true,
        component: Blog,
    },
    {
        path: `${ROUTE_PATHS.blog}/:slug`,
        exact: true,
        component: BlogArticle,
    },
    {
        path: ROUTE_PATHS.accessibility,
        exact: true,
        component: Accessibility,
    },
    {
        path: ROUTE_PATHS.trading,
        exact: true,
        component: Trading,
    },
    {
        path: ROUTE_PATHS.community,
        exact: true,
        component: Community,
    },
]
    .concat([...AllRedirects])
    .concat({
        path: "*",
        component: NotFound,
        isSecure: false,
    });

export const breakPoints = {
    mobileMax: 767,
    mobile: 768,
    tablet: 1023,
};
