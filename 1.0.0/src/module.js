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
        return '';
    };

    Module.define.amd = {};
    window.define = Module.define;
    window.require = Module.require;