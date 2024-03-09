import Vue from 'vue';
import Vuex from 'vuex';
import {
  loginUser,
  registerUser,
  authChanged,
  logoutUser
} from '@/api/auth'
import { setPost, fetchPosts, updatePost, deletePost } from '@/api/posts'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    email: '',
    uid: '',
    nickname: '',
    posts: [],
    deleteSuccess: false,
    message: '',
    displayName: '',
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
    setPosts(state, posts) {
      state.posts = posts;
    },
    setDeleteSuccess(state, flag) {
      state.deleteSuccess = flag;
    },
    setMessage(state, message) {
      state.message = message;
    },
    setDisplayName(state, displayName) {
      state.displayName = displayName;
    }
  },
  actions: {
    // TODO 전체 에러 처리
    // 로그인
    async LOGIN({ commit }, userData) {
      try {
        const response = await loginUser(userData);
        if (response) {
          const userInfo = await authChanged()
          if (userInfo.uid) {
            // 로그인 - 사용자 정보를 저장하고 UI 업데이트 등의 작업 수행
            commit('setUid', userInfo.uid);
            commit('setDisplayName', userInfo.displayName);
          } else {
            // 로그아웃 - 사용자 정보를 초기화하고 UI 업데이트 등의 작업 수행
            await logoutUser()
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    // 로그아웃
    async LOGOUT({ commit }) {
      await logoutUser();
      commit('setUid', '');
    },
    // 회원가입
    // TODO 닉네임 로직 추가 필요
    async REGISTER({ commit }, userData) {
      try {
        await registerUser(userData).then(() => {
          commit('setMessage', `${userData.displayName} 님이 가입되었습니다.`);
        });
      } catch (error) {
        console.log(error);
      }
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
          await dispatch('FETCH');
        }
      } catch (error) {
        console.log(error);
      }
      // 새로 조회
      dispatch('FETCH');
    },
    // 삭제
    async DELETE({ commit }, postData) {
      try {
        const response = await deletePost(postData);
        if (!response) {
          commit('setDeleteSuccess', true);
        }
      } catch (error) {
        console.log(error);
        commit('setDeleteSuccess', false);
      }
    },
  }
});