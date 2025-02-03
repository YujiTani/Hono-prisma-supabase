import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import _import from "eslint-plugin-import";
import unusedImports from "eslint-plugin-unused-imports";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import jest from "eslint-plugin-jest";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [...fixupConfigRules(compat.extends(
    "eslint:recommended",
    "airbnb-base",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:import/typescript",
    "plugin:jest/recommended",
    "plugin:jest/style",
    "prettier",
)), {
    plugins: {
        import: fixupPluginRules(_import),
        "unused-imports": unusedImports,
        "@typescript-eslint": fixupPluginRules(typescriptEslint),
        jest: fixupPluginRules(jest),
    },

    languageOptions: {
        globals: {
            ...jest.environments.globals.globals,
        },

        parser: tsParser,
        ecmaVersion: 5,
        sourceType: "script",

        parserOptions: {
            project: "./tsconfig.json",
        },
    },

    settings: {
        "import/parsers": {
            "@typescript-eslint/parser": [".ts", ".tsx"],
        },

        "import/resolver": {
            alias: {
                map: [["@", "./src"], ["~", "./"]],
                extensions: [".ts", ".js", ".json"],
            },
        },
    },

    rules: {
        "consistent-return": "off",
        "no-underscore-dangle": "off",

        "@typescript-eslint/no-unused-vars": ["warn", {
            argsIgnorePattern: "^_",
            varsIgnorePattern: "^_",
            caughtErrorsIgnorePattern: "^_",
            destructuredArrayIgnorePattern: "^_",
        }],

        "import/extensions": "off",
        "import/prefer-default-export": "off",
        "unused-imports/no-unused-imports": "error",

        "import/order": ["error", {
            groups: ["builtin", "external", "parent", "sibling", "index", "object", "type"],
            pathGroupsExcludedImportTypes: ["builtin"],
            "newlines-between": "always",

            alphabetize: {
                order: "asc",
            },
        }],

        "@typescript-eslint/consistent-type-imports": ["error", {
            prefer: "type-imports",
        }],

        "no-restricted-imports": ["error", {
            patterns: ["./*", "../*"],
        }],

        "jest/consistent-test-it": ["error", {
            fn: "it",
        }],
    },
}];