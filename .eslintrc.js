module.exports = {
    extends: ["airbnb", "react-app"],
    plugins: ["prettier"],
    settings: {
        "import/resolver": {
            node: {
                paths: ["src"],
            },
        },
    },
    rules: {
        camelcase: 0,
        "consistent-return": 0,
        quotes: [2, "double"],
        "object-curly-newline": 0,
        "arrow-parens": ["off"],
        "no-multi-spaces": 0,
        "no-confusing-arrow": 0,
        "no-underscore-dangle": 0,
        "max-len": ["error", { code: 200 }],
        indent: ["error", 4],
        "prettier/prettier": "error",
        "react/jsx-indent": ["error", 4],
        "operator-linebreak": ["error", "after"],
        "react/prop-types": 0,
        "react/jsx-indent-props": ["error", 4],
        "react/jsx-filename-extension": [
            1,
            {
                extensions: [".js", ".jsx", ".tsx"],
            },
        ],
        "react/jsx-one-expression-per-line": 0,
        "implicit-arrow-linebreak": 0,
        "import/prefer-default-export": 0,
        "import/no-extraneous-dependencies": 0,
        "lines-between-class-members": 0,
        "func-names": 0,
        "react/jsx-props-no-spreading": 0,
        "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
        "react-hooks/exhaustive-deps": "warn", // Checks effect dependencies
    },
};
