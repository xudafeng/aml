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
        },
        require:function(name){
            return '';
        },
        exec:function(d){
            data[d.id]['instance'] = data[d.id]['constructor'].apply(this, d.depsMods) || {};
        },
        load:function(d){
            /**
             * 并发加载模块队列
             */
            each(d.mods,function(i){
                new Loader(i);
            });
        },
        save:function(d){
            /**
             * 存储锁，不允许覆盖
             */
            if(!data[d.id] || data[d.id] == d.id){
                data[d.id] = d;
                /**
                 * 执行条件检测
                 */
                each(data,function(i){
                    Broadcast.fire('check', i);
                });
            };
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
        /**
         * 检测是否执行过
         */
        if(d['instance'] || d == data[d]){
            return;
        };
        /**
         * 若无依赖，立即执行
         */
        if(isEmptyArray(d.deps)){
            Broadcast.fire('exec', {
                id : d.id,
                depsMods : EPTTYARRAY
            });
        }else{
            /**
             * 检测依赖执行条件
             */
            var _allowExec = true,
                _depsMods = [],
                _preLoadMods = [];
            each(d.deps,function(i){
                if(!data[i]){
                    _preLoadMods.push(i);
                    data[i] = i;
                }else{
                    if(!data[i]['instance']){
                        _allowExec = false;
                        Broadcast.fire('check', data[i]);
                    }else{
                        _depsMods.push(data[i]['instance']);
                    };
                };
            });
            if(isEmptyArray(_preLoadMods) && _allowExec){
                Broadcast.fire('exec', {
                    id : d.id,
                    depsMods : _depsMods
                });
            }else{
                /**
                 * 加载即需模块
                 */
                Broadcast.fire('load',{
                    mods:_preLoadMods
                });
            };
        };
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