const fs = require("fs");
const path = require("path");
const { tsAliases } = require("./config/aliases");

const generateTsAliases = () => ({
    include: ["src/types/**/*", "src"],
    exclude: [
        "./build/**/*",
        "node_modules", // This is what fixed it!
    ],
    compilerOptions: {
        outDir: "./build",
        skipLibCheck: true,
        declaration: true,
        emitDeclarationOnly: true,
        isolatedModules: true,
        baseUrl: "./src",
        moduleResolution: "node",
        jsxImportSource: "@emotion/react",
        resolveJsonModule: true,
        jsx: "react-jsx",
        paths: {
            ...tsAliases,
        },
    },
});

const tsConfig = generateTsAliases();

fs.writeFileSync(path.resolve(__dirname, "tsconfig.json"), JSON.stringify(tsConfig, null, 2));
