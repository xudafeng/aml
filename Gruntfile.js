module.exports = function(grunt) {
    var config = {
        /**
         *  导入配置文件
         */
        pkg: grunt.file.readJSON('package.json'),


//        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
//            '<%= grunt.template.today("yyyy-mm-dd h:MM:ss TT") %>\n' +
//            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
//            '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
//            ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
        banner: '<%= pkg.name %>',
        concat: {
            dist: {
                src: [
                    "<%= pkg.version %>/src/module.js"
                ],
                dest: '<%= pkg.version %>/bin/debug.js'
            }
        }
    };
    grunt.initConfig(config);
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.registerTask("default",["concat","uglify"])
};