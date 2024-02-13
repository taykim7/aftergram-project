<template>
  <div class="contents">
    <div>
      <!-- TODO CHART -->
    </div>
    <!-- TODO 무한스크롤 -->
    <ul>
      <li v-for="(post, index) in posts" :key="index">
        <span>{{ post.standardDate }}</span>
        <span> / {{ post.gram }}kg / </span>
        <span>{{ post.memo }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    posts() {
      return this.$store.state.posts;
    },
  }
}
</script>

<style>

</style>