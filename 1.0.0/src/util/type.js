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
    var isArray = _typeof('Array');
    var isObject = _typeof('Object');
    var isFunction = _typeof('Function');
    var isUndefined = _typeof('Undefined');
    /**
     * 判空检测
     */
    function _empty(type){
        return function(obj){
            if(type =='array' || type == 'string'){
                return obj.length === 0;
            };
        };
    };
    var isEmptyArray = _empty('array');
    var isEmptyString = _empty('string');
    /**
     * 通用类型检测
     */
    var isJS = function(s){
        return /\.js$/i.test(s);
    };
    var isCSS = function(s){
        return /\.css$/i.test(s)
    };
