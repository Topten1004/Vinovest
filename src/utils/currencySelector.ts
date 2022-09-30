import { useConfig } from "#shared/hooks";

export default class CurrencySettings {
    public static getTransactionType(currency: string): boolean {
        switch (currency) {
        case "HKD":
            return true;
        case "CNY":
            return true;
        case "USD":
            return false;
        default:
            return false;
        }
    }

    public static getStripeCredentials(currency: string): string {
        const config = useConfig();

        switch (currency) {
            case "HKD":
                return config.stripeKeyHK;
            case "CNY":
                return config.stripeKeyHK;
            case "USD":
                return config.stripeKey;
            default:
                return config.stripeKey;
        }
    }

    public static getUserCurrency(language: string): string {
        switch (language) {
            case "zh_CN":
                return "CNY";
            case "zh_Hans_HK":
                return "CNY";
            case "en_HK":
                return "CNY";
            case "en":
                return "USD";
            default:
                return "USD";
        }
    }

    public static getPortfolioCurrency(language: string): string {
        switch (language) {
            case "zh_CN":
                return "HKD";
            case "zh_Hans_HK":
                return "HKD";
            case "en_HK":
                return "HKD";
            case "en":
                return "USD";
            default:
                return "USD";
        }
    }

    public static getUserRegion(language: string): string {
        switch (language) {
        case "zh_CN":
            return "hongkong";
        case "zh_Hans_HK":
                return "hongkong";
        case "en_HK":
            return "hongkong";
        case "en":
            return "usa";
        default:
            return "usa";
        }
    }
}
