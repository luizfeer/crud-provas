import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    alerts: [],
  },
  mutations: {
    removeAlert(state) {
      state.alerts.shift();
    },
    setAlert(state, value) {
      state.alerts.push(value);
    },
  },
  actions: {
    alert({ commit }, msg) {
      commit('setAlert', msg);
      setTimeout(() => { commit('removeAlert'); }, 4500);
    },
  },
  modules: {
  },
});
