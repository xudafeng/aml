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
        ,mix : mix
     };
     function mix (r,s){
        for(var i in s){
            r[i] = s[i];
        };
        return r;
     };