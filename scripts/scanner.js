var fs = require("fs");
const path = require("path");
var Parser = require("i18next-scanner").Parser;

var customHandler = function (key) {
    var defaultValue = "__TRANSLATION__"; // optional default value
    parser.set(key, defaultValue);
};

var parser = new Parser();
var content = "";

// Parse Translation Function
// i18next.t('key');
content = fs.readFileSync(path.resolve(process.cwd(), "src", "App.js"), "utf-8");
parser
    .parseFuncFromString(content, customHandler) // pass a custom handler
    .parseFuncFromString(content, { list: ["i18next.t"] }) // override `func.list`
    .parseFuncFromString(content, { list: ["i18next.t"] }, customHandler)
    .parseFuncFromString(content); // using default options and handler

// Parse HTML Attribute
// <div data-i18n="key"></div>
content = fs.readFileSync("/path/to/index.html", "utf-8");
parser
    .parseAttrFromString(content, customHandler) // pass a custom handler
    .parseAttrFromString(content, { list: ["data-i18n"] }) // override `attr.list`
    .parseAttrFromString(content, { list: ["data-i18n"] }, customHandler)
    .parseAttrFromString(content); // using default options and handler

console.log(parser.get());
console.log(parser.get({ sort: true }));
console.log(parser.get("translation:key", { lng: "en" }));
