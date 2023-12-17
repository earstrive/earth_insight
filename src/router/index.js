import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        // redirect是重定向
        {
            path: "/",
            redirect: "/show"
        },
        {
            name: "show",
            path: "/show",
            component: () => import("@/views/Show.vue")
        },
        {
            name: "home",
            path: "/home",
            component: () => import("@/views/Home/Home.vue")
        },
        {
            name: "mine",
            path: "/mine",
            component: () => import("@/views/Mine/Mine.vue")
        },
        {
            name: "login",
            path: "/login",
            component: () => import("@/views/Mine/Login.vue")
        },
        {
            name: "register",
            path: "/register",
            component: () => import("@/views/Mine/register.vue")
        },
        {
            // NotFound页面
            path: "/:pathMatch(.*)",
            redirect: "/show"
        }
    ]
});

export default router;