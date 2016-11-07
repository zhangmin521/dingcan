define(['app'], function (app) {
    return app.controller('HomeCtrl', ['$scope', '$rootScope', 'mapService', 'serverService',
        function ($scope, $rootScope, mapService , serverService) {
            $rootScope.appTitle = '首页'

            serverService.getBanners()
                .then(function (banners) {
                    $scope.banners = banners
                })
            serverService.getData()
                .then(function (data) {
                    $scope.data = data
                    $scope.data.address.name = '正在定位中...'
                    mapService.loadMapAPI('homeDiv', 'init')
                    window.init = function () {
                        mapService.getCurrentAddrs()
                            .then(function (address) {
                                console.log(address)
                                $scope.data.address = address
                            })
                    }
                })

    }])
})
