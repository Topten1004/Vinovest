module.exports = (api) => {
    api.cache(false);

    const isTest = process.env.NODE_ENV === "test";
    const isExtract = process.env.EXTRACT_TRANSLATIONS === "true";
    const base = {
        presets: [   ["@babel/preset-env", {shippedProposals: true}], "@babel/preset-typescript",
            "@babel/preset-react"
          
        ],
        plugins: ["@emotion/babel-plugin",
         ["@babel/plugin-proposal-decorators", { legacy: true }],
         "@babel/plugin-proposal-optional-chaining",   
         "@babel/plugin-proposal-nullish-coalescing-operator",
        [
           "babel-plugin-named-asset-import",
            {
                loaderMap: {
                    svg: {
                        ReactComponent: "@svgr/webpack?-svgo,+titleProp,+ref![path]",
                    },
                },
            },
        ],
    ],
    };

    if (isTest) {
        base.plugins.push("require-context-hook");
        base.presets[0][1].modules = "commonjs";
    }

    if (isExtract) {
        base.plugins.push("babel-plugin-i18next-extract");
    }

    return base;
};
