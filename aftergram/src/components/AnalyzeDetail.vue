<template>
  <div class="contents">
    <ul>
      <li v-for="(post, index) in posts" :key="index">
        <span>{{ post.standardDate }}</span>
        <span> / {{ post.gram }}kg / </span>
        <span>{{ post.memo }}</span>
        <a>수정</a>
        <a> | 삭제</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  async mounted() {
    await this.$store.dispatch('FETCH');
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