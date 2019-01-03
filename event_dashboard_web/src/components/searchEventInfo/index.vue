<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="2" class="search-label">
        <span>我要找活动</span>
      </el-col>
      <el-col :span="7">
        <el-input placeholder="请输入活动编号" v-model="searchInfo">
          <el-button slot="append" icon="el-icon-search" @click="searchByEventNUm"></el-button>
        </el-input>
      </el-col>
      <el-col :span="2">
        <el-button icon="el-icon-refresh" @click="reset">重置</el-button>
      </el-col>
      
    </el-row>
  <!-- <el-table v-if="hasConsunerInfoResult"
     v-bind:data="searchEventInfoRes"
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
  </el-table> -->
  </div>

</template>

<script>
import eventApi from "../../api/api.js";
export default {
  name: "searchEventInfo",
  props: {},
  data() {
    return {
      searchInfo:'',
      searchEventInfoRes:'',
      hasConsunerInfoResult:false,
    };
  },
  methods: {
    reset(){
      this.searchEventInfoRes = '';
      this.searchInfo= ''
    },
    searchByEventNUm(){
        let OsearchItem = {
         eventNum : this.searchInfo
        }
        this.$axios.post(eventApi.searchConsumerEvent,OsearchItem).then(response => {
          console.log(response)
          this.hasConsunerInfoResult= true;
          this.searchEventInfoRes=response.data;
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