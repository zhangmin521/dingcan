define(['app', 'Swiper'], function (app, Swiper) {
    return app.controller('HomeCtrl', ['$scope', '$rootScope', 'mapService', 'serverService',
        function ($scope, $rootScope, mapService , serverService) {
            $rootScope.appTitle = '首页'

            serverService.getBanners()
                .then(function (banners) {
                    $scope.banners = banners

                    setTimeout(function(){
                        new Swiper('#bannerSwiper',{//放轮播图的容器
                            pagination : '.swiper-pagination',//放下面页码小点的容器
                            paginationClickable : true,//页码小点是否可以点击
                            autoplay : 3000,//自动播放时长
                            loop : true,//循环
                            autoplayDisableOnInteraction  : false,//手动操作后自动播放是否停止
                            effect : 'cube',//翻页为立体效果
                            cube : {//立体配置
                                shadow : false,//下部没有阴影
                            }
                        })
                    }, 100)
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
