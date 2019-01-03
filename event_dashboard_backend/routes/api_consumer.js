var express = require('express');
var router = express.Router();
var mysql = require('mysql2');
var mysqlconf = require('../dbconfig')
var curd_consumer = require('../curdLib')
var schedule = require('node-schedule');
var mysqlpool = mysql.createPool(mysqlconf.mysql)

// 配置log4日志
const log4js = require('log4js');
log4js.configure({
    appenders: {
        api_consumer: {
            type: 'file',
            filename: 'api_consumer.log'
        },
        out: {
            type: 'stdout',
            layout: {
                type: 'basic'
            }
        }
    },
    categories: {
        default: {
            appenders: ['out'],
            level: 'error'
        },
        mix: {
            appenders: ['api_consumer', 'out'],
            level: 'error'
        }
    },
    // pm2: true, 
    //如果使用 pm2 -i 方式启动的 node 进程需要设置次为 true
});
const logger = log4js.getLogger('mix');
logger.level = 'debug'; // default level is OFF - which means no logs at all.

// logger.trace('Entering cheese testing');
// logger.debug('Got cheese.');
// logger.info('Cheese is Gouda.');
// logger.warn('Cheese is quite smelly.');
// logger.error('Cheese is too ripe!');
// logger.fatal('Cheese was breeding ground for listeria.');

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
                logger.error(err);
                return;
            } else {
                logger.info('get all event')
                resolve(rows)

            }
        });
    })
}
// 获得所有客户
function _getAllConsumer() {
    return new Promise(resolve => {
        mysqlpool.query(curd_consumer.getAllConsumer, function (err, rows, fields) {
            if (err) {
                logger.error(err);
                return;
            } else {
                logger.info('get all consumer')
                resolve(rows)
            }
        });
    })
}
// 根据活动编号查询活动信息
function _searchConsumerEvent(item) {
    // return new Promise(resolve => {
    mysqlpool.query(curd_consumer.searchConsumerEvent, item, function (err, rows, fields) {
        if (err) {
            logger.error(err);
            return;
        } else {
            resolve(rows)
        }
    });
    // })
}
// 模糊查询某一场活动来了多少人
function _getConsumerCameWhichEvent(_eventNum) {
    return new Promise(resolve => {
        mysqlpool.query(curd_consumer.getConsumerCameWhichEvent, _eventNum, function (err, rows, fields) {
            if (err) {
                logger.error(err);
                return;
            } else {
                // logger.info('get Consumer Came Which Event')
                resolve(rows)
            }
        })
    })
}
// 清除clearAllEventMenberNumTmp临时表
function clearAllEventMenberNumTmp() {
    return new Promise(resolve => {
        mysqlpool.query(curd_consumer.clearAllEventMenberNumTmp, function (err, rows, fields) {
            if (err) {
                throw err
            } else {
                resolve('1')
            }
        });
    })
}
// 清除clearAllEventMenberNumTmp临时表
function clearAllConsumerLinkEvent() {
    return new Promise(resolve => {
        mysqlpool.query(curd_consumer.clearAllConsumerLinkEvent, function (err, rows, fields) {
            if (err) {
                throw err
            } else {
                resolve('1')
            }
        });
    })
}
// 创建每个月参加活动的人数的表前整理数据结构
function filtNewEventMenmberDataArr(allEvent) {
    return new Promise(resolve => {
        var allEventNum = []
        for (var i = 0, tpmallEventlen = allEvent.length; i < tpmallEventlen; i++) {
            let allEventNumItem = {
                eventNum: allEvent[i].event_num.trim(),
                eventDate: allEvent[i].event_date.trim(),
                eventProvince: allEvent[i].event_province.trim(),
                memberNum: 0
            }
            mysqlpool.query(curd_consumer.getConsumerCameWhichEvent, allEvent[i].event_num, function (err, rows, fields) {
                if (err) {
                    logger.error(err)
                    throw err
                } else {
                    allEventNumItem.memberNum = rows.length
                    allEventNum.push(allEventNumItem)
                    if (allEventNum.length == tpmallEventlen) {
                        resolve(allEventNum)
                    }
                }
            })
        }
    })
}
// 创建每个月参加活动的人数的活动的表
function createNewEventMenmberDataArr(reson) {
    return new Promise((resolve) => {
        let resonDate = reson
        for (var ii = 0; ii < resonDate.length; ii++) {
            let insertAllEventMemberNumTmpsql = `INSERT INTO AllEventMemberNumTmp VALUES(?,?,?,?);`
            mysqlpool.query(insertAllEventMemberNumTmpsql, [resonDate[ii].eventNum, resonDate[ii].eventDate, resonDate[ii].eventProvince, resonDate[ii].memberNum], function (err, rows, fields) {
                if (err) {
                    logger.error(err)
                    throw err
                } else {
                    resolve('1')
                    // logger.info('INSERT INTO AllEventMemberNumTmp Successfully')
                }
            })
        }
    })
}
// 获得每个月参加活动的人数活动的表
function _getUpdatedgetAllConsumer() {
    return new Promise(resolve => {
        mysqlpool.query(curd_consumer.getUpdatedgetAllConsumer, function (err, rows, fields) {
            if (err) {
                logger.error(err);
                return;
            } else {
                resolve(rows)
                logger.info('get _getUpdatedgetAllConsumer')
            }
        });
    })
}

