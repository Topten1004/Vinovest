import { CreditCardSource } from "#models/CreditCardSource";
import { BankSource } from "#models/BankSource";
import { DEPOSIT_TYPE } from "#utils/constants";
import { DepositStore } from "../deposit";

describe("Deposit Store", () => {
    const api = {};
    const rootStore = { auth: { accessToken: "vv-jwt" } };
    let store;
    beforeAll(() => {
        store = DepositStore.build(rootStore, api);
        store.setPaymentSource(new CreditCardSource());
    });
    describe("Selected Deposit Frequency", () => {
        // const store = DepositStore.build(rootStore, api);
        it("should default to an empty string for the selectedFrequencyKey, but map to 'once' by default", () => {
            expect(store.selectedFrequencyKey).toEqual("");
            expect(store.isSubscription).toBe(false);
            expect(store.selectedDepositFrequency).toBe("once");
        });
        it("should handle minimum deposit amounts + isSubscription flag for one time frequency", () => {
            store.setDepositFrequencyKey("one time");
            expect(store.isSubscription).toBe(false);
            expect(store.selectedDepositFrequency).toBe("once");
        });
        it("should properly set new frequency keys + have computed properties updated", () => {
            store.setDepositFrequencyKey("weekly");
            expect(store.isSubscription).toBe(true);
            expect(store.selectedDepositFrequency).toBe("week");

            store.setDepositFrequencyKey("monthly (Most Popular)");
            expect(store.isSubscription).toBe(true);
            expect(store.selectedDepositFrequency).toBe("month");
        });
    });

    describe.only("depositAmtPlusFeesInCents", () => {
        it("should properly handle ACH depositAmt in cents", () => {
            store.setPaymentSource(new BankSource());
            store.setDepositAmt(69128);
            expect(store.depositAmtPlusFeesInCents).toEqual(6912800);
        });

        it("should calculate deposit amt with 3.9% CC fees for international cards", () => {
            const mockInternationalCard = new CreditCardSource({country: "BR"});
            store.setPaymentSource(mockInternationalCard);
            console.log(store.selectedPaymentSource);
            store.setDepositAmt(1000);
            expect(store.depositAmtPlusFeesInCents).toEqual(104088);
        });

        it("should calculate deposit amt with 2.9% CC fees for international cards", () => {
            const mockUSCard = new CreditCardSource({country: "US", });
            store.setPaymentSource(mockUSCard);
            store.setDepositAmt(1000);
            expect(store.depositAmtPlusFeesInCents).toEqual(103017);
        });

        it("should calculate deposit amt with HK Fee when currency is HKD", () => {
            const mockCardWithHongKongCurrency = new CreditCardSource({country: "HK"});
            store.setUserCurrency("HKD");
            store.setPaymentSource(mockCardWithHongKongCurrency);
            store.setDepositAmt(1000);
            expect(store.depositAmtPlusFeesInCents).toEqual(103755);
        })
    });

    describe("normalizedSavedPaymentMethods", () => {
        // const store = DepositStore.build(rootStore, api);
        it("should gracefully handle an undefined data attribute", () => {
            expect(store.normalizedSavedPaymentMethods).toEqual([]);
        });
        it("should normalize a saved Payment Source", () => {
            store.savedPaymentMethodsFetch.data = {
                paymentSources: [
                    {
                        id: "ba_1Gsh52E1C2KvY5kdEu2ozlfY",
                        bank: {
                            name: "STRIPE TEST BANK",
                            lastFour: "6789",
                        },
                    },
                ],
            };

            expect(store.normalizedSavedPaymentMethods).toEqual([
                {
                    id: "ba_1Gsh52E1C2KvY5kdEu2ozlfY",
                    name: "STRIPE TEST BANK",
                    lastFour: "6789",
                    type: DEPOSIT_TYPE.BankTransfer,
                },
            ]);
        });
        it("should normalize a saved ACH Payment Method", () => {
            store.savedPaymentMethodsFetch.data = {
                paymentMethods: [
                    {
                        id: "pm_1Gq0Xoobaq2;sadceHgHtSn",
                        ach: {
                            name: "STRIPE SECOND BANK",
                            lastFour: "8192",
                        },
                        card: null,
                    },
                ],
            };

            expect(store.normalizedSavedPaymentMethods).toEqual([
                {
                    id: "pm_1Gq0Xoobaq2;sadceHgHtSn",
                    name: "STRIPE SECOND BANK",
                    lastFour: "8192",
                    type: DEPOSIT_TYPE.BankTransfer,
                },
            ]);
        });

        it.only("should normalize a saved Credit Card Payment Method", () => {
            store.savedPaymentMethodsFetch.data = {
                paymentMethods: [
                    {
                        id: "pm_1Gq0XsE1C2KvY5kdceHgHtSn",
                        ach: null,
                        card: {
                            brand: "visa",
                            expMonth: 4,
                            expYear: 2024,
                            lastFour: "4242",
                            country: "US"
                        },
                    },
                ],
            };

            expect(store.normalizedSavedPaymentMethods).toEqual([
                { id: "pm_1Gq0XsE1C2KvY5kdceHgHtSn", name: "VISA", lastFour: "4242", type: DEPOSIT_TYPE.CreditCard, country: "US" },
            ]);
        });
        it("should normalize a combination of Payment Methods and Sources", () => {
            store.savedPaymentMethodsFetch.data = {
                paymentSources: [
                    {
                        id: "ba_1Gsh52E1C2KvY5kdEu2ozlfY",
                        bank: {
                            name: "STRIPE TEST BANK",
                            lastFour: "6789",
                        },
                    },
                ],
                paymentMethods: [
                    {
                        id: "pm_1Gq0XsE1C2KvY5kdceHgHtSn",
                        ach: null,
                        card: {
                            brand: "visa",
                            expMonth: 4,
                            expYear: 2024,
                            lastFour: "4242",
                        },
                    },
                    {
                        id: "pm_1Gq0Xoobaq2;sadceHgHtSn",
                        ach: {
                            name: "STRIPE SECOND BANK",
                            lastFour: "8192",
                        },
                        card: null,
                    },
                ],
            };

            expect(store.normalizedSavedPaymentMethods).toEqual([
                {
                    id: "ba_1Gsh52E1C2KvY5kdEu2ozlfY",
                    name: "STRIPE TEST BANK",
                    lastFour: "6789",
                    type: DEPOSIT_TYPE.BankTransfer,
                },
                { id: "pm_1Gq0XsE1C2KvY5kdceHgHtSn", name: "VISA", lastFour: "4242", type: DEPOSIT_TYPE.CreditCard },
                {
                    id: "pm_1Gq0Xoobaq2;sadceHgHtSn",
                    name: "STRIPE SECOND BANK",
                    lastFour: "8192",
                    type: DEPOSIT_TYPE.BankTransfer,
                },
            ]);
        });
    });

    describe("fetchSavedBankAccountsAndCreditCards()", () => {
        // const store = DepositStore.build(rootStore, api);

        it("should properly handle error thrown from fetching saved accounts", async () => {
            api.getSavedPaymentMethodsAndSources = jest.fn(async () => ({ ok: false }));

            await store.fetchSavedBankAccountsAndCreditCards();

            expect(store.savedPaymentMethodsFetch.data).toBeUndefined();
            expect(store.savedPaymentMethodsFetch.status.isFailed()).toBe(true);
        });

        it("should properly hydrate successful saved accounts fetch", async () => {
            const savedAccountsResponse = {
                paymentMethods: [
                    {
                        id: "pm_1Gq0XsE1C2KvY5kdceHgHtSn",
                        ach: null,
                        card: {
                            brand: "visa",
                            expMonth: 4,
                            expYear: 2024,
                            lastFour: "4242",
                        },
                    },
                    {
                        id: "pm_1Gq0Xoobaq2;sadceHgHtSn",
                        ach: {
                            name: "STRIPE SECOND BANK",
                            lastFour: "8192",
                        },
                        card: null,
                    },
                ],
            };
            api.getSavedPaymentMethodsAndSources = jest.fn(async () => ({
                ok: true,
                json: async () => savedAccountsResponse,
            }));

            await store.fetchSavedBankAccountsAndCreditCards();

            expect(store.savedPaymentMethodsFetch.data).toEqual(savedAccountsResponse);
            expect(store.savedPaymentMethodsFetch.status.isSuccess()).toBe(true);
        });
    });

    describe("requestAndConfirmStripeSetupIntent()", () => {
        // const store = DepositStore.build(rootStore, api);
        const stripe = {};

        it("should properly return an error from the Setup Intent fetch", async () => {
            api.getStripeSetupIntentToken = jest.fn(async () => ({ ok: false }));
            stripe.confirmCardSetup = jest.fn(async () => ({}));
            const result = await store.requestAndConfirmStripeSetupIntent(stripe);
            expect(result.error.message).toEqual("Unable to fetch Setup Intent token");
            expect(stripe.confirmCardSetup).toHaveBeenCalledTimes(0);
        });

        it("should properly call stripe.confirmCardSetup with the returned Setup Intent ClientSecret", async () => {
            const ClientSecret = "seti_1GxjCRE1C2KvY";
            const paymentMethod = { id: "pm_12839712" };
            api.getStripeSetupIntentToken = jest.fn(async () => ({ ok: true, json: async () => ({ ClientSecret }) }));
            stripe.confirmCardSetup = jest.fn(async () => ({}));
            const result = await store.requestAndConfirmStripeSetupIntent(stripe, paymentMethod);
            expect(result.error).toBeUndefined();
            expect(stripe.confirmCardSetup).toHaveBeenCalledWith(ClientSecret, { payment_method: paymentMethod.id });
        });
    });

    describe("requestCreateDeposit()", () => {
        const store = DepositStore.build(rootStore, api);
        store.setDepositAmt(1000);

        beforeEach(() => {
            store.setDepositFrequencyKey();
        });

        it("should properly handle error thrown from creating Stripe Payment Intent", async () => {
            api.createStripePaymentIntent = jest.fn(async () => ({ ok: false }));

            store.setPaymentSource(CreditCardSource.build({}));
            await store.requestCreateDeposit();

            expect(api.createStripePaymentIntent).toHaveBeenCalledWith("vv-jwt", 1030.17);
            expect(store.depositPost.status.isFailed()).toBe(true);
            expect(store.depositPost.status.error).toEqual("Couldn't verify payment amount. Please try again later");
        });

        it("should properly handle error thrown from confirming Stripe Card Payment", async () => {
            const id = "12345";
            const paymentIntentToken = "token-foobar";
            const confirmCardPaymentError = "This is a bad error";
            const stripeClient = {
                confirmCardPayment: jest.fn(async () => ({
                    error: { message: confirmCardPaymentError },
                })),
            };
            api.createStripePaymentIntent = jest.fn(async () => ({
                ok: true,
                json: async () => paymentIntentToken,
            }));

            store.setPaymentSource(CreditCardSource.build({ id }));
            await store.requestCreateDeposit(stripeClient);

            expect(api.createStripePaymentIntent).toHaveBeenCalledWith("vv-jwt", 1030.17);
            expect(stripeClient.confirmCardPayment).toHaveBeenCalledWith(paymentIntentToken, { payment_method: id });
            expect(store.depositPost.status.isFailed()).toBe(true);
            expect(store.depositPost.status.error).toEqual(confirmCardPaymentError);
        });

        it("should properly append CTA to error msg if Stripe failure is due to declined card", async () => {
            const id = "12345";
            const paymentIntentToken = "token-foobar";
            const confirmCardPaymentError = "Your card was declined.";
            const CTA = "Please reach out to customer service or your card issuer to find out about next steps.";
            const stripeClient = {
                confirmCardPayment: jest.fn(async () => ({
                    error: { message: confirmCardPaymentError, code: "card_declined" },
                })),
            };
            api.createStripePaymentIntent = jest.fn(async () => ({
                ok: true,
                json: async () => paymentIntentToken,
            }));

            store.setPaymentSource(CreditCardSource.build({ id }));
            await store.requestCreateDeposit(stripeClient);

            expect(api.createStripePaymentIntent).toHaveBeenCalledWith("vv-jwt", 1030.17);
            expect(stripeClient.confirmCardPayment).toHaveBeenCalledWith(paymentIntentToken, { payment_method: id });
            expect(store.depositPost.status.isFailed()).toBe(true);
            expect(store.depositPost.status.error).toEqual(`${confirmCardPaymentError} ${CTA}`);
        });

        it("should properly handle successful Stripe payments for one time deposits", async () => {
            const id = "12345";
            const paymentIntentToken = "token-foobar";
            const stripeClient = {
                confirmCardPayment: jest.fn(async () => ({})),
            };
            api.createStripePaymentIntent = jest.fn(async () => ({
                ok: true,
                json: async () => paymentIntentToken,
            }));

            store.setPaymentSource(CreditCardSource.build({ id }));
            await store.requestCreateDeposit(stripeClient);

            expect(api.createStripePaymentIntent).toHaveBeenCalledWith("vv-jwt", 1030.17);
            expect(stripeClient.confirmCardPayment).toHaveBeenCalledWith(paymentIntentToken, { payment_method: id });
            expect(store.depositPost.status.isSuccess()).toBe(true);
        });

        it("should properly handle successful Stripe payments for subscriptions", async () => {
            const id = "12345";
            api.createV2TransferWithInterval = jest.fn(async () => ({ ok: true }));

            store.setDepositFrequencyKey("weekly");
            store.setPaymentSource(CreditCardSource.build({ id }));

            await store.requestCreateDeposit();

            expect(api.createV2TransferWithInterval).toHaveBeenCalledWith(
                "vv-jwt",
                id,
                expect.objectContaining({
                    amount: 103017,
                    interval: "week",
                }),
            );
            expect(store.depositPost.status.isSuccess()).toBe(true);
        });

        it("should properly handle error throw from creating v2 bank deposit transfer", async () => {
            const achDepositError = "Something went wrong with your ACH transfer";
            const id = "id";
            api.createV2TransferWithInterval = jest.fn(async () => ({
                ok: false,
                json: async () => ({ message: achDepositError }),
            }));

            store.setPaymentSource(BankSource.build({ id }));
            await store.requestCreateDeposit();

            expect(api.createV2TransferWithInterval).toHaveBeenCalledWith(
                "vv-jwt",
                id,
                expect.objectContaining({
                    amount: 100000,
                    interval: "once",
                }),
            );
            expect(store.depositPost.status.isFailed()).toBe(true);
            expect(store.depositPost.status.error).toEqual(achDepositError);
        });

        it("should properly handle successful ACH transfers", async () => {
            const id = "id";
            api.createV2TransferWithInterval = jest.fn(async () => ({ ok: true }));

            store.setPaymentSource(BankSource.build({ id }));
            await store.requestCreateDeposit();

            expect(api.createV2TransferWithInterval).toHaveBeenCalledWith(
                "vv-jwt",
                id,
                expect.objectContaining({
                    amount: 100000,
                    interval: "once",
                }),
            );
            expect(store.depositPost.status.isSuccess()).toBe(true);
        });
    });
});
