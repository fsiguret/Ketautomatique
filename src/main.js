import { createApp } from "vue";
import Router from "./router/routerApp.js";
import App from "./Popup.vue";
import { createPinia } from "pinia";

const vm = createApp(App);
vm.use(Router);
vm.use(createPinia());
vm.mount("#app");
