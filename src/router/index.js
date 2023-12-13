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
            component: () => import("@/views/Home.vue")
        },
        {
            // NotFound页面
            path: "/:pathMatch(.*)",
            redirect: "/show"
        }
    ]
});

export default router;