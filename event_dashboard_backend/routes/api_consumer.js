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

// 模糊查询某活动来了多少人
function _getConsumerCameWhichEvent(_eventNum) {
    let _eventNumS = `%${_eventNum}%`
    let _ConsumerCameWhichEvent = ''
    // return new Promise(resolve =>{
    mysqlpool.query(curd_consumer.getConsumerCameWhichEvent, _eventNumS, function (err, rows, fields) {
        if (err) {
            console.log(err);
            return;
        } else {
            _ConsumerCameWhichEvent = rows
            return _ConsumerCameWhichEvent
            // console.log('get Consumer Came Which Event')
        }
    })

    // })
}

// 模糊查询某活动来了多少人
function GetConsumerCameWhichEvent(_eventNum) {
    return new Promise(resolve => {
        let _eventNumS = `%${_eventNum}%`

        mysqlpool.query(curd_consumer.getConsumerCameWhichEvent, _eventNumS, function (err, rows, fields) {
            if (err) {
                console.log(err);
                return;
                return res.redirect('/')
            } else {
                resolve(rows)
                // callback(rows)
            }
        })
    })

}

// 查询每个月参加活动的人数
router.get('/getAllEventMemberNum', function (req, res, next) {


    // var _getConsumerCameToWhichEvent = new GetConsumerCameWhichEvent('15160267', getAllEventMemberNum)
    // function getAllEventMemberNum(rowsData){
    //     consumerCameEventList.cameNum = rowsData.length;
    // }

    _getAllEvent().then(resp => {
        var empArr = []
        let timeClock = 0
        for (var index = 0; index < resp.length; index++) {
            let resEventNUm = resp[index].event_num
            _eventNumS = `%${resEventNUm}%`
            mysqlpool.query(curd_consumer.getConsumerCameWhichEvent, _eventNumS, function (err, rows, fields) {
                if (err) {
                    return;
                } else
                     {
                        timeClock++
                        empArr[index] = {},
                        empArr[index].a = resEventNUm
                        empArr[index].b = rows.length
                    }
            })
            // console.log(timeClock)
        }
        setTimeout(() => {
            console.log(empArr)
        }, 5000);
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
