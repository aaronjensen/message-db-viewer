module.exports = {
  parser: "@babel/eslint-parser",

  env: {
    es6: true,
    browser: true,
    node: true,
  },

  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },

  extends: ["plugin:prettier/recommended"],

  rules: {
    "no-console": "warn",
    "no-var": "error",
  },
}
