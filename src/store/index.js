import Vue from "vue";
import Vuex from "vuex";
import main from "./modules/main";
import user from "./modules/user";
import getter from "./getter";
Vue.use(Vuex);

export default new Vuex.Store({
  getters:getter,
  modules: {
    main,
    user
  }
});
