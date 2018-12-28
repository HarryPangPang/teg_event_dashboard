<template>
  <div v-loading="loading"
    element-loading-text="正在努力计算中😵"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
    style="width: 100%">
<el-row>
      <div
        id="usefulMobilePie"
        class="useful-mobile-pie"
      ></div>
      <!-- 图表end -->
    </el-row>
  </div>

</template>

<script>
import eventApi from "../../api/api.js";
export default {
  name: "pieDashBoard",
  props: {},
  data() {
    return {
      loading:true,
      usefulPhoneNum: "",
      unUsefulPhoneNum: "",
      searchInfo:''
    };
  },
  created() {
    this.getAllData();
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    checkPhone(usefulPhone) {
      if (/^1[345789]\d{9}$/.test(usefulPhone)) {
        return 1;
      } else {
        return 0;
      }
    },
    // 判断搜索字段是姓名还是手机号
    checkNameOrPhone(){
      if(this.searchInfo == '' || this.searchInfo ==[]){
        alert('不能输入为空')
      } else{
        let phoneReg = /^1[345789]\d{9}$/;
        let nameReg = /^[\u4e00-\u9fa5]{1,7}$|^[\dA-Za-z_]{1,14}$/;
         if (phoneReg.test(this.searchInfo)) {
           /* eslint no-console: 0*/
            console.log('手机号')
          } else if(nameReg.test(this.searchInfo)){
            /* eslint no-console: 0*/
            console.log('名字')
          } else{
            /* eslint no-console: 0*/
            console.log('都不行')
          }
      }
    },
    getAll() {
      return new Promise(resolve => {
        this.$axios.get(eventApi.getAllUsers).then(response => {
          let allConsumer = response.data;
          // console.log(allConsumer);
          resolve(allConsumer);
        });
      });
    },
    filterUsefulMobile(telArr) {
      var usefulMobileConsumer = [];
      var unUsefulMobileConsumer = [];
      telArr.forEach(item => {
        if (this.checkPhone(item.contact_info1) == 1) {
          usefulMobileConsumer.push(item);
        } else {
          unUsefulMobileConsumer.push(item);
        }
      });
      
      this.usefulPhoneNum = usefulMobileConsumer.length;
      this.unUsefulPhoneNum = unUsefulMobileConsumer.length;
      if(usefulMobileConsumer.length&&unUsefulMobileConsumer.length){
        this.loading = false
      }
    },
    async getAllData() {
      let telArr = await this.getAll();
      await this.filterUsefulMobile(telArr);
      await this.drawLine();
    },
    drawLine() {
      return new Promise(resolve => {
        // 基于准备好的dom，初始化echarts实例
        let usefulMobilePie = this.$echarts.init(
          window.document.getElementById("usefulMobilePie")
        );
        // 绘制图表
        usefulMobilePie.setOption({
          title: {
            text: "14-19活动客户信息",
            subtext: "手机号有效",
            x: "center"
          },
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          series: [
            {
              name: "访问来源",
              type: "pie",
              radius: "55%",
              center: ["50%", "60%"],
              data: [
                { value: this.usefulPhoneNum, name: "手机号有效" },
                { value: this.unUsefulPhoneNum, name: "手机号无效" }
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)"
                }
              }
            }
          ]
        });
        resolve();
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.useful-mobile-pie {
  width: 50%;
  height: 300px;
}
</style>