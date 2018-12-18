var express = require('express');
var router = express.Router();
var path = require('path');
/* GET home page. */
//编写执行函数
router.get('/', function(req, res, next) {
  //使用绝对定位打开views下面的html文件
  res.sendFile(path.join(__dirname, '../views', 'index.html'));

});

module.exports = router;
