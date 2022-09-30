import { LoggerModule } from "i18next";
class Logger implements LoggerModule {
    static type: "logger";
    static cb: Function;
    type: "logger";
    testing: boolean;
    instance: any;
    errors: any;
    process: any;
    constructor(i18nextOptions = {}) {
        this.instance = this.init(i18nextOptions);
        this.errors = [];
        this.process = process;
        this.testing = this.process.env.NODE_ENV === "test" || this.process.env.NODE_ENV === "testing";
        this.process.on("exit", () => {
            throw new Error(this.errors);
        });
    }

    init(i18nextOptions) {
        process.on("beforeExit", () => {
            if (this.errors && this.errors.length) {
                throw new Error(JSON.stringify(this.errors));
            }
        });
        if (this.instance) {
            return this.instance;
        }
        return this;
    }

    log(args) {
        if (args[0] === "i18next::translator: missingKey" && this.testing) {
            const lng = args[1];
            const ns = args[2];
            const key = args[3];
            const missed = new Error(
                `Error finding translations there is a missing key!\n
                 Cannot find: 
                 Language: ${lng}
                 Namespace: ${ns}
                 Key: ${key}
                ${JSON.stringify(args)}
                `,
            );
            this.errors.push(missed);
        }
        if (this.testing && args[0] === "i18next: initialized") {
            return;
        }
        this.output("log", args);
    }

    warn(args) {
        if (args[0].includes("i18next::interpolator: missed") && this.testing) {
            const partial = new Error(
                `Error finding translations there is a missing key!\n
                 Cannot find: 
                 ${JSON.stringify(args)}
                `,
            );
            this.errors.push(partial);
        }
        this.output("warn", args);
    }

    error(args) {
        this.output("error", args);
    }

    output(type, args) {
        if (
            console &&
            console[type] &&
            !(process.env?.NODE_ENV === "production" || process.env?.APP_ENV === "production")
        )
            console[type].apply(console, args);
    }
}
Logger.type = "logger";

export default Logger;
