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
      // let telArr = await this.getAll();
      // await this.filterUsefulMobile(telArr);
      // await this.drawLine();
      
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
                  data: ["2014/4/", "2014/5/", "2014/6/", "2014/7/", "2014/8/", "2014/9/", "2014/10", "2014/11", "2014/12", "2015/1/", "2015/2/", "2015/3/", "2015/4/", "2015/5/", "2015/6/", "2015/7/", "2015/8/", "2015/9/", "2015/10", "2015/11", "2015/12", "2016/1/", "2016/2/", "2016/3/", "2016/4/", "2016/5/", "2016/6/", "2016/7/", "2016/8/", "2016/9/", "2016/10", "2016/11", "2016/12", "2017/1/", "2017/2/", "2017/3/", "2017/4/", "2017/5/", "2017/6/", "2017/7/", "2017/8/", "2017/9/", "2017/10", "2017/11", "2017/12", "2018/1/", "2018/2/", "2018/3/", "2018/4/", "2018/5/", "2018/6/", "2018/7/", "2018/8/", "2018/9/", "2018/10", "2018/11"],
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
                  data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
              },
              {
                  name:'人数',
                  type:'line',
                  yAxisIndex: 1,
                  data:[12.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
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