<template>
<el-row :gutter="20">
  <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
</el-row>
</template>

<script>
import eventApi from '../api/api.js'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data(){
    return{
      allInfo:''
    }
  },
  created() {
    this.getAll()
  },
  methods:{
    getAll(){
      // return new Promise(()=>{
        this.$axios
        .get(eventApi.getAllUsers)
        .then(response => (
          // this.allInfo = response.data
          // console.log(response.data[0])
        )=>{
return (response.data[0])
        })
      // })
      },
     getlog(){
      return new Promise((res)=>{
        console.log('log')
      })
    },
     getAllData: async function () {
      await this.getlog();
        await console.log('aaa')
        await this.getAll();
        
      } ,
      test: async  () => {
        var a = function(){
      return new Promise((res)=>{
        console.log('log')
      })
        };

        var b = function(){
          axios
        .get(eventApi.getAllUsers)
        .then(response => (
          // this.allInfo = response.data
          console.log(response.data[0])
        ))
        }
        try {
          await b();
          await a();
        } catch (error) {
          console.log(error)
        }
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-row {
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
