import Vue from 'vue';
import Vuex from 'vuex';
import { loginUser, registerUser } from '@/api/auth'
import { setPost, fetchPosts, updatePost, deletePost } from '@/api/posts'

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
    // TODO 전체 에러 처리
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
    async POST({ dispatch }, postData) {
      try {
        const response = await setPost(postData);
        if (!response) {
          await dispatch('FETCH')
        }
      } catch (error) {
        console.log(error);
      }
    },
    // 조회
    async FETCH({ commit }) {
      try {
        const response = await fetchPosts(this.state.uid);
        const result = [];
        response.forEach((doc) => {
          result.push(doc.data());
        });
        commit('setPosts', result);
      } catch (error) {
        console.log(error);
      }
    },
    // 수정
    async UPDATE({ dispatch }, postData) {
      try {
        const response = await updatePost(postData);
        if (!response) {
          await dispatch('FETCH')
        }
      } catch (error) {
        console.log(error);
      }
      // 새로 조회
      dispatch('FETCH')
    },
    // 삭제
    async DELETE({ dispatch }, postData) {
      try {
        const response = await deletePost(postData);
        if (!response) {
          await dispatch('FETCH')
        }
      } catch (error) {
        console.log(error);
      }
      // 새로 조회
      dispatch('FETCH')
    },
  }
});