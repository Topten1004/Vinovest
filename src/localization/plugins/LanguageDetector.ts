import { localeStorageKey } from "../constants";
import pathDetector from "./languageDetectionPlugins/browserPathDetector";
import storageDetector from "./languageDetectionPlugins/storageDetector";
import { LanguageDetectorModule } from "i18next";
class LangDetect implements LanguageDetectorModule {
    static type: string;
    type: "languageDetector";
    detectors: any;
    services: any;
    options: any;
    i18nOptions: any;
    storageKey: string;
    constructor(services, options = {}) {
        this.type = "languageDetector";
        this.detectors = {};
        this.addDetector(pathDetector);
        this.addDetector(storageDetector);
        this.storageKey = localeStorageKey;
        this.init(services, options);
    }

    init(services, options = {}, i18nOptions = {}) {
        this.services = services;
        this.options = {};
        this.i18nOptions = i18nOptions;
    }

    addDetector(detector) {
        this.detectors[detector.name] = detector;
    }

    detect(detectionOrder = []) {
        const { storage, path } = this.detectors;
        return path.find(this.options);
    }

    cacheUserLanguage(lng, caches = []) {
        window.localStorage.setItem(this.storageKey, lng);
        window.sessionStorage.setItem(this.storageKey, lng);
    }
}

LangDetect.type = "languageDetector";

export default LangDetect;
