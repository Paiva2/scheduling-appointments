import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/home/HomeView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/home",
      name: "home",
      component: HomeView,
    },
  ],
});

export default router;
