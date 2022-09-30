import {
    FetchStatus,
    CrudOperation,
    pendingFetch,
    invalidatedFetch,
    completedFetch,
    erroredFetch,
    emptyFetchEntity,
    getData,
} from "../FetchStatus";

describe("Fetch Status", () => {
    it("should initialize with the correct defaults", () => {
        let status = new FetchStatus();
        expect(status.error).toBeUndefined();
        expect(status.isInvalidated).toBe(true);
        expect(status.pendingOperation).toBeUndefined();

        status = new FetchStatus({});
        expect(status.error).toBeUndefined();
        expect(status.isInvalidated).toBe(true);
        expect(status.pendingOperation).toBeUndefined();
    });

    describe("isPending()", () => {
        it("should return false from an initial state", () => {
            const status = new FetchStatus();
            expect(status.isPending()).toBe(false);
        });
        it("should return true if pendingOperation is set to any CrudOperation", () => {
            const getStatus = new FetchStatus({ pendingOperation: CrudOperation.READ_OP });
            expect(getStatus.isPending()).toBe(true);

            const createStatus = new FetchStatus({ pendingOperation: CrudOperation.CREATE_OP });
            expect(createStatus.isPending()).toBe(true);
        });
        it("should return true for pendingFetch()", () => {
            expect(pendingFetch().isPending()).toBe(true);
        });
    });

    describe("isDone()", () => {
        it("should return false from an initial state", () => {
            const status = new FetchStatus();
            expect(status.isDone()).toBe(false);
        });
        it("should return false if there is any pendingOperation exists", () => {
            const getStatus = new FetchStatus({ pendingOperation: CrudOperation.READ_OP });
            expect(getStatus.isDone()).toBe(false);

            const createStatus = new FetchStatus({ pendingOperation: CrudOperation.CREATE_OP });
            expect(createStatus.isDone()).toBe(false);
        });
        it("should return false for pendingFetch()", () => {
            expect(pendingFetch().isDone()).toBe(false);
        });
        it("should return true for completedFetch()", () => {
            expect(completedFetch().isDone()).toBe(true);
        });
        it("should return true for erroredFetch()", () => {
            expect(erroredFetch().isDone()).toBe(true);
        });
    });

    describe("isFailed()", () => {
        it("should return false from an initial state", () => {
            const status = new FetchStatus();
            expect(status.isFailed()).toBe(false);
        });
        it("should return true if any error exists", () => {
            const status = new FetchStatus();
            status.set("error", "This is an error message");
            expect(status.isFailed()).toBe(true);

            const failedStatus = new FetchStatus({
                error: "Something went horribly wrong",
            });
            expect(failedStatus.isFailed()).toBe(true);
        });
        it("should return true for erroredFetch()", () => {
            expect(erroredFetch().isFailed()).toBe(true);
        });
    });

    describe("isSuccess()", () => {
        it("should return false from an initial state", () => {
            const status = new FetchStatus();
            expect(status.isSuccess()).toBe(false);
        });
        it("should return false if any pendingOperation exists", () => {
            expect(pendingFetch().isSuccess()).toBe(false);

            const getStatus = new FetchStatus({ pendingOperation: CrudOperation.READ_OP });
            expect(getStatus.isSuccess()).toBe(false);
        });
        it("should return false if any error exists", () => {
            const errorStatus = new FetchStatus();
            errorStatus.set("error", "Something went wrong");
            expect(errorStatus.isFailed()).toBe(true);
            expect(errorStatus.isSuccess()).toBe(false);
        });
        it("should return true if fetch completes, no errors, and is not invalidated", () => {
            const status = pendingFetch();
            expect(status.isSuccess()).toBe(false);
            status.set("pendingOperation", undefined);
            expect(status.isSuccess()).toBe(true);

            expect(completedFetch().isSuccess()).toBe(true);
        });
        it("should return false if isInvalidated is true", () => {
            expect(invalidatedFetch().isSuccess()).toBe(false);
        });
    });

    describe("isFetching()", () => {
        it("should return false from an initial state", () => {
            const status = new FetchStatus();
            expect(status.isFetching()).toBe(false);
        });
        it("should return true if pending with a READ_OP", () => {
            const getStatus = new FetchStatus({ pendingOperation: CrudOperation.READ_OP });
            expect(getStatus.isFetching()).toBe(true);
        });
        it("should return false if pending with any other OP", () => {
            const deleteStatus = new FetchStatus({ pendingOperation: CrudOperation.DELETE_OP });
            expect(deleteStatus.isFetching()).toBe(false);
        });
    });

    describe("invalidatedFetch()", () => {
        it("should create a FetchStatus instance with default values", () => {
            const status = invalidatedFetch();
            expect(status.isFetching()).toBe(false);
            expect(status.isInvalidated).toBe(true);
        });
    });

    describe("pendingFetch()", () => {
        it("should create a FetchStatus instance values for a status in progress", () => {
            const status = pendingFetch(CrudOperation.READ_OP);
            expect(status.isPending()).toBe(true);
            expect(status.isFetching()).toBe(true);
            expect(status.isInvalidated).toBe(false);
            expect(status.pendingOperation).toEqual(CrudOperation.READ_OP);
        });
    });

    describe("erroredFetch()", () => {
        it("should create a FetchStatus instance values for a failed fetch", () => {
            const msg = "error-message";
            const status = erroredFetch(msg);
            expect(status.isPending()).toBe(false);
            expect(status.isDone()).toBe(true);
            expect(status.isFailed()).toBe(true);
            expect(status.error).toEqual(msg);
            expect(status.isInvalidated).toBe(false);
        });
    });

    describe("completedFetch()", () => {
        it("should create a FetchStatus instance values for a completed fetch", () => {
            const status = completedFetch();
            expect(status.isPending()).toBe(false);
            expect(status.isInvalidated).toBe(false);
            expect(status.isDone()).toBe(true);
        });
    });

    describe("emptyFetchEntity()", () => {
        it("should factory a new Entity with correct defaults", () => {
            const entity = emptyFetchEntity();
            expect(getData(entity)).toBeUndefined();
            expect(entity.status.isInvalidated).toBe(true);
            expect(entity.status.isPending()).toBe(false);
        });
    });
});
