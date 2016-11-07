/**
 * 数据库操作的总接口模块
 */
var dao_address = require('./dao_address')
var dao_user = require('./dao_user')
var dao_feedback = require('./dao_feedback')
var dao_banner = require('./dao_banner')
var dao_meal = require('./dao_meal')

module.exports = {
    //获得用户
    getUser(phone, callback) {
        dao_user.getUser(phone, function (error, user) {
            if(error) {
                throw error;
            } else {
                callback(user);
            }
        })
    },
    //添加用户
    addUser(phone, callback) {
        dao_user.addUser(phone, function (error, user) {
            if(error) {
                throw error;
            } else {
                callback(user);
            }
        })
    },
    //添加意见反馈
    addFeedback(feedback, callback) {
        dao_feedback.addFeedback(feedback, function (error, feedback) {
            if(error) {
                throw error;
            } else {
                callback(feedback);
            }
        })
    },
    //通过用户id得到用户地址
    getAddrsByUserId(userId, callback) {
        dao_address.getAddrsByUserId(userId, function (error, addrs) {
            if(error) {
                throw error;
            } else {
                callback(addrs);
            }
        })
    },
    //添加地址
    addAddr(addr, callback) {
        dao_address.addAddr(addr, function (error, addr) {
            if(error) {
                throw error;
            } else {
                callback(addr);
            }
        })
    },
    //通过id删除指定地址
    deleteAddrById(id, callback) {
        dao_address.deleteAddrById(id, function (error, result) {
            if(error) {
                throw error;
            } else {
                callback(result);
            }
        })
    },
    //更新地址
    updateAddr(addr, callback) {
        dao_address.updateAddr(addr, function (error, result) {
            if(error) {
                throw error;
            } else {
                callback(result);
            }
        })
    },
    //轮播图
    getBanners(callback){
        dao_banner.getBanners(function (error, banners) {
            if(error){
                throw error
            }else {
                callback(banners)
            }
        })
    },
    //菜品
    getMeals(callback){
        dao_meal.getMeals(function (error, meals) {
            if(error){
                throw error
            }else {
                callback(meals)
            }
        })
    }
};
