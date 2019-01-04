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
  <el-table v-if="hasConsunerInfoResult"
     v-bind:data="searchEventInfoRes"
    border
    style="width: 100%">
    <el-table-column
      fixed
      prop="event_num"
      label="event_num"
      width="100">
    </el-table-column>
    <el-table-column
      prop="event_date"
      label="event_date"
      width="100">
    </el-table-column>
    <el-table-column
      prop="event_name"
      label="event_name"
      width="100">
    </el-table-column>
    <el-table-column
      prop="event_training_type"
      label="event_training_type"
      width="100">
    </el-table-column>
    <el-table-column
      prop="event_audience_type"
      label="event_audience_type"
      width="160">
    </el-table-column>
    <el-table-column
      prop="event_applicant"
      label="event_applicant"
      width="120">
    </el-table-column>
    <el-table-column
      prop="event_apply_dept"
      label="event_apply_dept"
      width="120">
    </el-table-column>
    <el-table-column
      prop="event_province"
      label="event_province"
      width="100">
    </el-table-column>
  </el-table>
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
         event_num : this.searchInfo
        }
        this.$axios.post(eventApi.searchConsumerEvent,OsearchItem).then(response => {
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