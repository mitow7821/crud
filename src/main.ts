import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import Table from "./components/Table.vue";
import Form from "./components/Form.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/", component: Table, props: true, name: "Home" },
  { path: "/:id", component: Form },
  { path: "/add", component: Form },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(router).mount("#app");
