module.exports = {
  parser: "babel-eslint",

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

  overrides: [
    {
      parser: "@typescript-eslint/parser",

      files: ["**/*.ts?(x)"],

      plugins: ["@typescript-eslint"],

      rules: {
        // Borrowed from:
        // https://github.com/facebook/create-react-app/blob/master/packages/eslint-config-react-app/index.js

        // TypeScript's `noFallthroughCasesInSwitch` option is more robust (#6906)
        "default-case": "off",
        // 'tsc' already handles this (https://github.com/typescript-eslint/typescript-eslint/issues/291)
        "no-dupe-class-members": "off",
        // 'tsc' already handles this (https://github.com/typescript-eslint/typescript-eslint/issues/477)
        "no-undef": "off",

        // Add TypeScript specific rules (and turn off ESLint equivalents)
        "@typescript-eslint/consistent-type-assertions": "warn",
        "no-array-constructor": "off",
        "@typescript-eslint/no-array-constructor": "warn",
        "no-use-before-define": "off",
        "@typescript-eslint/no-use-before-define": [
          "warn",
          {
            functions: false,
            classes: false,
            variables: false,
            typedefs: false,
          },
        ],
        "no-unused-expressions": "off",
        "@typescript-eslint/no-unused-expressions": [
          "error",
          {
            allowShortCircuit: true,
            allowTernary: true,
            allowTaggedTemplates: true,
          },
        ],
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": [
          "warn",
          {
            args: "none",
            ignoreRestSiblings: true,
          },
        ],
        "no-useless-constructor": "off",
        "@typescript-eslint/no-useless-constructor": "warn",
      },
    },
  ],
}
