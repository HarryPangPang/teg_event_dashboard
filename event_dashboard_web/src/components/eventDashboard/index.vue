<template>
  <div v-loading="loading"
    :element-loading-text= waitingLabel
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
    style="width: 100%">
    <el-row>
      YTD活动场次及人数
      <div id="eventLineCharts1" class="useful-mobile-pie"></div>
    </el-row>
    <el-row>
      活动城市分布图Top10
      <div id="eventLineCharts2" class="useful-mobile-pie"></div>
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
      YMlineX: [],
      countEventNum:[],
      countEventGuest:[],
      allEventsRank:[],
      waitingLabel:''
    };
  },
  created() {
    this.getAllData();
  },
  mounted() {
    // this.drawLine1();
  },
  methods: {
    // 获得接口所有整理过数据结构的活动lib
    getConsumerSCameWhichEvent(){
      this.waitingLabel = `正在努力计算中预计花费3分钟超过5分钟没有请刷新网页😋`
      return new Promise(resolve=>{
        this.$axios.get(eventApi.getConsumerSCameWhichEvent).then(response => {
          if(response.status ==200){
            this.loading =false;
            //  console.log(response)
            resolve(response.data);
          }
          });
      })
    },
    // 过滤整理活动人数场次的数据
    filteEventDate(allEvent){
      return new Promise(resolve=>{
          var datetOriginArr = []
          // 把所有日期内的-都去掉，且只保留年月
          allEvent.forEach(item =>{
            let yeardatetmp1 = parseInt(item.eventDate.split('-')[0], 10);
            let monthdatetmp1 = parseInt(item.eventDate.split('-')[1], 10);
            let datetmp1 = yeardatetmp1 + ('0' + monthdatetmp1).slice(-2);
            datetOriginArr.push(datetmp1);
          })
          //使用set进行数组去重,查重去重并统计重复项
          var newDateArr = [];
          newDateArr = [...new Set(datetOriginArr)];
          //创建一个和newDateArr一样长度的数组newDateArr2
          var newDateArr2 = new Array(newDateArr.length);
          // 将数组内的值都设为0
          for(var t = 0; t < newDateArr2.length; t++) {
            newDateArr2[t] = 0;
          }
          // 计算newDateArr2对应在newDateArr重复的数量
          for(var p = 0; p < newDateArr.length; p++) {
            for(var j = 0; j < datetOriginArr.length; j++) {
              if(newDateArr[p] == datetOriginArr[j]) {
                newDateArr2[p]++;
              }
            }
          }
          // 生成x轴和每个月活动的数量
          // for(var m = 0; m < newDateArr.length; m++) {
          //   this.countEventNum.push(newDateArr2[m])
          //   this.YMlineX.push(newDateArr[m])
          // }

          // 计算newCountArr对应在newDateArr重复的数量——————————————————————————————
          // 格式化原有数据的日期，保留YM
          var allEventsYM = allEvent

          for (var index=0;index<allEventsYM.length;index++){
          let  yeardatetmp1 = parseInt( allEventsYM[index].eventDate.split('-')[0], 10);
          let monthdatetmp1 = parseInt(allEventsYM[index].eventDate.split('-')[1], 10);
          let datetmp1 = yeardatetmp1 + ('0' + monthdatetmp1).slice(-2);
            allEventsYM[index].eventDate =datetmp1
          }
          
          var newDateArr3 = new Array(newDateArr.length);
          for(var n = 0; n < newDateArr3.length; n++) {
            newDateArr3[n] = 0;
          }

          for(var x=0;x< newDateArr.length;x++){
            for(var y=0;y<allEventsYM.length;y++ ){
              if(newDateArr[x] == allEventsYM[y].eventDate){
                newDateArr3[x] = Number(newDateArr3[x])+Number(allEventsYM[y].memberNum)
              }
            }
          }
          // newDateArr,newDateArr2,newDateArr3
          this.YMlineX =  newDateArr
          this.countEventNum= newDateArr2,
          this.countEventGuest= newDateArr3
          /* eslint no-console: 0*/
          // console.log(newDateArr3)
          resolve()
      })

    },
    //获得活动场次最多的前十的城市
    filteCityRanking(allEvent){
      return new Promise(resolve=>{

        let allOriginEvents = allEvent;
        let allOriginEventCitys=[]
        for(var i=0;i<allOriginEvents.length;i++){
          allOriginEventCitys.push(allOriginEvents[i].eventProvince)
        }
        let allEventsRanks = allOriginEventCitys.reduce((cityArr, cityName) => {
            cityName in cityArr ? cityArr[cityName]++ : (cityArr[cityName] = 1);
            return cityArr;
        },{});
        
        Object.keys(allEventsRanks).forEach((key)=>{
          let allEventsRanksArrItem={
            name:'',
            value:''
          }
          // console.log(allEventsRanksArrItem)
          allEventsRanksArrItem.name=key
          allEventsRanksArrItem.value=allEventsRanks[key]
          this.allEventsRank.push(allEventsRanksArrItem)
        })
        console.log(this.allEventsRank)
        resolve(this.allEventsRank)
      })
    },
    // 异步获取所有数据
    async getAllData() {
      let allEvent = await this.getConsumerSCameWhichEvent()
      await this.filteEventDate(allEvent);
      await this.filteCityRanking(allEvent);
      await this.drawLine1();
      await this.drawLine2();
    },

    // 画echarts
    drawLine1() {
      return new Promise(resolve => {
        // 基于准备好的dom，初始化echarts实例
        let eventLineCharts = this.$echarts.init(
          window.document.getElementById("eventLineCharts1")
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
                  max: 1000,
                  interval: 100,
                  axisLabel: {
                      formatter: '{value} 次'
                  }
              },
              {
                  type: 'value',
                  name: '人数',
                  min: 0,
                  max: 10000,
                  interval: 1000,
                  axisLabel: {
                      formatter: '{value} 人'
                  }
              }
          ],
          series: [
              {
                  name:'场次',
                  type:'bar',
                  data:[...this.countEventNum]
              },
              {
                  name:'人数',
                  type:'line',
                  yAxisIndex: 1,
                  data:[...this.countEventGuest]
              }
          ]
        });
        resolve();
      });
    },
    drawLine2() {
      return new Promise(resolve => {
        // 基于准备好的dom，初始化echarts实例
        let usefulMobilePie = this.$echarts.init(
          window.document.getElementById("eventLineCharts2")
        );
        // 绘制图表
        usefulMobilePie.setOption({
          title: {
            text: "活动城市分布图Top10",
            subtext: "",
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
              data: [...this.allEventsRank],
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
  width: 100%;
  height: 500px;
}
.el-loading-mask .el-loading-spinner{
  top: 0 !important;
}
</style>