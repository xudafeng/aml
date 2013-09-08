/* ================================================================
 * aml.js v1.0.0
 *
 * A simple asynchronous module loader with dependency management.
 * Latest build : 2013-09-08 15:38:24
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
    var JSSuffix = '.js';
    var CSSSuffix = '.css';
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
     * 全局配置对象
     * @type {{}}
     */
    var config = {};

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
    var isJS = function(s){
        return /\.js$/i.test(s);
    };
    var isCSS = function(s){
        return /\.css$/i.test(s)
    };

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
    function Path(){

    }
    extend(Path,{

    });
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
    function parseUri (){
        var _uri = config.path ? config.path : LOC.href;
        return _uri;
    };
    /**
     * loader构造器
     * @param id
     * @constructor
     */
    function Loader(id){
        this.id = id;
        this.pwd = parseUri();
        this.init();
    };
    Loader.prototype = {
        init:function(){
            this.router();
        },
        router:function(){
            var self = this;
            if(!isCSS(self.id)){
                self.getScript(isJS(self.id) ? self.id :(this.pwd + self.id + JSSuffix));
            }
        },
        getScript:function(url, success, charset){
            var node = DOC.createElement('script');
            node.src = url;
            node.async = true;
            if (charset) {
                node.charset = charset;
            }
            //标准浏览器
            if (DOC.addEventListener) {
                node.addEventListener('load',success, false);
            }else{
                node.onreadystatechange = function(){
                    if ('loaded' == node.readyState || 'complete' == node.readyState){
                        node.onreadystatechange = null;
                        success();
                    }
                };
            }
            HEAD.insertBefore(node, HEAD.firstChild);
            return node;
        }
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
    };
    /**
     * 扩展模块类
     */
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
            Broadcast.fire('define',{
                id: name,
                deps: deps,
                constructor: factory
            });
        }
        ,require:function(name){
            Broadcast.fire('load',name);
            return null;
        }
        ,exec:function(d){
            data[d.id]['instance'] = data[d.id]['constructor'].apply(this, d.depsMods) || {};
            /**
             * 执行行为触发数据变化，需要检测
             */
            Broadcast.fire('check', data);
        }
        ,load:function(d){
            /**
             * 并发加载模块队列
             */
             new Loader(d);
        }
        ,save:function(d){
            /**
             * 存储锁，不允许覆盖
             */
            if(!data[d.id] || data[d.id] == d.id){
                data[d.id] = d;
                /**
                 * 执行条件检测
                 */
                Broadcast.fire('check', data);
            };
        }
        ,check:function(d){
            each(d,function(d){
                /**
                 * 检测是否执行过
                 */
                if(d['instance'] || d == data[d]){
                    return;
                };
                var _checkMods = [],
                    _depsMods = [],
                    _preLoadMods = [];
                each(d.deps,function(i){
                    if(!data[i]){
                        _preLoadMods.push(i);
                        data[i] = i;
                    }else{
                        if(!data[i]['instance']){
                            _checkMods.push(data[i]);
                        }else{
                            _depsMods.push(data[i]['instance']);
                        };
                    };
                });
                if(isEmptyArray(_preLoadMods) && isEmptyArray(_checkMods)){
                    Broadcast.fire('exec', {
                        id : d.id,
                        depsMods : _depsMods
                    });
                }else{
                    /**
                     * 加载即需模块
                     */
                    each(_preLoadMods,function(i){
                        Broadcast.fire('load',i);
                    });
                    /**
                     * 推送检测模块
                     */
                    Broadcast.fire('check', _checkMods);
                };
            });
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
        Broadcast.fire('save',d);

    });
    /**
     * 订阅检测事件
     */
    Broadcast.on('check',function(d){
        Module.check(d);
    });
    /**
     * 订阅检测事件
     */
    Broadcast.on('exec',function(d){
        Module.exec(d);
    });
    /**
     * 订阅加载事件
     * @type {{}}
     */
    Broadcast.on('load',function(d){
        Module.load(d);
    });
    /**
     * 订阅缓存事件
     * @type {{}}
     */
    Broadcast.on('save',function(d){
        Module.save(d);
    });
    Module.define.amd = {};
    /**
     * 暴露给全局
     * @type {Function}
     */
    window.define = Module.define;
    window.require = Module.require;
    /**
     * module   : config 配置模块
     * author   : xudafeng@126.com
     * build    : 2013.7.4
     *
     * 覆盖默认配置
     */
    function getCurrentScript() {
        var scripts = DOC.getElementsByTagName('script');
        return scripts[scripts.length - 1]; //FF下可以使用DOC.currentScript
    };
    new Loader(getCurrentScript().getAttribute('data-init'));
    extend(aml,{
        config:function(cfg){
            extend(config,cfg);
        }
    });
    /**
     * module : 出口模块
     * author : xudafeng@126.com
     * build  : 2013.7.4
     */
    window.aml = aml;
}(this));