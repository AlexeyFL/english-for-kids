module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: ["airbnb-base", "prettier"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parser: "babel-eslint",
  parserOptions: {
    parser: "babel-eslint",
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      experimentalObjectRestSpread: true
    }
  },
  rules: {
    "no-underscore-dangle": "off",
    "lines-between-class-members": "off",
    "no-use-before-define": "off",
    "no-plusplus": "off",
    "func-names": "off",
    "no-shadow": "off"
  }
};
