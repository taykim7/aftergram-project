<template>
  <header>
    <div>
      <router-link :to="logoLink">
        AfterGram
      </router-link>
      <span v-if="isUserLogin">{{ $store.state.email }} 계정 정보</span>
    </div>
    <div>
      <!-- 로그인 분기-->
      <template v-if='isUserLogin'>
        <a @click="logoutUser">로그아웃</a>
      </template>
      <template v-else>
        <router-link to="/login">로그인</router-link>
        <router-link to="/signup">회원가입</router-link>
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
    }
  },
  methods: {
    logoutUser() {
      this.$store.commit('clearUid');
      this.$router.push('/login');
    },
  },
}
</script>

<style>

</style>