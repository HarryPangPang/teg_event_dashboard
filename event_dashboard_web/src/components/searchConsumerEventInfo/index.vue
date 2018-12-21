<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="2" class="search-label">
        <span>我要找人</span>
      </el-col>
      <el-col :span="7">
        <el-input placeholder="请输入姓名/手机" v-model="searchInfo" class="">
          <el-button slot="append" icon="el-icon-search" @click="checkNameOrPhone"></el-button>
        </el-input>
      </el-col>
      <el-col :span="2">
        <el-button icon="el-icon-refresh" @click="reset">重置</el-button>
      </el-col>
      
    </el-row>
  <el-table v-if="hasConsunerInfoResult"
    :data="searchConsumerInfoRes"
    border
    style="width: 100%">
    <el-table-column
      fixed
      prop="id"
      label="id"
      width="100">
    </el-table-column>
    <el-table-column
      prop="event_num"
      label="event_num"
      width="120">
    </el-table-column>
    <el-table-column
      prop="consumer_name"
      label="name"
      width="100">
    </el-table-column>
    <el-table-column
      prop="consumer_sex"
      label="sex"
      width="50">
    </el-table-column>
    <el-table-column
      prop="contact_info1"
      label="contact_info"
      width="120">
    </el-table-column>
    <el-table-column
      prop="company"
      label="company"
      width="200">
    </el-table-column>
    <el-table-column
      prop="Industry"
      label="Industry"
      width="120">
    </el-table-column>
    <el-table-column
      prop="comment"
      label="comment"
      width="">
    </el-table-column>
  </el-table>
  </div>

</template>

<script>
import eventApi from "../../api/api.js";
export default {
  name: "searchConsumerInfo",
  props: {},
  data() {
    return {
      searchInfo:'',
      searchConsumerInfoRes:'',
      hasConsunerInfoResult:false,
    };
  },
  created() {

  },
  mounted() {

  },
  methods: {
    reset(){
      this.searchConsumerInfoRes = '';
      this.searchInfo= ''
    },
    handleClick(row) {
        console.log(row);
      },
    // 判断搜索字段是姓名还是手机号
    checkNameOrPhone(){
      if(this.searchInfo == '' || this.searchInfo ==[]){
        alert('不能输入为空')
      } else{
        let phoneReg = /^1[345789]\d{9}$/;
        let nameReg = /^[\u4e00-\u9fa5]{1,7}$|^[\dA-Za-z_]{1,14}$/;
         if (phoneReg.test(this.searchInfo)) {
           let searchItem = this.searchInfo
           this.searchByPhone(searchItem)
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
        let OsearchItem = {
         phoneNum : searchItem
        }
        this.$axios.post(eventApi.searchConsumerInfoByPhone,OsearchItem).then(response => {
          this.hasConsunerInfoResult= true;
          this.searchConsumerInfoRes=response.data;
        });
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