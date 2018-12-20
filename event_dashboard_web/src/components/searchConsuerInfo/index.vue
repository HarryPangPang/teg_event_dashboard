<template>
  <div>
    <el-row>
      <el-col :span="2" class="search-label">
        <span>我要搜索</span>
      </el-col>
      <el-col :span="8">
        <el-input placeholder="请输入姓名/手机" v-model="searchInfo" class="">
          <el-button slot="append" icon="el-icon-search" @click="checkNameOrPhone"></el-button>
        </el-input>
      </el-col>
    </el-row>
  </div>

</template>

<script>
import eventApi from "../../api/api.js";
export default {
  name: "searchConsuerInfo",
  props: {},
  data() {
    return {
      searchInfo:''
    };
  },
  created() {

  },
  mounted() {

  },
  methods: {
    // 判断搜索字段是姓名还是手机号
    checkNameOrPhone(){
      this.searchByPhone(this.searchInfo)
      if(this.searchInfo == '' || this.searchInfo ==[]){
        alert('不能输入为空')
      } else{
        let phoneReg = /^1[345789]\d{9}$/;
        let nameReg = /^[\u4e00-\u9fa5]{1,7}$|^[\dA-Za-z_]{1,14}$/;
         if (phoneReg.test(this.searchInfo)) {
           this.searchByPhone(this.searchInfo)
            // console.log('手机号')
          } else if(nameReg.test(this.searchInfo)){
            alert('暂不支持搜索姓名')
            // console.log('姓名')
          } else{
            alert('搜不到')
          }
      }
    },
    searchByPhone(searchItem){
      let searchItems = {
        phoneNum : searchItem
      }
        this.$axios.post(eventApi.searchConsumerEvent,searchItems).then(response => {
          console.log(response)
        });
    },
    searchByName(){

    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .search-label{
    height: 40px;
    line-height: 40px;
    /* margin-right: -13px; */
  }
</style>