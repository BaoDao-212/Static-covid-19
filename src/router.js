import { createRouter, createWebHistory } from "vue-router";
import HomeWeb from "./views/HomeWeb.vue";
import CountriesData from "./views/CountriesData.vue";
import WorldData from "./views/WorldData.vue";
import IndiaDetails from "./views/IndiaDetails.vue";
import IndiaDetail from "./views/IndiaDetail.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeWeb,
  },
  {
    path: "/details/:countryName",
    name: "CountriesData",
    component: CountriesData,
  },
  {
    path: "/India",
    name: "India",
    component: IndiaDetail,
  },
  {
    path: "/India/Timeline",
    name: "India/Timeline",
    component: IndiaDetails,
  },

  {
    path: "/world",
    name: "world",
    component: WorldData,
  },
];
const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
