<template>
  <div class="analyze">
    <div class="analyze-back mt40">
      <div class="analyze-back-text">
        <router-link to="/main">돌아가기</router-link>
      </div>
    </div>
    <div class="analyze-header mt40">
      <div class="analyze-header-title">
        <span>
          통계
        </span>
      </div>
      <div class="analyze-header-menu">
        <select name="language" id="language">
          <option value="0" selected>전체</option>
          <option value="1">월간</option>
          <option value="2">주간</option>
        </select>
      </div>
    </div>
    <div
    class="mt40"
      v-if="0 < posts.length">
      <!-- TODO 차트 -->
      <AnalyzeChart
      :posts="posts">
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

.analyze {
  display: block;
  justify-content: center;
}
.analyze .analyze-back .analyze-back-text {
  text-align: left;
  font-size: 1.5rem;
  font-weight: bolder;
}
.analyze .analyze-header {
  display: flex;
  justify-content: space-between;
}
.analyze .analyze-header .analyze-header-title{
  text-align: left;
  font-size: 2rem;
  font-weight: bolder;
}
.analyze .analyze-header .analyze-header-menu{
  text-align: left;
  font-size: 2rem;
  font-weight: bolder;
}
.analyze .analyze-header .analyze-header-menu select{
  border: none;
  padding: 5px 5px;
  border-radius: 5px;
  text-align: center;
}
.analyze .analyze-header .analyze-header-menu select:focus{
  outline: none;
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