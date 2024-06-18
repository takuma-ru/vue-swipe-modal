export const booleanConverter = (value: string | null, _type: unknown) => {
  if (value === "false") {
    return false;
  }

  return Boolean(value);
};
