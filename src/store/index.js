import Vue from "vue";
import Vuex from "vuex";
import main from "./modules/main";
import user from "./modules/user";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    main,
    user
  }
});
