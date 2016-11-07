
define(['app'], function (app) {
    return app.controller('LocationAddrCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
        $rootScope.appTitle = '定位当前地址'
    }])
})
