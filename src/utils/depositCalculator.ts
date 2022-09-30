export default class DepositCalculator {
    public static getMinimumDepositAmount(currency: string): number {
        switch (currency) {
        case "HKD":
                return DepositCalculator.getDepositAmountHK();
        case "CNY":
                return DepositCalculator.getDepositAmountCNY();
        default:
            return DepositCalculator.getDepositAmountUSD();
        }
    }

    public static getReoccuringDepositAmount(currency: string): number {
        switch (currency) {
        case "HKD":
                return DepositCalculator.getReoccuringDepositAmountHK();
        case "CNY":
            return DepositCalculator.getReoccuringDepositAmountCNY();
        default:
            return DepositCalculator.getReoccuringDepositAmountUSD();
        }
    }

    public static getDefaultDepositAmount(currency: string): number {
        switch (currency) {
        case "HKD":
                return DepositCalculator.getDefaultDepositAmountHK();
        case "CNY":
            return DepositCalculator.getDefaultDepositAmountCNY();
        default:
            return DepositCalculator.getDefaultDepositAmountUSD();
        }
    }

    private static getDepositAmountHK(): number {
        return 8000;
    }
    private static getReoccuringDepositAmountHK(): number {
        return 4000;
    }
    private static getDefaultDepositAmountHK(): number {
        return 40000;
    }

    private static getDepositAmountCNY(): number {
        return 6500;
    }
    private static getReoccuringDepositAmountCNY(): number {
        return 3250;
    }
    private static getDefaultDepositAmountCNY(): number {
        return 32000;
    }

    private static getDepositAmountUSD(): number {
        return 1000;
    }
    private static getReoccuringDepositAmountUSD(): number {
        return 500;
    }
    private static getDefaultDepositAmountUSD(): number {
        return 5000;
    }
}
