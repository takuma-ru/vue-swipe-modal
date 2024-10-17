import "./style.css";
import { resister } from "@web-bottom-sheet/core";
import viteLogo from "/vite.svg";
import { setupOpener } from "./opener.ts";
import typescriptLogo from "./typescript.svg";

resister();

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="opener" type="button"></button>
      <web-bottom-sheet is-backdrop is-fullscreen is-scroll-lock>
        <div>
          <p>
            This is a Vite + TypeScript playground. Click the button above to open the bottom sheet.
          </p>
          <web-bottom-sheet-snap-point></web-bottom-sheet-snap-point>
        </div>
      </web-bottom-sheet>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`;

const { setup, onClose } = setupOpener(
  document.querySelector<HTMLButtonElement>("#opener")!,
  document.querySelector("web-bottom-sheet")!,
);

setup();

document.querySelector("web-bottom-sheet")!.addEventListener("close", () => {
  onClose();
});
