/**
 * 与服务器ajax交互的service模块
 */
define(['app'], function (app) {
    return app.factory('serverService', ['$http', '$q',
        function ($http, $q) {

            /*
            发送验证码
             */
            function sendCode(phone) {

                var defer = $q.defer();

                $http.get('/sendcode?phone='+phone)
                    .success(function (result) {
                        defer.resolve(result)
                    })
                return defer.promise;
            }

            /*
            登陆
             */
            function login(user) {
                var defer = $q.defer();
                $http({
                    url : '/login',
                    method : 'POST',
                    //data : `phone=${user.phone}&code=${user.code}`,
                    data : user  //如果不是跨域请求, 才可以
                    //headers :  {'Content-Type': 'application/x-www-form-urlencoded'}
                })
                    .success(function (result) {
                        defer.resolve(result);
                    })
                    .error(function () {
                        defer.reject();
                    })
                return defer.promise;
            }

            /*
            提交意见反馈
             */
            function feedback(feedback) {
                var defer = $q.defer();
                $http({
                    url : '/feedback',
                    method : 'GET',
                    params : {data:feedback},
                })
                    .success(function (result) {
                        defer.resolve(result);
                    })
                return defer.promise;
            }

            /*
            添加地址
             */
            function addAddr (addr) {
                var defer = $q.defer();
                $http({
                    url : '/insertAddr',
                    method : 'GET',
                    params : {address:addr},
                })
                    .success(function (result) {
                        defer.resolve(result.data);
                    })
                    .error(function () {
                        alert('添加地址失败!');
                    })
                return defer.promise;
            }

            /*
            得到指定用户的地址列表
             */
            function getAddrsByUserId(userId) {
                var defer = $q.defer();
                $http({
                    url : '/getAddrsByUserId',
                    method : 'GET',
                    params : {userId:userId},
                })
                    .success(function (result) {
                        defer.resolve(result.data);
                    })
                    .error(function () {
                        alert('获取地址列表失败!');
                    })
                return defer.promise;
            }

            /*
            删除地址
             */
            function deleteAddr(id) {
                var defer = $q.defer();
                $http({
                    url : '/deleteAddr',
                    method : 'GET',
                    params : {_id:id},
                })
                    .success(function (result) {
                        defer.resolve(result);
                    })
                    .error(function () {
                        alert('删除地址失败!');
                    })
                return defer.promise;
            }

            /*
             更新地址
             */
            function updateAddr (addr) {
                var defer = $q.defer();
                $http({
                    url : '/updateAddr',
                    method : 'GET',
                    params : {address:addr},
                })
                    .success(function (result) {
                        defer.resolve(result);
                    })
                    .error(function () {
                        alert('修改地址失败!');
                    })
                return defer.promise;
            }

            return {sendCode, login, feedback, addAddr, getAddrsByUserId,
                deleteAddr, updateAddr}
    }])
})

