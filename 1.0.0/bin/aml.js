/* ================================================================
 * aml.js v1.0.0
 *
 * A simple asynchronous module loader with dependency management.
 * Latest build : 2013-09-02 13:24:13
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
    /**
     * 阻止重复解析
     */
    if (window.aml) {
        return
    };

    /**
     * 定义全局静态变量
     */
    var VERSION = '1.0.0';
    var EMPTY = '';
    var HEAD = document.head || document.getElementsByTagName('head')[0] || document.documentElement;
    var DOC = document;
    var LOC = location;
    /**
     * file   : base.js
     * module : base 基础模块
     * author : xudafeng@126.com
     * build  : 2013.7.4
     *
     * 基础框架
     * 参考：https://github.com/xudafeng/xdfjs
     */
     var aml = {
         version : VERSION
     };
    /**
     * 全局数据对象
     * @type {{}}
     */
     var data = aml.data = {};
    /**
     * 实现松散耦合的观察者模式
     * @returns {*}
     */

    /**
     * 对象混合拷贝
     * @returns {*}
     */
     function extend (){
        var p = 0,
            o;

        function _mix(r,s){
            for(var i in s){
                r[i] = s[i];
            };
            return r;
        };

        while( p < arguments.length ){

            o = !p ? arguments[p] : _mix(o,arguments[p]) ;

            p++;

        }
        return o;
     };
    /**
     * 容错提示
     * @param s
     */
    function error(s){
        throw new Error(s);
    }
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

    function Loader(){

    };
    /**
    * module : depend 依赖模块
    * author : xudafeng@126.com
    * build  : 2013.7.4
    */
    /**
     * module : 模块
     * author : xudafeng@126.com
     * build  : 2013.7.4
     */
    function Module (){
        this.name = 1;
    };
    Module.define = function(name, deps, factory){
        console.log(name)

    };
    Module.require = function(name){
        return 12;
    };

    Module.define.amd = {};
    window.define = Module.define;
    window.require = Module.require;
    /**
     * module   : config 配置模块
     * author   : xudafeng@126.com
     * build    : 2013.7.4
     *
     * 覆盖默认配置
     */
    extend(aml,{config:function(cfg){
        console.log(cfg)
    }});
    /**
     * module : 出口模块
     * author : xudafeng@126.com
     * build  : 2013.7.4
     */
    window.aml = aml;
}(this));