import { createRouter, createWebHashHistory } from "vue-router"

let routes = [
    {
        path: "/",
        component: import("../pages/home/index.vue"),
        children: [
            {
                path: "discover",
                component: () => import("../pages/home/discover/index.vue")
            },
            {
                path: "friends/:id",
                component: () => import("../pages/home/friends/index.vue")
            },
            {
                path: "welcome",
                component: () => import("../pages/home/welcome/index.vue")
            }
        ]
    },

    {
        path: "/login",
        component: () => import("../pages/login/index.vue")
    }
]

let router = createRouter({
    routes,
    history: createWebHashHistory()
})

export default router;