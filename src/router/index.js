import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import RestaurantChooser from "../views/RestaurantChooser.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/chooser",
    name: "Chooser",
    component: RestaurantChooser
  },
  {
    path: "/",
    name: "Home",
    component: Home
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
