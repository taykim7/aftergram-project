<template>
  <div>
    <h1>분석 페이지</h1>
    <div>
      <router-link to="/main">메인</router-link>
    </div>
    <div v-if="0 < posts.length">
      <!-- TODO 차트 -->
      <AnalyzeChart
      :posts="posts"
      ></AnalyzeChart>
      <ul>
        <AnalyzeList
        v-for="(post, index) in posts"
        :key="index"
        :post="post"
        @update="updatePost"
        @delete="deletePost"></AnalyzeList>
      </ul>
    </div>
    <div v-else>
      데이터가 없습니다.
    </div>
  </div>
</template>

<script>
import AnalyzeChart from '../components/AnalyzeChart.vue';
import AnalyzeList from '../components/AnalyzeList.vue';

export default {
  data() {
    return {
      posts: [],
    }
  },
  components: {
    AnalyzeList,
    AnalyzeChart,
  },
  computed: {},
  mounted() {
    // 모든 데이터 가져오기
    this.posts = this.$store.state.posts;
  },
  methods: {
    async updatePost(postData) {
      await this.$store.dispatch('UPDATE', postData);
    },
    async deletePost(postData) {
      await this.$store.dispatch('DELETE', postData);
    }
  }
}
</script>

<style>

</style>