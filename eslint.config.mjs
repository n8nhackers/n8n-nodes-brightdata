import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import n8nNodesBase from "eslint-plugin-n8n-nodes-base";
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

export default [{
    ignores: ["**/.eslintrc.js", "**/*.js", "**/node_modules/**/*", "**/dist/**/*"],
}, {
    languageOptions: {
        globals: {
            ...globals.browser,
            ...globals.node,
        },

        parser: tsParser,
        ecmaVersion: 5,
        sourceType: "module",

        parserOptions: {
            project: ["./tsconfig.json"],
            extraFileExtensions: [".json"],
        },
    },
}, ...compat.extends("plugin:n8n-nodes-base/community").map(config => ({
    ...config,
    files: ["**/package.json"],
})), {
    files: ["**/package.json"],

    plugins: {
        "n8n-nodes-base": n8nNodesBase,
    },

    rules: {
        "n8n-nodes-base/community-package-json-name-still-default": "off",
    },
}, ...compat.extends("plugin:n8n-nodes-base/credentials").map(config => ({
    ...config,
    files: ["credentials/**/*.ts"],
})), {
    files: ["credentials/**/*.ts"],

    plugins: {
        "n8n-nodes-base": n8nNodesBase,
    },

    rules: {
        "n8n-nodes-base/cred-class-field-documentation-url-missing": "off",
        "n8n-nodes-base/cred-class-field-documentation-url-miscased": "off",
    },
}, ...compat.extends("plugin:n8n-nodes-base/nodes").map(config => ({
    ...config,
    files: ["nodes/**/*.ts"],
})), {
    files: ["nodes/**/*.ts"],

    plugins: {
        "n8n-nodes-base": n8nNodesBase,
    },

    rules: {
        "n8n-nodes-base/node-execute-block-missing-continue-on-fail": "off",
        "n8n-nodes-base/node-resource-description-filename-against-convention": "off",
        "n8n-nodes-base/node-param-fixed-collection-type-unsorted-items": "off",
				"n8n-nodes-base/node-class-description-inputs-wrong-regular-node": "off",
				"n8n-nodes-base/node-class-description-outputs-wrong": "off",
				"n8n-nodes-base/node-param-description-wrong-for-dynamic-options": "off",
				"n8n-nodes-base/node-param-description-wrong-for-dynamic-multi-options": "off",
    },
}];
