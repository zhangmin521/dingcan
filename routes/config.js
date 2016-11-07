var express = require('express');
var router = express.Router();

//引入分路由模块
var user = require('./user')
var address = require('./address')
var home = require('./home')

//注册各个分路由
user(router)
address(router)
home(router)

module.exports = router;
