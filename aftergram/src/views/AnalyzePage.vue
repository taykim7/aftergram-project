<template>
  <div>
    <h1>분석 페이지</h1>
    <div>
      <router-link to="/main">메인</router-link>
    </div>
    <div v-if="0 < posts.length">
      <!-- TODO 차트 -->
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
import AnalyzeList from '../components/AnalyzeList.vue';

export default {
  components: {
    AnalyzeList,
  },
  computed: {
    posts() {
      return this.$store.state.posts;
    },
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