// 创建活动客户数据表定时任务s
function CreateUpdatedgetAllConsumerTimelyWork() {
    clearAllEventMenberNumTmp().then((resp) => {
        if (resp == '1') {
            _getAllEvent().then(resp => {
                filtNewEventMenmberDataArr(resp).then(resp => {
                    createNewEventMenmberDataArr(resp).then((resp) => {
                        if (resp == '1') {
                            logger.info('CreateUpdatedgetAllConsumerTimelyWork Add successfully')
                        }
                    })
                })
            })
        } else {
            return;
        }
    })
}
// CreateUpdatedgetAllConsumerTimelyWork()

// ---------------------------------------
// 创建活动客户关联活动数据表前整理数据结构
function filterAllConsumerLinkEvent() {
    return new Promise(resolve => {
        _getAllConsumer().then(res => {
            let lonelyData =res
            let newConsumerRowDataArr =[]
            for(var j=0;j<lonelyData.length;j++){
                let newConsumerRowData = {
                    consumer_id: lonelyData[j].id,
                    event_numid: lonelyData[j].event_num,
                    event_num: lonelyData[j].event_num.split(","),
                    consumer_name: lonelyData[j].consumer_name,
                    consumer_sex: lonelyData[j].consumer_sex,
                    contact_info1: lonelyData[j].contact_info1,
                    contact_info2: lonelyData[j].contact_info2,
                    event_audience_type: [],
                    event_apply_dept: []
                }
                for (var i = 0; i < newConsumerRowData.event_num.length; i++) {
                    mysqlpool.query(curd_consumer.searchConsumerEvent, newConsumerRowData.event_num[i], function (err, rows, fields) {
                        if (err) {
                            logger.error(err);
                            return;
                        } else {
                            newConsumerRowData.event_audience_type.push(rows[0].event_audience_type)
                            newConsumerRowData.event_apply_dept.push(rows[0].event_apply_dept)
                            newConsumerRowDataArr.push(newConsumerRowData)
                            let newConsumerRowDataArrOnly = [...new Set(newConsumerRowDataArr)]
                            if(newConsumerRowDataArrOnly.length == lonelyData.length){
                                resolve(newConsumerRowDataArrOnly)
                                return
                            }
                        }
                    });
                }

            }
        })
    })
}

// // 创建活动客户关联活动数据表前整理数据结构
// function createNewAllConsumerLinkEvent(reson) {
//     return new Promise((resolve) => {
//         resolve(resolve)
//         let resonDate = reson
//         for (var ii = 0; ii < resonDate.length; ii++) {
//             let insertAllConsumerLinkEvent = `INSERT INTO allconsumerlinkevent(consumer_id,event_numid,consumer_name,consumer_sex,contact_info1,contact_info2,event_audience_type,event_apply_dept) values(?,?,?,?,?,?,?,?)`
//             mysqlpool.query(insertAllConsumerLinkEvent, [
//                 resonDate[ii].consumer_id,
//                 resonDate[ii].event_numid,
//                 resonDate[ii].consumer_name,
//                 resonDate[ii].consumer_sex,
//                 resonDate[ii].contact_info1,
//                 resonDate[ii].contact_info2,
//                 resonDate[ii].event_audience_type.join(',').toString(),
//                 resonDate[ii].event_apply_dept.join(',').toString()
//             ],
//                 function (err, rows, fields) {
//                 if (err) {
//                     logger.error(err)
//                     throw err
//                 } else {
//                     resolve('1')
//                 }
//             })
//         }
//     })
// }
// createNewAllConsumerLinkEvent()

// 创建活动客户关联活动数据表定时任务
// function CreateUpdatedAllConsumerLinkEventTimelyWork() {
//     return new Promise(resolve=>{
//         clearAllConsumerLinkEvent().then((resp) => {
//             if (resp == '1') {
//                 filterAllConsumerLinkEvent().then(resp=>{
//                         createNewAllConsumerLinkEvent(resp).then(resp=>{
//                             logger.debug(resp)
//                         })
//                 })
//             } else {
//                 return;
//             }
//         })
//     })
// }

// CreateUpdatedAllConsumerLinkEventTimelyWork()


// ---------------------------------------


// 配置定时任务
// function scheduleCronstyle() {
//     schedule.scheduleJob('* * 03 * * *', function () {
//         CreateUpdatedgetAllConsumerTimelyWork()
// CreateUpdatedAllConsumerLinkEventTimelyWork()
//         logger.info('scheduleCronstyle:' + new Date());
//     });
// }
// scheduleCronstyle();


// 创建每个月参加活动的人数的表(接口已废弃)
// router.get('/getAllEventMemberNum', function (req, res, next) {
// var beginTime = +new Date();
// var querySpendTime = ''
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

// });

// 模糊查询某活动来了谁
router.post('/getEvenrCamers', function (req, res, next) {
    _getConsumerCameWhichEvent(req.body.eventNum).then((data) => {
        res.send(data)
    })
})

// 获取新表的每个月参加活动的人数的表
router.get('/getUpdatedgetAllConsumer', function (req, res, next) {
    _getUpdatedgetAllConsumer().then(data => {
        res.send(data)
    })
});

// 获取新表所有客户关联活动信息
router.get('/getUpdatedAllConsumerLinkEvent', function (req, res, next) {
    filterAllConsumerLinkEvent().then(data => {
        res.send(data)
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
            logger.error('searchConsumerEvent')
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
