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
        ,extend : extend
     };
    /**
     * 对象拷贝
     * @returns {*}
     */
     function extend (){
        var p = 0,
            o;

        while( p < arguments.length ){

            (!p ? function(){

                o = arguments[p];

            } : function(){

            })();
            p++;
        }
        console.log(o)

        return;
        for(var i in s){
            r[i] = s[i];
        };
        return r;
     };
     var xdf = {};
     xdf = extend(xdf,{name1:1},{name2:1},{name3:1},{name4:1});
    console.log(xdf)