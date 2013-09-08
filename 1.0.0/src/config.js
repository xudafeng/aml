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