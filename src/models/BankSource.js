import { DEPOSIT_TYPE } from "#utils/constants";
import { PaymentSource } from "./PaymentSource";

export class BankSource extends PaymentSource {
    static build(details) {
        return new BankSource(details);
    }

    /**
     * @param {object} details
     * @param {string} id - accountID
     * @param {string} name - bank name or credit card
     * @param {string} lastFour - last four digits of acct
     */
    constructor(details) {
        super();
        this.type = DEPOSIT_TYPE.BankTransfer;
        this.data = details;
    }

    isCreditCard() {
        return false;
    }

    isACH() {
        return true;
    }
}
