import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const render = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// biome-ignore lint/style/noNonNullAssertion: <explanation>
ReactDOM.createRoot(document.getElementById("root")!).render(render);
