import { isObject } from "lodash";
import isJson from "#utils/isJson";

export default class Storage {
    static setValue(key, value) {
        const val = isObject(value) ? JSON.stringify(value) : value;
        this.storage.setItem(this.getKey(key), val);
    }

    static getValue(key) {
        try {
            const value = this.storage.getItem(this.getKey(key));
            return isJson(value) ? JSON.parse(value) : value;
        } catch (e) {
            return null;
        }
    }

    static has(key) {
        return this.storage.getItem(this.getKey(key)) !== null;
    }

    static clear() {
        this.storage.clear();
    }

    static storage = window.sessionStorage;
    static storageKeyPrefix = "vinovest__";

    static getKey(key) {
        return this.storageKeyPrefix.concat(key);
    }
}
