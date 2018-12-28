var express = require('express');
var router = express.Router();
var mysql = require('mysql2');
var mysqlconf = require('../dbconfig')
var curd_consumer = require('../curdLib')

var mysqlpool = mysql.createPool(mysqlconf.mysql)
//设置跨域访问
// router.all('*', function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//     res.header("X-Powered-By",' 3.2.1')
//     res.header("Content-Type", "application/json;charset=utf-8");
//     next();
// });

// 设置localstorage start
var localStorage;
function _defineLocalStorage() {
    if (typeof localStorage === "undefined" || localStorage === null) {
        var LocalStorage = require('node-localstorage').LocalStorage;
        localStorage = new LocalStorage('./scratch');
    }
}
_defineLocalStorage()
// 设置localstorage end

// 获得所有活动
function _getAllEvent() {
    return new Promise(resolve => {
        mysqlpool.query(curd_consumer.getAllEvent, function (err, rows, fields) {
            if (err) {
                console.log(err);
                return;
            } else {
                resolve(rows)
                // console.log('get all event')
            }
        });
    })
}
// 获得所有客户
function _getAllConsumer() {
    return new Promise(resolve => {
        mysqlpool.query(curd_consumer.getAllConsumer, function (err, rows, fields) {
            if (err) {
                console.log(err);
                return;
            } else {
                resolve(rows)
                // console.log('get all consumer')
            }
        });
    })
}

// 模糊查询某一场活动来了多少人
function _getConsumerCameWhichEvent(_eventNum) {
    return new Promise(resolve =>{
    mysqlpool.query(curd_consumer.getConsumerCameWhichEvent, _eventNum, function (err, rows, fields) {
        if (err) {
            console.log(err);
            return;
        } else {
            resolve(rows)
            // console.log('get Consumer Came Which Event')
        }
    })
    })
}

// 模糊查询某活动来了谁
router.post('/getEvenrCamers', function (req, res, next) {
    _getConsumerCameWhichEvent(req.body.eventNum).then((data)=>{
        res.send(data)
    })
})

// 查询每个月参加活动的人数
router.get('/getAllEventMemberNum', function (req, res, next) {
    _getAllEvent().then(resp => {
        var allEvent = resp;
        var allEventNum = []
        // var beginTime = +new Date();
        // var querySpendTime = ''
        function aa() {
            return new Promise(resolve => {
                for (var i = 0, tpmallEventlen = allEvent.length; i < tpmallEventlen; i++) {
                    let allEventNumItem = {
                        eventNum: allEvent[i].event_num,
                        eventDate: allEvent[i].event_date,
                        eventProvince: allEvent[i].event_province,
                        memberNum: 0
                    }
                    mysqlpool.query(curd_consumer.getConsumerCameWhichEvent, allEvent[i].event_num, function (err, rows, fields) {
                        if (err) {
                            console.log(err)
                        } else if (allEventNum.length === tpmallEventlen - 1) {
                            // res.send(allEventNumItem)
                            resolve(allEventNum)
                        } else {
                            allEventNumItem.memberNum = rows.length
                            allEventNum.push(allEventNumItem)
                        }
                    })
                }
            })
        }
        aa().then(reson => {
            return new Promise((resolve)=>{
                let resonDate = reson
                for(var ii=0;ii<resonDate.length;ii++){
                    let insertAllEventMemberNumTmpsql = `INSERT INTO AllEventMemberNumTmp VALUES(?,?,?,?);`
                    mysqlpool.query(insertAllEventMemberNumTmpsql, [resonDate[ii].eventNum,resonDate[ii].eventDate,resonDate[ii].eventProvince,resonDate[ii].memberNum],function (err, rows, fields) {
                        if (err) {
                            throw err
                        } else {
                            resolve('ok')
                        }
                    })
                }
            })

            // 如果需要时间戳
            //         设置localstorage获取时间戳s
            //           localStorage.removeItem('querySpendTime')
            //           localStorage.setItem('querySpendTime', querySpendTime);
            //         设置localstorage获取时间戳e           
            // let _get_querySpendTime = Number(localStorage.getItem('querySpendTime')) + 100
            // 延迟获取所有数据
            // console.log(_get_querySpendTime);
            // setTimeout(() => {
            //     console.log(allEventNum)
            // }, _get_querySpendTime);

        }).then((res)=>{
            res.send(1)
        })
    })


});
// 获取所有人员信息
router.get('/getAllgetAllConsumer', function (req, res, next) {
    _getAllConsumer().then(data => {
        res.send(data)
    })
});
// 获取所有活动
router.get('/getAllEvent', function (req, res, next) {
    _getAllEvent().then(data => {
        res.send(data)
    })
});

// 根据活动编号查询活动信息
router.post('/searchConsumerEvent', function (req, res, next) {
    mysqlpool.query(curd_consumer.searchConsumerEvent, req.body.eventNum, function (err, rows, fields) {
        if (err) {
            console.log('searchConsumerEvent')
            res.send(err);
        } else {
            res.send(rows)
        }
    })
});
// 根据手机号查询客户信息
router.post('/searchConsumerInfoByPhone', function (req, res, next) {
    let searchInfoPhone = req.body.phoneNum
    mysqlpool.query(curd_consumer.searchConsumerInfoByPhone, [searchInfoPhone, searchInfoPhone], function (err, rows, fields) {
        if (err) {
            res.send(err);
            console.log('searchConsumerInfoByPhone');
            return;
        } else {
            res.send(rows);
            return;
        }
    })
});

module.exports = router;
