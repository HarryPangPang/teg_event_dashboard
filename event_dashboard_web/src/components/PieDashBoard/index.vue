<template>
  <div>
    <el-row :gutter="20">
      
      <div
        id="usefulMobilePie"
        class="useful-mobile-pie"
      ></div>
    </el-row>
  </div>

</template>

<script>
import eventApi from "../../api/api.js";
export default {
  name: "pieDashBoard",
  props: {
  },
  data() {
    return {
      usefulPhoneNum :'',
      unUsefulPhoneNum :'',
    };
  },
  created() {
    this.getAllData();
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    getAll() {
      return new Promise(resolve => {
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
        return 1;
      } else {
        // console.log("手机号有误");
        return 0;
      }
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
      // console.log(unUsefulMobileConsumer)
    },
    async getAllData() {
      let telArr = await this.getAll();
      await this.filterUsefulMobile(telArr);
      await this.drawLine()
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
              { value: this.unUsefulPhoneNum, name: "手机号无效" },
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
      })
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