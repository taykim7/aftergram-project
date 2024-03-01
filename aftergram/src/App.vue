<template>
  <div id="app">
    <AppHeader></AppHeader>
    <router-view class="container"></router-view>
  </div>
</template>

<script>
import AppHeader from './components/common/AppHeader.vue'

export default {
  name: 'App',
  components: {
    AppHeader,
  },
}
</script>

<style>
@import './css/common.css';
</style>
