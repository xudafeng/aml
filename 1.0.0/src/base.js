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
<<<<<<< HEAD
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
=======
    function error(s){
        throw new Error(s);
    }
    /**
    * 基于AOP的逻辑分离
    */
>>>>>>> b8195dad0bd959761ff0e2fb25a55b5734178fbc
