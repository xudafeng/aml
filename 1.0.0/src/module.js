    /**
     * module : 模块
     * author : xudafeng@126.com
     * build  : 2013.7.4
     */
    function Module (){
        this.status = 0;
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
                constructor: factory
            };
            Broadcast.fire('define',data);
        },
        require:function(name){
            return '';
        },
        save:function(d){

        },
        exec:function(d){
            data[d.id]['instance'] = data[d.id]['constructor'].apply(this, d.depsMods);
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
                    Broadcast.fire('save',{
                        id:i
                    });
                }else{
                    if(isUndefined(data[i]['instance'])){
                        data[i]['instance'] = data[i]['constructor']();
                    };
                    _depsMods.push(data[i]['instance']);
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