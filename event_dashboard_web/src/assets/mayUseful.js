  // 获取两段日期内的所有年月
    // getMonthBetween(sdate,edate){  
    //   let syear = parseInt(sdate.split('-')[0], 10), smonth = parseInt(sdate.split('-')[1], 10);
    //   let eyear = parseInt(edate.split('-')[0], 10), emonth = parseInt(edate.split('-')[1], 10);
    //   let  sdateEdateArr= [];
    //   while((syear * 12 + smonth) <= (eyear * 12 + emonth)){
    //     sdateEdateArr.push(syear + ('0' + smonth).slice(-2));
    //     if(++smonth > 12){
    //       syear++;
    //       smonth = 1;
    //     }
    //   }
    //   return sdateEdateArr;
    // },


          // 活动两段日期的中间所有年月份
      // let YMlineXTmp =  [];
      // allEvent.forEach(item => {
      // let indexxie  = item.event_date.lastIndexOf('-')
      //   YMlineXTmp.push(item.event_date.substr(0,indexxie))
      // });
      // this.YMlineX = new Set(YMlineXTmp)
      // let YMlineX = [...this.YMlineX]
     
      // let DrawLineImageXArr = this.getMonthBetween(YMlineX[0],YMlineX[YMlineX.length-1]);
      // this.YMlineX = DrawLineImageXArr

      // 将所有活动数据的日期格式化