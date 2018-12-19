<template>
  <div id="app">
    <NavHead/>
    <!-- <pieDashBoard msg="Welcome to Your Vue.js App"/> -->
    <router-view></router-view>
  </div>
</template>

<script>
import NavHead from './components/NavHead'

export default {
  name: 'app',
  components: {
    NavHead
  }
}
</script>

<style>
#app {
  font-family: "Helvetica Neue", "Segoe UI", Tahoma, Arial, "Hiragino Sans GB", STHeiti, "Microsoft Yahei", "WenQuanYi Micro Hei", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding: 0;
}
</style>
