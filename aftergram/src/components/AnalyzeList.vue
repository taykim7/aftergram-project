<template>
  <li>
    <span>{{ post.standardDate }}</span>
    <span> / {{ post.gram }}kg / </span>
    <span>{{ post.memo }}</span>
    <!-- TODO 수정, 삭제 추가 -->
    <button>수정</button>
    <button>삭제</button>
  </li>
</template>

<script>
export default {
  props: {
    post: Object,
  }
}
</script>

<style>

</style>