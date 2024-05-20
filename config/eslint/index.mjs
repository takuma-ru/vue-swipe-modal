import { FlatCompat } from '@eslint/eslintrc';
import antfu from "@antfu/eslint-config";

const compat = new FlatCompat();

export default antfu({
		formatters: {
			css: true,
			html: true,
		},
		stylistic: {
			indent: 2,
			semi: true,
			quotes: "double",
		},
		rules: {
			"curly": [ "error", "all" ],
			"func-style": [ "error", "expression" ],
			"antfu/top-level-function": "off",
			"style/array-bracket-spacing": [
				"error",
				"always",
				{ arraysInArrays: false },
			],
			"style/array-bracket-newline": [ "error", { multiline: true, minItems: 3 } ],
			"no-unused-vars": "error"
		},
		typescript: true,
	}, ...compat.config({
		extends: [
			"plugin:lit/recommended",
		],
		rules: {
			"lit/no-duplicate-template-bindings": "error",
			"lit/no-template-map": "error",
			"lit/no-useless-template-literals": "error",
			"lit/attribute-value-entities": "error",
			"lit/binding-positions": "error",
			"lit/no-property-change-update": "error",
			"lit/no-invalid-html": "error",
		}
	}
));