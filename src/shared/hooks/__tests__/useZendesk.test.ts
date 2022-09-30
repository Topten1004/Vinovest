import { isZendeskPage } from "../useZendesk/utils";

describe("useZendesk Hook", () => {

    describe("isZendeskPage", () => {
        it("homepath should be a zendesk page if authorized", () => {
            const actual = isZendeskPage("/", true);
            expect(actual).toBe(true);
        });
    
        it("homepath should not be a zendesk page if unauthorized", () => {
            const actual = isZendeskPage("/", false);
            expect(actual).toBe(false);
        });
    
        it("returns false for a path not in the map", () => {
            const actual = isZendeskPage("/foobar", false);
            expect(actual).toBe(false);
        });
    });
})