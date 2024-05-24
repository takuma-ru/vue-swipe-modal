import antfu from "@antfu/eslint-config";

export const vue = antfu({
    vue: true,
		typescript: true,
		stylistic: {
			indent: 2,
			semi: true,
			quotes: "double",
		},
		formatters: {
			css: false,
			html: true,
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
	});
