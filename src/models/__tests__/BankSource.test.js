import { DEPOSIT_TYPE } from "#utils/constants";
import { BankSource } from "../BankSource";

describe("BankSource", () => {
    const mockBankDetails = { id: "foo-baz-bar", name: "Stripe Test", lastFour: "8831" };
    const bank = BankSource.build(mockBankDetails);

    it("should have a type of BankTransfer", () => {
        expect(bank.type).toEqual(DEPOSIT_TYPE.BankTransfer);
    });

    it("should inherit type check from PaymentSource", () => {
        expect(bank.isACH()).toBe(true);
    });

    it("should return the masked bank account info", () => {
        expect(bank.maskedBankAccountDisplayInfo).toBe("Stripe Test ****8831");
    });

    it("should cache passed bank details in 'data' property", () => {
        expect(bank.data).toEqual(mockBankDetails);
    });

    it("should inherit empty check from PaymentSource", () => {
        expect(BankSource.build().isNotSet()).toBe(true);
    });
});
