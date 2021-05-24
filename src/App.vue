<template>
  <div id="app">
    <PageTop />
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<script>
import PageTop from './components/PageTop'

export default {
  name: 'App',
  components:{
    PageTop
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
