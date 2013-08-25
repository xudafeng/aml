/* ================================================================
 * aml.js v1.0.0
 *
 * A simple asynchronous module loader with dependency management.
 * Latest build : 2013-08-25 19:18:45
 *
 * http://xudafeng.github.com/aml/
 * ================================================================
 * Copyright 2013 xdf email:xudafeng[at]126.com
 *
 * Licensed under the MIT License
 * You may not use this file except in compliance with the License.
 *
 * https://raw.github.com/xudafeng/aml/master/LICENSE
 * ================================================================ */


/**
 * module : 入口模块
 * author : xudafeng@126.com
 * build  : 2013.7.4
 */
;(function(window, undefined) {
    'use strict';
if (window.aml) {
    return
};

/**
 * module   : config 配置模块
 * author   : xudafeng@126.com
 * build    : 2013.7.4
 *
 * 声明静态变量
 */

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
/**
 * module : path 模块
 * author : xudafeng@126.com
 * build  : 2013.7.4
 */

/**
 *
 */
/**
 * module : loader 加载模块
 * author : xudafeng@126.com
 * build  : 2013.7.4
 */
/**
 * module : depend 依赖模块
 * author : xudafeng@126.com
 * build  : 2013.7.4
 */
/**
 * module : base 基础模块
 * author : xudafeng@126.com
 * build  : 2013.7.4
 *
 * 基础框架
 * 参考：https://github.com/xudafeng/xdfjs
 */

/**
 * 避免重复
 */
/**
 * module : 出口模块
 * author : xudafeng@126.com
 * build  : 2013.7.4
 */
}(this));