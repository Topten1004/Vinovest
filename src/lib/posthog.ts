import posthog from "posthog-js";

export enum CalendlyEvent {
    Calendly = "calendly",
    CalendlyPageViewEvent = "calendly.profile_page_viewed",
    CalendlyEventViewEvent = "calendly.event_type_viewed",
    CalendlyDateTimeSelectEvent = "calendly.date_and_time_selected",
    CalendlyScheduledEvent = "calendly.event_scheduled",
    PageView = "profile_viewed",
    EventView = "event_viewed",
    DateTimeSelect = "date_and_time_selected",
    Scheduled = "event_scheduled",
}

export enum PosthogEvents {
    EmailEntry = "email_entry",
}

export class PostHogClient {
    static build(config) {
        const client = new PostHogClient(config);
        client.addCalendly();
        return client;
    }

    constructor(config) {
        posthog.init(config?.postHogKey, { api_host: "https://app.posthog.com" });
    }

    addCalendly() {
        function isCalendlyEvent(e) {
            return e.data.event && e.data.event.indexOf("calendly") === 0;
        }

        try {
            window.addEventListener("message", (e) => {
                if (isCalendlyEvent(e)) {
                    const { event } = e.data;
                    const {
                        CalendlyPageViewEvent,
                        CalendlyScheduledEvent,
                        CalendlyEventViewEvent,
                        CalendlyDateTimeSelectEvent,
                        PageView,
                        EventView,
                        DateTimeSelect,
                        Scheduled,
                        Calendly,
                    } = CalendlyEvent;
                    switch (event) {
                    case CalendlyPageViewEvent:
                        return posthog.capture(Calendly, { progress: PageView });
                    case CalendlyEventViewEvent:
                        return posthog.capture(Calendly, { progress: EventView });
                    case CalendlyDateTimeSelectEvent:
                        return posthog.capture(Calendly, { progress: DateTimeSelect });
                    case CalendlyScheduledEvent:
                        return posthog.capture(Calendly, { progress: Scheduled });
                    default:
                    }
                }
            });
        } catch (e) {}
    }
}
