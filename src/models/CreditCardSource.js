import { DEPOSIT_TYPE } from "#utils/constants";
import { PaymentSource } from "./PaymentSource";

export class CreditCardSource extends PaymentSource {
    static build(details) {
        return new CreditCardSource(details);
    }

    /**
     * @param {object} details
     * @param {string} id - accountID
     * @param {string} name - bank name or credit card
     * @param {string} lastFour - last four digits of acct
     * @param {string} country - the credit card country of origin
     */
    constructor(details) {
        super();
        this.type = DEPOSIT_TYPE.CreditCard;
        this.data = details;
        this.isACH = this.isACH.bind(this);
        this.isCreditCard = this.isCreditCard.bind(this);
    }

    isACH() {
        return false;
    }

    isCreditCard() {
        return true;
    }
}
