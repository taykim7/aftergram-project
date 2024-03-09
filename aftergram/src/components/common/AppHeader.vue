<template>
  <header>
    <div>
      <router-link :to="logoLink" class="logo">
        AfterGram
      </router-link>
      <span v-if="isUserLogin">{{ $store.state.email }} 계정 정보</span>
    </div>
    <div class="navigations">
      <!-- 로그인 분기-->
      <template v-if='isUserLogin'>
        <a @click="logoutUser">로그아웃</a>
      </template>
      <template v-else-if="nowPage === '/login'">
        <router-link to="/signup">회원가입</router-link>
      </template>
      <template v-else>
        <router-link to="/login">로그인</router-link>
      </template>
    </div>
  </header>
</template>

<script>
export default {
  computed: {
    // 로그인 여부에 따라 로고 링크 분기처리
    logoLink() {
      return this.$store.getters.isLogin ? '/main' : '/login';
    },
    isUserLogin() {
      return this.$store.getters.isLogin;
    },
    nowPage() {
      return this.$route.path;
    }
  },
  methods: {
    async logoutUser() {
      await this.$store.dispatch('LOGOUT');
      this.$store.commit('clearUid');
      this.$router.push('/login');
    },
  },
}
</script>

<style scoped>
header {
  padding: 0 2rem 0 2rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(0, 83, 18, 0.1);
  z-index: 2;
  box-shadow: 0px 0px 5px rgba(255, 255, 255, 0.4);
}
header .logo {
  color: white;
  font-size: 2rem;
}
header .navigations {
  display: flex;
  align-items: center;
}
header .navigations a {
  color: rgb(49, 47, 47);
  font-size: 2rem;
  margin-left: 10px;
}
</style>