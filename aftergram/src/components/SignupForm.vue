<template>
  <div class="contents">
    <div>
      <form @submit.prevent="submitForm" class="form">
        <div>
          <label for="nickname">nickname: </label>
          <input id="nickname" type="text" v-model="nickname" />
        </div>
        <div>
          <label for="email">email:</label>
          <input id="email" type="text" v-model="email" />
        </div>
        <div>
          <label for="password">pw:</label>
          <input id="password" type="text" v-model="password" />
        </div>
        <button
          :disabled="!email || !password"
          type="submit"
          class="btn"
          :class="!email || !password ? 'disabled' : null"
        >
          회원가입
        </button>
      </form>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      nickname: '',
      email: '',
      password: '',
    }
  },
  computed: {
  },
  methods: {
    // 초기화
    initForm() {
      this.nickname = '';
      this.email = '';
      this.password = '';
    },
    // 회원가입
    async submitForm() {
      try {
        const userData = {
          username: this.username,
          email: this.email,
          password: this.password,
        };
        await this.$store.dispatch('REGISTER', userData);
        // 로그인시 메인페이지로 push
        this.$router.push('/main');
      } catch (error) {
        console.log(error);
      } finally {
        this.initForm();
      }
    },
  }
}
</script>

<style>
</style>