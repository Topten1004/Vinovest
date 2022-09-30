const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const { GetEnvVars } = require("env-cmd");

const type = process.argv.slice(2)[0];

process.env.NODE_ENV = "development";
/**
 *  Reads through the english locale direcectory in src/translations/en
 *  and with each locale file will upload all of the files, if it needs to download,
 *  then it will just download all of the locale files from lokalise.
 *
 *  TODO: automate downloading and overwriting current locale files and remove
 *  any need for any manual intervention for download or cleanup.
 */

GetEnvVars({
    rc: { filePath: ".env-cmdrc.js", environments: ["production"] },
}).then((keys) => {
    const LOCALE_PATH = path.resolve(process.cwd(), "src", "translations", "en");
    let { LOKALISE_TOKEN } = keys;

    if (!LOKALISE_TOKEN) {
        LOKALISE_TOKEN = process.env.LOKALISE_TOKEN;
    }

    /**
     * Below is the base command and flags used for both download
     * and upload of locale files. Upload is slightly trickier than download,
     * as it requires uploading multiple files, but the API will only allow
     * one request at a time per API token, necessitating a recursive upload.
     */

    const baseCmd = ["lokalise2 file ", type, " -t ", LOKALISE_TOKEN, " --project-id 58575815604edd28bc69a1.20347040 "];

    const downloadFlags = [
        "--placeholder-format i18n --plural-format i18next --disable-references --original-filenames=false --bundle-structure %LANG_ISO%/%LANG_NS%.json",
        " --format json",
    ];
    const uploadFlags = [
        "--apply-tm ",
        "--detect-icu-plurals ",
        "--lang-iso en ",
        "--replace-modified ",
        "--distinguish-by-file ",
    ];

    if (!LOKALISE_TOKEN) {
        throw new Error("A Lokalise token is needed to upload or download locale files!");
    }



    // Upload file function that takes a callback to call itself for every file
    function uploadFile(cmd, filePath, cb) {
        console.log("Starting to upload file", filePath);
        exec(cmd + `--file ${filePath}`, (err, stdout, stderr) => {
            if (err || stderr) throw new Error(JSON.stringify({ err, stderr }, null, 2));
            cb();
        });
    }
    fs.readdir(LOCALE_PATH, (err, files) => {
        if (err) throw new Error(err);

        if (type === "upload") {
            const cmd = baseCmd.concat(uploadFlags).join("");
            const fileStack = [...files].map((f) => path.resolve(LOCALE_PATH, f));
            const cb = () => {
                if (fileStack && fileStack.length) {
                    const nextFile = fileStack.pop();
                    console.log("Uploading file ", nextFile);
                    uploadFile(cmd, nextFile, cb);
                } else {
                    console.log("Finished uploading locale files.");
                }
            };
            const firstFile = fileStack.pop();
            console.log("Uploading file ", firstFile);
            uploadFile(cmd, firstFile, cb);
        }
        if (type === "download") {
            const cmd = baseCmd.concat(downloadFlags).join("");
            console.log(cmd);
            exec(cmd, (err, stdout, stderr) => {
                if (err || stderr) throw new Error(JSON.stringify({ err, stderr }, null, 2));
                console.log(stdout);
            });
        }
    });
});
