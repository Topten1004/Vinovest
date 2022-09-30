import _ from "lodash";

export const CrudOperation = {
    CREATE_OP: "CREATE",
    DELETE_OP: "DELETE",
    READ_OP: "READ",
    UPDATE_OP: "UPDATE",
};

/**
 * FetchStatus model
 *
 * @export
 * @class FetchStatus
 */
export class FetchStatus {
    error = undefined;
    isInvalidated = true;
    pendingOperation = undefined;

    /**
     * Creates an instance of FetchStatus.
     * @param {object} [{ error, isInvalidated, pendingOperation }={}]
     * @property {string} error - entity's error message
     * @property {boolean} isInvalidated - indicates data is stale + needs to be updated
     * @property {CrudOperation | boolean} pendingOperation - enum of the CRUD op in question
     */
    constructor({ error, isInvalidated, pendingOperation } = {}) {
        this.error = !_.isNil(error) ? error : this.error;
        this.isInvalidated = !_.isNil(isInvalidated) ? isInvalidated : this.isInvalidated;
        this.pendingOperation = !_.isNil(pendingOperation) ? pendingOperation : this.pendingOperation;
    }

    set(key, value) {
        this[key] = value;
    }

    isPending() {
        return !_.isNil(this.pendingOperation);
    }
    isFailed() {
        return !_.isNil(this.error);
    }
    isDone() {
        return !this.isPending() && !this.isInvalidated;
    }
    isFetching() {
        return this.isPending() && this.pendingOperation === CrudOperation.READ_OP;
    }
    isSuccess() {
        return !this.isFailed() && this.isDone();
    }
}

export const invalidatedFetch = () => new FetchStatus();
export const pendingFetch = (OP = true) => new FetchStatus({ isInvalidated: false, pendingOperation: OP });
export const erroredFetch = (error = "SET ERROR MESSAGE") => new FetchStatus({ isInvalidated: false, error });
export const completedFetch = () => new FetchStatus({ isInvalidated: false });

export const emptyFetchEntity = (data) => ({
    data,
    status: invalidatedFetch(),
});

export const getData = (entity) => entity.data;
export const getStatus = (entity) => entity.status;
