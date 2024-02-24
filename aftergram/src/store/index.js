import Vue from 'vue';
import Vuex from 'vuex';
import { loginUser, registerUser } from '@/api/auth'
import { createPost, fetchAllPosts, updatePost } from '@/api/posts'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    email: '',
    uid: '',
    nickname: '',
    posts: [],
  },
  getters: {
    // 로그인 여부
    isLogin(state) {
      return state.uid !== '';
    }
  },
  mutations: {
    setUid(state, uid) { 
      state.uid = uid;
    },
    clearUid(state) {
      state.uid = '';
    },
    setEmail(state, email) { 
      state.email = email;
    },
    setPosts(state, posts) {
      state.posts = posts;
    }
  },
  actions: {
    // 로그인
    async LOGIN({ commit }, userData) {
      // TODO 로그인 성공 유무 분기 처리
      const response = await loginUser(userData);
      // uid 저장
      commit('setUid', response);
    },
    // 회원가입
    async REGISTER({ commit }, userData) {
      const { data } = await registerUser(userData);
      commit('setMessage', `${data.username} 님이 가입되었습니다.`);
      // TODO 닉네임 로직 추가 필요
    },
    // 게시
    async POST({ commit }, postData) {
      // TODO 성공 유무 분기 처리
      await createPost(postData);
      commit('setEmail', '');
    },
    // 조회
    async FETCH({ commit }) {
      // TODO 성공 유무 분기 처리
      const response = await fetchAllPosts(this.state.uid);
      commit('setPosts', response);
    },
    // 수정
    async UPDATE({ commit }, postData) {
      // TODO 성공 유무 분기 처리
      await updatePost(postData);
      // 새로 조회
      const response = await fetchAllPosts(this.state.uid);
      commit('setPosts', response);
    },
  }
});