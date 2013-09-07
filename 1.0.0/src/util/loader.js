    /**
     * module : loader 加载模块
     * author : xudafeng@126.com
     * build  : 2013.7.4
     */

    /**
     * url净化
     * @param uri
     * @returns {*}
     */
    function parseUri (){
        var _uri = config.path ? config.path : LOC.href;
        return _uri;
    };

    function Loader(id){
        this.id = id;
        this.pwd = parseUri();
        this.init();
    };
    Loader.prototype = {
        init:function(){
            this.router();
        },
        router:function(){
            var self = this;
            if(!isCSS(self.id)){
                self.getScript(this.pwd + self.id + JSSuffix);
            }
        },
        getScript:function(url, success, charset){
            console.log(url)
            var node = DOC.createElement('script');
            node.src = url;
            node.async = true;
            if (charset) {
                node.charset = charset;
            }
            //标准浏览器
            if (DOC.addEventListener) {
                node.addEventListener('load',success, false);
            }else{
                node.onreadystatechange = function(){
                    if ('loaded' == node.readyState || 'complete' == node.readyState){
                        node.onreadystatechange = null;
                        success();
                    }
                };
            }
            HEAD.insertBefore(node, HEAD.firstChild);
            return node;
        }
    };