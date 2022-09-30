const path = require("path");
const fs = require("fs");
const { appSrc } = require("./paths");

const aliases = fs
    .readdirSync(appSrc)
    .filter(
        (fileName) =>
            fs.statSync(path.resolve(appSrc, fileName)).isDirectory() ||
            path.extname(fileName) === ".js" ||
            path.extname(fileName) === ".ts",
    )
    .reduce(
        (acc, curr) => {
            const aliasName = path.parse(curr).name;
            const fileTest = /\.[tj]sx?/.test(path.extname(curr));
            acc.jestAliases[`^#${aliasName}(.*)$`] = `<rootDir>/src/${curr}$1`;
            acc.webpackAliases[`#${aliasName}`] = path.resolve(appSrc, curr);
            acc.tsAliases[`#${aliasName}${fileTest ? "" : "/*"}`] = [
                path.relative(appSrc, path.resolve(appSrc, curr)).concat(fileTest ? "" : "/*"),
            ];
            return acc;
        },
        { jestAliases: {}, webpackAliases: {}, tsAliases: {} },
    );

module.exports = aliases;
