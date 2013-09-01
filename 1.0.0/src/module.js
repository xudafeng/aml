    /**
     * module : 模块
     * author : xudafeng@126.com
     * build  : 2013.7.4
     */
    function Module (){

    };
    Module.define = function(name, deps, factory){
        console.log(arguments)

    };

    window.define = Module.define;