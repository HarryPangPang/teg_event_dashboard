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


// 获取所有人员信息
router.get('/getAllgetAllConsumer', function(req, res, next) {
    mysqlpool.query(curd_consumer.getAllConsumer, function(err, rows, fields) {
        if(err){
            console.log(err);
        } else{
            res.send(rows)
        }
     })
});
// 根据活动编号查询活动信息
router.post('/searchConsumerEvent', function(req, res, next) {
    mysqlpool.query(curd_consumer.searchConsumerEvent,req.body.eventNum, function(err, rows, fields) {
        if(err){
            console.log('searchConsumerEvent')
            res.send(err);
        } else{
            res.send(rows)
        }
     })
});
// 根据手机号查询客户信息
router.post('/searchConsumerInfoByPhone', function(req, res, next) {
    let searchInfoPhone = req.body.phoneNum
    mysqlpool.query(curd_consumer.searchConsumerInfoByPhone,[searchInfoPhone,searchInfoPhone], function(err, rows, fields) {
        if(err){
            res.send(err);
            console.log('searchConsumerInfoByPhone');
            return;
        } else{
                res.send(rows);
                return;
        }
     })
});

module.exports = router;
