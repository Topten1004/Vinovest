const fs = require("fs");
const path = require("path");
const { jestAliases } = require("./config/aliases");

module.exports = {
    roots: ["<rootDir>/src"],
    collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}", "!src/**/*.d.ts"],
    setupFiles: ["react-app-polyfill/jsdom"],
    setupFilesAfterEnv: ["<rootDir>/src/shared/testing/jestSetup.js"],
    testMatch: ["<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}", "<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}"],
    testEnvironment: "jest-environment-jsdom-fourteen",
    transform: {
        "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
        "^.+\\.css$": "<rootDir>/config/jest/cssTransform.js",
        "^(?!.*\\.(js|jsx|ts|tsx|css|json)$)": "<rootDir>/config/jest/fileTransform.js",
    },
    transformIgnorePatterns: [
        "[/\\\\]node_modules[/\\\\](?!(@vinovest|react-spinners))\\.(js|jsx|ts|tsx)$",
        "^.+\\.module\\.(css|sass|scss)$",
    ],
    modulePaths: ["/home/jowarren/vinovest/web-client/src"],
    moduleNameMapper: {
        "^react-native$": "react-native-web",
        "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",
        "^app.config": "<rootDir>/src/app.config.js",
        "\\.svg": "<rootDir>/__mocks__/svgrMock.js",
        ...jestAliases,
    },
    snapshotSerializers: ["@emotion/jest/serializer"],
    moduleFileExtensions: ["web.js", "js", "web.ts", "ts", "web.tsx", "tsx", "json", "web.jsx", "jsx", "node", "json"],
    watchPlugins: ["jest-watch-typeahead/filename", "jest-watch-typeahead/testname"],
    collectCoverage: true,
    coverageDirectory: "coverage",
    clearMocks: true,
    setupFiles: ["<rootDir>/src/test-setup.js", "jest-canvas-mock"],
};
