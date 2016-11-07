define(['app'], function (app) {
    return app.controller('HomeCtrl', ['$scope', '$rootScope', 'mapService', 'serverService',
        function ($scope, $rootScope, mapService , serverService) {
            $rootScope.appTitle = '首页'

            mapService.loadMapAPI('homeDiv', 'init')

            window.init = function () {
                mapService.getCurrentAddrs()
                    .then(function (address) {
                        console.log(address)
                    })
            }


    }])
})
