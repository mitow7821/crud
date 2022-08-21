import { createRouter, createWebHistory } from "vue-router";
import Table from "./components/Table.vue";
import Form from "./components/Form.vue";
import { getAlbum } from "./useAlbums";

const routes = [
  { path: "/", component: Table, props: true, name: "Home" },
  { path: "/:id", component: Form },
  { path: "/add", component: Form },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _, next) => {
  if (!["/", "/add"].includes(to.path)) {
    const albumId = to.params?.id;
    const isPathValid = !!(albumId && getAlbum(+albumId));

    if (!isPathValid) {
      alert("Album does not exist!");

      return next("/");
    }
  }

  next();
});

export { router };
