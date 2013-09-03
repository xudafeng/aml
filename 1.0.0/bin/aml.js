/* ================================================================
 * aml.js v1.0.0
 *
 * A simple asynchronous module loader with dependency management.
<<<<<<< HEAD
 * Latest build : 2013-09-03 17:09:48
=======
 * Latest build : 2013-09-03 9:31:42
>>>>>>> b8195dad0bd959761ff0e2fb25a55b5734178fbc
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
    var EPTTYARRAY = [];
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
     * 遍历
     */
    function each (object, fn) {

        if(object){
            for(var i in object){
                if(i !== 'length' && i !== 'item'){
                    fn.call(this,object[i],i);
                }
            }
        }
        return object;
    };
    /**
     * 容错提示
     * @param s
     */
    function error(s){
        throw new Error(s);
    }
    /**
    * 基于AOP的逻辑分离
    */

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
    var isJS = /\.js$/i;
    var isCSS = /\.css$/i;

    /**
     * 实现松散耦合的观察者模式
     * @returns {*}
     */
    function Broadcast() {
    };

    Broadcast.cache = {};

    extend(Broadcast,{
        /**
         * 派发
         */
        fire:function(name,data){
            if(!isUndefined(this.cache[name])){
                this.cache[name].call(this,data);
            };
        },
        /**
         * 订阅
         */
        on:function(name,callback){
            this.cache[name] = callback;
        },
        /**
         * 退订
         */
        detach:function(name){
            if(!isUndefined(this.cache[name])){
                delete this.cache[name];
            };
        }
    });
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
     * url净化
     * @param uri
     * @returns {*}
     */
    function parseUri (uri){
        return uri;
    };

    var pwd = aml.pwd = parseUri(LOC.href);

    function Loader(){

    };
    /**
    * module : depend 依赖模块
    * author : xudafeng@126.com
    * build  : 2013.7.4
    */
    function dependenceAnalysis(factory){
        return factory.toString();
    };
    /**
     * module : 模块
     * author : xudafeng@126.com
     * build  : 2013.7.4
     */
    function Module (){
<<<<<<< HEAD
        this.status = 0;
=======
        this.name = 1;
    };
    Module.define = function(name, deps, factory){
        console.log(name)

    };
    Module.require = function(name){
        return '';
>>>>>>> b8195dad0bd959761ff0e2fb25a55b5734178fbc
    };
    extend(Module,{
        define:function(name, deps, factory){
            /**
             * 检测依赖，标记依赖
             */
            //deps = dependenceAnalysis(factory);
            /**
             * 获取当前关键标记数据
             * @type {{id: *, uri: *, deps: *, factory: *}}
             */
            var data = {
                id: name,
                uri: name,
                deps: deps,
                factory: factory
            };
            Broadcast.fire('define',data);
        },
        require:function(name){
            return '';
        },
        exec:function(d){
            data[d.id]['factory'].apply(this, d.depsMods);
        },
        load:function(){

        }
    });
    /**
     * 订阅defined事件
     */
    Broadcast.on('define',function(d){
        /**
         * map赋值
         * @type {*}
         */
        data[d.id] = d;
        /**
         * 执行条件检测
         */
        Broadcast.fire('check', d);
    });
    /**
     * 订阅检测事件
     */
    Broadcast.on('check',function(d){
        if(isEmptyArray(d.deps)){
            Broadcast.fire('exec', {
                id : d.id,
                depsMods : EPTTYARRAY
            });
        }else{
            /**
             * 检测执行条件
             */
            var allowExec = true,
                _depsMods = [];
            each(d.deps,function(i){
                if(isUndefined(data[i])){
                    allowExec = false;
                }else{
                    _depsMods.push(data[i]['factory']);
                };
            });
            if(allowExec){
                Broadcast.fire('exec', {
                    id : d.id,
                    depsMods : _depsMods
                });
            }else{
                /**
                 * 标记
                 */
            }
        };
    });
    /**
     * 订阅检测事件
     */
    Broadcast.on('exec',function(d){
        Module.exec(d);
    });
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

    }});
    /**
     * module : 出口模块
     * author : xudafeng@126.com
     * build  : 2013.7.4
     */
    window.aml = aml;
}(this));