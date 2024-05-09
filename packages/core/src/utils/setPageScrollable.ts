/**
 * 背景がスクロールできるかどうかを制御する
 */
export const setPageScrollable = (scrollable: "auto" | "hidden" | "reset") => {
	if (scrollable === "reset") {
		document.documentElement.style.removeProperty("overflow");
		document.documentElement.style.removeProperty("overscroll-behavior-y");
		return;
	}

	let dv = window;
	let xOffset, yOffset, de;
	if (document.defaultView) {
		dv = document.defaultView;
		xOffset = dv.scrollX;
		yOffset = dv.scrollY;
	}
	else {
		de = document.documentElement;
		xOffset = de.scrollLeft;
		yOffset = de.scrollTop;
	}
	document.documentElement.style.overflow = scrollable;
	document.documentElement.style.overscrollBehaviorY
    = scrollable === "auto" ? "auto" : "none";
	dv.scrollTo(xOffset, yOffset);
};
