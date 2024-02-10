import Vue from 'vue';
import Vuex from 'vuex';
import { loginUser } from '@/api/auth'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    email: '',
  },
  getters: {},
  mutations: {
    setEmail(state, email) { 
      state.email = email;
    },
  },
  actions: {
    async LOGIN({ commit }, userData) {
      await loginUser(userData);
      commit('setEmail', userData.email);
    },
  }
});