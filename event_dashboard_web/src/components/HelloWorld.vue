/* <template>
  <el-row :gutter="20">
    <el-col :span="6">
      <div class="grid-content bg-purple"></div>
    </el-col>
    <el-col :span="6">
      <div class="grid-content bg-purple"></div>
    </el-col>
    <el-col :span="6">
      <div class="grid-content bg-purple"></div>
    </el-col>
    <el-col :span="6">
      <div class="grid-content bg-purple"></div>
    </el-col>
  </el-row>
</template>

<script>
import eventApi from "../api/api.js";
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  data() {
    return {};
  },
  created() {
    this.getAllData();
  },
  methods: {
    getAll() {
      return new Promise((resolve, reject) => {
        this.$axios.get(eventApi.getAllUsers).then(response => {
          let allConsumer = response.data;
          // console.log(allConsumer);
          resolve(allConsumer);
        });
      });
    },
    checkPhone(usefulPhone) {
      if (/^1[34578]\d{9}$/.test(usefulPhone)) {
        // console.log("OK");
        return 1
      } else {
        // console.log("手机号有误");
        return 0
      }
    },
    filterUsefulMobile(telArr) {
      var usefulMobileConsumer = [];
       var unUsefulMobileConsumer = [];
      telArr.forEach(item => {
        if(this.checkPhone(item.contact_info1) == 1){
          usefulMobileConsumer.push(item)
        } else{
          unUsefulMobileConsumer.push(item)
        }
      });
      console.log(unUsefulMobileConsumer)
    },
    async getAllData() {
      let telArr = await this.getAll();
      await this.filterUsefulMobile(telArr);
    }
  }
};
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
 */