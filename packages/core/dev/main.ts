import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
// biome-ignore lint/nursery/useImportRestrictions: <explanation>
import "../src/main";

createApp(App).mount("#app");
