<template>
  <el-row class="tac full-height">
    <el-col :span="24" class="full-height">
      <el-menu
        class="el-menu-vertical-demo full-height"
        router
        unique-opened
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">

        <el-submenu class="over-hide" v-for="item in sidebarconf" :index="item.id" :key="item.id">
          <template slot="title" class="over-hide">
            <span v-text="item.name"></span>
          </template>
          <el-menu-item-group class="over-hide" v-for="sub in item.sub" :key="sub.name">
            <el-menu-item :index="sub.componentName" v-text="sub.name">
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>

      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
import sidebarconf from '../../conf/menu-conf';
export default {
  name: "leftSideBar",
  data() {
    return {
      sidebarconf:sidebarconf,
      isCollapse: true
    };
  },
methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .over-hide{
    overflow: hidden;
  }
  .el-menu-vertical-demo .el-menu{
    min-height: 100%;
  }
  .full-height{
    height: 100%;
  }
</style>