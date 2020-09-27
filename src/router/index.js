import Vue from "vue";
import VueRouter from "vue-router";
import mainRoutes from "./module/main";
import Login from "@/views/login";
import Layout from "@/views/Layout";
Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "登录",
    component: Login
  },
  {
    path: "/",
    component: Layout,
    children: [
      { name: "首页", path: "/", component: () => import(`@/views/main/home`) }
    ]
  },
  ...mainRoutes,
  {
    path: "*",
    name: "404",
    redirect: {
      path: "/"
    }
  }
];

const router = new VueRouter({
  // mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
