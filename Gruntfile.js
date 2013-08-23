module.exports = function(grunt) {
    /**
     * 与文件名对应
     * @type {string}
     */
    var packageName = 'package',
        version = '<%= '+ packageName +'.version %>',
        name = '<%= '+ packageName +'.name %>',
        author = '<%= '+ packageName +'.author %>',
        page = '<%= '+ packageName +'.page %>',
        description = '<%= '+ packageName +'.description %>',
        srcPath = '/src',
        buildPath = '/bin',
        cfgFile = packageName + '.json',
        jsSuffix = '.js',
        buildTime = grunt.template.today("yyyy-mm-dd H:MM:ss");
    /**
     * 文件队列映射
     * @type {Array}
     */
    var filesMap = [
        {
            name : 'config',
            concat : true
        },
        {
            name : 'base',
            concat : true
        }];
    /**
     * 创建文件任务队列
     * @param task
     * @param path
     * @param filesMap
     * @returns {Array}
     */
    var createTarget = function(task,path,filesMap){
            var _t = [];
            for(var i in filesMap){
                filesMap[i][task] && _t.push(version + path +'/'+ filesMap[i]['name'] + jsSuffix);
            }
            return _t;
        };
    /**
     * 创建配置
     */
    var config = {
        /**
         *  导入配置文件
         */
        package: grunt.file.readJSON(cfgFile),
        banner: ['/* ================================================================\n',
                 ' * '+ name +'.js v'+ version +'\n',
                 ' *\n',
                 ' * '+ description +'\n',
                 ' *\n',
                 ' * '+page + '\n',
                 ' * ================================================================\n',
                 ' * Copyright 2013 '+ author +'\n',
                 ' * \n',
                 ' * Licensed under the <%= '+ packageName +'.licenses[0].type %> License\n',
                 ' * you may not use this file except in compliance with the License.\n',
                 ' *\n',
                 ' * <%= '+ packageName +'.licenses[0].url %>\n',
                 ' * ================================================================ */\n'].join(''),
        concat: {
            options: {
                banner: '<%= banner %>'
            },
            dist: {
                src: createTarget('concat',srcPath,filesMap),
                dest: version + buildPath + '/' + name + jsSuffix
            }
        },
        /**
         *  使用uglify获取压缩版本
         */
        uglify: {
            options: {
                banner: '/*! '+name + ' v' + version + ' ' + author + ' ' + buildTime + ' */\n'
            },
            build: {
                src: version + buildPath + '/' + name + jsSuffix,
                dest: version + buildPath + '/' + name +'.min' + jsSuffix
            }
        }
    };
    grunt.initConfig(config);
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('default',['concat','uglify']);
};