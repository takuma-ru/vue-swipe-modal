export function setupOpener(
  element: HTMLButtonElement,
  webBottomSheet: HTMLElement,
) {
  let open = false;
  const setOpen = (newOpen: boolean) => {
    open = newOpen;
    element.innerHTML = `Open ${open ? "Opened" : "Closed"}`;
  };

  const setup = () => {
    element.addEventListener("click", () => {
      if (open) {
        onClose();
      } else {
        onOpen();
      }
    });
    setOpen(false);
  };

  const onOpen = () => {
    setOpen(true);
    webBottomSheet.setAttribute("open", "");
  };

  const onClose = () => {
    setOpen(false);
    webBottomSheet.removeAttribute("open");
  };

  return { setup, onOpen, onClose };
}
