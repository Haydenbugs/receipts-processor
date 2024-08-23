import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import globals from "globals";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-explicit-any": "warn",
      "no-console": "warn",
    },
  },
  js.configs.recommended,
  {
    files: ["**/*.test.{js,ts}"], // Apply this to test files only
    languageOptions: {
      globals: globals.jest, // Add Jest globals
    },
    rules: {
      "no-undef": "off", // Disable no-undef for Jest globals
    },
  },
];
