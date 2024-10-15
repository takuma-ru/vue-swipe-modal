import { createApp } from "vue";
import "./style.css";
// biome-ignore lint/nursery/useImportRestrictions: <explanation>
import { resister } from "../src/main";
import App from "./App.vue";

resister();
createApp(App).mount("#app");
