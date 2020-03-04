import Vue from "vue";
import Vuex from "vuex";

import server from "../serverProxy";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    businesses: []
  },
  mutations: {
    setBusinesses(state, businesses) {
      state.businesses = businesses;
    }
  },
  actions: {
    async retrieveBusinesses({ commit }, { search, page }) {
      const { businesses } = await server.queryRestaurants(search, page);
      commit("setBusinesses", businesses);
    }
  },
  modules: {}
});
