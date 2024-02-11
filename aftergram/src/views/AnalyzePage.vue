<template>
  <div>
    <h1>분석 페이지</h1>
    <div>
      <router-link to="/main">메인</router-link>
    </div>
    <analyze-detail></analyze-detail>
  </div>
</template>

<script>
import AnalyzeDetail from '../components/AnalyzeDetail.vue';

export default {
  components: {
    AnalyzeDetail,
  }
}
</script>

<style>

</style>