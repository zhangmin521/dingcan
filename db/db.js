/**
 * 数据库操作的总接口模块
 */
var dao_address = require('./dao_address')
var dao_user = require('./dao_user')
var dao_feedback = require('./dao_feedback')

module.exports = {

    getUser(phone, callback) {
        dao_user.getUser(phone, function (error, user) {
            if(error) {
                throw error;
            } else {
                callback(user);
            }
        })
    },

    addUser(phone, callback) {
        dao_user.addUser(phone, function (error, user) {
            if(error) {
                throw error;
            } else {
                callback(user);
            }
        })
    },

    addFeedback(feedback, callback) {
        dao_feedback.addFeedback(feedback, function (error, feedback) {
            if(error) {
                throw error;
            } else {
                callback(feedback);
            }
        })
    },

    getAddrsByUserId(userId, callback) {
        dao_address.getAddrsByUserId(userId, function (error, addrs) {
            if(error) {
                throw error;
            } else {
                callback(addrs);
            }
        })
    },

    addAddr(addr, callback) {
        dao_address.addAddr(addr, function (error, addr) {
            if(error) {
                throw error;
            } else {
                callback(addr);
            }
        })
    },

    deleteAddrById(id, callback) {
        dao_address.deleteAddrById(id, function (error, result) {
            if(error) {
                throw error;
            } else {
                callback(result);
            }
        })
    },

    updateAddr(addr, callback) {
        dao_address.updateAddr(addr, function (error, result) {
            if(error) {
                throw error;
            } else {
                callback(result);
            }
        })
    }
};
