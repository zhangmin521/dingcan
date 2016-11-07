define(['app', 'storageUtil'], function (app, storageUtil) {
    return app.controller('ChooseCoordinateCtrl', ['$scope', '$rootScope', '$http',
        function ($scope, $rootScope, $http) {
            $rootScope.appTitle = '地图选择地址'

            loadJScript();

            //百度地图API功能
            function loadJScript() {
                var script = document.createElement("script");
                script.type = "text/javascript";
                script.src = "http://api.map.baidu.com/api?v=2.0&ak=yRrFVK2roUIGRlpcsv7pueLjvU7xO9FE&callback=init";
                document.getElementById('mapDiv').appendChild(script);
            }

            var map;
            //添加全局函数
            window.init = function () {
                map = new BMap.Map("cc_map");            // 创建Map实例
                var point = new BMap.Point(116.404, 39.915); // 创建点坐标
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
                var url = 'http://api.map.baidu.com/geocoder/v2/?' +
                    'ak=yRrFVK2roUIGRlpcsv7pueLjvU7xO9FE&callback=JSON_CALLBACK' +
                    '&location='+cPoint.lat+','+cPoint.lng+'&output=json&pois=1';
                $http.jsonp(url)
                    .success(function (data) {
                        //console.log(data);
                        var result = data.result;
                        var cityId = result.cityCode;
                        var mapAddrs = [];
                        result.pois.forEach(function (item) {
                            var address = item.name;
                            var lng = item.point.x;
                            var lat = item.point.y;
                            mapAddrs.push({address, lng, lat, cityId})
                        })
                        $scope.mapAddrs = mapAddrs;
                    })
                    .error(function () {
                        alert('请求地图地址失败!');
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
                    var url = 'http://api.map.baidu.com/geocoder/v2/?' +
                        'address=北京'+name+'&output=json&ak=yRrFVK2roUIGRlpcsv7pueLjvU7xO9FE&callback=JSON_CALLBACK';
                    $http.jsonp(url)
                        .success(function (data) {
                            console.log(data);
                            var location = data.result.location;
                            var point = new BMap.Point(location.lng, location.lat);
                            map.centerAndZoom(point,15);
                            showList();
                        })
                        .error(function () {
                            alert('请求地图地址失败!');
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
