<template>
  <div class="signup_form">
    <form @submit.prevent="submitForm">
      <div class="signup_input mb12">
        <input id="displayName" type="text" v-model="displayName" placeholder="Nickname"/>
      </div>
      <div class="signup_input mb12">
        <input id="email" type="text" v-model="email" placeholder="E-mail"/>
      </div>
      <div class="signup_input mb12">
        <input id="password" type="text" v-model="password" placeholder="Password"/>
      </div>
      <button
        :disabled="!email || !password"
        class="signup_button"
        type="submit"
        :class="!email || !password ? 'disabled' : null"
      >
        회원가입
      </button>
    </form>
  </div>
</template>

<script>

export default {
  data() {
    return {
      displayName: '',
      email: '',
      password: '',
    }
  },
  computed: {
  },
  methods: {
    // 초기화
    initForm() {
      this.displayName = '';
      this.email = '';
      this.password = '';
    },
    // 회원가입
    async submitForm() {
      try {
        const userData = {
          displayName: this.displayName,
          email: this.email,
          password: this.password,
        };
        console.log(userData);
        // TODO 검증 추가
        await this.$store.dispatch('REGISTER', userData);
        // 로그인시 메인페이지로 push
        this.$router.push('/login');
      } catch (error) {
        console.log(error);
      } finally {
        this.initForm();
      }
    },
  }
}
</script>

<style scoped>
.signup_form {
  width: 100%;
}
.signup_form .signup_input {
  display: block;
  align-items: center;
}
.signup_form .signup_input input {
  width: 80%;
  height: 40px;
  border: 1px solid black;
  border-radius: 30px;

  font-size: 2rem;
  font-weight: bolder;
  text-align: center;
}
.signup_form .signup_button {
  background-color: rgb(44, 44, 44);
  color: white;

  font-size: 2rem;
  font-weight: bolder;

  border-radius: 30px;
  width: 80%;
  height: 40px;
}
</style>