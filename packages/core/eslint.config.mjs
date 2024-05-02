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
		"style/array-bracket-spacing": [
			"error",
			"always",
			{ arraysInArrays: false },
		],
		"style/array-bracket-newline": [ "error", { multiline: true, minItems: 3 } ],
	},
	typescript: true,
	vue: true,
});
