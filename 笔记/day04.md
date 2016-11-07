## 今日任务
1. 地址模块的后台功能
2. 地址模块的前台页面功能
3. 百度地图API使用

---------------------------------------

1. 地址后台功能
    * address_dao.js
        * 引入connection.js
        * 得到mongoose对象 
        * Schema
        * addressSchema
        * AddressModel
            * find()
            * findOne()
            * update()
            * remove()
        * addressModel
            * save()
    * address.js
        * 参照API接口文档编写

2. 地址的页面功能	
    * addrManage.html
    * addNewAddr.html
    * angular的一些指令: ng-repeat / ng-model /ng-click / ng-class /ng-disabled
    * 使用$http提交ajax请求进行操作/更新界面

3. 百度地图API使用
	* 注册百度帐号/激活
	* 创建虚拟应用--->AK
	* 根据demo/类说明来编写
	* jsonp跨域请求