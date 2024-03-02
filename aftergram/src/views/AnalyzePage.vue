<template>
  <div>
    <div class="greeting mt40">
      <div>
        <router-link to="/main">메인으로 돌아가기</router-link>
      </div>
      <span class="greeting_text">
        오늘도 수고했어요.
      </span>
    </div>
    <div
      v-if="0 < posts.length">
      <!-- TODO 차트 -->
      <AnalyzeChart
      :posts="posts"
      class="mt40">
      </AnalyzeChart>
      <ul class="mt40">
        <AnalyzeList
        v-for="(post, index) in posts"
        :key="index"
        :post="post"
        @update="updatePost"
        @delete="deletePost">
        </AnalyzeList>
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

<style scoped>

.greeting {
  display: inline-block;
  justify-content: left;
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
</style>