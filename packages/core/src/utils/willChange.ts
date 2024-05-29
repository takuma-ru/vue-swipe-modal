export const setWillChange = (element: HTMLElement, value: string) => {
  element.style.setProperty("will-change", value);
};

export const removeWillChange = (element: HTMLElement) => {
  element.style.removeProperty("will-change");
}