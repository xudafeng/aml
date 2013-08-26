    /**
     * file   : type.js
     * module : type 类型检测模块
     * author : xudafeng@126.com
     * build  : 2013.7.4
     */
    /**
     * 数据类型检测
     */
    function _typeof(type){
        return function(obj){
            return Object.prototype.toString.call(obj) === '[object ' + type + ']';
        };
    };
    var isString = _typeof('String');
    var isObject = _typeof('Object');
    var isFunction = _typeof('Function');
    var isFunction = _typeof('Undefined');

    /**
     * 通用类型检测
     */
    var isJS = /\.js$/i;
    var isCSS = /\.css$/i;
