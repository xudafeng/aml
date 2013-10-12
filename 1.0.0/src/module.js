    /**
     * module : 模块
     * author : xudafeng@126.com
     * build  : 2013.7.4
     */
    function Module (){
    };
    var currentMod;
    var publishExport = {};
    var preLoadQuery = [];
    data['exports'] = {
        constructor:function(){
            return publishExport;
        },
        deps:[],
        id:'exports'
    };
    /**
     * 扩展模块类
     */

    extend(Module,{
        define:function(name, deps, factory){
            var _name = name,
                _deps = deps,
                _factory = factory;

            /**
             * 处理匿名模块
             */
            switch(arguments.length){
                case 1:
                    _name = isEmptyArray(preLoadQuery) ? 'anony' + getId() : preLoadQuery.pop();
                    _deps = [];
                    _factory = name;
                    break;
                case 2:
                    if(isString(_name)){
                        _deps = [];
                        _factory = deps;
                    }else if(isArray(_name)){
                        _name = isEmptyArray(preLoadQuery) ? 'anony' + getId() : preLoadQuery.pop();
                        _deps = name;
                        _factory = deps;
                    }
                    break;
            }
            var _preLoadMods = dependenceAnalysis(_factory);

            for(var i = 0;i<_preLoadMods.length;i++){
                preLoadQuery.push(_preLoadMods[i]);
                _deps.push(_preLoadMods[i]);
            }
            /**
             * 检测依赖，标记依赖
             * 获取当前关键标记数据
             * @type {{id: *, uri: *, deps: *, factory: *}}
             */
            //console.log(_deps)
            Broadcast.fire('define',{
                id: _name,
                deps: _deps,
                constructor: _factory
            });
        }
        /* 未做递归检测，默认执行，有空加上 */
        ,require:function(name){
            return data[name]['exports'];
        }
        ,exec:function(d){
            data[d.id]['instance'] = data[d.id]['constructor'].apply(this, d.depsMods) || {};
            data[d.id]['exports'] = publishExport;
            /**
             * 执行行为触发数据变化，需要检测
             */
            Broadcast.fire('check', data);
        }
        ,load:function(d,callback){
            /**
             * 并发加载模块队列
             */
             new Loader(d,callback);
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
        ,preLoad:function(){
        
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
    /**
     * 订阅缓存事件
     * @type {{}}
     */
    Broadcast.on('require',function(d){
        Module.load(d.id,d.callback);
    });
    Module.define.amd = {};
    /**
     * 暴露给全局
     * @type {Function}
     */
    window.define = Module.define;
    window.require = Module.require;
