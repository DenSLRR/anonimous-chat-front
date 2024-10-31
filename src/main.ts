import { createApp } from 'vue'
import './style.scss'
import App from './App.vue'
import {router} from "./app/router.ts"
import piniaPersistantState from "pinia-plugin-persistedstate";
import { createPinia } from "pinia";
import { VueQueryPlugin } from "@tanstack/vue-query";

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPersistantState);

VueQueryPlugin.install(app, {
    enableDevtoolsV6Plugin: true,
});


app.use(pinia);
app.use(router);

router.isReady().then(() => {
    app.mount("#app");
});
