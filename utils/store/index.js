import Vue from "vue";
import Vuex from "vuex";

import filters from './modules/filters.js'
import handbook from "./modules/handbook.js";

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  state: {
    tabCurrent: "pages/handbook/index",
    pageCurrent: "",
    drawerVisible: false,
  },
  mutations: {
    setTabCurrent(state, current) {
      state.tabCurrent = current;
    },
    toggleDrawerVisible(state) {
      state.drawerVisible = !state.drawerVisible;
    },
  },
  actions: {
    updateTabCurrent({ commit }, currentTab) {
      commit("setTabCurrent", currentTab);
    },
  },
  modules: {
    filters,
    handbook,
  },
});

export default store;
