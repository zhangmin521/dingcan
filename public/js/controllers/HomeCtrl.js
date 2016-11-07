define(['app'], function (app) {
    return app.controller('HomeCtrl', 'mapService', ['$scope', '$rootScope',
        function ($scope, $rootScope, mapService) {
            $rootScope.appTitle = '首页'

            mapService.loadMapAPI('homeDiv', 'init')

            window.init = function () {
                mapService.getCurrentAddrs()
                    .then(function (address) {

                    })
            }
    }])
})
