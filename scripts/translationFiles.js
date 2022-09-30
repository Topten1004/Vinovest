/**
 * This script will automatically generate an import/export index file for all translation
 * files and converted into an object that can be used for the i18next instantiation for resources.
 *
 * Removes the necessity of having to import every single locale file from translations in i18n.ts.
 * With more languages this would eventually lead to imports in the 100s before configuration could occur.
 */

const fs = require("fs");
const path = require("path");
const paths = require("../config/paths");

const { appLocales, appSrc } = paths;
const exportObject = {};

const readPromise = (p) =>
    new Promise((res, rej) => {
        fs.readdir(p, (err, files) => {
            if (err) rej(err);
            res(files);
        });
    });

let upperScopeString = "";
const exp = {};
const upperScope = (name, filePath, locale) => {
    upperScopeString += `import ${name} from './${filePath}';\n`;
};

const template = (p) => {
    const filename = path.basename(p).split(".")[0];

    const capitalize = filename.replace(/(^[a-z])(.*)/gm, (m, p1, p2) => `${p1.toUpperCase()}${p2}`);
    const name = capitalize.replace(/([-_])([a-z])/gm, (m, p1, p2) => `${p2.toUpperCase()}`);

    const locale = path.basename(path.dirname(p));
    const relativePath = path.relative(appLocales, p);
    upperScope(locale + name, relativePath);
    if (!exp[locale]) {
        exp[locale] = {};
    }
    exp[locale][filename] = locale + name;
};

readPromise(appLocales)
    .then((folders) => {
        const promises = [];
        folders
            .filter((f) => fs.statSync(path.resolve(appLocales, f)).isDirectory())
            .map((f) => {
                const full = path.resolve(appLocales, f);
                promises.push(readPromise(full).then((fil) => fil.map((fil) => path.resolve(appLocales, f, fil))));
            });
        return Promise.all(promises);
        // const allFolders;
    })
    .then((files) => {
        const allFiles = files.reduce((acc, curr) => acc.concat(curr), []);
        allFiles.map(template);
    })
    .then(() =>
        fs.writeFile(
            path.resolve(appLocales, "index.js"),
            `${upperScopeString} \n\nexport default ${JSON.stringify(exp, null, 2).replace(
                /(["']:)(.*['"])(.*)(['"])(.*)/gm,
                (m, p1, p2, p3, p4, p5) => `${p1} ${p3}${p5}`,
            )}`,
            (err) => {
                if (err) throw new Error(err);
            },
        ),)
    .catch((e) => console.error(e));
