import { createRouter, createWebHistory } from "vue-router";
import main from "../pages/main.vue";
import register from "../pages/sign-up.vue";
import login from "../pages/sign-in.vue";
import chats from "../pages/chats.vue";


export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "main",
            component: main,
        },
        {
            path: "/sign-up",
            name: "sign-up",
            component: register,
        },
        {
            path: "/sign-in",
            name: "sign-in",
            component: login,
        },
        {
            path: "/chats",
            name: "chats",
            component: chats,
        },

    ],
});
