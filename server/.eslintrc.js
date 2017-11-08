module.exports = {
    "env": {
        "browser": true,
        "node": true,
        "mocha": true,
    },
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaVersion": 8,
        "sourceType": "module"
    },
    "extends": ["eslint:recommended", "google"],
    "rules": {
        "comma-dangle": ["error", "never"],
        "max-len": ["error", 140],
        "no-undef": "error",
        "object-curly-spacing": ["error", "always"]
    }
};
