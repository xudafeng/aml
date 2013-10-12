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
    /**
     * loader构造器
     * @param id
     * @constructor
     */
    function Loader(id,callback){
        this.id = id;
        this.callback = callback;
        this.pwd = parseUri();
        this.init();
    };
    Loader.prototype = {
        init:function(){
            this.router();
        },
        router:function(){
            var self = this;
            if(isCSS(self.id)){
                self.getStyle(this.pwd + self.id);
            }else{
                self.getScript((isJS(self.id) ? self.id :(this.pwd + self.id + JSSuffix)) + '?t=' + (config['tag'] ? config['tag'] : (new Date()).valueOf()),self.callback);
            }
        },
        getScript:function(url, success, charset){
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
                        success && success();
                    }
                };
            }
            HEAD.insertBefore(node, HEAD.firstChild);
            return node;
        },
        getStyle:function(url, success, charset){
            var node = DOC.createElement('link');
            node.rel = 'stylesheet';
            node.href = url;
            //设置编码
            if (charset) {
                node.charset = charset;
            }
            node.addEventListener('load', success, false);
            HEAD.appendChild(node);
            return node;
        }
    };
