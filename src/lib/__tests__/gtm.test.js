import { GTMClient, EventNames } from "../gtm";

describe("GTM Client", () => {
    const windowMock = { dataLayer: { push: jest.fn() } };
    const client = GTMClient.build(windowMock);

    it("should instantiate a client with correct properties", () => {
        expect(client.eventIdentifier).toEqual("CUSTOM");
        expect(client.ctx).toEqual(windowMock);
    });

    it("should dispatch the correct event for trackRegistrationComplete()", () => {
        client.trackRegistrationComplete();
        expect(windowMock.dataLayer.push).toHaveBeenCalledWith({
            event: "CUSTOM",
            EVENT_NAME: EventNames.registration_complete,
        });
    });
    it("should dispatch the correct event for trackLoginComplete()", () => {
        client.trackLoginComplete();
        expect(windowMock.dataLayer.push).toHaveBeenCalledWith({
            event: "CUSTOM",
            EVENT_NAME: EventNames.login_complete,
        });
    });
    it("should dispatch the correct event for trackDepositAdded()", () => {
        const depositMeta = {
            id: "foobar-1234567",
            currency: "USD",
            method: "Credit Card",
            value: 6000,
            frequency: "monthly",
        };
        client.trackDepositAdded(depositMeta);
        expect(windowMock.dataLayer.push).toHaveBeenCalledTimes(1);
        expect(windowMock.dataLayer.push).toHaveBeenNthCalledWith(1, {
            event: "CUSTOM",
            EVENT_NAME: EventNames.ecommerce_transaction,
            transactionId: depositMeta.id,
            transactionTotal: depositMeta.value,
            transactionProducts: [
                {
                    name: depositMeta.method,
                    sku: depositMeta.frequency,
                    price: depositMeta.value,
                    quantity: 1,
                },
            ],
        });
    });
    it("should dispatch the correct event for trackDepositStarted()", () => {
        client.trackDepositStarted();
        expect(windowMock.dataLayer.push).toHaveBeenCalledWith({
            event: "CUSTOM",
            EVENT_NAME: EventNames.deposit_started,
        });
    });
    it("should dispatch the correct event for trackUserIdentified()", () => {
        const userMeta = {
            sub: "foobar",
            email: "abc@gmail.com",
            first_name: "John",
            last_name: "Doe",
            created_at: "123456",
        };
        client.trackUserIdentified(userMeta);
        expect(windowMock.dataLayer.push).toHaveBeenCalledWith({
            event: "CUSTOM",
            EVENT_NAME: EventNames.identify_user,
            ATTRS: userMeta,
        });
    });
    it("should dispatch the correct event for trackQuizAction()", () => {
        const action = "Finished step #1";
        client.trackQuizAction(action);
        expect(windowMock.dataLayer.push).toHaveBeenCalledWith({
            event: "CUSTOM",
            EVENT_NAME: EventNames.quiz_action,
            ATTRS: { action },
        });
    });
    it("should dispatch the correct event for trackReferralAction()", () => {
        const action = "Successfully linked referral";
        client.trackReferralAction(action);
        expect(windowMock.dataLayer.push).toHaveBeenCalledWith({
            event: "CUSTOM",
            EVENT_NAME: EventNames.referral_action,
            ATTRS: { action },
        });
    });
    it("should dispatch the correct event for trackBannerAction()", () => {
        const action = "Viewed Banner";
        client.trackBannerAction(action);
        expect(windowMock.dataLayer.push).toHaveBeenCalledWith({
            event: "CUSTOM",
            EVENT_NAME: EventNames.banner_action,
            ATTRS: { action },
        });
    });
    it("should dispatch the correct event for trackAppointmentScheduled()", () => {
        client.trackAppointmentScheduled();
        expect(windowMock.dataLayer.push).toHaveBeenCalledWith({
            event: "CUSTOM",
            EVENT_NAME: EventNames.appointment_scheduled,
        });
    });
});
