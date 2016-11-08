/**
 * 浏览器端数据存储的工具模块
 * session
 * local
 * cookie
 *
 * key=value
 */
define(function () {

    return {
        KEYS : {   //存储所有的key
            USER : '_user_',   //用户
            EDIT_ADDR : '_edit_addr_', //修改的地址
            MAP_ADDR : '_map_addr_', //地图定位的地址
            INPUT_ADDR : '_input_addr_', //用户输入的地址
            CART : '_cart_'//购物车
        },

        session : {
            //保存
            setItem(key, value) {
                //如果value是对象, 转换成对应的json
                if(value instanceof Object) {
                    value = JSON.stringify(value);
                }
                //保存
                sessionStorage.setItem(key, value)
            },
            //读取
            getItem(key) {
                var value = sessionStorage.getItem(key);
                //如果value是json对象/json数组, 解析成js对象/数组
                if(value!=null && (value.indexOf('{')===0 || value.indexOf('[')===0)) {
                    value = JSON.parse(value);
                }
                return value;
            },
            //删除
            removeItem(key) {
                sessionStorage.removeItem(key);
            }
        },

        local : {
            //保存
            setItem(key, value) {
                //如果value是对象, 转换成对应的json
                if(value instanceof Object) {
                    value = JSON.stringify(value);
                }
                //保存
                localStorage.setItem(key, value)
            },
            //读取
            getItem(key) {
                var value = localStorage.getItem(key);
                //如果value是json对象/json数组, 解析成js对象/数组
                if(value!=null && (value.indexOf('{')===0 || value.indexOf('[')===0)) {
                    value = JSON.parse(value);
                }
                return value;
            },
            //删除
            removeItem(key) {
                localStorage.removeItem(key);
            }
        }
    }
})