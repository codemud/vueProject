import { getSkin, setSkin, setMenuBar, getMenuBar } from "@/utils/auth";
import data from '@/data/header.json';
export default {
  state: {
    skin: getSkin() || data[0],
    menuBar: getMenuBar() ? getMenuBar().menuBars : [{ name: "首页", path: "/" }],
    menuBarCurrentPath: getMenuBar() ? getMenuBar().current : "/"
  },
  mutations: {
    SET_SKIN (state, val) {
      state.skin = val;
      setSkin(val);
    },
    SET_MENUBAR (state, val) {
      if (state.menuBar.every(f => f.path !== val.path)) {
        state.menuBar.push(val);
      }
      state.menuBarCurrentPath = val.path
      setMenuBar({ menuBars: state.menuBar, current: val.path })
    },
    REMOVE_MENUBAR (state, val) {
      state.menuBar = val.menuBar
      state.menuBarCurrentPath = val.path;
      setMenuBar({ menuBars: val.menuBar, current: val.path })
    }
  },
  actions: {
    updateSkin ({ commit }, val) {
      //切换皮肤
      commit("SET_SKIN", val);
    },
    setMenuBar ({ commit }, val) {
      commit("SET_MENUBAR", val);
    },
    removeMenuBar ({ commit }, val) {
      commit("REMOVE_MENUBAR", val);
    },
  }
};
