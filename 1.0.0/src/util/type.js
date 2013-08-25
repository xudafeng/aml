/**
 * module : type 类型模块
 * author : xudafeng@126.com
 * build  : 2013.7.4
 */

__isXDF = function(source,option){

    return  option ==  Object.prototype.toString.call(source);
}

function isType(type) {
    return function(obj) {
        return {}.toString.call(obj) == "[object " + type + "]"
    }
}

var isObject = isType("Object")
var isString = isType("String")
var isArray = Array.isArray || isType("Array")
var isFunction = isType("Function")