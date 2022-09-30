export default class FeeCalculator {
    public static getCreditCardFee(amount: number, currency: string, country: string): number {
        switch (currency) {
            case "HKD":
            return FeeCalculator.getCreditCardFeeHK(amount);
            case "CNY":
            return FeeCalculator.getCreditCardFeeHK(amount);
            default:
                return FeeCalculator.getCreditCardFeeUSDByCountry(amount, country);
        }
    }

    private static getCreditCardFeeUSDByCountry(amount, country): number {
        // empty string defaults to US origin
        return country === 'US' || country === '' ? 
            FeeCalculator.getCreditCardFeeUSD(amount) : FeeCalculator.getCreditCardFeeInternational(amount);
    }

    private static getCreditCardFeeHK(amount: number): number {
        //3.4% + HK$2.35
        return amount / 0.966 + 235;
    }
    private static getCreditCardFeeUSD(amount: number): number {
        return amount / 0.971 + 30;
    }

    private static getCreditCardFeeInternational(amount: number): number {
        return amount / 0.961 + 30;
    }
}
