import { defineConfig } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier";
import playwright from "eslint-plugin-playwright";

export default defineConfig([
    // --------------------------------------------------
    // Global ignores
    // --------------------------------------------------
    {
        ignores: [
            "node_modules",
            "dist",
            "playwright-report",
            "test-results",
            "blob-report",
        ],
    },

    // --------------------------------------------------
    // Base TypeScript rules (all TS/JS files)
    // --------------------------------------------------
    {
        files: ["**/*.{ts,js}"],
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                ecmaVersion: "latest",
                sourceType: "module",
            },
            globals: {
                ...globals.node,
            },
        },
        plugins: {
            "@typescript-eslint": tseslint.plugin,
        },
        rules: {
            ...tseslint.configs.recommended.rules,

            // Automation-friendly adjustments
            "@typescript-eslint/no-unused-vars": ["warn"],
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/explicit-function-return-type": "off",
        },
    },

    // --------------------------------------------------
    // Playwright rules (tests only)
    // --------------------------------------------------
    {
        files: ["tests/**/*.ts"],
        plugins: {
            playwright,
        },
        rules: {
            ...playwright.configs.recommended.rules,

            // Reduce early-stage noise
            "playwright/no-conditional-expect": "warn",
            "playwright/no-skipped-test": "warn",
        },
    },

    // --------------------------------------------------
    // Disable rules that conflict with Prettier
    // --------------------------------------------------
    {
        files: ["**/*.{ts,js}"],
        rules: prettier.rules,
    },
]);
