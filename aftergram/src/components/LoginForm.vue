<template>
  <div class="contents">
    <div>
      <form @submit.prevent="submitForm" class="form">
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
          로그인
        </button>
      </form>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      email: '',
      password: '',
    }
  },
  computed: {
  },
  methods: {
    // 초기화
    initForm() {
      // this.email = '';
      this.password = '';
    },
    async submitForm() {
      const userData = {
        email: this.email,
        password: this.password,
      };
      await this.$store.dispatch('LOGIN', userData);
      // 로그인시 메인페이지로 push
      this.$router.push('/main');
      this.initForm();
    },
  }
}
</script>

<style>
</style>