define(['app'], function (app) {
    return app.factory('mapService', ['$http', '$q', function ($http, $q) {

        /*
         加载百度地图api
         containterId : 显示地图的容器标签的id
         callback : 回调函数名
         */
        function loadMapAPI(containterId, callback) {
            var script = document.createElement("script");
            script.type = "text/javascript";
            script.src = "http://api.map.baidu.com/api?v=2.0&ak=FXK3X6TOxRf4NAebDoA0hGmFPx8eN68F&callback="+callback;
            document.getElementById(containterId).appendChild(script);
        }
        /**
         * 得到附近的地址列表
         * @param point
         */
        function getAroundAddrs(point) {
            var defer = $q.defer()
            var url = 'http://api.map.baidu.com/geocoder/v2/?' +
                'ak=yRrFVK2roUIGRlpcsv7pueLjvU7xO9FE&callback=JSON_CALLBACK' +
                '&location='+point.lat+','+point.lng+'&output=json&pois=1';
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
                    defer.resolve(mapAddrs)
                })
                .error(function () {
                    alert('请求地图地址失败!');
                })
            return defer.promise
        }

        function getPointByAddr(name) {
            var defer = $q.defer()
            var url = 'http://api.map.baidu.com/geocoder/v2/?' +
                'address=北京'+name+'&output=json&ak=yRrFVK2roUIGRlpcsv7pueLjvU7xO9FE&callback=JSON_CALLBACK';
            $http.jsonp(url)
                .success(function (data) {
                    console.log(data);
                    var location = data.result.location;
                    var point = new BMap.Point(location.lng, location.lat);
                    defer.resolve(point)
                })
                .error(function () {
                    alert('请求地图地址失败!');
                })
            return defer.promise
        }

        function getCurrentAddrs() {
            var defer = $q.defer()
            var geolocation = new BMap.Geolocation();
            geolocation.getCurrentPosition(function(r){
                //关于状态码，BMAP_STATUS_SUCCESS	检索成功。对应数值“0”。
                if(this.getStatus() == BMAP_STATUS_SUCCESS){
                    // alert('您的位置：'+r.point.lng+','+r.point.lat);
                    var geoc = new BMap.Geocoder();
                    var point = r.point;
                    geoc.getLocation(point, function(rs){
                        var addComp = rs.addressComponents;
                        alert(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
                        var name = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber
                        defer.resolve(name)
                    });
                } else {
                    alert('获取地址失败');
                }
            },{enableHighAccuracy: true})
            return defer.promise;
        }
        
        return {loadMapAPI, getAroundAddrs, getPointByAddr, getCurrentAddrs}
    }])
})

