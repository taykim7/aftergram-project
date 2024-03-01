<template>
  <div class="login_form">
    <form @submit.prevent="submitForm">
      <div>
        <label for="email" class="login_input mb12">
          <input id="email" type="text" v-model="email" placeholder="E-mail"/>
        </label>
      </div>
      <div>
        <label for="password" class="login_input mb12">
          <input id="password" type="password" v-model="password" placeholder="PASSWORD"/>
        </label>
      </div>
      <button
        :disabled="!email || !password"
        type="submit"
        class="login_button"
        :class="!email || !password ? 'disabled' : null"
      >
        로그인
      </button>
    </form>
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

<style scoped>
.login_form {
  width: 100%;
}
.login_form .login_input {
  display: block;
  align-items: center;
}
.login_form .login_input input {
  width: 80%;
  height: 40px;
  border: 1px solid black;
  border-radius: 30px;

  font-size: 2rem;
  font-weight: bolder;
  text-align: center;
}
.login_form .login_button {
  background-color: rgb(44, 44, 44);
  color: white;

  font-size: 2rem;
  font-weight: bolder;

  border-radius: 30px;
  width: 80%;
  height: 40px;
}
</style>