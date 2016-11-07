
define(['app'], function (app) {
    return app.controller('OrderConfirmCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
        $rootScope.appTitle = '下 单'
    }])
})
