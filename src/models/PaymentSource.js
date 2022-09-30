import _ from "lodash";
import { uppercaseWordsInString } from "#utils/stringUtils";
import { DEPOSIT_TYPE } from "#utils/constants";

export class PaymentSource {
    type = null;
    data = {};

    isACH() {
        return this.type === DEPOSIT_TYPE.BankTransfer;
    }
    isCreditCard() {
        return this.type === DEPOSIT_TYPE.CreditCard;
    }

    isNotSet() {
        return _.isEmpty(this.data);
    }
    get maskedBankAccountDisplayInfo() {
        return `${uppercaseWordsInString(this.data.name)} ****${this.data.lastFour}`;
    }
}
