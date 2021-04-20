import {
  createWebHistory,
  createRouter
} from "vue-router";
import UserLocation from "@/views/UserLocation.vue";
import NotFound from "@/views/NotFound.vue";

const routes = [{
    path: "/",
    name: "UserLocation",
    component: UserLocation,
  },
  { path: '/:path(.*)', name: "NotFound", component: NotFound, },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;