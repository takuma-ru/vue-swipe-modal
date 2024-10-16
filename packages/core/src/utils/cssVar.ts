import { CSS_VAR_NAME } from "src/constants/CSS_VAR_NAME";
import type { Ref } from "vue";

export const cssVar = (dialogRef: Ref<HTMLDialogElement | null>) => {
  const setCssVar = (name: keyof typeof CSS_VAR_NAME, value: string) => {
    if (!dialogRef.value) {
      return;
    }

    dialogRef.value.style.setProperty(CSS_VAR_NAME[name], value);
  };

  const getCssVar = (name: keyof typeof CSS_VAR_NAME) => {
    if (!dialogRef.value) {
      return "";
    }

    return dialogRef.value.style.getPropertyValue(CSS_VAR_NAME[name]);
  };

  return { setCssVar, getCssVar };
};
