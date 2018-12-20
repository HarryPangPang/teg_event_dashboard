<template>
  <div id="app">
    <el-container>
      <el-container>
        <el-aside width="200px">
          <leftSideBar />
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>

  </div>
</template>
<script>
import leftSideBar from "./components/leftSideBar";

export default {
  name: "app",
  components: {
    leftSideBar
  }
};
</script>

<style>
#app {
  font-family: "Helvetica Neue", "Segoe UI", Tahoma, Arial, "Hiragino Sans GB",
    STHeiti, "Microsoft Yahei", "WenQuanYi Micro Hei", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding: 0;
}
.el-container{
  min-height: 100%;
  overflow: hidden;
}
</style>
