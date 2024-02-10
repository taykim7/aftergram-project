import Vue from 'vue';
import Vuex from 'vuex';
import { loginUser } from '@/api/auth'
import { createPost } from '@/api/posts'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    email: '',
    uid: '',
    nickname: '',
  },
  getters: {},
  mutations: {
    setUid(state, uid) { 
      state.uid = uid;
    },
    setEmial(state, email) { 
      state.email = email;
    },
  },
  actions: {
    async LOGIN({ commit }, userData) {
      // TODO 로그인 성공 유무 분기 처리
      const response = await loginUser(userData);
      // uid 저장
      commit('setUid', response);
    },
    async POST({ commit }, postData) {
      // TODO 성공 유무 분기 처리
      await createPost(postData);
      commit('setEmail', '');
    },
  }
});