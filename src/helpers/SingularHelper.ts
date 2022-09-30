import * as Sentry from "@sentry/react";
import config from "../app.config";


export type SingularEvents = {
    user_signup: {
        signup_method: 'apple' | 'google' | 'email';
    };
    setup_managed: {};
    setup_trading: {};
    add_funds: {};
    // event type - revenue in dollars
    deposit_initiated: {};
    complete_buy: {
        // buy price excluding fees in dollars
        price: number;
    };
    complete_sell: {
        // sell price excluding fees in dollars
        price: number;
    };
};

/**
 * SingularHelper implements Singular SDK methods (init, track, revenue, setting/unsetting user ID)
 */
export const SingularHelper = {
    async getSingular() {
        if (typeof window === 'undefined') return {};
        const { SingularConfig, singularSdk } = await import('singular-sdk');
        return { SingularConfig, singularSdk };
    },
    /**
     * Initialize Singular with required configuration
     */
    async initializeSingular() {
        if (typeof window === 'undefined') return;
        if (!this.singularInitialized) {
            const { singularSdk, SingularConfig } = await this.getSingular();
            try {
                const apiKey = config.singualrAPIKey;
                const secretKey = config.singualrSecretKey;
                const productId = config.singularProductId;
                const logLevel = 0;
                const singualrConfig = new SingularConfig(apiKey, secretKey, productId)
                    .withLogLevel(logLevel)
                    .withInitFinishedCallback(() => {
                        this.singularInitialized = true;
                    });
                singularSdk.init(singualrConfig);
            } catch (error) {
                Sentry.captureException(`Error initializing Singular SDK. Error ${error}`);
            }
        } else {
            this.tractPageVisit();
        }
    },

    /**
     * Record page visit event
     */
    async tractPageVisit() {
        if (typeof window === 'undefined') return;
        const { singularSdk } = await this.getSingular();
        singularSdk.pageVisit();
    },

    /**
     * * Send the user ID to Singular. This should be invoked after the user signs in successfully.
     */
    async setCustomUserId(user: any): Promise<void> {
        try {
            if (typeof window === 'undefined') return;
            await this.initializeSingular();
            const { singularSdk } = await this.getSingular();
            singularSdk.login(user.id);
        } catch (error) {
            Sentry.captureException(`Failed to setCustomUserId in Singular. Error: ${error}`);
        }
    },

    /**
     * Unset the user ID in Singular. This should be invoked after the user signs out successfully.
     */
    async unsetCustomUserId(): Promise<void> {
        try {
            if (typeof window === 'undefined') return;
            await this.initializeSingular();
            const { singularSdk } = await this.getSingular();
            singularSdk.logout();
        } catch (error) {
            Sentry.captureException(`Failed to unsetCustomUserId in Singular. Error: ${error}`);
        }
    },

    /**
     * Record an event in Singular.
     */
    async trackEvent<T extends keyof SingularEvents>(event: T, properties?: SingularEvents[T]): Promise<void> {
        try {
            if (typeof window === 'undefined') return;
            await this.initializeSingular();
            const { singularSdk } = await this.getSingular();
            Object.keys(properties ?? {}).length === 0
                ? singularSdk.event(event)
                : singularSdk.event(event, properties);
        } catch (error) {
            Sentry.captureException(`Failed to track Singular event with args. Error: ${error}`);
        }
    },

    /**
     * Record a custom revenue event in Singular.
     */
    async trackRevenueEvent<T extends keyof SingularEvents>(
        event: T,
        currency: string,
        amount: number,
        properties?: SingularEvents[T]
    ): Promise<void> {
        try {
            if (typeof window === 'undefined') return;
            await this.initializeSingular();
            const { singularSdk } = await this.getSingular();
            Object.keys(properties ?? {}).length === 0
                ? singularSdk.revenue(event, currency, amount)
                : singularSdk.revenue(event, currency, amount, properties);
        } catch (error) {
            Sentry.captureException(`Failed to track custom revenue event. Error: ${error}`);
        }
    },

    /**
     * Triggers web to app open Singular event with appropriate base link
     */
    async openWebToApp(): Promise<void> {
        try {
            if (typeof window === 'undefined') return;
            await this.initializeSingular();
            const { singularSdk } = await this.getSingular();
            singularSdk.openApp(config.singularBaseLink);
        } catch (error) {
            Sentry.captureException(`Failed to openApp in Singular. Error: ${error}`);
        }
    },
    singularInitialized: false
};
