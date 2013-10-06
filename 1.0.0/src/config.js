    /**
     * module   : config 配置模块
     * author   : xudafeng@126.com
     * build    : 2013.7.4
     *
     * 覆盖默认配置
     */
    function getCurrentScriptInit() {
        var scripts = DOC.getElementsByTagName('script');
        return scripts[scripts.length - 1].getAttribute('data-init'); //FF下可以使用DOC.currentScript
    };
    getCurrentScriptInit() && new Loader(getCurrentScriptInit() + (isJS(getCurrentScriptInit()) ? EMPTY : JSSuffix));
    extend(aml,{
        config:function(cfg){
            extend(config,cfg);
        }
    });
