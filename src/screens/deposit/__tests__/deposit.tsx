import React from "react";
import "jest-styled-components";
import { render } from "@testing-library/react";
import RootDepositPage from "../index";
import { withContexts } from "#shared/testing/wrappers";
import { AddFunds } from "../AddFunds";
import { ReviewTransfer } from "../ReviewTransfer";
import { SelectSource } from "../SelectSource";
import { WireTransferType } from "../WireTransferType";
import { EnterCreditCard } from "../EnterCreditCard";
import { InternationalWireTransfer } from "../InternationalWireTransfer";
import { MailACheck } from "../MailACheck";
import { Confirmation } from "../Confirmation";
import { Failed } from "../Failed";

const accountV2 = {
    paymentSources: [{ id: "ba_1IThw1E1C2KvY5kdIoKC8me0", bank: { name: "STRIPE TEST BANK", lastFour: "6789" } }],
    paymentMethods: [
        {
            id: "pm_1IW2O3E1C2KvY5kdImwLzdKF",
            ach: null,
            card: { brand: "visa", expMonth: 4, expYear: 2024, lastFour: "4242" },
        },
        {
            id: "pm_1IVuFuE1C2KvY5kdV4UMZF9Y",
            ach: null,
            card: { brand: "visa", expMonth: 2, expYear: 2022, lastFour: "4242" },
        },
        {
            id: "pm_1Gn4XlE1C2KvY5kdM1zUVjLD",
            ach: null,
            card: { brand: "visa", expMonth: 4, expYear: 2024, lastFour: "4242" },
        },
        {
            id: "pm_1GmqxjE1C2KvY5kd926FTdJ0",
            ach: null,
            card: { brand: "visa", expMonth: 4, expYear: 2024, lastFour: "4242" },
        },
        {
            id: "pm_1GmqrsE1C2KvY5kd5gEFYFFl",
            ach: null,
            card: { brand: "visa", expMonth: 4, expYear: 2024, lastFour: "4242" },
        },
        {
            id: "pm_1GmqLKE1C2KvY5kd426b6YAO",
            ach: null,
            card: { brand: "visa", expMonth: 4, expYear: 2024, lastFour: "4242" },
        },
        {
            id: "pm_1GmqHIE1C2KvY5kdjkz9p74M",
            ach: null,
            card: { brand: "visa", expMonth: 4, expYear: 2024, lastFour: "4242" },
        },
        {
            id: "pm_1GmpqvE1C2KvY5kdBvk3tS2A",
            ach: null,
            card: { brand: "visa", expMonth: 4, expYear: 2024, lastFour: "4242" },
        },
        {
            id: "pm_1GmlMrE1C2KvY5kdDR4hWKAO",
            ach: null,
            card: { brand: "visa", expMonth: 4, expYear: 2024, lastFour: "4242" },
        },
        {
            id: "pm_1GmQj9E1C2KvY5kdrm3Wuoa9",
            ach: null,
            card: { brand: "visa", expMonth: 4, expYear: 2024, lastFour: "4242" },
        },
        {
            id: "pm_1Gm2R5E1C2KvY5kd1iHAuAvj",
            ach: null,
            card: { brand: "visa", expMonth: 4, expYear: 2024, lastFour: "4242" },
        },
        {
            id: "pm_1Gm2CcE1C2KvY5kd7GstUzJe",
            ach: null,
            card: { brand: "visa", expMonth: 4, expYear: 2024, lastFour: "4242" },
        },
        {
            id: "pm_1Gm2C8E1C2KvY5kd3D4eas1Q",
            ach: null,
            card: { brand: "visa", expMonth: 4, expYear: 2024, lastFour: "4242" },
        },
        {
            id: "pm_1GlToaE1C2KvY5kdntuqrA3l",
            ach: null,
            card: { brand: "visa", expMonth: 4, expYear: 2024, lastFour: "4242" },
        },
    ],
};
const routes = {
    AddFunds,
    SelectSource,
    EnterCreditCard,
    WireTransferType,
    InternationalWireTransfer,
    MailACheck,
    ReviewTransfer,
    Confirmation,
    Failed,
};
jest.mock("react-tooltip", () => () => <div> </div>);
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useLocation: () => ({
        pathname: "https://vinovest.co/add-funds",
    }),
}));

jest.mock("@okta/okta-react", () => ({
    useOktaAuth: () => ({
        authState: { isAuthenticated: true },
        authService: { handleAuthentication: jest.fn() },
    }),
    withOktaAuth: (x) => x,
}));

jest.mock("@stripe/stripe-js", () => ({
    loadStripe: () => Promise.resolve({}).then((r) => r),
}));

jest.mock("@stripe/react-stripe-js", () => ({
    injectStripe: () => {
        const PremiumCheckoutFormTest2 = require("./PremiumCheckoutForm").PremiumCheckoutFormTest;
        return PremiumCheckoutFormTest2;
    },
    Elements: (props) => <>{props.children}</>,
    CardElement: () => <div>CardElement</div>,
    useStripe: () => ({ createPaymentMethod: jest.fn() }),
    useElements: () => ({}),
}));

describe("Deposit component", () => {
    let component;
    const props = {
        portalURIFetch: {
            status: {
                isSuccess: jest.fn(() => true),
                isInvalidated: jest.fn(() => true),
            },
            data: "hello",
        },
    };
   
    const storeOveride = {
        tracking: { gtm: { trackDepositStarted: jest.fn() } },
        user: {
            oktaUserInfo: {
                name: "TestUser",
            },
        },
        deposit: {
            trackDeposit: () => {},
            depositPost: { status: { isSuccess: () => true, isPending: () => false } },
            depositStartDate: { format: () => new Date("Jun 06, 1990").toDateString() },
            selectedPaymentSource: { isCreditCard: () => true, isACH: jest.fn(() => true), isNotSet: () => false },
            depositAmt: 9000000,
            plaidLinkFetch: { status: { isPending: jest.fn() } },
            ACHAccountCreate: { status: { isPending: jest.fn() } },
            requestPlaidLink: jest.fn(),
            setDepositFrequencyKey: jest.fn(),
            fetchSavedBankAccountsAndCreditCards: jest.fn(),
            setUserCurrency: jest.fn(),
            oneTimeMinDepositAmount: jest.fn(),
            referenceKeyFetch: {
                data: ["adfjdafkjls;"],
                status: { isPending: jest.fn(() => false), isDone: jest.fn(() => true) },
            },
            savedPaymentMethodsFetch: { data: accountV2, status: { isFetching: () => false } },
        },
    };
    const { component: Comp } = withContexts(RootDepositPage, storeOveride);
    component = Comp;
    Object.entries(routes)
        .filter(Boolean)
        .map(([key, r]) => {
            it(`Check translations for ${key}`, () => {
                const { component: childComp } = withContexts(r, storeOveride);
                component = childComp;

                const childElem = component(props);
                const { baseElement: child } = render(childElem);

                expect(child).toMatchSnapshot();
            });
        });
});
