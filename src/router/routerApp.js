import { createRouter, createWebHistory } from "vue-router";

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/popup.html",
      component: () => import("../Popup.vue"),
    },
    {
      path: "/popup.html/",
      component: () => import("../pages/History.vue"),
    },
    {
      path: "/popup.html/positions",
      component: () => import("../pages/Positions.vue"),
    },
    {
      path: "/popup.html/stats",
      component: () => import("../pages/Stats.vue"),
    },
  ],
});
