<template>
  <div>
<el-row>
  活动图表
      <div
        id="eventLineCharts"
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
      YMlineX: []
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
    // getAllConsumer() {
    //   return new Promise(resolve => {
    //     this.$axios.get(eventApi.getAllUsers).then(response => {
    //       let allConsumer = response.data;
    //       resolve(allConsumer);
    //     });
    //   });
    // },
    getAllEvent() {
      return new Promise(resolve => {
        this.$axios.get(eventApi.getAllEvent).then(response => {
          let allEvents = response.data;
          resolve(allEvents);
        });
      });
    },
    // filterUsefulMobile(telArr) {
    //   var usefulMobileConsumer = [];
    //   var unUsefulMobileConsumer = [];
    //   telArr.forEach(item => {
    //     if (this.checkPhone(item.contact_info1) == 1) {
    //       usefulMobileConsumer.push(item);
    //     } else {
    //       unUsefulMobileConsumer.push(item);
    //     }
    //   });
    //   this.usefulPhoneNum = usefulMobileConsumer.length;
    //   this.unUsefulPhoneNum = unUsefulMobileConsumer.length;
    // },
    filteEventDate(dateArr){
      let YMlineXTmp =  [];
      dateArr.forEach(item => {
      let indexxie  = item.event_date.indexOf('/')
        YMlineXTmp.push(item.event_date.substr(0,indexxie+3))
      });
      let YMlineX = new Set(YMlineXTmp)
      console.log([...YMlineX]);
      this.YMlineX = [...YMlineX].sort();
    },
    async getAllData() {
      let dateArr = await this.getAllEvent()
      await this.filteEventDate(dateArr);
      await this.drawLine();
      
    },
    drawLine() {
      let aa = this.YMlineX
      return new Promise(resolve => {
        // 基于准备好的dom，初始化echarts实例
        let eventLineCharts = this.$echarts.init(
          window.document.getElementById("eventLineCharts")
        );
        // 绘制图表
        eventLineCharts.setOption({
          tooltip: {
              trigger: 'axis',
              axisPointer: {
                  type: 'cross',
                  crossStyle: {
                      color: '#999'
                  }
              }
          },
          toolbox: {
              feature: {
                  dataView: {show: true, readOnly: false},
                  magicType: {show: true, type: ['line', 'bar']},
                  restore: {show: true},
                  saveAsImage: {show: true}
              }
          },
          legend: {
              data:['场次','人数']
          },
          dataZoom: [
              {
                  type: 'slider',
                  show: true,
                  xAxisIndex: [0],
                  start: 0,
                  end: 100
              },
              {
                  type: 'inside',
                  xAxisIndex: [0],
                  start: 0,
                  end: 100
              },
          ],
          xAxis: [
              {
                  type: 'category',
                  data: aa,
                  axisPointer: {
                      type: 'shadow'
                  }
              }
          ],
          yAxis: [
              {
                  type: 'value',
                  name: '场次',
                  min: 0,
                  max: 300,
                  interval: 50,
                  axisLabel: {
                      formatter: '{value} 次'
                  }
              },
              {
                  type: 'value',
                  name: '人数',
                  min: 0,
                  max: 300,
                  interval: 50,
                  axisLabel: {
                      formatter: '{value} 人'
                  }
              }
          ],
          series: [
              {
                  name:'场次',
                  type:'bar',
                  data:[10,30,40]
              },
              {
                  name:'人数',
                  type:'line',
                  yAxisIndex: 1,
                  data:[30,90]
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
  width: 100%;
  height: 300px;
}
</style>