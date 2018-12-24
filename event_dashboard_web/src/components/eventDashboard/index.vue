<template>
  <div>
    <el-row>
      YTD活动场次及人数
      <div id="eventLineCharts" class="useful-mobile-pie"></div>
    </el-row>
    <el-row>
      活动城市分布图
      <div id="eventLineCharts" class="useful-mobile-pie"></div>
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
      YMlineX: [],
      countEventNum:[]
    };
  },
  created() {
    this.getAllData();
    this.getAllConsumer();
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
    getAllConsumer() {
      return new Promise(resolve => {
        this.$axios.get(eventApi.getAllUsers).then(response => {
          let allConsumer = response.data;
          resolve(allConsumer);
        });
      });
    },
    getAllEvent() {
      return new Promise(resolve => {
        this.$axios.get(eventApi.getAllEvent).then(response => {
          let allEvents = response.data;
          resolve(allEvents);
        });
      });
    },
    // getMonthBetween(sdate,edate){  
    //   let syear = parseInt(sdate.split('-')[0], 10), smonth = parseInt(sdate.split('-')[1], 10);
    //   let eyear = parseInt(edate.split('-')[0], 10), emonth = parseInt(edate.split('-')[1], 10);
    //   let  sdateEdateArr= [];
      // 保证sdate <= edate
    //   while((syear * 12 + smonth) <= (eyear * 12 + emonth)){
    //     sdateEdateArr.push(syear + ('0' + smonth).slice(-2));
    //     if(++smonth > 12){
    //       syear++;
    //       smonth = 1;
    //     }
    //   }
    //   return sdateEdateArr;
    // },
    filteEventDate(dateArr){
      // 活动两段日期的中间所有年月份
      // let YMlineXTmp =  [];
      // dateArr.forEach(item => {
      // let indexxie  = item.event_date.lastIndexOf('-')
      //   YMlineXTmp.push(item.event_date.substr(0,indexxie))
      // });
      // this.YMlineX = new Set(YMlineXTmp)
      // let YMlineX = [...this.YMlineX]
     
      // let DrawLineImageXArr = this.getMonthBetween(YMlineX[0],YMlineX[YMlineX.length-1]);
      // this.YMlineX = DrawLineImageXArr

      // 将所有活动数据的日期格式化
      let datetmp1Arr = [];
      dateArr.forEach(item =>{
        let yeardatetmp1 = parseInt(item.event_date.split('-')[0], 10);
        let monthdatetmp1 = parseInt(item.event_date.split('-')[1], 10);
        let datetmp1 = yeardatetmp1 + ('0' + monthdatetmp1).slice(-2);
        datetmp1Arr.push(datetmp1);
      })

      var newArr = [];
      // var countEventNum = [];
      //使用set进行数组去重,查重去重并统计重复项
      newArr = [...new Set(datetmp1Arr)];
      var newarr2 = new Array(newArr.length);
      for(var t = 0; t < newarr2.length; t++) {
      newarr2[t] = 0;
      }
      for(var p = 0; p < newArr.length; p++) {
      for(var j = 0; j < datetmp1Arr.length; j++) {
        if(newArr[p] == datetmp1Arr[j]) {
          newarr2[p]++;
        }
      }
      }
      for(var m = 0; m < newArr.length; m++) {
        this.countEventNum.push(newarr2[m])
        this.YMlineX.push(newArr[m])
      // console.log(newArr[m] + "重复的次数为：" + newarr2[m]);
      }
      // console.log(this.YMlineX)
    },

    async getAllData() {
      let dateArr = await this.getAllEvent()
      await this.filteEventDate(dateArr);
      await this.drawLine();
    },

    // 画echarts
    drawLine() {
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
                  data: [...this.YMlineX],
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
                  data:this.countEventNum
              },
              {
                  name:'人数',
                  type:'line',
                  yAxisIndex: 1,
                  data:[10,20,200,20,30]
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