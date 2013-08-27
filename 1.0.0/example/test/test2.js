/**
 * 2 模块功能
 *
 * 以下内容向 isapp 增加模块化功能
 *
 * isapp.add() => isapp.use(), 模块需先定义, 然后才能使用
 * */
;(function () {
    var model;
    var Module, Req, ms;
    var doc, head;
    var isArr, isFn, isObj, isStr, isRef;
    var T, F;

    model = {};
    if (this.isapp) {
        model = isapp;
    }

    if (model.prototype) {
        model.prototype.author = 'web team';
    }

    doc = document;
    head = doc.head || doc.getElementsByTagName('head')[0];

    isArr = model.isArr;
    isFn = model.isFn;
    isObj = model.isObj;
    isStr = model.isStr;
    isRef = model.isRef;

    T = true;
    F = false;

    /**
     * @param name required
     * 			rule 1: start with letters, blanks is not allowed
     * 			rule 2: 'file' => file.js or 'dir/file' => dir/file.js,
     * @param config optional, notice! if config is a function, set config as exports
     * 		exports
     * 			the only part of Module can be accessed outside
     * 			mixed type
     * 		requires
     * 			string or array, other module's name
     * 		css
     * 			string or array, ".css" can be ellipsised
     * 		v
     * 			add v to src, such as model.js?version=1.0.1a whose v is "version=1.0.1a"; if "version" or other v is not given, v is set to "v=1.0.1a"
     * 		path
     * 			override the default path calculated from module's name if it is given
     * 		file
     * 			create a script tag to get a javascript file if file is true, default true
     * requires and v will be transfered
     *
     * config : undefined, null, or function; config.exports = config when config is a function
     * */
    Module = function (name, config) {
        var i, length, path, require;

        config ? isFn(config) ? config = {exports : config, file : false} : '' : config = {};
        path = config.path ? model.trimA(config.path) : '';

        this.name = name;
        this.exports = config.exports || {};
        this.is_fn = isFn(this.exports);
        this.executed = !this.is_fn;
        this.requires = !config.requires ? [] : isArr(config.requires) ? config.requires : [config.requires];
        this.css = !config.css ? [] : isArr(config.css) ? config.css : [config.css];
        this.css_loaded = !this.css.length;

        this.file = path ? true : true == config.file;
        this.loaded = !this.file && !this.requires.length;
        this.path = path ? /:\//.test(path) ? path : model.config('root') + path : true == this.loaded ? '' : model.config('root') + name.replace('.', '/');

        for (i = 0, length = this.requires.length; i < length ; i++) {
            require = this.requires[i];
            /\?/.test(require) ? this.requires[i] = require.substr(0, require.indexOf('?')) : '';
        }

        this.path ? /\.js$/.test(this.path) || /\.js\?*$/.test(this.path) ? '' : this.path = this.path + '.js' : '';
        if (config.v && this.path) {
            config.v.indexOf('=') > 0 ? '' : config.v = 'v=' + config.v;
            this.path = this.path + (/\?/.test(this.path) ? '&' : '?') + config.v;
            this.path = this.path.replace(/\?&/, '?');
        }
    };

    /**
     * @return an object which contains the given module's requires (recursion), contains itself
     * */
    Module.prototype.getRequires = function() {
        var requires = {}, i, length, m, rs = this.requires;
        if (rs[0]) {
            for (i = 0, length = rs.length; i < length; i++) {
                m = ms[rs[i]];
                if (m instanceof Module) model.addMember(requires, m.getRequires());
                else log('undefined Module : <' + rs[i] + '> required by <' + this.name + '>', 2);
            }
        }
        this.file ? requires[this.name] = this.path : '';
        return requires;
    };

    /**
     * useful when module.exports is a function and havn't run
     * */
    Module.prototype.exec = function() {
        var i, length,rs = [], requires;
        if (!this.executed && this.is_fn) {
            requires = this.requires;
            if (requires[0]) {
                for (i = 0, length = requires.length; i < length; i++) rs[i] = ms[requires[i]].exec();
                this.exports = this.exports.apply(model.global, rs);
            } else this.exports = this.exports();
            this.executed = true;
        }
        return this.exports;
    };

    /**
     * 存储所有 Module 实例
     * */
    ms = {};

    Req = {
        scripts : {},
        loading : F,
        list : [],
        index : 0,
        stack : function() {
            Req.loading = F;
            Req.list = [];
            Req.index = 0;
        },
        inner : null
    };

    Req.inner = function(src, recursive) {
        var script, callback;
        /**
         * Req.list = Req.list.concat(src);
         * src = Req.list.shift();
         *
         * 记录
         * 采用注释内的方式获取未加载的 js 文件 会产生一个问题：
         * 		Req.list 数组中有一个 a.js，正确加载之后 又 需要引用 a.js，
         * 		此时，Req.list 数组中已经又有 a.js，所以 concat 函数会再一次
         * 		把 a.js 加入数组中，再一次请求 js 文件。
         * 		这个问题其实在 model.use 函数中已经规避了，
         * 		因为 use 函数会记录每个模块的加载情况，也就不会再次对相同的 js 文件进行 require。
         * 		但是在单独测试 require 方法时，这个问题出现了，所以我再添加一层记录，
         * 		在 require 层记录所有引入的 js 文件。
         * */

        Req.list = Req.list.concat(src);

        // downloading && non't recursive
        if (Req.loading && !recursive) {
            return;
        }

        Req.loading = true;
        src = Req.list[Req.index++];

        if (src) {
            if (!Req.scripts[src]) {
                script = doc.createElement('script');
                script.charset = model.config('charset');
                script.type = 'text/javascript';
                script.src = src;

                if (script.readyState){
                    script.onreadystatechange = function(){
                        if ('loaded' == script.readyState || 'complete' == script.readyState){
                            script.onreadystatechange = null;
                            Req.scripts[src] = 1;
                            Req.inner([], true);
                        }
                    };
                } else {
                    script.addEventListener('load', function() {
                        Req.scripts[src] = 1;
                        Req.inner([], true);
                    }, false);
                }

                head.appendChild(script);
            } else {
                Req.inner([], true);
            }
        } else {
            Req.index--;
            // script download finished
            callback = Req.stack;

            Req.stack = function() {
                Req.loading = F;
                Req.list = [];
                Req.index = 0;
            };

            callback();
        }
    };

    // 方法结束

    /**
     * @param name string or array
     * 		'jquery'
     * 		['jquery', 'dojo']
     * 		[{name : 'jquery'}, {'name' : 'jquery-ui', { requires : 'jquery'}}]
     * @param config see Module
     * */
    function add(name, config) {
        var i, length, require, requires;

        if (isArr(name)) {
            for (i = 0, length = name.length; i < length; i++) isStr(name[i].name) ? model.add(name[i].name, name[i].config) : model.add(name[i], {file : 1});
        } else if (isStr(name) && model.trim(name)) {
            config && config.requires ? requires = config.requires : requires = [];

            if (ms[name]) {
                delete ms[name];
                ms[name] = new Module(name, config);
                log('Module : module <' + name + '> redefined');
            } else ms[name] = new Module(name, config);

            isArr(requires) ? '' : requires = [requires];
            for (i = 0, length = requires.length; i < length; i++) {
                require = model.trim(requires[i]);
                ('' == require || /\s/.test(require)) && log('Module ： required module\'s name can\'t cantain any blanks(<' + require + '>)', 2);
                if (!ms[require]) {
                    config = {file : 1};
                    if (/\?/.test(require)) {
                        require = require.split('?');
                        config.v = require[1];
                        require = require[0];
                    }
                    ms[require] = new Module(require, config);
                }
            }
        } else {
            log('Module constructor : module\'s name is required and can\'t cantain any blanks(<' + name + '>)', 2);
        }
        return model;
    }

    /**
     * multi-module is support
     * 'dom' or 'dom,ajax' or ['dom', 'ajax']
     * */
    function use(name, fn) {
        var i, length, names, m, modules, unload_ms, exports, rs, callback, result, arr;

        function getRequires(module) {
            var i, length, req, reqs, req_scripts, loaded_scripts = doc.getElementsByTagName('script');
            reqs = module.getRequires();
            req_scripts = {};
            for (req in reqs) req_scripts[reqs[req]] = req;
            for (i = 0, length = loaded_scripts.length; i < length; i++) req_scripts[loaded_scripts[i].src] && delete req_scripts[loaded_scripts[i].src];
            reqs = [];
            i = 0;
            for (req in req_scripts) reqs[i++] = req;
            return reqs;
        }

        modules = [];
        unload_ms = [];
        exports = [];
        rs = [];
        names = isArr(name) ? name : isStr(name) ? model.trimA(name).split(',') : '';
        if ('' == names) {
            return log('use(name, fn) name is should be an array or string', 2);
        }
        for (i = 0, length = names.length; i < length; i++) {
            m = ms[names[i]];

            if (m instanceof Module) {
                modules[i] = m;
                exports[i] = m.exports;
                if (!m.css_loaded) {
                    model.css(m.css);
                    m.css_loaded = true;
                }
                if (!m.loaded) {
                    arr = getRequires(m);
                    if (arr[0]) {
                        unload_ms[unload_ms.length] = m;
                        rs = rs.concat(arr);
                    } else m.loaded = true;
                }
            } else return log('undefined Module : <' + names[i] + '>', 2);
        }
        rs = model.unique(rs);
        if (rs[0]) {
            callback = function() {
                for (i = 0, length = unload_ms.length; i < length; i++) {
                    unload_ms[i].loaded = true;
                }
                use(names, fn);
            };
            model.require(rs, callback);
        } else {
            for (i = 0, length = modules.length; i < length; i++) {
                if (!modules[i].executed) {
                    exports[i] = modules[i].exec();
                }
            }
            fn ? isFn(fn) ? result = fn.apply(model.global, exports) : log('use(name, fn) <fn> should be a function') : '';
            return result;
        }
    }

    /**
     * @param {src} string(javascript file path) or array
     * */
    function require(src, fn) {
        var require_fn, type = model.type(src);

        if ('string' != type && 'array' != type) {
            return log('require(src, fn) <src> should be a string or an array');
            src = [];
        }

        require_fn = Req.stack;

        if (isFn(fn)) {
            Req.stack = function() {
                require_fn();
                fn();
            };
        } else fn && log('require(src, fn) <fn> should be a function');

        Req.inner(src);

        return model;
    }

    /**
     * 返回指定 module
     * */
    function getModule(name) {
        var module = ms[name];
        if (module) {
            if (module.executed) {
                module = module.exports;
            } else {
                // there is a hidden danger
                use(name);
                module = module.exports;
            }
        }

        return module;
    }

    /**
     * 判断 module 是否已定义
     * */
    function hasModule(name) {
        return model.index(list(), name) > -1;
    }

    /**
     * 到处 module
     * */
    function exports(name, alias, context) {
        var module;
        if (name && isStr(alias) && hasModule(name)) {
            isRef(context) ? '' : context = model.global;
            context[alias] && log('exports(name, alias, context) alias of '+ context + ' exists');
            context[alias] = getModule(name);
        }
    }

    /**
     * 返回 module 列表
     * */
    function list() {
        var m, list=[], length = 0;
        for(m in ms) {
            list[length++] = ms[m].name;
        }
        return list;
    }

    /**
     * 移除 module
     * */
    function remove(name) {
        return ms[name] && delete ms[name];
    }

    /**
     * 发起 css 请求
     * @param {href} string or array, '.css' can be ellipsised
     * @param {media} optional
     * */
    function css(href, media) {
        if (!href || !(href + '').length) return model;

        var i, length, style, src, css_root = model.config('css_root');
        href + '' === href ? href = [href] : '';
        media ? '' : media = model.config('media');
        for (i = 0, length = href.length; i < length; i++) {
            src = href[i];
            /:\//.test(src) ? '' : src = css_root + src;
            if (src) {
                style = doc.createElement('link');
                style.charset = model.config('charset');
                style.media = media;
                style.rel = 'stylesheet';
                style.href = src.match(/\.css/) ? src : src + '.css';
                head.appendChild(style);
            }
        }

        return model;
    }

    /**
     * 预下载图片
     * */
    function preImage(src, root) {
        root= root ? model.trim(root) : '';
        isArr(src) ? '' : src = [src];
        for(var i = 0, length = src.length; i < length; i++) {
            src[i] ? (new Image()).src = root + src[i] : '';
        }

        return base;
    }

    // 方法结束

    // base 对外开放 api 开始

    model.add = add;
    model.use = use;
    model.require = require;
    model.getModule = getModule;
    model.hasModule = hasModule;
    model.exports = exports;
    model.list = list;
    model.remove = remove;
    model.css = css;
    model.preImage = preImage;
})();