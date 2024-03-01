<template>
  <div>
    <div class="greeting mt40">
      <span class="greeting_text">
        언제 어디서나
        <br>
        쉽고 편한 체중 기록
        <br>
        <p>
          Aftergram
        </p>
      </span>
      <div class="greeting_img"></div>
    </div>
    <div class="sample mt40"></div>
    <div class="login mt40">
      <p class="login_text mb16">서비스를 이용하려면 로그인을 해주세요.</p>
      <LoginForm></LoginForm>
    </div>
  </div>
</template>

<script>
import LoginForm from '../components/LoginForm.vue';

export default {
  components: {
    LoginForm
  },
}
</script>

<style scoped>
.greeting {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.greeting .greeting_text {
  text-align: left;
  font-size: 2rem;
  font-weight: bolder;
}
.greeting .greeting_text p {
  display: inline-block;
  font-size: 3rem;
}
.greeting .greeting_img{
  border: 1px solid black;
  width: 50%;
  height: 100px;
}
.sample {
  border: 1px solid black;
  width: 100%;
  height: 150px;
}
.login {
  text-align: center;

  display: block;
  align-items: center;
  justify-content: center;
}
.login .login_text {
  font-size: 1.5rem;
  font-weight: bolder;
}
</style>