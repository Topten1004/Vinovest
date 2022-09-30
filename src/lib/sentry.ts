import * as Sentry from "@sentry/react";

export class SentryClient {
    static build(config, history) {
        const client = new SentryClient(config, history);
        return client;
    }

    constructor(config, history) {
        const { dsn, release } = config.sentry;

        Sentry.init({
            dsn,
            release,
            environment: config.env,
        });
    }
}
