import router from "@/router";
import store from "@/store";
import { NProgress } from './NProgress'

router.beforeEach((to, from, next) => {
  NProgress.start();
  const token = store.getters.getUserToken;
  if (!token) {
    if (to.path !== "/login") {
      next({ path: "login" });
    } else {
      next();
    }
    NProgress.done();
  } else {
    if (to.path !== "/login") {
      store.dispatch("setMenuBar", { name: to.name, path: to.path })
    }
    if (to.path === '/') {
      NProgress.done()
    } else {
      if (store.state.main.menuBar.find(f => f.path !== to.path)) {
        NProgress.done()
      }
    }
    next();
  }
});
