module.exports = {
    "env": {
        "node": true,
        "es6": true
    },
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaVersion": 8,
        "sourceType": "module"
    },
    "extends": ["eslint:recommended", "google"],
    "rules": {
        "comma-dangle": ["error", "never"],
        "max-len": ["error", 120],
        "no-undef": "error",
        "object-curly-spacing": ["error", "always"]
    }
};
