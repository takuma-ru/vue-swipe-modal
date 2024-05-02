import antfu from "@antfu/eslint-config";

export default antfu({
	ignores: ["@types/**"],
	formatters: {
		css: true,
		html: true,
	},
	stylistic: {
		indent: "tab",
		semi: true,
		quotes: "double",
	},
	typescript: true,
	vue: true,
});
