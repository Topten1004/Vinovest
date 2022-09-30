import { DEPOSIT_TYPE } from "#utils/constants";
import { CreditCardSource } from "../CreditCardSource";

describe("CreditCardSource", () => {
    const mockCreditCardDetails = { id: "foo-baz-bar", name: "Mastercard", lastFour: "8194", country: "us" };
    const cc = CreditCardSource.build(mockCreditCardDetails);

    it("should have a type of CreditCard", () => {
        expect(cc.type).toEqual(DEPOSIT_TYPE.CreditCard);
    });

    it("should inherit type check from PaymentSource", () => {
        expect(cc.isCreditCard()).toBe(true);
    });

    it("should return the masked bank account info", () => {
        expect(cc.maskedBankAccountDisplayInfo).toBe("Mastercard ****8194");
    });

    it("should cache passed token details in 'data' property", () => {
        expect(cc.data).toEqual(mockCreditCardDetails);
    });

    it("should inherit empty check from PaymentSource", () => {
        expect(CreditCardSource.build().isNotSet()).toBe(true);
    });
});
