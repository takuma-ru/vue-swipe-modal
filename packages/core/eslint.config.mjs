import antfu from "@antfu/eslint-config";

export default antfu({
	ignores: [ "@types/**" ],
	formatters: {
		css: true,
		html: true,
	},
	stylistic: {
		indent: "tab",
		semi: true,
		quotes: "double",
	},
	rules: {
		"func-style": [ "error", "expression" ],
		"antfu/top-level-function": "off",
		"style/array-bracket-spacing": [
			"error",
			"always",
			{ arraysInArrays: false },
		],
		"style/array-bracket-newline": [ "error", { multiline: true, minItems: 3 } ],
		"no-unused-vars": "error",
	},
	typescript: true,
	vue: true,
});
