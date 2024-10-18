import { createApp } from "vue";
import "./style.css";
// biome-ignore lint/nursery/useImportRestrictions: <explanation>
import { resister } from "../src/main";
import App from "./App.vue";

resister();
const app = createApp(App);
app.config.compilerOptions.isCustomElement = tag => tag.includes("web-");
app.mount("#app");
