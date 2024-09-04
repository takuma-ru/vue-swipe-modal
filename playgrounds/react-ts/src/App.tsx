import { BottomSheet } from "@web-bottom-sheet/react";
import { useState } from "react";
import viteLogo from "/vite.svg";
import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setIsOpened(true)}>Open bottom sheet</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <BottomSheet
        open={isOpened}
        onClose={() => setIsOpened(false)}
        snapPoint="50%"
      >
        This is @web-bottom-sheet/react
        <button onClick={() => setIsOpened(false)}>Close bottom sheet</button>
      </BottomSheet>
    </>
  );
}

export default App;
