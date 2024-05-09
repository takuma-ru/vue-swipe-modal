// eslint-disable-next-line ts/ban-types
type CssVarName = "bottom" | "movementAmountY" | "snapPointPosition" | String;

interface UseCssVarParameter {
	scopeName: string;
}

interface SetCssVarParameter {
	name: CssVarName;
	value: string;
	fallback?: (name: CssVarName, value: string) => void;
}

export const useCssVar = ({ scopeName }: UseCssVarParameter) => {
	const getCssVar = (name: CssVarName) => {
		return getComputedStyle(document.documentElement).getPropertyValue(`--${scopeName}-${name}`);
	};

	const setCssVar = ({ name, value, fallback }: SetCssVarParameter) => {
	  document.documentElement.style.setProperty(`--${scopeName}-${name}`, value);

		fallback?.(
			name,
			getCssVar(name),
		);
	};

	const removeCssVar = (name: CssVarName) => {
		document.documentElement.style.removeProperty(`--${scopeName}-${name}`);
	};

	return {
		setCssVar,
		getCssVar,
		removeCssVar,
	};
};
