import { SentryClient } from "#lib/sentry";
import { GTMClient } from "#lib/gtm";
import { PostHogClient } from "#lib/posthog";

export const initTrackers = (config, history) => {
    const sentry = SentryClient.build(config, history);
    const gtm = GTMClient.build(window);
    // posthog is available everywhere and only inited
    PostHogClient.build(config);

    return { sentry, gtm };
};

export function clearConsoleLogs() {
    Object.keys(console).map((consoleProperty) => {
        if (console[consoleProperty] instanceof Function) {
            console[consoleProperty] = (...args) => {};
        }
    });
}
