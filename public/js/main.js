/**
 * 主js
 */

//配置require
require.config({
    //基本路径
    baseUrl : 'js/',
    //映射模块: name:path
    paths : {
        //lib模块
        'angular' : 'libs/angular',
        'angular-messages' : 'libs/angular-messages',
        'angular-route' : 'libs/angular-route',
        'Swiper' : 'libs/swiper.min',

        //controllers
        'app' : 'controllers/app',
        'HomeCtrl' : 'controllers/HomeCtrl',
        'PersonalCtrl' : 'controllers/PersonalCtrl',
        'AddNewAddrCtrl' : 'controllers/AddNewAddrCtrl',
        'AddrManageCtrl' : 'controllers/AddrManageCtrl',
        'FeedbackCtrl' : 'controllers/FeedbackCtrl',
        'ChooseCoordinateCtrl' : 'controllers/ChooseCoordinateCtrl',
        'LocationAddrCtrl' : 'controllers/LocationAddrCtrl',
        'LoginCtrl' : 'controllers/LoginCtrl',
        'OrderConfirmCtrl' : 'controllers/OrderConfirmCtrl',

        //routes
        'appRoute' : 'routes/appRoute',

        //services
        'serverService' : 'services/serverService',
        'mapService' : 'services/mapService',

        //utils
        'storageUtil' : 'utils/storageUtil'
    },
    //非AMD模块
    shim : {
        'angular' : {
            exports : 'angular'
        },
        'angular-messages' : {
            exports : 'angular-messages',
            deps : ['angular']
        },
        'angular-route' : {
            exports : 'angular-route',
            deps : ['angular']
        },
        'Swiper' : {
            exports : 'Swiper'
        }
    }
})

//加载模块, 启动angular
require([
    'angular', 'angular-messages', 'angular-route', 'app',
    'HomeCtrl', 'PersonalCtrl', 'appRoute','AddNewAddrCtrl',
    'AddrManageCtrl','ChooseCoordinateCtrl', 'FeedbackCtrl',
    'LocationAddrCtrl', 'LoginCtrl', 'OrderConfirmCtrl',
    'serverService', 'storageUtil', 'mapService', 'Swiper'
], function (angular) {
    angular.bootstrap(document, ['dcApp'])
})
