import Vue from "vue";
import Router from "vue-router";
import CatalogPage from "@/views/CatalogPage.vue";
import FavoritesPage from "@/views/FavoritesPage.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    { 
      path: "/", 
      redirect: { name: "catalog" } 
    },
    { 
      path: "/catalog", 
      name: "catalog", 
      component: CatalogPage 
    },
    { 
      path: "/favorites", 
      name: "favorites", 
      component: FavoritesPage 
    }
  ],
});