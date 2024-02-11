<template>
  <div>
    분석하기
  </div>
</template>

<script>
export default {
  mounted() {
    console.log(this.$store.state.uid)
    this.$store.dispatch('FETCH', this.$store.state.uid);
  }
}
</script>

<style>

</style>