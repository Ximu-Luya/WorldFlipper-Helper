import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
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
    }
  },
  actions: {
    updateTabCurrent({ commit }, currentTab) {
      commit("setTabCurrent", currentTab);
    },
  },
});

export default store;
