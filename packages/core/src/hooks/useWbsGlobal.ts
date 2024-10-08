export const useWbsGlobal = createGlobalState(() => {
  const isDragging = ref<boolean>(false);

  return {
    isDragging,
  };
});
