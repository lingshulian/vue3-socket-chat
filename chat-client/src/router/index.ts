import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/Login.vue";
import routerGuard from './guard'

const routes = [
  { path: "/", name: "Login", component: Login },
  { path: "/chat", name: "Chat", component: () => import("@/views/Chat.vue") }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 })
})

// 守卫
routerGuard(router)

export default router;