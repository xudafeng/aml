    /**
    * module : depend 依赖模块，借鉴seajs
    * author : xudafeng@126.com
    * build  : 2013.7.4
    */
    function dependenceAnalysis(factory){
        var code = factory.toString();
        var REQUIRE_RE = /"(?:\\"|[^"])*"|'(?:\\'|[^'])*'|\/\*[\S\s]*?\*\/|\/(?:\\\/|[^\/\r\n])+\/(?=[^\/])|\/\/.*|\.\s*require|(?:^|[^$])\brequire\s*\(\s*(["'])(.+?)\1\s*\)/g;
        var SLASH_RE = /\\\\/g;
        var ret = [];
        code.replace(SLASH_RE, "")
            .replace(REQUIRE_RE, function(m, m1, m2) {
                if (m2) {
                  ret.push(m2);
                }
              })
          return ret;
    };
