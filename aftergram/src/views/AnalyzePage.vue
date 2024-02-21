<template>
  <div>
    <h1>분석 페이지</h1>
    <div>
      <router-link to="/main">메인</router-link>
    </div>
    <!-- TODO 차트 -->
    <ul>
      <AnalyzeList
      v-for="(post, index) in posts"
      :key="index"
      :post="post"></AnalyzeList>
    </ul>
  </div>
</template>

<script>
import AnalyzeList from '../components/AnalyzeList.vue';

export default {
  components: {
    AnalyzeList,
  },
  computed: {
    posts() {
      return this.$store.state.posts;
    },
  }
}
</script>

<style>

</style>