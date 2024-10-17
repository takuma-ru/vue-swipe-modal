import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

const app = createApp(App);
app.config.compilerOptions.isCustomElement = (tag) => tag.includes("web-");
app.mount("#app");
