import { createApp } from "vue";
import App from "./App.vue";
import "./style.css";

const app = createApp(App);
app.config.compilerOptions.isCustomElement = tag => tag.includes("web-");
app.mount("#app");
