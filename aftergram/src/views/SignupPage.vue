<template>
  <div>
    <div class="signup mt40">
      <p class="signup_text mb16">서비스를 이용하려면 로그인을 해주세요.</p>
      <signup-form></signup-form>
    </div>
  </div>
</template>

<script>
import SignupForm from '../components/SignupForm.vue';

export default {
  components: {
    SignupForm
  }
}
</script>

<style scoped>
.signup {
  text-align: center;

  display: block;
  align-items: center;
  justify-content: center;
}
.signup .signup_text {
  font-size: 1.5rem;
  font-weight: bolder;
}
</style>