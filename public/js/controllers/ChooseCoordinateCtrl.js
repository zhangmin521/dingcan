define(['app', 'storageUtil'], function (app, storageUtil) {
    return app.controller('ChooseCoordinateCtrl',
        ['$scope', '$rootScope', '$http', 'mapService',
        function ($scope, $rootScope, $http, mapService) {
            $rootScope.appTitle = '地图选择地址'

            mapService.loadMapAPI('mapDiv', 'init')

            var map;
            //添加全局函数
            window.init = function () {

                //默认如果没有值时地址坐标显示天安门
                var lng = '116.404'
                var lat = '39.915'
                //从session里获得input的地址
                var inputAddr = storageUtil.session.getItem(storageUtil.KEYS.INPUT_ADDR)
                //如果有值并且有坐标，就显示坐标周围的地址列表
                if(inputAddr!=null && inputAddr.lng){
                    lng = inputAddr.lng
                    lat = inputAddr.lat
                }

                map = new BMap.Map("cc_map");            // 创建Map实例
                var point = new BMap.Point(lng, lat); // 创建点坐标
                map.centerAndZoom(point,15);
                map.setCurrentCity("北京");

                //监听
                    //拖拽结束
                map.addEventListener("dragend", showList);
                    //缩放结束
                map.addEventListener("zoomend", showList);

                //初始显示列表
                showList();
            }

            function showList() {
                //alert('showList');
                //得到中心点坐标对象
                var cPoint = map.getCenter();
                //根据cPoint得到附近的多个地址的列表

                mapService.getAroundAddrs(cPoint)
                    .then(function (mapAddrs) {
                        $scope.mapAddrs = mapAddrs;
                    })
            }

            //搜索
            $scope.search = function () {
                /*
                var name = $scope.searchName;
                if(name==undefined || name.trim()=='')
                    return;
                */
                var name = $scope.searchName && $scope.searchName.trim()
                if(!!name) {

                    mapService.getPointByAddr(name)
                        .then(function (point) {
                            map.centerAndZoom(point,15);
                            showList();
                        })
                }
            }

            //选择地址
            $scope.selectAddr = function (addr) {
                //保存addr
                storageUtil.session.setItem(storageUtil.KEYS.MAP_ADDR, addr);
                //跳转
                window.location = '#/add_new_addr';
            }
    }])
})
