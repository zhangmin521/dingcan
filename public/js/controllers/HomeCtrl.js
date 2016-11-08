define(['app', 'Swiper', 'storageUtil'], function (app, Swiper, storageUtil) {
    return app.controller('HomeCtrl', ['$scope', '$rootScope', 'mapService', 'serverService',
        function ($scope, $rootScope, mapService, serverService) {
            $rootScope.appTitle = '首页'

            //获取首页相关数据, 并显示
            serverService.getBanners()
                .then(function (banners) {
                    $scope.banners = banners;

                    setTimeout(function () {
                        new Swiper('#bannerSwiper', { //配置对象
                            pagination : '.swiper-pagination', //指定提示圆点显示的容器选择器
                            paginationClickable : true,  //提示圆点是否可点击
                            autoplay : 3000, //自动播放的间隔时间
                            autoplayDisableOnInteraction : false, //手动操作后重新自动播放
                            loop : true, //循环翻页
                            effect : 'cube', //翻页效果:立体
                            cube : {
                                shadow : false //下部没有阴影
                            }
                        })
                    }, 100); //必须延迟创建Swiper
                })
            serverService.getData()
                .then(function (data) {
                    $scope.data = data;

                    //在得到data数据之后, 需要比较data中meals与cart中的meals, 并同步
                    updateMeals();

                    //保存送餐费
                    $scope.cart.songcanfei = data.restaurant.songcanfei;
                    //保存送商家id
                    $scope.cart.rstId = data.restaurant._id;

                    //定位当前地址
                    $scope.data.address.name = '正在定位中...'
                    mapService.loadMapAPI('homeDiv', 'init');
                    window.initMap = function () {
                        mapService.getCurrentAddr()
                            .then(function (address) {
                                console.log(address);
                                $scope.data.address = address;
                            })
                    }
                })

            /*
             更新meals
             */
            function updateMeals() {
                var dMeals = $scope.data.meals;
                var cMeals = $scope.cart.meals;

                for (var i = 0; i < dMeals.length; i++) {
                    var dMeal = dMeals[i];
                    for (var j = 0; j < cMeals.length; j++) {
                        var cMeal = cMeals[j];
                        if(dMeal._id===cMeal._id) {
                            //将购物车中meal的count给data中的meal
                            dMeal.count = cMeal.count;
                            //用data中的meal替换cart中对应的meal
                            cMeals[j] = dMeal;
                        }

                    }
                }
            }

            //初始化购物车
            initCart();

            function initCart() {
                var cart = storageUtil.session.getItem(storageUtil.KEYS.CART);
                if(cart===null) {
                    cart = {
                        meals : [],
                        "songcanfei": 0,
                        "totalPrice": 0,
                        "totalCount": 0,
                        "rstId": null
                    };
                }
                $scope.cart = cart;
            }

            /*
             更新购物车中某个菜品数量
             */
            $scope.updateMealCount = function (isAdd, meal, index) {
                if(isAdd) { //增加
                    if(meal.count) { //已经在购物车中了
                        meal.count++;
                    } else {
                        meal.count = 1;
                        //添加到购物车
                        $scope.cart.meals.push(meal);
                    }

                    $scope.cart.totalPrice += meal.price;
                    $scope.cart.totalCount += 1;
                } else {
                    meal.count--;
                    if(meal.count==0) { //从购物车移除
                        //找到下标
                        var index = $scope.cart.meals.findIndex(function (item, index) {
                            return item.count==0;
                        })
                        //删除
                        $scope.cart.meals.splice(index, 1);
                    }

                    $scope.cart.totalPrice -= meal.price;
                    $scope.cart.totalCount -= 1;
                }

                //保存cart
                storageUtil.session.setItem(storageUtil.KEYS.CART, $scope.cart);
            }

            /*
             切换购物车的显示/隐藏
             */
            $scope.isOpen = false
            $scope.changeState = function () {
                $scope.isOpen = !$scope.isOpen
            }
        }])
})
