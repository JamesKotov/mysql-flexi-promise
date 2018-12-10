module.exports = {
    extends: [
        'airbnb-base',
        'plugin:jest/recommended',
    ],
    plugins: [
        'import',
        'jest',
    ],
    env: {
        node: true,
        'jest/globals': true,
    },
    rules: {
        "func-names": ["error", "never"],
        "indent": ["error", "tab"],
        "no-tabs": "off",
        "no-mixed-spaces-and-tabs": "off",
        "no-trailing-spaces": "off",
        "prefer-promise-reject-errors": "off",
        "max-len": 0,
        "class-methods-use-this": "off",
        "camelcase": "off",
        "no-param-reassign": "off",
        "consistent-return": "off",
        "prefer-destructuring": "off",
        "no-unused-vars": "off",
        "arrow-parens": "off",
        "no-restricted-syntax": "off",
        "no-await-in-loop": "off",
        "guard-for-in": "off",
        "global-require": "off",
    }
};
